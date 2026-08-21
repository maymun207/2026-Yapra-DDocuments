import json
import os
import re
from datetime import datetime
import glob
import zipfile

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
OUTPUT_DIR = os.path.join(SCRIPT_DIR, "Claude_Duzenli_Arsiv")
CONV_OUT_DIR = os.path.join(OUTPUT_DIR, "Konusmalar")
GENEL_OUT_DIR = os.path.join(OUTPUT_DIR, "Genel_Sohbetler")
PROJ_OUT_DIR = os.path.join(OUTPUT_DIR, "Projeler")
MEM_OUT_DIR = os.path.join(OUTPUT_DIR, "Hafiza_Dosyalari")
DESIGN_OUT_DIR = os.path.join(OUTPUT_DIR, "Tasarim_Sohbetleri")
SESSIONS_OUT_DIR = os.path.join(OUTPUT_DIR, "Oturum_Kapanis_Dosyalari")

def sanitize_filename(name):
    name = re.sub(r'[\\/*?:"<>|]', "", str(name))
    name = re.sub(r'[\r\n\t]', " ", name)
    name = name.strip()
    if len(name) > 120:
        name = name[:120] + "..."
    if not name:
        name = "isimsiz_dosya"
    return name

def ensure_dir(path):
    os.makedirs(path, exist_ok=True)

def classify_conversation(conv):
    title = (conv.get('name') or '').lower()
    summary = (conv.get('summary') or '').lower()
    
    first_msgs = ''
    attached_files = []
    for m in conv.get('chat_messages', [])[:6]:
        first_msgs += ' ' + (m.get('text') or '')
        for a in m.get('attachments', []):
            attached_files.append((a.get('file_name') or a.get('extracted_content') or '').lower())
        for f_obj in m.get('files', []):
            attached_files.append((f_obj.get('file_name') or '').lower())
            
    full_text = (title + ' ' + summary + ' ' + first_msgs[:2000] + ' ' + ' '.join(attached_files)).lower()
    
    # 1. Oturum / Session numarası üzerinden kesin tasnif (Yaprak & EAIP projeleri)
    m = re.search(r'\b(?:session|oturum)\s*[-_]?\s*(\d{1,3})\b', title, re.I)
    if not m:
        m = re.search(r'\b[sS](\d{1,3})\b', title)
    if not m:
        m = re.search(r'\b(?:session|oturum|bootstrap[^\d]*)\s*[-_]?\s*v?(\d{1,3})\b', first_msgs, re.I)
        if not m:
            m = re.search(r'\b[sS](\d{1,3})\b', first_msgs)
            
    if m:
        s_num = int(m.group(1))
        if 1 <= s_num <= 7 and 'agentic' in full_text:
            return 'Agentic SW Team'
        if 24 <= s_num <= 39:
            return 'EAIP-1'
        if 40 <= s_num <= 74:
            return 'cwf_yaprak_2'
        if 75 <= s_num <= 101:
            return 'cwf_yaprak3'
        if 102 <= s_num <= 130:
            return 'cwf_yaprak_5'

    # 2. Özel Proje Anahtar Kelimeleri
    if any(k in full_text for k in ['kale strategy', 'kale holding', 'kale-ardıç', 'kale ardic', 'kale ardıç', 'act fund', 'act satın', 'act müttefik', 'zeynep bodur', 'hasar modeli', 'scl kütüphanesi', 'vites 0', 'newco', 'kale sahip', 'kale devralma', 'yerimde olsan ne yapardın']):
        return 'Kale Strategy'

    if any(k in full_text for k in ['yaprak_5', 'yaprak 5', 'cwf_yaprak_5', 'v5_1', 'yaprak_v5', 's102', 's103', 's105', 's106', 's107', 's108', 's109', 's110', 's111']):
        return 'cwf_yaprak_5'

    if any(k in full_text for k in ['yaprak_3', 'yaprak 3', 'cwf_yaprak_3', 'cwf_yaprak3', 'yaprak3']):
        return 'cwf_yaprak3'

    if any(k in full_text for k in ['yaprak_2', 'yaprak 2', 'cwf_yaprak_2']):
        return 'cwf_yaprak_2'

    if any(k in full_text for k in ['eaip', 'theblueprint23', 'the blueprint 23', 'the blueprint', 'blueprint23', 'revolutionize', 'revolutionized', 'brick architecture', 'stage s2', 'load_bearing', 'adr-001', 'adr-002', 'adr-003', 'adr 003']):
        return 'EAIP-1'

    if any(k in full_text for k in ['agentic sw team', 'agentic software team', 'agentic team', 'antigravity', 'takım-1', 'takim-1', 'takım-2', 'takim-2', 'anti-gravity', 'subagent']):
        return 'Agentic SW Team'

    if any(k in full_text for k in ['technologymap', 'technology map', 'scrollytelling', 'digital mycelium', 'logo design for cwf', 'sawtooth speech', 'cwf logo']):
        return 'TECHNOLOGYMAP'

    if any(k in full_text for k in ['how to use claude', 'claude prompt', 'claude kullanım', 'claude to run bash', 'supabase bağlantısı claude', 'bireysel hesabı takım hesabına', 'yüklenen dosyaları gizli tutma', 'claude api access to fable']):
        return 'How to use Claude'

    if any(k in full_text for k in ['cwf_prod', 'cwf_yaprak', 'yaprak', 'chat with factory', 'cwf', 'armes mcp', 'armes', 'mcp fabrika', 'hat performans', 'living_arch', 'living-arch', 'galip usta', 'gu context', 'gu ve ardic']):
        return 'cwf_prod'

    return 'Genel_Sohbetler'

