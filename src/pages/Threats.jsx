import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { QUIZ_LIST, QUIZ_DATA } from '../data/quizData'
import '../styles/cyber.css'
import './Threats.css'
import { THREATS_AND_TOOLS } from '../data/threatsToolsData'

import iconDeepfake from '../assets/media/icons/icon-deepfake.png'
import iconCredentialStuffing from '../assets/media/icons/icon-credential-stuffing.png'
import iconBec from '../assets/media/icons/icon-bec.png'
import iconCloudMisconfig from '../assets/media/icons/icon-cloud-misconfig.png'
import iconInsiderThreat from '../assets/media/icons/icon-insider-threat.png'
import iconSimSwap from '../assets/media/icons/icon-sim-swap.png'
import iconSpyware from '../assets/media/icons/icon-spyware.png'
import iconTracking from '../assets/media/icons/icon-tracking.png'
import iconPentest from '../assets/media/icons/icon-pentest.png'
import iconPhishing from '../assets/media/icons/icon-phishing.png'
import iconRansomware from '../assets/media/icons/icon-ransomware.png'
import iconScamFraud from '../assets/media/icons/icon-scam-fraud.png'
import iconReputation from '../assets/media/icons/icon-reputation.png'
import iconAccountTakeover from '../assets/media/icons/icon-account-takeover.png'
import iconDataBreach from '../assets/media/icons/icon-data-breach.png'
import iconDdos from '../assets/media/icons/icon-ddos.png'
import iconApiSecurity from '../assets/media/icons/icon-api-security.png'
import iconIdentityTheft from '../assets/media/icons/icon-identity-theft.png'
import iconMalware from '../assets/media/icons/icon-malware.png'
import iconCryptoDrainer from '../assets/media/icons/icon-crypto-drainer.png'
import iconDeliveryScam from '../assets/media/icons/icon-delivery-scam.png'
import iconUnpatchedSoftware from '../assets/media/icons/icon-unpatched-software.png'
import iconCctvSurveillance from '../assets/media/icons/icon-cctv-surveillance.png'
import iconSocialMediaThreat from '../assets/media/icons/icon-social-media-threat.png'
import iconBotnet from '../assets/media/icons/icon-botnet.png'

const ICON_MAP = {
  'icon-deepfake.png':            iconDeepfake,
  'icon-credential-stuffing.png': iconCredentialStuffing,
  'icon-bec.png':                 iconBec,
  'icon-cloud-misconfig.png':     iconCloudMisconfig,
  'icon-insider-threat.png':      iconInsiderThreat,
  'icon-sim-swap.png':            iconSimSwap,
  'icon-spyware.png':             iconSpyware,
  'icon-tracking.png':            iconTracking,
  'icon-pentest.png':             iconPentest,
  'icon-phishing.png':            iconPhishing,
  'icon-ransomware.png':          iconRansomware,
  'icon-scam-fraud.png':          iconScamFraud,
  'icon-reputation.png':          iconReputation,
  'icon-account-takeover.png':    iconAccountTakeover,
  'icon-data-breach.png':         iconDataBreach,
  'icon-ddos.png':                iconDdos,
  'icon-api-security.png':        iconApiSecurity,
  'icon-identity-theft.png':      iconIdentityTheft,
  'icon-malware.png':             iconMalware,
  'icon-crypto-drainer.png':      iconCryptoDrainer,
  'icon-delivery-scam.png':       iconDeliveryScam,
  'icon-unpatched-software.png':  iconUnpatchedSoftware,
  'icon-cctv-surveillance.png':   iconCctvSurveillance,
  'icon-social-media-threat.png': iconSocialMediaThreat,
  'icon-botnet.png':              iconBotnet,
}

const INVERT_ICONS = new Set([
  'icon-account-takeover.png','icon-api-security.png','icon-bec.png',
  'icon-credential-stuffing.png','icon-crypto-drainer.png','icon-data-breach.png',
  'icon-ddos.png','icon-identity-theft.png','icon-malware.png','icon-phishing.png',
  'icon-scam-fraud.png','icon-sim-swap.png','icon-social-media-threat.png','icon-unpatched-software.png',
])

const RISK_LABEL = { high: 'HIGH RISK', mid: 'MED RISK', low: 'SECURE PATH' }

