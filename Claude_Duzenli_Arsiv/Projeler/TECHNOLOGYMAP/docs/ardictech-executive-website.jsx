import React, { useState, useEffect } from 'react';
import { 
  Cpu, Layers, Brain, MessageSquare, Activity, Clock, TrendingUp, 
  ChevronRight, Globe, Shield, Zap, BarChart3, Factory, Cloud,
  CheckCircle2, ArrowRight, Menu, X, Play, Award, Target,
  Users, Sparkles, LineChart, Server, Database, Network
} from 'lucide-react';

const ArdicTechWebsite = () => {
  const [language, setLanguage] = useState('en');
  const [activeLayer, setActiveLayer] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLoss, setHoveredLoss] = useState(null);

  const content = {
    en: {
      nav: {
        home: "Home",
        platform: "Platform",
        useCases: "Use Cases",
        roi: "ROI Calculator",
        workshop: "Free Workshop"
      },
      hero: {
        headline: "Respect Your Legacy. Reinvent Your Factory.",
        subheadline: "Give a voice to your factory floor with an AI-native ecosystem that connects, orchestrates, and optimizes every second of your operation.",
        cta: "Sign Up for Executive Workshop - Free",
        watchDemo: "Watch Demo"
      },
      hiddenDrain: {
        title: "The Hidden Drain:",
        subtitle: "The Annual Cost of Internal Inefficiency",
        description: "Breakdown for a typical $500M revenue manufacturer",
        total: "Annual Addressable Loss",
        roi: "TYPICAL ROI",
        oee: "OEE UPLIFT",
        downtime: "DOWNTIME CUT",
        energy: "ENERGY COST SAVING",
        losses: [
          {
            title: "Dark Data Loss",
            stat: "$8M - $12M",
            desc: "60-80% of machine data is never analyzed or captured",
            explanation: "Your machines speak, but nobody listens. Industrial sensors generate millions of data points daily, yet most manufacturers capture less than 20% of this intelligence. The rest? Lost forever to 'dark data' oblivion."
          },
          {
            title: "Reactive Maintenance",
            stat: "$15M - $25M",
            desc: "Cost of fixing failures vs. preventing them proactively",
            explanation: "Traditional 'Fix-on-Failure' approach costs 3-5x more than AI-driven prescriptive maintenance. You're not just paying for partsâ€”you're paying for emergency crews, overnight shipping, production halts, and missed delivery penalties."
          },
          {
            title: "Quality Escapes",
            stat: "$10M - $18M",
            desc: "Defects detected too late, not at the source",
            explanation: "Catching defects at the end-of-line is expensive. Catching them at customer site is catastrophic. Real-time AI vision and statistical process control catches anomalies at the moment of creationâ€”not weeks later."
          },
          {
            title: "Decision Latency",
            stat: "$15M - $27M",
            desc: "Historical reports vs. Real-time intelligence",
            explanation: "Traditional MES generates reports about yesterday's problems. By the time floor managers see the data, thousands of defective units have already been produced. Real-time intelligence prevents problems before they cascade."
          }
        ],
        footer: {
          roi: "14-22 Month",
          payback: "ROI Payback Cycle"
        }
      },
      enso: {
        title: "Operational EnsÅ",
        subtitle: "A Circle of Continuous Becoming",
        definition: "EnsÅ is a hand-drawn circle in Japanese Zen artâ€”a simple shape with a deep message: presence, clarity, and the idea that everything is connectedâ€”complete and incomplete at the same time.",
        philosophy: "Philosophy",
        desc: "Transformation is not a project; it is a living circle of intelligence. We call this state Operational EnsÅ.",
        pathTitle: "Your Path to EnsÅ",
        pathSubtitle: "ARDICTECH's 4-Layer Journey",
        points: [
          { label: "Alive", value: "Real-time evolution vs. static reports" },
          { label: "Evolving", value: "AI that learns from every machine cycle" },
          { label: "In Motion", value: "Prescriptive actions that shape the future" }
        ]
      },
      ecosystem: {
        title: "The ARDICTECH Ecosystem",
        subtitle: "4-Layer Unified Intelligence Platform",
        description: "An agent-native architecture that transforms manufacturing complexity into elegant simplicity",
        layers: [
          {
            id: "01",
            title: "IoT-Ignite",
            role: "The Nervous System",
            desc: "Capturing every signal from the edge",
            detailed: "A protocol-agnostic edge platform performing local filtering and protocol translation (MQTT, OPC-UA, Modbus) via open APIs. Ensures 24/7 continuity even if cloud connectivity is lost.",
            technical: {
              title: "Technical Specifications",
              specs: [
                "Protocol Support: MQTT, OPC-UA, Modbus, REST APIs",
                "Edge Computing: Local processing with <50ms latency",
                "Throughput: 3,000+ events/second per gateway",
                "Security: AES-256 encryption, certificate-based auth",
                "Reliability: 99.9% uptime, automatic failover",
                "Deployment: On-premise edge gateways + cloud management"
              ]
            },
            icon: Cpu
          },
          {
            id: "02",
            title: "ArMES / MOM",
            role: "The Brain",
            desc: "Orchestrating digital workflows",
            detailed: "An Open Architecture MOM that integrates with ERP/WMS via API hooks. Acts as the single source of truth for production orders and OEE tracking.",
            technical: {
              title: "Technical Specifications",
              specs: [
                "Architecture: Microservices-based, containerized deployment",
                "Integration: REST/GraphQL APIs for ERP, WMS, SCADA",
                "Real-time OEE: Availability â€¢ Performance â€¢ Quality tracking",
                "Recipe Management: Version control, laboratory checkpoints",
                "Traceability: Complete genealogy from raw materials to shipment",
                "Database: MariaDB (transactional) + MongoDB (semi-structured)"
              ]
            },
            icon: Layers
          },
          {
            id: "03",
            title: "ArAI",
            role: "The Intuition",
            desc: "Prescribing optimized actions",
            detailed: "Prescriptive ML engine built on Kappa Architecture with a 7-layer Lakehouse. Transforms patterns into actionable intelligence.",
            technical: {
              title: "Technical Architecture",
              specs: [
                "Architecture: Kappa (streaming-first) with Apache Iceberg",
                "Storage: ClickHouse (hot) + MinIO + Iceberg (cold)",
                "Processing: Apache Flink (real-time) + dbt (batch)",
                "ML Platform: Feast, MLflow, Ray, BentoML",
                "Performance: Sub-100ms query latency, 3000 events/sec",
                "AI Models: Predictive maintenance, quality forecasting, energy optimization"
              ]
            },
            icon: Brain
          },
          {
            id: "04",
            title: "CWF",
            role: "The Voice",
            desc: "Conversational intelligence for your factory",
            detailed: "Democratizes factory data through natural language. CWF connects to the entire stack, allowing anyone to query plant status and receive prescriptive answers in under 5 seconds.",
            technical: {
              title: "Technical Specifications",
              specs: [
                "Framework: LangGraph + LangChain for agentic orchestration",
                "Protocol: Model Context Protocol (MCP) for secure LLM-data bridge",
                "Channels: Web, Mobile, WhatsApp integration",
                "Latency: <5 second response time for complex queries",
                "Security: JWT/OAuth 2.0, role-based access control",
                "RAG: Vector search in ClickHouse for context retrieval"
              ]
            },
            icon: MessageSquare
          }
        ]
      },
      sovereign: {
        title: "The Sovereign AI Advantage",
        subtitle: "Data sovereignty meets industrial-grade reliability",
        features: [
          {
            title: "ArCloud Sovereignty",
            desc: "Local cloud hosting ensures KVKK (Data Law) compliance without the latency of global providers. Your data stays in your geography.",
            icon: Shield
          },
          {
            title: "Integration, Not Replacement",
            desc: "We don't replace your MES; we connect it. Our 'Intelligence Wrapper' strategy ingests 'Dark Data' via read-only APIs without disrupting operations.",
            icon: Network
          },
          {
            title: "Edge Intelligence",
            desc: "IgniteEdge processes critical data on-premise for absolute security and sub-50ms latency. Sensitive data never leaves your walls unless authorized.",
            icon: Server
          }
        ]
      },
      useCases: {
        title: "Customer Success Stories",
        subtitle: "Proven results in real manufacturing environments",
        cases: [
          {
            title: "Raw Materials Factory",
            industry: "Chemical Manufacturing",
            objectives: [
              "Recipe forecasting by raw material supplier",
              "Achieve target quality with no extra dosing effort",
              "Predict quality prior to spraying activity"
            ],
            solution: "Recipe Management & Optimization, Grinding & Milling Optimization, Spray Drying Optimization",
            results: [
              { metric: "95%+", label: "Recipe Accuracy" },
              { metric: "10-15%", label: "Raw Material Cost Optimization" },
              { metric: "Est. $500K", label: "Annual Savings" }
            ]
          },
          {
            title: "Ceramic Tile Production",
            industry: "Building Materials",
            objectives: [
              "Kiln runs 7/24 with high energy consumption",
              "Kiln loaders unpredictable, causing unexpected stops",
              "Operators manually adjust feed rates based on intuition"
            ],
            solution: "IoT-Ignite monitors mold usage data. ArMES/MOM tracks defects in real-time. ArAI pattern-matches defects to underperforming molds.",
            results: [
              { metric: "10%", label: "Defect Detection Improvement" },
              { metric: "8-14%", label: "Energy Consumption Decrease" },
              { metric: "10%", label: "Loading Time Reduction" }
            ]
          }
        ],
        partners: {
          title: "Trusted by Industry Leaders",
          logos: ["Diebold Nixdorf", "CarrefourSA", "Beko", "Samsung", "Google Cloud", "AWS", "Intel"]
        }
      },
      pathToEnso: {
        title: "Your Path to EnsÅ",
        subtitle: "A proven 4-step journey to operational excellence",
        steps: [
          {
            number: "01",
            title: "Executive Workshop",
            duration: "2 Hours",
            price: "Free",
            desc: "A no-obligation 'Go/No-Go' decision session. We analyze your current state, identify quick wins, and design your transformation roadmap.",
            deliverables: [
              "Current state assessment",
              "Quick win identification ($500K+ opportunities)",
              "Custom transformation roadmap",
              "Go/No-Go recommendation"
            ]
          },
          {
            number: "02",
            title: "Proof of Value",
            duration: "8-12 Weeks",
            price: "$90K Investment",
            desc: "We guarantee to identify a $500K+ opportunity or provide a 50% refund. Deploy on a single high-impact production line.",
            deliverables: [
              "Single line deployment",
              "Real-time OEE tracking",
              "1-3 AI models in production",
              "Documented ROI proof"
            ]
          },
          {
            number: "03",
            title: "Production Pilot",
            duration: "12-16 Weeks",
            price: "Custom Quote",
            desc: "Scale to 3-5 production lines. Integrate with ERP/WMS. Deploy full 4-layer platform with 24/7 support.",
            deliverables: [
              "Multi-line deployment",
              "ERP/WMS integration",
              "Full platform activation",
              "Staff training program"
            ]
          },
          {
            number: "04",
            title: "Enterprise Scale",
            duration: "Ongoing",
            price: "Volume Pricing",
            desc: "Factory-wide deployment. Multi-site orchestration. Autonomous agentic workflows. Continuous optimization.",
            deliverables: [
              "Factory-wide coverage",
              "Multi-site orchestration",
              "Autonomous agents",
              "Continuous innovation"
            ]
          }
        ]
      },
      faq: {
        title: "Frequently Asked Questions",
        subtitle: "The trust layer - answers to your critical concerns",
        questions: [
          {
            q: "Is my data secure?",
            a: "Yes. IgniteEdge processes critical data on-premise at the edge. Sensitive operational data stays within your walls unless you explicitly authorize cloud sync. We use AES-256 encryption, certificate-based authentication, and role-based access control. Our architecture complies with KVKK (Turkish Data Protection Law) and GDPR."
          },
          {
            q: "Will it disrupt my current production?",
            a: "No. Our non-intrusive 'Overlay Strategy' connects to read-only data ports without stopping machines. We don't replace your existing systemsâ€”we enhance them. Installation happens during scheduled maintenance windows, and the system operates in parallel observation mode before taking any automated actions."
          },
          {
            q: "Why use 'Chat' instead of dashboards?",
            a: "CWF is the search engine for your factory. Floor managers don't need a PhD in data scienceâ€”they just ask, 'Why is Line 3 slowing down?' Traditional dashboards require training, navigation, and interpretation. CWF gives instant, contextual answers in natural language. Dashboards show data; CWF provides intelligence."
          },
          {
            q: "Do you replace our existing MES?",
            a: "No. We connect, not replace. ARDICTECH's 'Intelligence Wrapper' strategy ingests data from your existing systems via read-only APIs. We work alongside SAP, Siemens, Rockwell, and other legacy systemsâ€”enhancing them with AI intelligence without requiring a costly rip-and-replace."
          },
          {
            q: "What's your typical ROI timeline?",
            a: "14-22 months for full ROI, but customers see value immediately. Week 1: Real-time visibility. Month 1: First optimization recommendations. Month 3: Measurable downtime reduction. Month 6: Energy savings and quality improvements. Month 12: Full platform ROI trajectory clear."
          },
          {
            q: "How does ArAI differ from generic AI platforms?",
            a: "ArAI is purpose-built for manufacturing. Generic platforms (AWS SageMaker, Azure ML) are general-purpose tools that require months of custom development. ArAI comes pre-configured with manufacturing-specific models: OEE optimization, predictive maintenance, quality forecasting, energy management. We speak your languageâ€”not generic cloud-speak."
          }
        ]
      },
      footer: {
        tagline: "Innovate. Automate. Elevate.",
        subtitle: "Let's transform your factory together.",
        contact: {
          title: "Contact Us",
          email: "info@ardictech.com",
          website: "www.ardictech.com",
          address: "Istanbul, Turkey"
        },
        quickLinks: {
          title: "Quick Links",
          links: ["Platform", "Use Cases", "Resources", "About Us"]
        },
        legal: {
          title: "Legal",
          links: ["Privacy Policy", "Terms of Service", "Data Protection"]
        },
        copyright: "Â© 2025 ARDICTECH. All rights reserved."
      }
    },
    tr: {
      nav: {
        home: "Ana Sayfa",
        platform: "Platform",
        useCases: "KullanÄ±m Ã–rnekleri",
        roi: "ROI HesaplayÄ±cÄ±",
        workshop: "Ãœcretsiz AtÃ¶lye"
      },
      hero: {
        headline: "MirasÄ±nÄ±za SaygÄ± GÃ¶sterin. FabrikanÄ±zÄ± Yeniden Ä°cat Edin.",
        subheadline: "Fabrika zeminize, operasyonunuzun her saniyesini baÄŸlayan, dÃ¼zenleyen ve optimize eden yapay zeka tabanlÄ± bir ekosistemle ses verin.",
        cta: "Ãœcretsiz YÃ¶netici AtÃ¶lyesine KatÄ±lÄ±n",
        watchDemo: "Demo Ä°zle"
      },
      hiddenDrain: {
        title: "Gizli KayÄ±p:",
        subtitle: "Ä°Ã§ VerimsizliÄŸin YÄ±llÄ±k Maliyeti",
        description: "Tipik $500M gelirli Ã¼retici iÃ§in daÄŸÄ±lÄ±m",
        total: "YÄ±llÄ±k Toplam KayÄ±p",
        roi: "TÄ°PÄ°K ROI",
        oee: "OEE ARTIÅž",
        downtime: "DURUÅž SÃœRESÄ° AZALMA",
        energy: "ENERJÄ° MALÄ°YET TASARRUFU",
        losses: [
          {
            title: "KaranlÄ±k Veri KaybÄ±",
            stat: "$8M - $12M",
            desc: "Makine verisinin %60-80'i hiÃ§ analiz edilmiyor veya kaydedilmiyor",
            explanation: "Makineleriniz konuÅŸuyor, ama kimse dinlemiyor. EndÃ¼striyel sensÃ¶rler gÃ¼nlÃ¼k milyonlarca veri noktasÄ± Ã¼retiyor, ancak Ã§oÄŸu Ã¼retici bu zekanÄ±n %20'sinden azÄ±nÄ± yakalÄ±yor. Geri kalanÄ±? 'KaranlÄ±k veri' unutulur."
          },
          {
            title: "Reaktif BakÄ±m",
            stat: "$15M - $25M",
            desc: "ArÄ±zalarÄ± dÃ¼zeltme maliyeti vs. proaktif Ã¶nleme",
            explanation: "Geleneksel 'Bozulunca Tamir Et' yaklaÅŸÄ±mÄ±, yapay zeka destekli Ã¶ngÃ¶rÃ¼cÃ¼ bakÄ±mdan 3-5 kat daha pahalÄ±dÄ±r. Sadece parÃ§a iÃ§in deÄŸil, acil mÃ¼dahale ekipleri, gece kargo, Ã¼retim duruÅŸlarÄ± ve kaÃ§Ä±rÄ±lan teslimat cezalarÄ± iÃ§in de Ã¶deme yapÄ±yorsunuz."
          },
          {
            title: "Kalite KaÃ§aklarÄ±",
            stat: "$10M - $18M",
            desc: "HatalarÄ±n Ã§ok geÃ§ tespit edilmesi, kaynakta deÄŸil",
            explanation: "HatalarÄ± hat sonunda yakalamak pahalÄ±dÄ±r. MÃ¼ÅŸteri tesisinde yakalamak felakettir. GerÃ§ek zamanlÄ± yapay zeka gÃ¶rÃ¼ÅŸ ve istatistiksel sÃ¼reÃ§ kontrolÃ¼, anormallikleri oluÅŸma anÄ±nda yakalarâ€”haftalar sonra deÄŸil."
          },
          {
            title: "Karar Gecikmesi",
            stat: "$15M - $27M",
            desc: "Tarihsel raporlar vs. GerÃ§ek zamanlÄ± zeka",
            explanation: "Geleneksel MES, dÃ¼nÃ¼n sorunlarÄ± hakkÄ±nda raporlar oluÅŸturur. Kat yÃ¶neticileri verileri gÃ¶rene kadar binlerce hatalÄ± Ã¼nite zaten Ã¼retilmiÅŸ olur. GerÃ§ek zamanlÄ± zeka, sorunlarÄ± basamaklanmadan Ã¶nler."
          }
        ],
        footer: {
          roi: "14-22 Ay",
          payback: "ROI Geri Ã–deme DÃ¶ngÃ¼sÃ¼"
        }
      },
      enso: {
        title: "Operasyonel EnsÅ",
        subtitle: "SÃ¼rekli OluÅŸum Ã‡emberi",
        definition: "EnsÅ, Japon Zen sanatÄ±nda elle Ã§izilmiÅŸ bir Ã§emberdirâ€”derin bir mesajla basit bir ÅŸekil: varlÄ±k, netlik ve her ÅŸeyin baÄŸlÄ± olduÄŸu fikriâ€”aynÄ± anda hem tam hem de eksik.",
        philosophy: "Felsefe",
        desc: "DÃ¶nÃ¼ÅŸÃ¼m bir proje deÄŸildir; yaÅŸayan bir zeka Ã§emberidir. Biz bu duruma Operasyonel EnsÅ diyoruz.",
        pathTitle: "EnsÅ'ya Giden Yolunuz",
        pathSubtitle: "ARDICTECH'in 4 KatmanlÄ± YolculuÄŸu",
        points: [
          { label: "CanlÄ±", value: "Statik raporlara karÅŸÄ± gerÃ§ek zamanlÄ± evrim" },
          { label: "GeliÅŸen", value: "Her makine dÃ¶ngÃ¼sÃ¼nden Ã¶ÄŸrenen yapay zeka" },
          { label: "Harekette", value: "GeleceÄŸi ÅŸekillendiren Ã¶ngÃ¶rÃ¼cÃ¼ eylemler" }
        ]
      },
      ecosystem: {
        title: "ARDICTECH Ekosistemi",
        subtitle: "4 KatmanlÄ± BirleÅŸik Zeka Platformu",
        description: "Ãœretim karmaÅŸÄ±klÄ±ÄŸÄ±nÄ± zarif basitliÄŸe dÃ¶nÃ¼ÅŸtÃ¼ren ajan-yerel mimari",
        layers: [
          {
            id: "01",
            title: "IoT-Ignite",
            role: "Sinir Sistemi",
            desc: "Kenardan her sinyali yakalamak",
            detailed: "AÃ§Ä±k API'ler aracÄ±lÄ±ÄŸÄ±yla yerel filtreleme ve protokol Ã§evirisi (MQTT, OPC-UA, Modbus) yapan protokol-agnostik bir kenar platformu. Bulut baÄŸlantÄ±sÄ± kaybolsa bile 7/24 sÃ¼rekliliÄŸi saÄŸlar.",
            technical: {
              title: "Teknik Ã–zellikler",
              specs: [
                "Protokol DesteÄŸi: MQTT, OPC-UA, Modbus, REST API'leri",
                "Kenar BiliÅŸim: <50ms gecikme ile yerel iÅŸleme",
                "Ä°ÅŸlem Hacmi: AÄŸ geÃ§idi baÅŸÄ±na 3,000+ olay/saniye",
                "GÃ¼venlik: AES-256 ÅŸifreleme, sertifika tabanlÄ± kimlik doÄŸrulama",
                "GÃ¼venilirlik: %99.9 Ã§alÄ±ÅŸma sÃ¼resi, otomatik yÃ¼k devretme",
                "DaÄŸÄ±tÄ±m: Yerinde kenar aÄŸ geÃ§itleri + bulut yÃ¶netimi"
              ]
            },
            icon: Cpu
          },
          {
            id: "02",
            title: "ArMES / MOM",
            role: "Beyin",
            desc: "Dijital iÅŸ akÄ±ÅŸlarÄ±nÄ± dÃ¼zenlemek",
            detailed: "ERP/WMS ile API kancalarÄ± aracÄ±lÄ±ÄŸÄ±yla entegre olan AÃ§Ä±k Mimari MOM. Ãœretim emirleri ve OEE takibi iÃ§in tek doÄŸruluk kaynaÄŸÄ± olarak hareket eder.",
            technical: {
              title: "Teknik Ã–zellikler",
              specs: [
                "Mimari: Mikro hizmet tabanlÄ±, konteynerli daÄŸÄ±tÄ±m",
                "Entegrasyon: ERP, WMS, SCADA iÃ§in REST/GraphQL API'leri",
                "GerÃ§ek zamanlÄ± OEE: KullanÄ±labilirlik â€¢ Performans â€¢ Kalite takibi",
                "ReÃ§ete YÃ¶netimi: SÃ¼rÃ¼m kontrolÃ¼, laboratuvar kontrol noktalarÄ±",
                "Ä°zlenebilirlik: Hammaddeden sevkiyata tam soy aÄŸacÄ±",
                "VeritabanÄ±: MariaDB (iÅŸlemsel) + MongoDB (yarÄ± yapÄ±landÄ±rÄ±lmÄ±ÅŸ)"
              ]
            },
            icon: Layers
          },
          {
            id: "03",
            title: "ArAI",
            role: "Sezgi",
            desc: "Optimize edilmiÅŸ eylemleri Ã¶ngÃ¶rmek",
            detailed: "7 katmanlÄ± Lakehouse ile Kappa Mimarisi Ã¼zerine inÅŸa edilmiÅŸ Ã¶ngÃ¶rÃ¼cÃ¼ ML motoru. KalÄ±plarÄ± eyleme dÃ¶nÃ¼ÅŸtÃ¼rÃ¼r.",
            technical: {
              title: "Teknik Mimari",
              specs: [
                "Mimari: Apache Iceberg ile Kappa (akÄ±ÅŸ-Ã¶ncelikli)",
                "Depolama: ClickHouse (sÄ±cak) + MinIO + Iceberg (soÄŸuk)",
                "Ä°ÅŸleme: Apache Flink (gerÃ§ek zamanlÄ±) + dbt (toplu)",
                "ML Platformu: Feast, MLflow, Ray, BentoML",
                "Performans: 100ms altÄ± sorgu gecikmesi, 3000 olay/sn",
                "Yapay Zeka Modelleri: Ã–ngÃ¶rÃ¼cÃ¼ bakÄ±m, kalite tahmini, enerji optimizasyonu"
              ]
            },
            icon: Brain
          },
          {
            id: "04",
            title: "CWF",
            role: "Ses",
            desc: "FabrikanÄ±z iÃ§in konuÅŸma zekasÄ±",
            detailed: "DoÄŸal dil aracÄ±lÄ±ÄŸÄ±yla fabrika verilerini demokratikleÅŸtirir. CWF tÃ¼m yÄ±ÄŸÄ±na baÄŸlanÄ±r ve herkesin 5 saniyenin altÄ±nda fabrika durumunu sorgulamasÄ±na ve Ã¶ngÃ¶rÃ¼cÃ¼ yanÄ±tlar almasÄ±na olanak tanÄ±r.",
            technical: {
              title: "Teknik Ã–zellikler",
              specs: [
                "Ã‡erÃ§eve: Ajan orkestrasyonu iÃ§in LangGraph + LangChain",
                "Protokol: GÃ¼venli LLM-veri kÃ¶prÃ¼sÃ¼ iÃ§in Model BaÄŸlam ProtokolÃ¼ (MCP)",
                "Kanallar: Web, Mobil, WhatsApp entegrasyonu",
                "Gecikme: KarmaÅŸÄ±k sorgular iÃ§in <5 saniye yanÄ±t sÃ¼resi",
                "GÃ¼venlik: JWT/OAuth 2.0, rol tabanlÄ± eriÅŸim kontrolÃ¼",
                "RAG: BaÄŸlam alÄ±mÄ± iÃ§in ClickHouse'ta vektÃ¶r aramasÄ±"
              ]
            },
            icon: MessageSquare
          }
        ]
      },
      sovereign: {
        title: "Egemen Yapay Zeka AvantajÄ±",
        subtitle: "Veri egemenliÄŸi endÃ¼striyel sÄ±nÄ±f gÃ¼venilirlikle buluÅŸuyor",
        features: [
          {
            title: "ArCloud EgemenliÄŸi",
            desc: "Yerel bulut barÄ±ndÄ±rma, kÃ¼resel saÄŸlayÄ±cÄ±larÄ±n gecikmesi olmadan KVKK (Veri YasasÄ±) uyumluluÄŸunu saÄŸlar. Verileriniz coÄŸrafyanÄ±zda kalÄ±r.",
            icon: Shield
          },
          {
            title: "DeÄŸiÅŸtirme DeÄŸil Entegrasyon",
            desc: "MES'inizi deÄŸiÅŸtirmiyoruz; baÄŸlÄ±yoruz. 'Zeka SarmalayÄ±cÄ±' stratejimiz, operasyonlarÄ± bozmadan salt okunur API'ler aracÄ±lÄ±ÄŸÄ±yla 'KaranlÄ±k Veri'yi alÄ±r.",
            icon: Network
          },
          {
            title: "Kenar ZekasÄ±",
            desc: "IgniteEdge, mutlak gÃ¼venlik ve 50ms altÄ± gecikme iÃ§in kritik verileri yerinde iÅŸler. Hassas veriler, yetkilendirmedikÃ§e duvarlarÄ±nÄ±zÄ± asla terk etmez.",
            icon: Server
          }
        ]
      },
      useCases: {
        title: "MÃ¼ÅŸteri BaÅŸarÄ± Hikayeleri",
        subtitle: "GerÃ§ek Ã¼retim ortamlarÄ±nda kanÄ±tlanmÄ±ÅŸ sonuÃ§lar",
        cases: [
          {
            title: "Hammadde FabrikasÄ±",
            industry: "Kimyasal Ãœretim",
            objectives: [
              "Hammadde tedarikÃ§isine gÃ¶re reÃ§ete tahmini",
              "Ekstra dozaj Ã§abasÄ± olmadan hedef kaliteyi baÅŸarmak",
              "PÃ¼skÃ¼rtme faaliyeti Ã¶ncesinde kaliteyi Ã¶ngÃ¶rmek"
            ],
            solution: "ReÃ§ete YÃ¶netimi ve Optimizasyonu, Ã–ÄŸÃ¼tme ve DeÄŸirmen Optimizasyonu, PÃ¼skÃ¼rtme Kurutma Optimizasyonu",
            results: [
              { metric: "%95+", label: "ReÃ§ete DoÄŸruluÄŸu" },
              { metric: "%10-15", label: "Hammadde Maliyet Optimizasyonu" },
              { metric: "Tahmini $500K", label: "YÄ±llÄ±k Tasarruf" }
            ]
          },
          {
            title: "Seramik Karo Ãœretimi",
            industry: "YapÄ± Malzemeleri",
            objectives: [
              "FÄ±rÄ±n yÃ¼ksek enerji tÃ¼ketimi ile 7/24 Ã§alÄ±ÅŸÄ±yor",
              "FÄ±rÄ±n yÃ¼kleyicileri Ã¶ngÃ¶rÃ¼lemez, beklenmedik duruÅŸlara neden oluyor",
              "OperatÃ¶rler besleme oranlarÄ±nÄ± sezgiye gÃ¶re manuel olarak ayarlÄ±yor"
            ],
            solution: "IoT-Ignite kalÄ±p kullanÄ±m verilerini izler. ArMES/MOM gerÃ§ek zamanlÄ± olarak kusurlarÄ± takip eder. ArAI kusurlarÄ± dÃ¼ÅŸÃ¼k performanslÄ± kalÄ±plarla eÅŸleÅŸtirir.",
            results: [
              { metric: "%10", label: "Kusur AlgÄ±lama Ä°yileÅŸtirmesi" },
              { metric: "%8-14", label: "Enerji TÃ¼ketimi AzalmasÄ±" },
              { metric: "%10", label: "YÃ¼kleme SÃ¼resi AzalmasÄ±" }
            ]
          }
        ],
        partners: {
          title: "SektÃ¶r Liderlerinin GÃ¼veni",
          logos: ["Diebold Nixdorf", "CarrefourSA", "Beko", "Samsung", "Google Cloud", "AWS", "Intel"]
        }
      },
      pathToEnso: {
        title: "EnsÅ'ya Giden Yolunuz",
        subtitle: "Operasyonel mÃ¼kemmelliÄŸe kanÄ±tlanmÄ±ÅŸ 4 adÄ±mlÄ± yolculuk",
        steps: [
          {
            number: "01",
            title: "YÃ¶netici AtÃ¶lyesi",
            duration: "2 Saat",
            price: "Ãœcretsiz",
            desc: "YÃ¼kÃ¼mlÃ¼lÃ¼ksÃ¼z bir 'Git/Gitme' karar oturumu. Mevcut durumunuzu analiz ediyoruz, hÄ±zlÄ± kazanÃ§larÄ± belirliyoruz ve dÃ¶nÃ¼ÅŸÃ¼m yol haritanÄ±zÄ± tasarlÄ±yoruz.",
            deliverables: [
              "Mevcut durum deÄŸerlendirmesi",
              "HÄ±zlÄ± kazanÃ§ belirleme ($500K+ fÄ±rsatlar)",
              "Ã–zel dÃ¶nÃ¼ÅŸÃ¼m yol haritasÄ±",
              "Git/Gitme tavsiyesi"
            ]
          },
          {
            number: "02",
            title: "DeÄŸer KanÄ±tÄ±",
            duration: "8-12 Hafta",
            price: "$90K YatÄ±rÄ±m",
            desc: "$500K+ fÄ±rsatÄ± belirlemek veya %50 geri Ã¶deme saÄŸlamak garantisini veriyoruz. Tek bir yÃ¼ksek etkili Ã¼retim hattÄ±na daÄŸÄ±tÄ±m yapÄ±n.",
            deliverables: [
              "Tek hat daÄŸÄ±tÄ±mÄ±",
              "GerÃ§ek zamanlÄ± OEE takibi",
              "Ãœretimde 1-3 yapay zeka modeli",
              "BelgelenmiÅŸ ROI kanÄ±tÄ±"
            ]
          },
          {
            number: "03",
            title: "Ãœretim Pilotu",
            duration: "12-16 Hafta",
            price: "Ã–zel Teklif",
            desc: "3-5 Ã¼retim hattÄ±na Ã¶lÃ§eklendirin. ERP/WMS ile entegre edin. 7/24 destekle tam 4 katmanlÄ± platformu daÄŸÄ±tÄ±n.",
            deliverables: [
              "Ã‡ok hatlÄ± daÄŸÄ±tÄ±m",
              "ERP/WMS entegrasyonu",
              "Tam platform aktivasyonu",
              "Personel eÄŸitim programÄ±"
            ]
          },
          {
            number: "04",
            title: "Kurumsal Ã–lÃ§ek",
            duration: "Devam Eden",
            price: "Hacim FiyatlandÄ±rmasÄ±",
            desc: "Fabrika Ã§apÄ±nda daÄŸÄ±tÄ±m. Ã‡ok tesisli orkestrasyon. Otonom ajan iÅŸ akÄ±ÅŸlarÄ±. SÃ¼rekli optimizasyon.",
            deliverables: [
              "Fabrika Ã§apÄ±nda kapsama",
              "Ã‡ok tesisli orkestrasyon",
              "Otonom ajanlar",
              "SÃ¼rekli yenilik"
            ]
          }
        ]
      },
      faq: {
        title: "SÄ±kÃ§a Sorulan Sorular",
        subtitle: "GÃ¼ven katmanÄ± - kritik endiÅŸelerinizin yanÄ±tlarÄ±",
        questions: [
          {
            q: "Verilerim gÃ¼vende mi?",
            a: "Evet. IgniteEdge, kritik verileri yerinde kenarda iÅŸler. Hassas operasyonel veriler, aÃ§Ä±kÃ§a bulut senkronizasyonunu yetkilendirmediÄŸiniz sÃ¼rece duvarlarÄ±nÄ±z iÃ§inde kalÄ±r. AES-256 ÅŸifreleme, sertifika tabanlÄ± kimlik doÄŸrulama ve rol tabanlÄ± eriÅŸim kontrolÃ¼ kullanÄ±yoruz. Mimarimiz KVKK (TÃ¼rk Veri Koruma Kanunu) ve GDPR ile uyumludur."
          },
          {
            q: "Mevcut Ã¼retimimi kesintiye uÄŸratacak mÄ±?",
            a: "HayÄ±r. MÃ¼dahalesiz 'Kaplama Stratejimiz', makineleri durdurmadan salt okunur veri portlarÄ±na baÄŸlanÄ±r. Mevcut sistemlerinizi deÄŸiÅŸtirmiyoruzâ€”onlarÄ± geliÅŸtiriyoruz. Kurulum, programlanmÄ±ÅŸ bakÄ±m pencereleri sÄ±rasÄ±nda gerÃ§ekleÅŸir ve sistem herhangi bir otomatik eylem almadan Ã¶nce paralel gÃ¶zlem modunda Ã§alÄ±ÅŸÄ±r."
          },
          {
            q: "Neden panolar yerine 'Sohbet' kullanÄ±lÄ±yor?",
            a: "CWF, fabrikanÄ±z iÃ§in arama motorudur. Kat yÃ¶neticilerinin veri biliminde doktora yapmasÄ± gerekmezâ€”sadece '3. Hat neden yavaÅŸlÄ±yor?' diye sorarlar. Geleneksel panolar eÄŸitim, gezinme ve yorum gerektirir. CWF, doÄŸal dilde anÄ±nda, baÄŸlamsal yanÄ±tlar verir. Panolar veri gÃ¶sterir; CWF zeka saÄŸlar."
          },
          {
            q: "Mevcut MES'imizi deÄŸiÅŸtiriyor musunuz?",
            a: "HayÄ±r. BaÄŸlÄ±yoruz, deÄŸiÅŸtirmiyoruz. ARDICTECH'in 'Zeka SarmalayÄ±cÄ±' stratejisi, mevcut sistemlerinizden salt okunur API'ler aracÄ±lÄ±ÄŸÄ±yla veri alÄ±r. SAP, Siemens, Rockwell ve diÄŸer eski sistemlerle birlikte Ã§alÄ±ÅŸÄ±yoruzâ€”onlarÄ± maliyetli bir yenileme ve deÄŸiÅŸtirme gerektirmeden yapay zeka zekasÄ±yla geliÅŸtiriyoruz."
          },
          {
            q: "Tipik ROI zaman Ã§izelgeniz nedir?",
            a: "Tam ROI iÃ§in 14-22 ay, ancak mÃ¼ÅŸteriler hemen deÄŸer gÃ¶rÃ¼yor. 1. Hafta: GerÃ§ek zamanlÄ± gÃ¶rÃ¼nÃ¼rlÃ¼k. 1. Ay: Ä°lk optimizasyon Ã¶nerileri. 3. Ay: Ã–lÃ§Ã¼lebilir duruÅŸ sÃ¼resi azalmasÄ±. 6. Ay: Enerji tasarruflarÄ± ve kalite iyileÅŸtirmeleri. 12. Ay: Tam platform ROI yÃ¶rÃ¼ngesi net."
          },
          {
            q: "ArAI genel yapay zeka platformlarÄ±ndan nasÄ±l farklÄ±dÄ±r?",
            a: "ArAI, Ã¼retim iÃ§in Ã¶zel olarak geliÅŸtirilmiÅŸtir. Genel platformlar (AWS SageMaker, Azure ML), aylarca Ã¶zel geliÅŸtirme gerektiren genel amaÃ§lÄ± araÃ§lardÄ±r. ArAI, Ã¼retime Ã¶zel modellerle Ã¶nceden yapÄ±landÄ±rÄ±lmÄ±ÅŸ olarak gelir: OEE optimizasyonu, Ã¶ngÃ¶rÃ¼cÃ¼ bakÄ±m, kalite tahmini, enerji yÃ¶netimi. Sizin dilinizi konuÅŸuyoruzâ€”genel bulut jargonunu deÄŸil."
          }
        ]
      },
      footer: {
        tagline: "Yenileyin. OtomatikleÅŸtirin. YÃ¼kseltin.",
        subtitle: "FabrikanÄ±zÄ± birlikte dÃ¶nÃ¼ÅŸtÃ¼relim.",
        contact: {
          title: "Ä°letiÅŸim",
          email: "info@ardictech.com",
          website: "www.ardictech.com",
          address: "Istanbul, TÃ¼rkiye"
        },
        quickLinks: {
          title: "HÄ±zlÄ± Linkler",
          links: ["Platform", "KullanÄ±m Ã–rnekleri", "Kaynaklar", "HakkÄ±mÄ±zda"]
        },
        legal: {
          title: "Yasal",
          links: ["Gizlilik PolitikasÄ±", "Hizmet ÅžartlarÄ±", "Veri Koruma"]
        },
        copyright: "Â© 2025 ARDICTECH. TÃ¼m haklarÄ± saklÄ±dÄ±r."
      }
    }
  };

  const t = content[language];

  // Animated EnsÅ SVG Component
  const EnsoCircle = ({ size = 200, className = "" }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 256 256"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="ensoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#a855f7', stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#06b6d4', stopOpacity: 1 }} />
        </linearGradient>
        
        <filter id="ensoGlow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Main brushstroke path - incomplete circle */}
      <path
        d="M 230 128 A 100 100 0 1 0 40 128 A 100 100 0 0 0 220 140"
        fill="none"
        stroke="url(#ensoGradient)"
        strokeWidth="18"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#ensoGlow)"
        opacity="0.9"
      >
        <animate
          attributeName="stroke-dasharray"
          from="0 1000"
          to="1000 0"
          dur="3s"
          repeatCount="indefinite"
        />
      </path>
      
      {/* Secondary detail path for depth */}
      <path
        d="M 225 130 A 95 95 0 1 0 45 130 A 95 95 0 0 0 215 138"
        fill="none"
        stroke="url(#ensoGradient)"
        strokeWidth="12"
        strokeLinecap="round"
        opacity="0.6"
        filter="url(#ensoGlow)"
      >
        <animate
          attributeName="stroke-dasharray"
          from="0 900"
          to="900 0"
          dur="3s"
          repeatCount="indefinite"
          begin="0.3s"
        />
      </path>
    </svg>
  );

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <EnsoCircle size={50} className="animate-pulse" />
              <div>
                <div className="text-2xl font-black tracking-tight">
                  <span className="text-white">ARDIC</span>
                  <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">TECH</span>
                </div>
                <div className="text-[10px] text-gray-400 tracking-widest uppercase">Digital Transformation</div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {Object.values(t.nav).slice(0, -1).map((item, index) => (
                <a
                  key={index}
                  href={`#${Object.keys(t.nav)[index]}`}
                  className="text-sm font-medium text-gray-300 hover:text-purple-400 transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Language Toggle & CTA */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setLanguage(language === 'en' ? 'tr' : 'en')}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">{language === 'en' ? 'TR' : 'EN'}</span>
              </button>
              
              <button className="hidden lg:block px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg shadow-purple-500/50">
                {t.nav.workshop}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-purple-500/20 bg-black/95 backdrop-blur-xl">
            <div className="px-4 py-6 space-y-4">
              {Object.values(t.nav).map((item, index) => (
                <a
                  key={index}
                  href={`#${Object.keys(t.nav)[index]}`}
                  className="block py-2 text-gray-300 hover:text-purple-400 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section - Cinematic */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20" />
          
          {/* Animated grid */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px),
                linear-gradient(0deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '100px 100px',
              animation: 'gridMove 20s linear infinite'
            }} />
          </div>

          {/* Floating particles */}
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-50"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}

          {/* Large EnsÅ in background */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5">
            <EnsoCircle size={800} />
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          {/* EnsÅ Symbol */}
          <div className="flex justify-center mb-12 animate-fade-in">
            <EnsoCircle size={120} className="drop-shadow-2xl" />
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight animate-fade-in-up">
            <span className="block text-white">{t.hero.headline.split('.')[0]}.</span>
            <span className="block bg-gradient-to-r from-purple-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
              {t.hero.headline.split('.')[1]}.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed animate-fade-in-up animation-delay-200">
            {t.hero.subheadline}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up animation-delay-400">
            <button className="group px-10 py-5 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-2xl shadow-purple-500/50 flex items-center gap-3">
              {t.hero.cta}
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="group px-10 py-5 bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-xl font-bold text-lg transition-all border border-purple-500/30 hover:border-purple-500/60 flex items-center gap-3">
              <Play className="w-5 h-5" />
              {t.hero.watchDemo}
            </button>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronRight className="w-8 h-8 text-purple-400 rotate-90" />
          </div>
        </div>
      </section>

      {/* Hidden Drain Section - Business Impact */}
      <section className="relative py-32 bg-gradient-to-b from-black via-purple-950/10 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              <span className="text-red-400">{t.hiddenDrain.title}</span>
              <br />
              <span className="text-white">{t.hiddenDrain.subtitle}</span>
            </h2>
            <p className="text-gray-400 text-lg">
              {t.hiddenDrain.description}
            </p>
          </div>

          {/* Loss Cards with Hover */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {t.hiddenDrain.losses.map((loss, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredLoss(index)}
                onMouseLeave={() => setHoveredLoss(null)}
                className="group relative bg-gradient-to-br from-gray-900/50 to-purple-900/20 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/60 transition-all transform hover:scale-105 hover:-translate-y-2 cursor-pointer"
              >
                {/* Icon */}
                <div className="w-14 h-14 bg-gradient-to-br from-purple-600/20 to-cyan-600/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {index === 0 && <Activity className="w-7 h-7 text-purple-400" />}
                  {index === 1 && <Clock className="w-7 h-7 text-cyan-400" />}
                  {index === 2 && <Target className="w-7 h-7 text-red-400" />}
                  {index === 3 && <TrendingUp className="w-7 h-7 text-green-400" />}
                </div>

                <h3 className="text-xl font-bold text-white mb-3">
                  {loss.title}
                </h3>
                
                <div className="text-4xl font-black bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent mb-4">
                  {loss.stat}
                </div>

                <p className="text-gray-400 text-sm mb-4">
                  {loss.desc}
                </p>

                {/* Hover Explanation */}
                {hoveredLoss === index && (
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/95 to-cyan-900/95 backdrop-blur-xl rounded-2xl p-6 flex flex-col justify-center border-2 border-purple-400 animate-fade-in">
                    <p className="text-white text-sm leading-relaxed">
                      {loss.explanation}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Total Loss Banner */}
          <div className="relative bg-gradient-to-r from-red-900/30 via-orange-900/30 to-yellow-900/30 rounded-3xl p-12 border-2 border-red-500/50 text-center mb-12">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm rounded-3xl" />
            <div className="relative z-10">
              <div className="text-8xl font-black bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent mb-4">
                $48M - $82M
              </div>
              <div className="text-2xl font-bold text-white">
                {t.hiddenDrain.total}
              </div>
            </div>
          </div>

          {/* ROI Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: t.hiddenDrain.roi, value: "14-22 Mo", icon: TrendingUp, color: "from-green-400 to-emerald-400" },
              { label: t.hiddenDrain.oee, value: "8-12%", icon: Activity, color: "from-blue-400 to-cyan-400" },
              { label: t.hiddenDrain.downtime, value: "30-45%", icon: Clock, color: "from-purple-400 to-pink-400" },
              { label: t.hiddenDrain.energy, value: "Up to 20%", icon: Zap, color: "from-yellow-400 to-orange-400" }
            ].map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-900/50 to-purple-900/20 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 text-center group hover:border-purple-500/60 transition-all"
                >
                  <Icon className="w-10 h-10 text-purple-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <div className={`text-4xl font-black bg-gradient-to-r ${metric.color} bg-clip-text text-transparent mb-2`}>
                    {metric.value}
                  </div>
                  <div className="text-gray-400 text-sm font-semibold uppercase tracking-wider">
                    {metric.label}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer Note */}
          <div className="text-center mt-12">
            <p className="text-lg text-gray-400">
              {t.hiddenDrain.footer.roi} <span className="text-purple-400 font-bold">{t.hiddenDrain.footer.payback}</span>
            </p>
          </div>
        </div>
      </section>

      {/* EnsÅ Philosophy Section */}
      <section className="relative py-32 bg-gradient-to-b from-black via-cyan-950/10 to-black overflow-hidden">
        {/* Background EnsÅ */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <EnsoCircle size={600} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-4 px-6 py-3 bg-purple-500/10 border border-purple-500/30 rounded-full mb-8">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <span className="text-purple-300 font-semibold uppercase tracking-wider text-sm">
                {t.enso.philosophy}
              </span>
            </div>

            <h2 className="text-5xl md:text-6xl font-black mb-8">
              <span className="bg-gradient-to-r from-purple-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
                {t.enso.title}
              </span>
            </h2>

            <p className="text-2xl text-gray-300 mb-6 max-w-3xl mx-auto">
              {t.enso.subtitle}
            </p>

            <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-purple-900/20 to-cyan-900/20 backdrop-blur-sm rounded-2xl border border-purple-500/30">
              <p className="text-gray-300 text-lg leading-relaxed italic">
                "{t.enso.definition}"
              </p>
            </div>
          </div>

          {/* Philosophy Content */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Animated EnsÅ */}
            <div className="flex justify-center">
              <div className="relative">
                <EnsoCircle size={400} className="drop-shadow-2xl" />
                
                {/* Pulsing rings */}
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="absolute inset-0 border-2 border-purple-400/30 rounded-full"
                    style={{
                      animation: `ping 3s cubic-bezier(0, 0, 0.2, 1) infinite`,
                      animationDelay: `${i * 1}s`
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Right: Description */}
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold text-white mb-6">
                  {t.enso.desc}
                </h3>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-bold text-purple-400 mb-4">
                    {t.enso.pathTitle}
                  </h4>
                  <p className="text-gray-400 mb-6">
                    {t.enso.pathSubtitle}
                  </p>
                </div>

                {t.enso.points.map((point, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-6 bg-gradient-to-r from-purple-900/20 to-transparent rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-cyan-600 flex items-center justify-center font-bold flex-shrink-0 group-hover:scale-110 transition-transform">
                      {index + 1}
                    </div>
                    <div>
                      <div className="text-lg font-bold text-white mb-2">
                        {point.label}
                      </div>
                      <div className="text-gray-400">
                        {point.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem Section - Technical Deep Dive */}
      <section className="relative py-32 bg-gradient-to-b from-black via-purple-950/10 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              <span className="text-white">{t.ecosystem.title}</span>
            </h2>
            <p className="text-xl text-gray-300 mb-4">
              {t.ecosystem.subtitle}
            </p>
            <p className="text-gray-400 max-w-3xl mx-auto">
              {t.ecosystem.description}
            </p>
          </div>

          {/* 4-Layer Platform Visualization */}
          <div className="space-y-8 mb-20">
            {t.ecosystem.layers.map((layer, index) => {
              const Icon = layer.icon;
              const isActive = activeLayer === index;
              
              return (
                <div
                  key={index}
                  onMouseEnter={() => setActiveLayer(index)}
                  onMouseLeave={() => setActiveLayer(null)}
                  className="group relative"
                >
                  {/* Layer Card */}
                  <div className={`
                    relative bg-gradient-to-r from-gray-900/50 to-purple-900/20 backdrop-blur-sm rounded-2xl p-8 border transition-all cursor-pointer
                    ${isActive ? 'border-purple-500 shadow-2xl shadow-purple-500/50 scale-105' : 'border-purple-500/20 hover:border-purple-500/40'}
                  `}>
                    <div className="flex flex-col lg:flex-row gap-8 items-start">
                      {/* Left: Layer Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-6 mb-6">
                          {/* Icon */}
                          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600/30 to-cyan-600/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Icon className="w-10 h-10 text-purple-400" />
                          </div>

                          {/* Title */}
                          <div>
                            <div className="text-sm text-gray-400 font-semibold uppercase tracking-wider mb-2">
                              Layer {layer.id}
                            </div>
                            <h3 className="text-3xl font-black text-white mb-2">
                              {layer.title}
                            </h3>
                            <div className="text-purple-400 font-semibold">
                              {layer.role}
                            </div>
                          </div>
                        </div>

                        <p className="text-gray-300 text-lg mb-4">
                          {layer.desc}
                        </p>

                        <p className="text-gray-400">
                          {layer.detailed}
                        </p>

                        {/* View Details Indicator */}
                        <div className="mt-6 flex items-center gap-2 text-purple-400 font-semibold group-hover:translate-x-2 transition-transform">
                          <span>Hover for technical specifications</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>

                      {/* Right: Technical Specs (shown on hover) */}
                      {isActive && (
                        <div className="lg:w-1/2 animate-fade-in">
                          <div className="bg-black/60 backdrop-blur-xl rounded-xl p-8 border border-purple-500/50">
                            <h4 className="text-xl font-bold text-purple-400 mb-6 flex items-center gap-2">
                              <Server className="w-5 h-5" />
                              {layer.technical.title}
                            </h4>
                            
                            <div className="space-y-4">
                              {layer.technical.specs.map((spec, specIndex) => (
                                <div
                                  key={specIndex}
                                  className="flex items-start gap-3 text-sm"
                                >
                                  <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                                  <span className="text-gray-300">{spec}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Connection Line (except last) */}
                  {index < t.ecosystem.layers.length - 1 && (
                    <div className="flex justify-center py-4">
                      <div className="w-1 h-12 bg-gradient-to-b from-purple-500 to-cyan-500 animate-pulse" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Sovereign AI Section */}
          <div className="mt-32">
            <div className="text-center mb-16">
              <h3 className="text-4xl md:text-5xl font-black mb-6">
                <span className="text-white">{t.sovereign.title}</span>
              </h3>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                {t.sovereign.subtitle}
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {t.sovereign.features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-gray-900/50 to-purple-900/20 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/60 transition-all group"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600/30 to-cyan-600/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Icon className="w-8 h-8 text-purple-400" />
                    </div>

                    <h4 className="text-2xl font-bold text-white mb-4">
                      {feature.title}
                    </h4>

                    <p className="text-gray-400 leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="relative py-32 bg-gradient-to-b from-black via-cyan-950/10 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              <span className="text-white">{t.useCases.title}</span>
            </h2>
            <p className="text-xl text-gray-400">
              {t.useCases.subtitle}
            </p>
          </div>

          {/* Use Case Cards */}
          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            {t.useCases.cases.map((useCase, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-900/50 to-purple-900/20 backdrop-blur-sm rounded-3xl overflow-hidden border border-purple-500/20 hover:border-purple-500/60 transition-all group"
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-purple-900/50 to-cyan-900/50 p-8 border-b border-purple-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <Factory className="w-6 h-6 text-purple-400" />
                    <span className="text-purple-300 font-semibold text-sm uppercase tracking-wider">
                      {useCase.industry}
                    </span>
                  </div>
                  <h3 className="text-3xl font-black text-white">
                    {useCase.title}
                  </h3>
                </div>

                {/* Content */}
                <div className="p-8 space-y-8">
                  {/* Objectives */}
                  <div>
                    <h4 className="text-lg font-bold text-purple-400 mb-4">
                      {language === 'en' ? 'Objectives' : 'Hedefler'}
                    </h4>
                    <ul className="space-y-3">
                      {useCase.objectives.map((objective, objIndex) => (
                        <li key={objIndex} className="flex items-start gap-3 text-gray-300">
                          <Target className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                          <span>{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Solution */}
                  <div>
                    <h4 className="text-lg font-bold text-purple-400 mb-4">
                      {language === 'en' ? 'Solution' : 'Ã‡Ã¶zÃ¼m'}
                    </h4>
                    <p className="text-gray-300">
                      {useCase.solution}
                    </p>
                  </div>

                  {/* Results */}
                  <div>
                    <h4 className="text-lg font-bold text-purple-400 mb-6">
                      {language === 'en' ? 'Results' : 'SonuÃ§lar'}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {useCase.results.map((result, resIndex) => (
                        <div
                          key={resIndex}
                          className="bg-gradient-to-br from-purple-900/30 to-transparent rounded-xl p-6 border border-purple-500/30 text-center"
                        >
                          <div className="text-3xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                            {result.metric}
                          </div>
                          <div className="text-gray-400 text-sm font-semibold">
                            {result.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Partner Logos */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-400 mb-12">
              {t.useCases.partners.title}
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-12">
              {t.useCases.partners.logos.map((logo, index) => (
                <div
                  key={index}
                  className="px-8 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all"
                >
                  <span className="text-gray-300 font-semibold text-lg">
                    {logo}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Path to EnsÅ - Engagement Steps */}
      <section className="relative py-32 bg-gradient-to-b from-black via-purple-950/10 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                {t.pathToEnso.title}
              </span>
            </h2>
            <p className="text-xl text-gray-400">
              {t.pathToEnso.subtitle}
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-12">
            {t.pathToEnso.steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connection Line */}
                {index < t.pathToEnso.steps.length - 1 && (
                  <div className="absolute left-12 top-32 w-1 h-full bg-gradient-to-b from-purple-500 to-cyan-500 opacity-30 hidden lg:block" />
                )}

                <div className="grid lg:grid-cols-12 gap-8 items-start">
                  {/* Left: Number Badge */}
                  <div className="lg:col-span-2 flex justify-center lg:justify-start">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-purple-600 to-cyan-600 flex items-center justify-center shadow-2xl shadow-purple-500/50">
                        <span className="text-4xl font-black text-white">
                          {step.number}
                        </span>
                      </div>
                      
                      {/* Pulsing ring */}
                      <div className="absolute inset-0 rounded-3xl border-2 border-purple-400 animate-ping opacity-30" />
                    </div>
                  </div>

                  {/* Right: Step Content */}
                  <div className="lg:col-span-10">
                    <div className="bg-gradient-to-br from-gray-900/50 to-purple-900/20 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/60 transition-all group">
                      {/* Header */}
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                        <div>
                          <h3 className="text-3xl font-black text-white mb-2">
                            {step.title}
                          </h3>
                          <div className="flex items-center gap-4 text-gray-400">
                            <span className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              {step.duration}
                            </span>
                            <span className="text-purple-400 font-bold text-lg">
                              {step.price}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-300 text-lg mb-6">
                        {step.desc}
                      </p>

                      {/* Deliverables */}
                      <div>
                        <h4 className="text-sm font-bold text-purple-400 uppercase tracking-wider mb-4">
                          {language === 'en' ? 'Deliverables' : 'Ã‡Ä±ktÄ±lar'}
                        </h4>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {step.deliverables.map((deliverable, delIndex) => (
                            <div
                              key={delIndex}
                              className="flex items-center gap-3 text-gray-300"
                            >
                              <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                              <span>{deliverable}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-20 text-center">
            <button className="group px-12 py-6 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 rounded-2xl font-bold text-xl transition-all transform hover:scale-105 shadow-2xl shadow-purple-500/50 flex items-center gap-4 mx-auto">
              {language === 'en' ? 'Start Your Journey to EnsÅ' : "EnsÅ'ya YolculuÄŸunuza BaÅŸlayÄ±n"}
              <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-32 bg-gradient-to-b from-black via-cyan-950/10 to-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              <span className="text-white">{t.faq.title}</span>
            </h2>
            <p className="text-xl text-gray-400">
              {t.faq.subtitle}
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-6">
            {t.faq.questions.map((faq, index) => (
              <details
                key={index}
                className="group bg-gradient-to-br from-gray-900/50 to-purple-900/20 backdrop-blur-sm rounded-2xl border border-purple-500/20 hover:border-purple-500/60 transition-all overflow-hidden"
              >
                <summary className="flex items-center justify-between p-8 cursor-pointer list-none">
                  <h3 className="text-xl font-bold text-white pr-4">
                    {faq.q}
                  </h3>
                  <ChevronRight className="w-6 h-6 text-purple-400 flex-shrink-0 transform transition-transform group-open:rotate-90" />
                </summary>

                <div className="px-8 pb-8 pt-0">
                  <div className="pt-6 border-t border-purple-500/20">
                    <p className="text-gray-300 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-32 bg-gradient-to-b from-black via-purple-950/20 to-black overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-10">
            <EnsoCircle size={600} />
          </div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-6xl font-black mb-8">
            <span className="bg-gradient-to-r from-purple-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
              {t.footer.tagline}
            </span>
          </h2>

          <p className="text-2xl text-gray-300 mb-12">
            {t.footer.subtitle}
          </p>

          <button className="group px-12 py-6 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 rounded-2xl font-bold text-xl transition-all transform hover:scale-105 shadow-2xl shadow-purple-500/50 flex items-center gap-4 mx-auto mb-12">
            {language === 'en' ? 'Book Your Free Executive Workshop' : 'Ãœcretsiz YÃ¶netici AtÃ¶lyenizi AyÄ±rtÄ±n'}
            <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </button>

          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-8 text-gray-400">
            <a href="mailto:info@ardictech.com" className="hover:text-purple-400 transition-colors">
              info@ardictech.com
            </a>
            <span className="hidden sm:block">â€¢</span>
            <a href="https://www.ardictech.com" className="hover:text-purple-400 transition-colors">
              www.ardictech.com
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-black border-t border-purple-500/20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-12 mb-12">
            {/* Logo & Tagline */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-4 mb-6">
                <EnsoCircle size={50} />
                <div>
                  <div className="text-2xl font-black">
                    <span className="text-white">ARDIC</span>
                    <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">TECH</span>
                  </div>
                  <div className="text-[10px] text-gray-400 tracking-widest uppercase">
                    Digital Transformation
                  </div>
                </div>
              </div>
              <p className="text-gray-400 max-w-md">
                {t.footer.tagline} {t.footer.subtitle}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-bold mb-4">{t.footer.quickLinks.title}</h3>
              <ul className="space-y-2">
                {t.footer.quickLinks.links.map((link, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-white font-bold mb-4">{t.footer.legal.title}</h3>
              <ul className="space-y-2">
                {t.footer.legal.links.map((link, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-purple-500/20 text-center text-gray-400">
            <p>{t.footer.copyright}</p>
          </div>
        </div>
      </footer>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translateY(0); }
          100% { transform: translateY(100px); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
          animation-fill-mode: backwards;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
          animation-fill-mode: backwards;
        }
      `}</style>
    </div>
  );
};

export default ArdicTechWebsite;