def format_conversation_markdown(conv, raw_name, conv_uuid, created_at, updated_at, summary):
    content = []
    content.append(f"# {conv.get('name', raw_name)}\n\n")
    if conv_uuid:
        content.append(f"**Sohbet ID (UUID):** `{conv_uuid}`\n\n")
    content.append(f"**Oluşturulma Tarihi:** {created_at}\n\n")
    if updated_at:
        content.append(f"**Güncellenme Tarihi:** {updated_at}\n\n")
    if summary and summary != conv.get("name"):
        content.append(f"**Özet:** {summary}\n\n")
    content.append("---\n\n")
    
    for msg in conv.get("chat_messages", []):
        sender = msg.get("sender", "Bilinmeyen")
        msg_time = msg.get("created_at", "")
        
        if sender == "human":
            content.append(f"## 👤 Kullanıcı ({msg_time})\n\n")
        elif sender == "assistant":
            content.append(f"## 🤖 Claude ({msg_time})\n\n")
        else:
            content.append(f"## 💬 {sender} ({msg_time})\n\n")
        
        text_content = msg.get("text", "")
        content.append(text_content + "\n\n")
        
        attachments = msg.get("attachments", [])
        files = msg.get("files", [])
        
        if attachments or files:
            content.append("---\n**Ekli Dosyalar & Ekler:**\n\n")
            for attach in attachments:
                a_name = attach.get("file_name") or attach.get("name") or "isimsiz_ek"
                content.append(f"- 📎 {a_name}\n")
            for f_obj in files:
                f_name = f_obj.get("file_name") or f_obj.get("name") or "isimsiz_dosya"
                content.append(f"- 📄 {f_name}\n")
            content.append("\n---\n\n")
            
    return "".join(content)

def collect_all_conversations():
    all_convs = {}
    root_conv = os.path.join(SCRIPT_DIR, "conversations.json")
    if os.path.exists(root_conv):
        try:
            with open(root_conv, 'r', encoding='utf-8') as f:
                data = json.load(f)
                for c in data:
                    uid = c.get('uuid')
                    all_convs[uid] = c
        except Exception as e:
            print(f"Hata root conversations.json: {e}")

    for zf_path in sorted(glob.glob(os.path.join(SCRIPT_DIR, "*.zip"))):
        try:
            with zipfile.ZipFile(zf_path, 'r') as z:
                for item in z.namelist():
                    if item.endswith("conversations.json"):
                        data = json.loads(z.read(item).decode('utf-8'))
                        for c in data:
                            uid = c.get('uuid')
                            if uid not in all_convs:
                                all_convs[uid] = c
                            else:
                                if c.get('updated_at', '') > all_convs[uid].get('updated_at', ''):
                                    all_convs[uid] = c
        except Exception as e:
            print(f"Hata {zf_path} ZIP taranırken: {e}")
            
    return list(all_convs.values())

def collect_all_projects():
    all_projects = {}
    root_proj_dir = os.path.join(SCRIPT_DIR, "projects")
    if os.path.exists(root_proj_dir):
        for f in glob.glob(os.path.join(root_proj_dir, "*.json")):
            try:
                with open(f, 'r', encoding='utf-8') as fp:
                    proj = json.load(fp)
                    pid = proj.get('uuid', os.path.splitext(os.path.basename(f))[0])
                    all_projects[pid] = proj
            except Exception as e:
                print(f"Hata {f}: {e}")

    for zf_path in sorted(glob.glob(os.path.join(SCRIPT_DIR, "*.zip"))):
        try:
            with zipfile.ZipFile(zf_path, 'r') as z:
                for item in z.namelist():
                    if item.startswith("projects/") and item.endswith(".json"):
                        proj = json.loads(z.read(item).decode('utf-8'))
                        pid = proj.get('uuid', item)
                        if pid not in all_projects or proj.get('updated_at', '') > all_projects[pid].get('updated_at', ''):
                            all_projects[pid] = proj
        except Exception as e:
            print(f"Hata {zf_path} proje okunurken: {e}")
            
    return all_projects