/* ════════════════════════════════════════════
   SECTION 2 — TYPES OF THREATS data
   ════════════════════════════════════════════ */
// Maps Types of Threats entry → threatsToolsData id (for scroll-to behaviour)
const TYPES_TO_TT_ID = {
  'deepfake':            'deepfake',
  'credential-stuffing': 'credential-stuffing',
  'bec':                 'bec',
  'cloud-security':      'cloud-misconfig',
  'insider-threat':      'insider-threat',
  'sim-swap':            'sim-swap',
  'spyware-detection':   'spyware',
  'phishing-emails':     'phishing',
  'ransomware':          'ransomware',
  'account-takeover':    'account-takeover',
  'data-breach':         'data-breach',
  'ddos-protection':     'ddos',
  'identity-theft':      'identity-theft',
  'malware':             'malware',
}

const TYPES_OF_THREATS = [
  { icon: 'icon-deepfake.png',            title: 'DeepFake & Synthetic Identity Attacks',      risk: 'mid',
    desc: 'AI-generated fake videos/audio impersonating executives or loved ones for identity fraud and financial extortion.',
    link: 'deepfake' },
  { icon: 'icon-credential-stuffing.png', title: 'Credential Stuffing & Password Threats',     risk: 'high',
    desc: 'Automated use of leaked credentials across sites leading to account takeovers. Our MFA tools provide strong protection.',
    link: 'credential-stuffing' },
  { icon: 'icon-bec.png',                 title: 'Business Email Compromise (BEC) Threats',    risk: 'high',
    desc: 'Targeted email scams impersonating CEOs for wire transfers. Companies lose billions. We offer executive training and AI anomaly detection.',
    link: 'bec' },
  { icon: 'icon-cloud-misconfig.png',     title: 'Cloud Misconfiguration Vulnerabilities',     risk: 'mid',
    desc: 'Exposed storage buckets and weak settings leak data publicly. Our automated scanning and CSPM tools fix vulnerabilities.',
    link: 'cloud-security' },
  { icon: 'icon-insider-threat.png',      title: 'Insider Threats & Employee Sabotage',        risk: 'high',
    desc: 'Malicious or negligent insiders steal or leak data. We offer User Behavior Analysis (UBA) and Insider Risk Program (IRP) tools.',
    link: 'insider-threat' },
  { icon: 'icon-sim-swap.png',            title: 'SIM Swapping Threats',                       risk: 'high',
    desc: 'Attackers port your number to hijack accounts. Our pin-based carrier-level protection and SIM swap prevention tools stop this.',
    link: 'sim-swap' },
  { icon: 'icon-spyware.png',             title: 'Spyware & Keylogger Threats',                risk: 'mid',
    desc: 'RATs and spyware access your webcam and data. Our Privacy Audit Tools detect and neutralize these threats for businesses and individuals.',
    link: 'spyware-detection' },
  { icon: 'icon-tracking.png',            title: 'Tracking a Tracker',                         risk: 'mid',
    desc: 'We neutralize digital threats by tracking scammers using Grabify Tools that generate links to capture information from imposters.',
    link: null },
  { icon: 'icon-pentest.png',             title: 'Penetration Testing',                        risk: 'low',
    desc: 'Comprehensive testing for servers and applications to identify possible threats and block vulnerabilities before attackers do.',
    link: null },
  { icon: 'icon-phishing.png',            title: 'Phishing Threats',                           risk: 'high',
    desc: 'Deceptive emails, texts and websites trick users into revealing credentials. Our AI-powered email filtering and real-time link scanning tools protect you.',
    link: 'phishing-emails' },
  { icon: 'icon-ransomware.png',          title: 'Ransomware & Digital Extortion',             risk: 'high',
    desc: 'Malware encrypts data and demands payment. We offer immutable backups, EDR and rapid decryption negotiation tools.',
    link: 'ransomware' },
  { icon: 'icon-scam-fraud.png',          title: 'Online Scam & Investment Fraud',             risk: 'high',
    desc: 'Romance, tech support and crypto scams cause massive losses. We offer victim recovery assistance and transaction monitoring tools.',
    link: null },
  { icon: 'icon-reputation.png',          title: 'Reputation & Brand Damage',                  risk: 'mid',
    desc: 'Public leaks of explicit content and attacks destroy trust. Our dark web cleanup and proactive reputation monitoring tools protect you.',
    link: null },
  { icon: 'icon-account-takeover.png',    title: 'Account Takeover Fraud',                     risk: 'high',
    desc: 'Hackers seize control of online accounts for financial gain. We offer session monitoring, risk-based authentication and rapid recovery tools.',
    link: 'account-takeover' },
  { icon: 'icon-data-breach.png',         title: 'Data Breaches & Leaks',                      risk: 'high',
    desc: 'Unauthorized data access triggers fines and loss of trust. Our forensics investigators, rapid response retainers and BCM tools protect you.',
    link: 'data-breach' },
  { icon: 'icon-ddos.png',               title: 'DDoS Attacks',                               risk: 'mid',
    desc: 'Flooding systems causes downtime. Our cloud-based scrubbing centers, traffic monitoring and always-on mitigation provide zero-downtime protection.',
    link: 'ddos-protection' },
  { icon: 'icon-api-security.png',        title: 'API Security Threats',                       risk: 'mid',
    desc: 'Exploited APIs expose backend data. Our secure API gateways with rate limiting, real-time threat detection and penetration testing tools protect you.',
    link: null },
  { icon: 'icon-identity-theft.png',      title: 'Identity Theft & Fraud Threats',             risk: 'high',
    desc: 'Stolen identities used for loans, accounts or espionage. We offer 24/7 dark web monitoring, credit alerts and identity restoration insurance.',
    link: 'identity-theft' },
  { icon: 'icon-malware.png',             title: 'Malware Infection (Virus)',                   risk: 'high',
    desc: 'Malicious software steals data and disrupts systems. We offer new-gen antivirus, automated scanning, device management and 24/7 malware cleanup.',
    link: 'malware' },
  { icon: 'icon-crypto-drainer.png',      title: 'Crypto Drainer Threats',                     risk: 'high',
    desc: 'Airdrop drainers steal crypto assets silently. We provide detection, wallet monitoring and active recovery tools.',
    link: null },
  { icon: 'icon-delivery-scam.png',       title: 'Fake Package (UPS) & Delivery Scams',        risk: 'mid',
    desc: 'Fake delivery notifications trick victims into clicking malicious links. We offer real-time detection and link verification tools.',
    link: null },
  { icon: 'icon-unpatched-software.png',  title: 'Unpatched Software Threats',                 risk: 'mid',
    desc: 'Delayed updates create easy entry points. Our managed endpoint services and vulnerability scanning tools enforce best-practice patch management.',
    link: null },
  { icon: 'icon-cctv-surveillance.png',   title: 'CCTV Home & Office Surveillance Threats',    risk: 'mid',
    desc: 'Exposed camera feeds risk privacy. We protect footage with New Private Access Protection Key (NPAPK) and Surveillance Protection Tools.',
    link: null },
  { icon: 'icon-social-media-threat.png', title: 'Social Media Monitoring Threats',            risk: 'mid',
    desc: 'Account takeovers and reputation attacks via social platforms. We offer monitoring, protection tools and emergency lockdown options.',
    link: null },
  { icon: 'icon-botnet.png',              title: 'Botnets & Zombie Network Attacks',           risk: 'high',
    desc: 'Infected devices form zombie networks. Our Device Cleanup, Network Segmentation and Botnet Blocker Tools permanently eliminate infections.',
    link: null },
]