def collect_all_memories():
    all_memories = []
    root_mem = os.path.join(SCRIPT_DIR, "memories.json")
    if os.path.exists(root_mem):
        try:
            with open(root_mem, 'r', encoding='utf-8') as f:
                data = json.load(f)
                if isinstance(data, list):
                    all_memories.extend(data)
                else:
                    all_memories.append(data)
        except Exception as e:
            print(f"Hata {root_mem}: {e}")

    for zf_path in sorted(glob.glob(os.path.join(SCRIPT_DIR, "*.zip"))):
        try:
            with zipfile.ZipFile(zf_path, 'r') as z:
                for item in z.namelist():
                    if "memories" in item and item.endswith(".json"):
                        data = json.loads(z.read(item).decode('utf-8'))
                        if isinstance(data, list):
                            all_memories.extend(data)
                        else:
                            all_memories.append(data)
        except Exception as e:
            print(f"Hata {zf_path} anılar okunurken: {e}")
            
    return all_memories

def collect_all_design_chats():
    all_chats = {}
    for zf_path in sorted(glob.glob(os.path.join(SCRIPT_DIR, "*.zip"))):
        try:
            with zipfile.ZipFile(zf_path, 'r') as z:
                for item in z.namelist():
                    if "design_chats/" in item and item.endswith(".json"):
                        dc = json.loads(z.read(item).decode('utf-8'))
                        cid = dc.get("uuid", item)
                        all_chats[cid] = dc
        except Exception as e:
            print(f"Hata {zf_path} tasarım sohbetleri: {e}")
            
    root_dc = os.path.join(SCRIPT_DIR, "design_chats")
    if os.path.exists(root_dc):
        for f in glob.glob(os.path.join(root_dc, "*.json")):
            try:
                with open(f, 'r', encoding='utf-8') as fp:
                    dc = json.load(fp)
                    cid = dc.get("uuid", os.path.splitext(os.path.basename(f))[0])
                    all_chats[cid] = dc
            except Exception as e:
                print(f"Hata {f}: {e}")
                
    return list(all_chats.values())

def process_session_zips():
    ensure_dir(SESSIONS_OUT_DIR)
    session_zips = [f for f in glob.glob(os.path.join(SCRIPT_DIR, "Session*.zip"))]
    print(f"\nToplam {len(session_zips)} Oturum Arşivi ZIP dosyası işleniyor...")
    
    extracted_files = 0
    for sz in session_zips:
        base_name = os.path.splitext(os.path.basename(sz))[0]
        target_sub = os.path.join(SESSIONS_OUT_DIR, base_name)
        ensure_dir(target_sub)
        with zipfile.ZipFile(sz, 'r') as z:
            for item in z.namelist():
                if not item.endswith('/'):
                    z.extract(item, target_sub)
                    extracted_files += 1
                    yaprak2_sess = os.path.join(PROJ_OUT_DIR, "cwf_yaprak_2", "Oturum_Dosyalari", base_name)
                    ensure_dir(yaprak2_sess)
                    z.extract(item, yaprak2_sess)
                    
        print(f"  -> {base_name} arşivi çıkarıldı.")
    return extracted_files

def process_account_metadata():
    print("\nHesap ve giriş geçmişi metaverileri işleniyor...")
    users_data = []
    login_data = []
    
    # Check all zips
    for zf_path in sorted(glob.glob(os.path.join(SCRIPT_DIR, "*.zip"))):
        try:
            with zipfile.ZipFile(zf_path, 'r') as z:
                if 'users.json' in z.namelist():
                    u = json.loads(z.read('users.json').decode('utf-8'))
                    if isinstance(u, list):
                        for item in u:
                            if item not in users_data:
                                users_data.append(item)
                    elif isinstance(u, dict) and u not in users_data:
                        users_data.append(u)
                        
                if 'login_history.json' in z.namelist():
                    l = json.loads(z.read('login_history.json').decode('utf-8'))
                    if isinstance(l, list):
                        for item in l:
                            if item not in login_data:
                                login_data.append(item)
                    elif isinstance(l, dict) and l not in login_data:
                        login_data.append(l)
        except Exception as e:
            print(f"Hata {zf_path} kullanıcı bilgisi: {e}")
            
    # Write to Markdown
    acc_path = os.path.join(OUTPUT_DIR, "Hesap_ve_Giris_Bilgileri.md")
    with open(acc_path, 'w', encoding='utf-8') as f:
        f.write("# 👤 Claude Hesap ve Giriş Güvenlik Geçmişi\n\n")
        f.write(f"**Rapor Tarihi:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n")
        f.write("## 🆔 Kullanıcı Profil Bilgileri\n\n")
        for u in users_data:
            f.write(f"- **Ad Soyad:** {u.get('full_name', 'Bilinmiyor')}\n")
            f.write(f"- **E-posta:** `{u.get('email_address', '')}`\n")
            f.write(f"- **Telefon:** `{u.get('verified_phone_number', '')}`\n")
            f.write(f"- **Hesap UUID:** `{u.get('uuid', '')}`\n\n")
            
        f.write("## 🔐 Giriş Geçmişi ve Oturum Kayıtları (Login History)\n\n")
        f.write("| Tarih (UTC) | IP Adresi | Ülke | Tarayıcı / Versiyon | İşletim Sistemi |\n")
        f.write("| :--- | :--- | :--- | :--- | :--- |\n")
        for log in login_data:
            ts = log.get('timestamp', '')
            ip = log.get('ip_address', '')
            country = (log.get('location_info') or {}).get('country', '')
            ua = log.get('user_agent') or {}
            browser = f"{ua.get('browser_family', '')} {ua.get('browser_version', '')}".strip()
            os_info = f"{ua.get('os_family', '')} {ua.get('os_version', '')}".strip()
            f.write(f"| {ts} | `{ip}` | {country} | {browser} | {os_info} |\n")
            
    print("Hesap_ve_Giris_Bilgileri.md başarıyla oluşturuldu.")

    # Manifest file
    manifest_files = glob.glob(os.path.join(SCRIPT_DIR, "manifest*.json"))
    if manifest_files:
        man_path = os.path.join(OUTPUT_DIR, "Export_Manifest.md")
        with open(man_path, 'w', encoding='utf-8') as out:
            out.write("# 📋 Claude Dışa Aktarım Manifestosu (Export Manifest)\n\n")
            for mf in manifest_files:
                with open(mf, 'r', encoding='utf-8') as mfp:
                    m_data = json.load(mfp)
                out.write(f"**Manifest Dosyası:** `{os.path.basename(mf)}`\n\n")
                out.write(f"```json\n{json.dumps(m_data, indent=2)}\n```\n\n")
        print("Export_Manifest.md başarıyla oluşturuldu.")

def process_projects(projects_dict):
    ensure_dir(PROJ_OUT_DIR)
    print(f"\nToplam {len(projects_dict)} benzersiz proje işleniyor...")
    
    project_id_to_name = {}
    total_docs_extracted = 0
    
    for proj_id, proj in projects_dict.items():
        raw_name = proj.get("name", "isimsiz_proje")
        proj_name = sanitize_filename(raw_name)
        project_id_to_name[proj_id] = proj_name
        
        proj_dir = os.path.join(PROJ_OUT_DIR, proj_name)
        ensure_dir(proj_dir)
        ensure_dir(os.path.join(proj_dir, "Konusmalar"))
        
        info_path = os.path.join(proj_dir, "proje_bilgisi.md")
        with open(info_path, 'w', encoding='utf-8') as f:
            f.write(f"# Proje: {raw_name}\n\n")
            f.write(f"**Proje ID:** `{proj_id}`\n\n")
            f.write(f"**Açıklama:** {proj.get('description', 'Yok')}\n\n")
            f.write(f"**Özel (Private):** {proj.get('is_private', False)}\n\n")
            f.write(f"**Oluşturulma Tarihi:** {proj.get('created_at', '')}\n\n")
            f.write(f"**Güncellenme Tarihi:** {proj.get('updated_at', '')}\n\n")
            f.write(f"**Sistem Komutu (Prompt Template):**\n\n```text\n{proj.get('prompt_template', '')}\n```\n\n")
            
        docs = proj.get("docs", [])
        if docs:
            docs_dir = os.path.join(proj_dir, "docs")
            ensure_dir(docs_dir)
            seen_doc_names = {}
            for i, doc in enumerate(docs):
                doc_name = doc.get("filename")
                if not doc_name:
                    doc_name = f"isimsiz_dosya_{i}.txt"
                
                doc_name = sanitize_filename(doc_name)
                if doc_name in seen_doc_names:
                    seen_doc_names[doc_name] += 1
                    base, ext = os.path.splitext(doc_name)
                    doc_name = f"{base}_{seen_doc_names[doc_name]}{ext}"
                else:
                    seen_doc_names[doc_name] = 1

                doc_path = os.path.join(docs_dir, doc_name)
                with open(doc_path, 'w', encoding='utf-8') as f:
                    f.write(doc.get("content", ""))
            total_docs_extracted += len(docs)
            print(f"  -> '{raw_name}' projesi için {len(docs)} doküman çıkarıldı.")
            
    print(f"Projeler tamamlandı. Toplam {len(projects_dict)} proje, {total_docs_extracted} doküman çıkarıldı.")
    return project_id_to_name