/* ════════════════════════════════════════════
   QUIZ MODAL
   ════════════════════════════════════════════ */
function QuizModal({ slug, onClose, onFail }) {
  const quiz = QUIZ_DATA[slug]
  const [step, setStep]         = useState(0)
  const [selected, setSelected] = useState(null)
  const [feedback, setFeedback] = useState(null)
  const [score, setScore]       = useState(0)
  const [done, setDone]         = useState(false)

  if (!quiz) return null

  const q     = quiz.questions[step]
  const total = quiz.questions.length

  const handleAnswer = (idx) => {
    if (selected !== null) return
    setSelected(idx)
    const isCorrect = idx === q.correct
    setFeedback(isCorrect ? 'correct' : 'wrong')
    if (isCorrect) setScore(s => s + 1)
  }

  const handleNext = () => {
    if (step + 1 >= total) {
      const lastCorrect = selected === q.correct
      const trueScore   = score + (lastCorrect ? 1 : 0)
      setDone(true)
      if (trueScore < Math.ceil(total * 0.8)) onFail(slug)
    } else {
      setStep(s => s + 1)
      setSelected(null)
      setFeedback(null)
    }
  }

  const getResult = () => {
    if (score === total)     return { label: '🛡️ Secured!',  msg: 'Perfect score — you are fully threat-aware.',     color: 'var(--green)' }
    if (score === total - 1) return { label: '🧠 Smart One!', msg: 'Almost perfect — review the one you missed.',     color: 'var(--cyan)'  }
    return                          { label: '⚠️ You Failed', msg: 'You need to improve. Try this scenario again.',   color: 'var(--red)'   }
  }

  return (
    <div className="threats-page">
      <div className="quiz-modal-backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
        <div className="quiz-modal-box" role="dialog" aria-modal="true" aria-label={`Quiz: ${quiz.title}`}>
          <div className="quiz-modal-header">
            <div className="d-flex align-items-center gap-2">
              <span style={{ fontSize: '1.4rem' }}>{quiz.emoji}</span>
              <div>
                <div className="fw-bold text-white">{quiz.title}</div>
                <div className="text-muted-cyber" style={{ fontSize: '0.72rem' }}>
                  {done ? 'Quiz Complete' : `Question ${step + 1} of ${total}`}
                </div>
              </div>
            </div>
            <button className="quiz-close-btn" onClick={onClose} aria-label="Close quiz">
              <i className="bi bi-x-lg"></i>
            </button>
          </div>

          {!done && (
            <div className="quiz-progress">
              <div className="quiz-progress-fill" style={{ width: `${(step / total) * 100}%` }} />
            </div>
          )}

          {!done ? (
            <div className="quiz-phone-mock">
              <div className="quiz-phone-notch" />
              <div className="quiz-phone-screen">
                <div className="text-muted-cyber small mb-2" style={{ fontSize: '0.7rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  {q.q}
                </div>
                <div className="quiz-question">{q.prompt}</div>
                <div className="quiz-options">
                  {q.options.map((opt, i) => {
                    let cls = 'quiz-option'
                    if (selected !== null) {
                      if (i === q.correct) cls += ' correct'
                      else if (i === selected && i !== q.correct) cls += ' wrong'
                      else cls += ' dimmed'
                    }
                    return (
                      <button key={i} className={cls} onClick={() => handleAnswer(i)} disabled={selected !== null}>
                        <span className="quiz-option-letter">{String.fromCharCode(65 + i)}</span>
                        {opt}
                      </button>
                    )
                  })}
                </div>
                {feedback && (
                  <div className={`quiz-feedback ${feedback}`}>
                    {feedback === 'correct'
                      ? <><i className="bi bi-check-circle-fill me-2"></i>Correct!</>
                      : <><i className="bi bi-x-circle-fill me-2"></i>Whoops! The right answer was highlighted above.</>
                    }
                  </div>
                )}
                {selected !== null && (
                  <button className="btn btn-cyber w-100 mt-3" onClick={handleNext}>
                    {step + 1 >= total ? 'See Results' : 'Continue →'}
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="quiz-results">
              {(() => {
                const r = getResult()
                return (
                  <>
                    <div className="quiz-result-score" style={{ color: r.color }}>{score}/{total}</div>
                    <div className="quiz-result-label" style={{ color: r.color }}>{r.label}</div>
                    <div className="text-muted-cyber text-center mb-4">{r.msg}</div>
                    <div className="d-flex gap-2 justify-content-center flex-wrap">
                      <button className="btn btn-outline-cyber" onClick={() => { setStep(0); setSelected(null); setFeedback(null); setScore(0); setDone(false) }}>
                        <i className="bi bi-arrow-repeat me-2"></i>Retry
                      </button>
                      <button className="btn btn-cyber" onClick={onClose}>Done</button>
                    </div>
                  </>
                )
              })()}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════
   MAIN THREATS PAGE
   ════════════════════════════════════════════ */
export default function Threats() {
  const navigate = useNavigate()
  const [activeQuiz,      setActiveQuiz]      = useState(null)
  const [failedScenarios, setFailedScenarios] = useState([])
  const [showRepPrompt,   setShowRepPrompt]   = useState(false)
  const [activeSection,   setActiveSection]   = useState('spot-a-threat')

  const handleFail = (slug) => {
    setFailedScenarios(prev => {
      if (prev.includes(slug)) return prev
      const updated = [...prev, slug]
      if (updated.length >= 3) setShowRepPrompt(true)
      return updated
    })
  }

  const NAV_TABS = [
    { id: 'spot-a-threat',    label: 'Spot a Threat'   },
    { id: 'types-of-threats', label: 'Types of Threats' },
    { id: 'threats-tools',    label: 'Threats & Tools'  },
  ]

  return (
    <div className="threats-page">

      {/* ── Quiz Modal ── */}
      {activeQuiz && (
        <QuizModal slug={activeQuiz} onClose={() => setActiveQuiz(null)} onFail={handleFail} />
      )}

      {/* ── Failed 3+ scenarios prompt ── */}
      {showRepPrompt && (
        <div className="quiz-modal-backdrop" onClick={() => setShowRepPrompt(false)}>
          <div className="quiz-modal-box" style={{ maxWidth: 400 }} onClick={e => e.stopPropagation()}>
            <div className="quiz-modal-header">
              <div className="d-flex align-items-center gap-2">
                <span style={{ fontSize: '1.4rem' }}>⚠️</span>
                <div className="fw-bold text-white">You Need Help</div>
              </div>
              <button className="quiz-close-btn" onClick={() => setShowRepPrompt(false)}>
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            <div className="p-4 text-center">
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🛡️</div>
              <div className="fw-bold text-white mb-2">You have failed {failedScenarios.length} different scenarios.</div>
              <p className="text-muted-cyber small mb-4">
                You need to protect yourself. Contact an Active Representative now —
                they will guide you through staying safe online.
              </p>
              <a href="https://t.me/WHTS_support" target="_blank" rel="noopener noreferrer"
                className="btn btn-alert w-100 mb-2">
                <i className="bi bi-telegram me-2"></i>Contact Active Representative
              </a>
              <button className="btn btn-outline-cyber w-100" onClick={() => setShowRepPrompt(false)}>
                Keep Practicing
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════
          HERO
          ════════════════════════════ */}
      <header className="threats-hero">
        <div className="cyber-grid" aria-hidden="true" />
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="row align-items-center g-4 py-5">
            <div className="col-12 col-lg-7">
              <div className="d-flex align-items-center gap-2 mb-3 flex-wrap">
                <span className="pill low">
                  <span className="dot" /><span className="fw-bold" style={{ fontSize: '0.7rem' }}>LIVE TRAINING</span>
                </span>
                <span className="text-muted-cyber small">Threat education · Prevention-first</span>
              </div>
              <h1 className="glow-text fw-bold mb-3">Know Your Threats.<br />Stay One Step Ahead.</h1>
              <p className="text-muted-cyber mb-2" style={{ maxWidth: '54ch' }}>
                To add a layer of top-notch security to help prevent incoming threats and protect yourself
                by learning to spot threats.
              </p>
              <p className="text-muted-cyber mb-4" style={{ maxWidth: '54ch' }}>
                Take a quiz to spot scams and get tools to protect your information.
              </p>
              <div className="d-flex gap-2 flex-wrap threats-hero-btns">
                <button className="btn btn-cyber" onClick={() => setActiveSection('spot-a-threat')}>
                  <i className="bi bi-controller me-2"></i>Spot a Threat
                </button>
                <button className="btn btn-outline-cyber" onClick={() => setActiveSection('types-of-threats')}>
                  <i className="bi bi-list-ul me-2"></i>Types of Threats
                </button>
                <button className="btn btn-outline-cyber" onClick={() => { setActiveSection('threats-tools') }}>
                  <i className="bi bi-grid me-2"></i>Threats &amp; Tools
                </button>
                <Link className="btn btn-alert" to="/report">
                  <i className="bi bi-exclamation-triangle me-2"></i>Need Urgent Help?
                </Link>
              </div>
            </div>
            <div className="col-12 col-lg-5">
              <div className="banner p-4">
                <div className="text-muted-cyber small mb-1">Education Mode</div>
                <div className="fw-bold fs-5 glow-text mb-3">17 Threat Scenarios</div>
                <div className="scan-bar mb-2"><span /></div>
                <div className="text-muted-cyber small mb-4">Interactive quizzes · Instant feedback · Score tracking</div>
                <div className="d-flex align-items-start gap-3">
                  <div className="icon-box">🛡️</div>
                  <div>
                    <div className="fw-bold">Built from real-world patterns</div>
                    <div className="text-muted-cyber small">Every scenario is based on actual cybercrime methods reported to WHTS.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ════════════════════════════
          SECTION TABS NAV
          ════════════════════════════ */}
      <div className="threats-tab-nav" id="threats-sections">
        <div className="container">
          <div className="threats-tab-row">
            {NAV_TABS.map(tab => (
              <button
                key={tab.id}
                className={`threats-tab-btn ${activeSection === tab.id ? 'active' : ''}`}
                onClick={() => setActiveSection(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════════════════
          SECTION 1 — SPOT A THREAT
          ════════════════════════════ */}
      {activeSection === 'spot-a-threat' && (
        <section className="section-pad-lg threats-section-alt" id="spot-a-threat">
          <div className="container">

            {/* Header */}
            <div className="text-center mb-5">
              <div className="section-label mb-2">Interactive Training</div>
              <h2 className="fw-bold mb-2">Spot a Threat</h2>
              <p className="text-muted-cyber mx-auto mb-1" style={{ maxWidth: '56ch' }}>
                Think you can spot a scam? Take our quiz.
              </p>
              <p className="text-muted-cyber mx-auto mb-4" style={{ maxWidth: '58ch', fontSize: '0.88rem' }}>
                Click any scenario below to begin its 5-question interactive quiz. Each question
                displays a phone screenshot where you click to identify the real vs the threat.
              </p>
              <span className="pill mid">
                <span className="dot" /><span className="fw-bold" style={{ fontSize: '0.7rem' }}>EDUCATION MODE · Powered by WHTSIPA</span>
              </span>
            </div>

            {/* Quiz grid */}
            <div className="row g-3">
              {QUIZ_LIST.map(quiz => (
                <div key={quiz.slug} className="col-12 col-sm-6 col-lg-4">
                  <div className="quiz-card-item h-100">
                    <div className="d-flex align-items-start justify-content-between gap-3 mb-3">
                      <div className="icon-box">{quiz.emoji}</div>
                      <span className={`pill ${quiz.risk}`}>
                        <span className="dot" />
                        <span className="fw-bold" style={{ fontSize: '0.65rem' }}>{RISK_LABEL[quiz.risk]}</span>
                      </span>
                    </div>
                    <div className="fw-bold text-white mb-1">{quiz.title}</div>
                    <div className="text-muted-cyber small mb-3">{QUIZ_DATA[quiz.slug]?.desc}</div>
                    <button
                      className="btn btn-outline-cyber w-100 mt-auto"
                      onClick={() => setActiveQuiz(quiz.slug)}
                    >
                      <i className="bi bi-play-fill me-2"></i>Start Quiz
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* ════════════════════════════
          SECTION 2 — TYPES OF THREATS
          ════════════════════════════ */}
      {activeSection === 'types-of-threats' && (
        <section className="section-pad-lg" id="types-of-threats">
          <div className="container">

            {/* Header */}
            <div className="mb-5">
              <div className="section-label mb-2">Threat Intelligence</div>
              <h2 className="fw-bold mb-3">Types of Threats</h2>
              <p className="text-muted-cyber mb-2" style={{ maxWidth: '72ch' }}>
                In today's digital and interconnected world, companies, individuals and government
                organisations face relentless types of threats that drive millions online worldwide
                in search of immediate solutions.
              </p>
              <p className="text-muted-cyber mb-4" style={{ maxWidth: '72ch' }}>
                On our recent research we discovered a lot of companies and individuals shut down
                operations because of digital threats. <strong className="text-white">We have a solution.</strong>
              </p>
              {/* "BY WHTSIPA" in red as requested */}
              <div className="by-whtsipa-tag">BY WHTSIPA</div>
            </div>

            {/* Threats grid */}
            <h3 className="fw-bold mb-4" style={{ color: '#f0f4ff' }}>
              We offer services to various types of threats:
            </h3>
            <div className="row g-3">
              {TYPES_OF_THREATS.map(threat => {
                const ttId = threat.link ? TYPES_TO_TT_ID[threat.link] : null
                return (
                  <div key={threat.title} className="col-12 col-md-6 col-lg-4">
                    <div className="tot-threat-card h-100">
                      <div className="d-flex align-items-start justify-content-between gap-2 mb-2">
                        <div className="d-flex align-items-center gap-2">
                          <img
                            src={ICON_MAP[threat.icon]}
                            alt={threat.title}
                            className={`tot-threat-icon-img${INVERT_ICONS.has(threat.icon) ? ' tt-icon-invert' : ' tt-icon-natural'}`}
                          />
                          <span className="tot-threat-title">{threat.title}</span>
                        </div>
                        <span className={`pill ${threat.risk} flex-shrink-0`} style={{ fontSize: '0.62rem' }}>
                          <span className="dot" />{RISK_LABEL[threat.risk]}
                        </span>
                      </div>
                      <p className="tot-threat-desc">{threat.desc}</p>
                      {ttId ? (
                        <button
                          className="tot-learn-link"
                          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                          onClick={() => {
                            setActiveSection('threats-tools')
                            setTimeout(() => {
                              const el = document.getElementById(`tt-card-${ttId}`)
                              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                            }, 80)
                          }}
                        >
                          Learn more <i className="bi bi-arrow-right ms-1"></i>
                        </button>
                      ) : (
                        <Link to="/report" className="tot-learn-link">
                          Request help <i className="bi bi-arrow-right ms-1"></i>
                        </Link>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Purchase note */}
            <div className="tot-purchase-note mt-5">
              <div className="d-flex align-items-start gap-3">
                <span style={{ fontSize: '1.5rem' }}>🛒</span>
                <div>
                  <div className="fw-bold text-white mb-1">Purchase of All Self-Service Tools</div>
                  <p className="text-muted-cyber small mb-2">
                    We provide full demonstration versions after purchase. You will receive an email
                    with instructions on how to use the tools for your digital security needs.
                    Clear AI-powered demonstration videos are included so you can watch, practice
                    and confidently apply the techniques in your daily life.
                  </p>
                  <p className="text-muted-cyber small mb-3">
                    <strong className="text-white">Can't find your tool?</strong> Make a request below.
                  </p>
                  <Link to="/report" className="btn btn-alert btn-sm">
                    <i className="bi bi-send me-2"></i>Make a Request
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* ════════════════════════════
          SECTION 3 — THREATS & TOOLS
          ════════════════════════════ */}
      {activeSection === 'threats-tools' && (
        <section className="section-pad-lg threats-tools-section" id="threats-tools">
          <div className="container">

            {/* Header */}
            <div className="mb-5">
              <div className="tt-hero-red-bar-inline mb-3">
                <span>THREATS &amp; Tools</span>
              </div>
              <p style={{ color: 'rgba(233,243,255,0.78)', maxWidth: '70ch' }}>
                At <strong>Threats &amp; Tools</strong>, we assert that knowledge and tools are Digital Power —
                the strongest form of protection. Our Self-Defense Training Certifications program combines
                practical real-world training with high quality, secure software tools. It equips individuals,
                families, and business teams with the skills they need to handle real-world threats
                confidently and legally as signed.
              </p>
            </div>

            {/* 4 Info cards */}
            <div className="row g-4 mb-5">
              {[
                { icon: '🔍', title: 'Type of Threats',
                  desc: 'Understand the most common and emerging threats you may face online and in real life.' },
                { icon: '📊', title: 'Threat & Tool Analysis',
                  desc: 'Get insights on how specific threats work and which tools best protect against them. We analyze real scenarios, compare protection options and recommend the most suitable tools.' },
                { icon: '⚙️', title: 'How Our Tools Work',
                  desc: 'Learn how our recommended protection tools function online. Through simple explanations, step-by-step guides and demo videos you\'ll see how each tool operates.' },
                { icon: '📬', title: 'Request Tools',
                  desc: 'Need a specific tool? Submit your request here. Our AI assistant is available 24/7 and a live representative will personally review your request for personalized support.' },
              ].map(item => (
                <div key={item.title} className="col-6 col-md-6 col-lg-3">
                  <div className="tot-info-card">
                    <div className="tot-info-icon">{item.icon}</div>
                    <div className="tot-info-title">{item.title}</div>
                    <div className="tot-info-desc">{item.desc}</div>
                    <div className="by-whtsipa-tag mt-3">BY WHTSIPA</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Divider heading */}
            <div className="tt-section-divider mb-4">
              <div className="tt-section-divider-line" />
              <span className="tt-section-divider-label">Threats &amp; Tools</span>
              <div className="tt-section-divider-line" />
            </div>

            {/* Threats & Tools list */}
            <div className="d-flex flex-column gap-4">
              {THREATS_AND_TOOLS.map(threat => {
                const detailSlug = threat.slug ?? threat.id
                return (
                <div
                  key={threat.id}
                  id={`tt-card-${threat.id}`}
                  className="tt-card-new"
                  style={{ cursor: 'pointer' }}
                  onClick={(e) => {
                    // Don't navigate if they clicked the Request Tools button
                    if (e.target.closest('.tt-request-btn')) return
                    navigate(`/threats/${detailSlug}`)
                  }}
                >

                  {/* Top bar */}
                  <div className="tt-card-top">
                    <div className="tt-card-title">{threat.name}</div>
                    <div className="tt-card-meta">
                      <div className="tt-available-on">
                        <span className="tt-available-label">Available On</span>
                        <div className="tt-device-icons">
                          <i className="bi bi-display"></i>
                          <i className="bi bi-laptop"></i>
                          <i className="bi bi-tablet"></i>
                          <i className="bi bi-phone"></i>
                        </div>
                      </div>
                      <div className="tt-card-success">
                        <span className="tt-success-label">Success Rates:</span>
                        <span className="tt-success-value">{threat.successRate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="tt-card-body-new">
                    <div className="tt-card-left">
                      <p className="tt-card-desc">{threat.description}</p>
                      <div className="d-flex align-items-center gap-3 flex-wrap mb-3">
                        <div className="tt-how-label">How it works?</div>
                        <Link className="tt-request-btn" to="/report" state={{ scrollTo: 'contact' }}>
                          Request Tools
                        </Link>
                      </div>
                      <div className="tt-steps-row">
                        {threat.steps.map((step, i) => (
                          <div key={i} className="tt-step-card-dark">
                            <div className="tt-step-card-num">{i + 1}</div>
                            <div className="tt-step-card-title">{step.title}</div>
                            <div className="tt-step-card-desc">{step.desc}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="tt-card-icon-side">
                      <img
                        src={ICON_MAP[threat.icon]}
                        alt={threat.name}
                        className={`tt-card-icon-img${INVERT_ICONS.has(threat.icon) ? ' tt-icon-invert' : ' tt-icon-natural'}`}
                      />
                    </div>
                  </div>

                </div>
                )
              })}
            </div>

            {/* Can't find tool */}
            <div className="tot-purchase-note mt-5">
              <div className="d-flex align-items-start gap-3">
                <span style={{ fontSize: '1.5rem' }}>🔧</span>
                <div>
                  <div className="fw-bold text-white mb-1">Can't find your tool?</div>
                  <p className="text-muted-cyber small mb-3">
                    Our AI assistant is available 24/7 to guide you through options and answer your
                    questions instantly. A live representative will personally review and handle your
                    request for personalized recommendations and support.
                  </p>
                  <Link to="/report" className="btn btn-alert btn-sm">
                    <i className="bi bi-send me-2"></i>Make a Request
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* ════════════════════════════
          FINAL CTA
          ════════════════════════════ */}
      <section className="section-pad">
        <div className="container">
          <div className="banner p-4 p-md-5 text-center">
            <div className="section-label mb-3">Need Real Help?</div>
            <h2 className="fw-bold glow-text mb-3">Think You've Been Targeted?</h2>
            <p className="text-muted-cyber mb-4 mx-auto" style={{ maxWidth: '50ch' }}>
              If you've experienced any of these threats for real, don't wait.
              Report it now and let WHTSIP guide your recovery.
            </p>
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <Link className="btn btn-alert" to="/report">
                <i className="bi bi-exclamation-triangle me-2"></i>Report an Incident
              </Link>
              <Link className="btn btn-cyber" to="/report#recover">
                <i className="bi bi-shield-check me-2"></i>Start Recovery
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