def process_conversations(conversations):
    ensure_dir(CONV_OUT_DIR)
    ensure_dir(GENEL_OUT_DIR)
    
    for pdir in glob.glob(os.path.join(PROJ_OUT_DIR, "*", "Konusmalar")):
        for f in glob.glob(os.path.join(pdir, "*.md")):
            try:
                os.remove(f)
            except Exception:
                pass
    for f in glob.glob(os.path.join(GENEL_OUT_DIR, "*.md")):
        try:
            os.remove(f)
        except Exception:
            pass
            
    total_convs = len(conversations)
    print(f"\nToplam {total_convs} benzersiz sohbet işleniyor ve projelere tasnif ediliyor...")
    
    conversations.sort(key=lambda c: c.get('created_at', ''))
    
    seen_names = {}
    project_conv_counts = {}
    
    for idx, conv in enumerate(conversations, 1):
        raw_name = conv.get("name") or conv.get("summary") or f"sohbet_{idx}"
        conv_name = sanitize_filename(raw_name)
        conv_uuid = conv.get("uuid", "")
        created_at = conv.get("created_at", "")
        updated_at = conv.get("updated_at", "")
        summary = conv.get("summary", "")
        
        proj_cat = classify_conversation(conv)
        project_conv_counts[proj_cat] = project_conv_counts.get(proj_cat, 0) + 1
        
        date_prefix = ""
        if created_at:
            try:
                date_obj = datetime.fromisoformat(created_at.replace("Z", "+00:00"))
                date_prefix = date_obj.strftime("%Y-%m-%d") + " - "
            except Exception:
                pass
                
        base_file_name = f"{date_prefix}{conv_name}"
        if base_file_name in seen_names:
            seen_names[base_file_name] += 1
            file_name = f"{base_file_name}_{seen_names[base_file_name]}.md"
        else:
            seen_names[base_file_name] = 1
            file_name = f"{base_file_name}.md"

        md_content = format_conversation_markdown(conv, raw_name, conv_uuid, created_at, updated_at, summary)

        # 1. Master Konusmalar/
        main_file_path = os.path.join(CONV_OUT_DIR, file_name)
        with open(main_file_path, 'w', encoding='utf-8') as md_file:
            md_file.write(md_content)
            
        # 2. İlgili Proje veya Genel_Sohbetler
        if proj_cat == "Genel_Sohbetler":
            target_conv_dir = GENEL_OUT_DIR
        else:
            proj_dir = os.path.join(PROJ_OUT_DIR, sanitize_filename(proj_cat))
            target_conv_dir = os.path.join(proj_dir, "Konusmalar")
            
        ensure_dir(target_conv_dir)
        proj_file_path = os.path.join(target_conv_dir, file_name)
        with open(proj_file_path, 'w', encoding='utf-8') as md_file:
            md_file.write(md_content)
                    
        if idx % 50 == 0 or idx == total_convs:
            print(f"  [{idx}/{total_convs}] sohbet işlendi ve tasnif edildi...")
            
    print("\n📊 Sohbet Tasnif Dağılımı:")
    for cat, count in sorted(project_conv_counts.items(), key=lambda x: -x[1]):
        print(f"  - {cat}: {count} sohbet")
        
    return total_convs, project_conv_counts

def process_memories(memories_list, project_id_to_name):
    if not memories_list:
        print("Anılar verisi bulunamadı.")
        return
        
    print(f"\nToplam {len(memories_list)} anı/hafıza nesnesi işleniyor...")
    ensure_dir(OUTPUT_DIR)
    ensure_dir(MEM_OUT_DIR)
    
    anilar_path = os.path.join(OUTPUT_DIR, "Anilar.md")
    
    combined_conv_memories = []
    combined_proj_memories = {}
    combined_memory_files = []
    
    for item in memories_list:
        if not isinstance(item, dict):
            continue
        cm = item.get("conversations_memory", "")
        if cm and cm not in combined_conv_memories:
            combined_conv_memories.append(cm)
            
        pm = item.get("project_memories", {})
        if isinstance(pm, dict):
            for pid, pmem in pm.items():
                if pid not in combined_proj_memories or len(pmem) > len(combined_proj_memories[pid]):
                    combined_proj_memories[pid] = pmem
        elif isinstance(pm, str) and pm:
            combined_proj_memories["legacy"] = pm
            
        for mf in item.get("memory_files", []):
            if mf not in combined_memory_files:
                combined_memory_files.append(mf)

    with open(anilar_path, 'w', encoding='utf-8') as out:
        out.write("# Claude Anıları ve Hafızası (Memories)\n\n")
        out.write(f"**Rapor Tarihi:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n")
        
        # 1. Genel Sohbet Hafızası
        out.write("## 🧠 Genel Sohbet Anıları (Conversations Memory)\n\n")
        if combined_conv_memories:
            for c_idx, cm_text in enumerate(combined_conv_memories, 1):
                out.write(cm_text + "\n\n")
            genel_hafiza_path = os.path.join(MEM_OUT_DIR, "Genel_Sohbet_Hafizasi.md")
            with open(genel_hafiza_path, 'w', encoding='utf-8') as gh_f:
                gh_f.write("# 🧠 Claude Genel Sohbet Hafızası (Conversations Memory)\n\n")
                gh_f.write("\n\n---\n\n".join(combined_conv_memories) + "\n")
        else:
            out.write("Genel anı bulunamadı.\n\n")
            
        # 2. Proje Hafızaları
        out.write("---\n\n## 📁 Proje Anıları (Project Memories)\n\n")
        if combined_proj_memories:
            for proj_id, proj_mem in combined_proj_memories.items():
                proj_name = project_id_to_name.get(proj_id, proj_id)
                out.write(f"### 📂 Proje: {proj_name}\n")
                out.write(f"**Proje ID:** `{proj_id}`\n\n")
                out.write(f"{proj_mem}\n\n---\n\n")
                
                p_mem_filename = f"Proje_Hafizasi_{sanitize_filename(proj_name)}.md"
                p_mem_path = os.path.join(MEM_OUT_DIR, p_mem_filename)
                with open(p_mem_path, 'w', encoding='utf-8') as pf_out:
                    pf_out.write(f"# 🧠 Proje Hafızası: {proj_name}\n\n")
                    pf_out.write(f"**Proje ID:** `{proj_id}`\n\n---\n\n")
                    pf_out.write(f"{proj_mem}\n")
                    
                proj_dir = os.path.join(PROJ_OUT_DIR, sanitize_filename(proj_name))
                if os.path.exists(proj_dir):
                    with open(os.path.join(proj_dir, "proje_hafizasi.md"), 'w', encoding='utf-8') as pdir_f:
                        pdir_f.write(f"# 🧠 Proje Hafızası: {proj_name}\n\n")
                        pdir_f.write(f"**Proje ID:** `{proj_id}`\n\n---\n\n")
                        pdir_f.write(f"{proj_mem}\n")
        else:
            out.write("Proje bazlı anı bulunamadı.\n\n")
            
        # 3. Memory Files
        if combined_memory_files:
            out.write("## 📝 Ek Hafıza Dosyaları (Memory Files)\n\n")
            for mf in combined_memory_files:
                m_path = mf.get("path", "")
                m_content = mf.get("content", "")
                m_updated = mf.get("updated_at", "")
                
                out.write(f"### Dosya: `{m_path}` (Güncellenme: {m_updated})\n\n")
                out.write(f"```markdown\n{m_content}\n```\n\n")
                
                rel_path = m_path.lstrip("/\\")
                target_file = os.path.join(MEM_OUT_DIR, sanitize_filename(rel_path.replace("/", "_")))
                with open(target_file, 'w', encoding='utf-8') as mf_out:
                    mf_out.write(m_content)
                    
    print("Anilar.md ve tüm Hafiza_Dosyalari başarıyla oluşturuldu.")

def process_design_chats(design_chats):
    if not design_chats:
        print("Tasarım sohbeti bulunamadı.")
        return
        
    ensure_dir(DESIGN_OUT_DIR)
    print(f"\nToplam {len(design_chats)} tasarım sohbeti (design chat) işleniyor...")
    
    for dc_data in design_chats:
        chat_id = dc_data.get("uuid", "isimsiz_tasarim")
        proj_info = dc_data.get("project", {})
        proj_name = proj_info.get("name", "Tasarim_Sohbeti") if isinstance(proj_info, dict) else "Tasarim_Sohbeti"
        title = dc_data.get("title", "Chat")
        created_at = dc_data.get("created_at", "")
        updated_at = dc_data.get("updated_at", "")
        
        date_prefix = ""
        if created_at:
            try:
                date_obj = datetime.fromisoformat(created_at.replace("Z", "+00:00"))
                date_prefix = date_obj.strftime("%Y-%m-%d") + " - "
            except Exception:
                pass
                
        out_filename = sanitize_filename(f"{date_prefix}{proj_name} - {title}") + ".md"
        out_path = os.path.join(DESIGN_OUT_DIR, out_filename)
        
        with open(out_path, 'w', encoding='utf-8') as out:
            out.write(f"# Tasarım Sohbeti: {proj_name} - {title}\n\n")
            out.write(f"**Sohbet ID:** `{chat_id}`\n\n")
            out.write(f"**Oluşturulma Tarihi:** {created_at}\n\n")
            if updated_at:
                out.write(f"**Güncellenme Tarihi:** {updated_at}\n\n")
            out.write("---\n\n")
            
            for msg in dc_data.get("messages", []):
                role = msg.get("role", "unknown")
                msg_time = msg.get("created_at", "")
                content_obj = msg.get("content", {})
                
                if role == "user":
                    out.write(f"## 👤 Kullanıcı ({msg_time})\n\n")
                    if isinstance(content_obj, dict):
                        user_text = content_obj.get("content", "")
                        out.write(user_text + "\n\n")
                        attachments = content_obj.get("attachments", [])
                        if attachments:
                            out.write("**Ekler & Beceriler:**\n\n")
                            for at in attachments:
                                at_name = at.get("name", "Ek")
                                at_type = at.get("type", "")
                                out.write(f"- 📎 **{at_name}** ({at_type})\n")
                            out.write("\n")
                    elif isinstance(content_obj, str):
                        out.write(content_obj + "\n\n")
                elif role == "assistant":
                    out.write(f"## 🤖 Claude ({msg_time})\n\n")
                    if isinstance(content_obj, dict):
                        blocks = content_obj.get("contentBlocks", [])
                        if blocks:
                            for b in blocks:
                                b_type = b.get("type")
                                if b_type == "text":
                                    out.write(b.get("text", "") + "\n\n")
                                elif b_type == "tool_call":
                                    tc = b.get("toolCall", {})
                                    out.write(f"> ⚙️ **Araç Çağrısı:** `{tc.get('name')}`\n\n")
                        else:
                            out.write(content_obj.get("content", "") + "\n\n")
                    elif isinstance(content_obj, str):
                        out.write(content_obj + "\n\n")
                out.write("---\n\n")
                
    print("Tasarım sohbetleri başarıyla çıkarıldı.")

def generate_index(project_conv_counts):
    index_path = os.path.join(OUTPUT_DIR, "README.md")
    
    conv_count = len(glob.glob(os.path.join(CONV_OUT_DIR, "*.md")))
    genel_conv_count = len(glob.glob(os.path.join(GENEL_OUT_DIR, "*.md"))) if os.path.exists(GENEL_OUT_DIR) else 0
    proj_dirs = [d for d in glob.glob(os.path.join(PROJ_OUT_DIR, "*")) if os.path.isdir(d)]
    
    total_docs = 0
    for pd in proj_dirs:
        docs_dir = os.path.join(pd, "docs")
        if os.path.exists(docs_dir):
            total_docs += len(os.listdir(docs_dir))
            
    design_count = len(glob.glob(os.path.join(DESIGN_OUT_DIR, "*.md"))) if os.path.exists(DESIGN_OUT_DIR) else 0
    mem_count = len(glob.glob(os.path.join(MEM_OUT_DIR, "*.md"))) if os.path.exists(MEM_OUT_DIR) else 0
    sess_count = len(glob.glob(os.path.join(SESSIONS_OUT_DIR, "*", "*.md"))) if os.path.exists(SESSIONS_OUT_DIR) else 0
    
    with open(index_path, 'w', encoding='utf-8') as f:
        f.write("# 📚 Claude Düzenli Arşivi (ClaudeExportTotal Master)\n\n")
        f.write(f"**Arşivleme Tarihi:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n")
        f.write("Bu arşiv, tüm Claude dışa aktarım (export) paketlerinin birleştirilmiş, tekilleştirilmiş, projelere göre tasnif edilmiş, kolay okunabilir ve aranabilir Markdown formatındaki eksiksiz master dökümüdür.\n\n")
        f.write("## 📊 Genel İstatistikler\n\n")
        f.write(f"- 💬 **Toplam Benzersiz Sohbet Sayısı:** {conv_count} (Master liste `Konusmalar/` altında)\n")
        f.write(f"- 🗃️ **Projelere Dağıtılan Sohbetler:** {conv_count - genel_conv_count} adet\n")
        f.write(f"- 🌐 **Genel / Bağımsız Sohbetler:** {genel_conv_count} adet (`Genel_Sohbetler/` altında)\n")
        f.write(f"- 📁 **Toplam Proje Sayısı:** {len(proj_dirs)}\n")
        f.write(f"- 📄 **Toplam Proje Dokümanı:** {total_docs}\n")
        f.write(f"- 🎨 **Toplam Tasarım Sohbeti:** {design_count}\n")
        f.write(f"- 🧠 **Ayrıştırılmış Hafıza Dosyası:** {mem_count} adet (`Hafiza_Dosyalari/` ve `Anilar.md`)\n")
        f.write(f"- 📦 **Oturum Kapanış / Handover Dosyaları:** {sess_count} adet (`Oturum_Kapanis_Dosyalari/` altında)\n")
        f.write(f"- 👤 **Kullanıcı & Güvenlik Raporu:** `Hesap_ve_Giris_Bilgileri.md`\n")
        f.write(f"- 📋 **Dışa Aktarım Manifestosu:** `Export_Manifest.md`\n\n")
        f.write("## 🗂️ Klasör Yapısı ve Oturum Dağılımı\n\n")
        f.write("```text\n")
        f.write("Claude_Duzenli_Arsiv/\n")
        f.write("├── README.md                   # Arşiv indeksi ve genel bakış\n")
        f.write("├── Anilar.md                   # Claude genel ve proje bazlı hafıza/anı dökümü (Master Rapor)\n")
        f.write("├── Hesap_ve_Giris_Bilgileri.md # Kullanıcı profili ve giriş geçmişi audit kaydı\n")
        f.write("├── Export_Manifest.md          # Claude dışa aktarım parti ve manifest kayıtları\n")
        f.write("├── Hafiza_Dosyalari/           # Genel ve her projeye ait ayrı ayrı hafıza dosyaları\n")
        f.write("├── Genel_Sohbetler/            # Projeler dışındaki bağımsız genel sohbetler\n")
        f.write("├── Konusmalar/                 # Tüm 226 sohbetin kronolojik master arşivi\n")
        f.write("├── Projeler/                   # Proje bazlı klasörler (docs, Konusmalar, hafıza, info)\n")
        f.write("│   ├── EAIP-1/                 # 📂 Sessions 24 - 39\n")
        f.write("│   ├── cwf_yaprak_2/           # 📂 Sessions 40 - 74\n")
        f.write("│   ├── cwf_yaprak3/            # 📂 Sessions 75 - 101\n")
        f.write("│   ├── cwf_yaprak_5/           # 📂 Sessions 102 - 111+\n")
        f.write("│   ├── Kale Strategy/          # 📂 Stratejik Görüşmeler\n")
        f.write("│   ├── Agentic SW Team/        # 📂 Erken Sessions (S1-S7) & AntiGravity\n")
        f.write("│   ├── cwf_prod/               # 📂 CWF & ArMES Üretim Arşivi\n")
        f.write("│   ├── TECHNOLOGYMAP/          # 📂 Teknoloji Haritası & Scrollytelling\n")
        f.write("│   └── How to use Claude/      # 📂 Claude Kullanım Rehberleri\n")
        f.write("├── Oturum_Kapanis_Dosyalari/   # Session 90 & 92 Handover ve Sistem Dokümanları\n")
        f.write("└── Tasarim_Sohbetleri/         # Claude Design (Artifacts/Canvas) sohbetleri\n")
        f.write("```\n\n")
        f.write("## 📂 Projeler ve İçerikleri\n\n")
        for pd in sorted(proj_dirs):
            pname = os.path.basename(pd)
            doc_cnt = 0
            docs_dir = os.path.join(pd, "docs")
            if os.path.exists(docs_dir):
                doc_cnt = len(os.listdir(docs_dir))
            conv_cnt = 0
            pconv_dir = os.path.join(pd, "Konusmalar")
            if os.path.exists(pconv_dir):
                conv_cnt = len(os.listdir(pconv_dir))
            f.write(f"- **[{pname}](file://{pd}/proje_bilgisi.md)** — 💬 **{conv_cnt} Sohbet** | 📄 **{doc_cnt} Doküman**\n")
            
    print(f"\nArşiv README.md indeksi oluşturuldu: {index_path}")

if __name__ == "__main__":
    print("==========================================================")
    print("=== Claude Export Total Master Arşivleme Başlatılıyor ===")
    print("==========================================================")
    ensure_dir(OUTPUT_DIR)
    
    projects_dict = collect_all_projects()
    project_map = process_projects(projects_dict)
    
    conversations_list = collect_all_conversations()
    total_convs, proj_conv_counts = process_conversations(conversations_list)
    
    memories_list = collect_all_memories()
    process_memories(memories_list, project_map)
    
    design_chats = collect_all_design_chats()
    process_design_chats(design_chats)
    
    process_session_zips()
    
    process_account_metadata()
    
    generate_index(proj_conv_counts)
    
    print("\n==========================================================")
    print("=== ✅ Tüm Veriler ve Sohbetler Başarıyla Tasnif Edildi! ===")
    print(f"=== Hedef Dizin: {OUTPUT_DIR}")
    print("==========================================================")
