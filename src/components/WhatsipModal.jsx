/**
 * WhatsipModal — shared inline modal for:
 *   mode="hire"    → Hire Our Team intake form
 *   mode="report"  → Report This Threat form  
 *   mode="request" → Request Tools (WhatsApp / Telegram / form)
 *   mode="contact" → Contact WHTS (WhatsApp / Telegram / Email)
 *   mode="recovery" → View Recovery Steps (accordion, no auth needed)
 *
 * Requires user to be logged in (except recovery mode).
 * Placeholder contacts — swap WHATSAPP_NUMBER and TELEGRAM_USERNAME when real ones arrive.
 */
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './WhatsipModal.css'

/* ── Real contact details ── */
const WHATSAPP_NUMBER   = '19293816441'
const TELEGRAM_USERNAME = 'WHTSIPA_DigitalTools'
const SUPPORT_EMAIL     = 'support@whtsipa.com'

/* Generate a ticket ID */
const genTicketId = () => {
  const d = new Date()
  const datePart = `${d.getFullYear()}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}`
  const rand = Math.floor(10000 + Math.random() * 90000)
  return `WHTSIPA-TKT-${datePart}-${rand}`
}

export default function WhatsipModal({ mode, onClose, threatTitle = '' }) {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [ticketId]       = useState(genTicketId)
  const [step, setStep]  = useState('main')   // 'main' | 'form' | 'success'
  const [form, setForm]  = useState({
    summary: '', services: [], duration: 'One-Time Assistance',
    goals: '', name: user?.firstName || user?.name || '',
    email: user?.email || '', phone: '', contactMethod: 'WhatsApp',
    evidence: null,
  })

  // Pre-fill user info when user changes
  useEffect(() => {
    if (user) {
      setForm(f => ({
        ...f,
        name: f.name || (user.firstName || user.name || ''),
        email: f.email || user.email || '',
      }))
    }
  }, [user])

  const waMessage = encodeURIComponent(
    `Hello WHTSIPA Team,\n\nTicket ID: ${ticketId}\nThreat: ${threatTitle || 'General Inquiry'}\nI need assistance.\n\n— ${user?.email || 'Guest'}`
  )
  const tgMessage = encodeURIComponent(
    `Hello WHTSIPA! Ticket: ${ticketId} | Threat: ${threatTitle || 'General'}`
  )
  const waLink   = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`
  const tgLink   = `https://t.me/${TELEGRAM_USERNAME}`
  const mailLink = `mailto:${SUPPORT_EMAIL}?subject=WHTSIPA%20Support%20%7C%20${ticketId}&body=Ticket%20ID%3A%20${ticketId}%0AThreat%3A%20${encodeURIComponent(threatTitle || 'General')}`

  /* Auth gate */
  if (!user && mode !== 'recovery') {
    return (
      <div className="wm-overlay" onClick={onClose}>
        <div className="wm-modal" onClick={e => e.stopPropagation()}>
          <button className="wm-close" onClick={onClose}><i className="bi bi-x-lg"></i></button>
          <div className="wm-auth-gate">
            <div className="wm-auth-icon"><i className="bi bi-shield-lock-fill"></i></div>
            <h3 className="wm-auth-title">Sign Up to Continue</h3>
            <p className="wm-auth-desc">
              You must create a free account and verify your email before you can submit
              any report, hire our team, or contact support. This ensures secure tracking
              and personalized service.
            </p>
            <div className="wm-auth-ticket">
              Your Ticket ID will be: <strong>{ticketId}</strong>
              <br/><small>Save this — it will be yours after sign up.</small>
            </div>
            <div className="d-flex gap-2 flex-wrap justify-content-center mt-3">
              <button className="btn btn-cyber" onClick={() => { onClose(); navigate('/signup') }}>
                <i className="bi bi-person-plus me-2"></i>Create Free Account
              </button>
              <button className="btn btn-outline-cyber" onClick={() => { onClose(); navigate('/signin') }}>
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  /* ── RECOVERY MODE — inline accordion, no auth ── */
  if (mode === 'recovery') {
    const steps = threatTitle
      ? [
          { n: 1, title: 'Stop & Secure', desc: 'Immediately disconnect the affected device from the internet. Change all passwords from a safe, unaffected device.' },
          { n: 2, title: 'Document Everything', desc: 'Screenshot all evidence — messages, transactions, profiles. Note dates, amounts, and any contact details of the scammer.' },
          { n: 3, title: 'Report Internally', desc: 'Report to your bank, platform (e.g. Instagram, PayPal), and local cybercrime authority. Use our Report This Threat button.' },
          { n: 4, title: 'Contact WHTSIPA', desc: 'Submit a full incident report via WhatsApp or Telegram. Our team will assign a specialist and begin your recovery case.' },
          { n: 5, title: 'Monitor & Protect', desc: 'Set up account alerts, enable 2FA everywhere, and follow up with our team for ongoing monitoring and closure.' },
        ]
      : []
    return (
      <div className="wm-overlay" onClick={onClose}>
        <div className="wm-modal wm-recovery" onClick={e => e.stopPropagation()}>
          <button className="wm-close" onClick={onClose}><i className="bi bi-x-lg"></i></button>
          <div className="wm-header">
            <i className="bi bi-shield-check wm-header-icon" style={{ color: '#22d3ee' }}></i>
            <div>
              <div className="wm-mode-label">Recovery Guide</div>
              <h3 className="wm-title">View Recovery Steps</h3>
              <p className="wm-subtitle">Step-by-step recovery for: <strong>{threatTitle || 'this threat'}</strong></p>
            </div>
          </div>
          <div className="wm-steps-list">
            {steps.map(s => (
              <div key={s.n} className="wm-recovery-step">
                <div className="wm-step-num">{s.n}</div>
                <div>
                  <div className="wm-step-title">{s.title}</div>
                  <div className="wm-step-desc">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="wm-recovery-cta">
            <p className="wm-subtitle">Need personalised recovery support?</p>
            <div className="d-flex gap-2 flex-wrap">
              <a href={waLink} target="_blank" rel="noreferrer" className="wm-channel-btn wm-wa">
                <i className="bi bi-whatsapp"></i>WhatsApp (24/7)
              </a>
              <a href={tgLink} target="_blank" rel="noreferrer" className="wm-channel-btn wm-tg">
                <i className="bi bi-telegram"></i>Telegram
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  /* ── CONTACT / HIRE — channel picker ── */
  if (mode === 'contact' || (mode === 'hire' && step === 'main')) {
    return (
      <div className="wm-overlay" onClick={onClose}>
        <div className="wm-modal" onClick={e => e.stopPropagation()}>
          <button className="wm-close" onClick={onClose}><i className="bi bi-x-lg"></i></button>
          <div className="wm-header">
            <i className={`bi ${mode === 'hire' ? 'bi-headset' : 'bi-chat-dots'} wm-header-icon`}></i>
            <div>
              <div className="wm-mode-label">{mode === 'hire' ? 'Hire Our Team' : 'Contact WHTSIPA'}</div>
              <h3 className="wm-title">{mode === 'hire' ? 'Connect With Our Experts' : 'Reach Us Instantly'}</h3>
              <p className="wm-subtitle">Choose how you'd like to connect.</p>
            </div>
          </div>
          <div className="wm-ticket-ref">
            <i className="bi bi-ticket-perforated me-2"></i>
            Your Ticket Reference: <strong>{ticketId}</strong>
          </div>
          <div className="wm-channels">
            <a href={waLink} target="_blank" rel="noreferrer" className="wm-channel-btn wm-wa">
              <i className="bi bi-whatsapp"></i>
              <span>
                <strong>WhatsApp</strong>
                <small>24/7 support — fastest response</small>
              </span>
              <i className="bi bi-arrow-right ms-auto"></i>
            </a>
            <a href={tgLink} target="_blank" rel="noreferrer" className="wm-channel-btn wm-tg">
              <i className="bi bi-telegram"></i>
              <span>
                <strong>Telegram</strong>
                <small>Instant messaging support</small>
              </span>
              <i className="bi bi-arrow-right ms-auto"></i>
            </a>
            <a href={mailLink} className="wm-channel-btn wm-email">
              <i className="bi bi-envelope"></i>
              <span>
                <strong>Email Us</strong>
                <small>{SUPPORT_EMAIL}</small>
              </span>
              <i className="bi bi-arrow-right ms-auto"></i>
            </a>
            {mode === 'hire' && (
              <button className="wm-channel-btn wm-form" onClick={() => setStep('form')}>
                <i className="bi bi-file-earmark-text"></i>
                <span>
                  <strong>Submit Hire Request Form</strong>
                  <small>Structured intake form — creates a ticket</small>
                </span>
                <i className="bi bi-arrow-right ms-auto"></i>
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  /* ── REQUEST TOOLS ── */
  if (mode === 'request' && step === 'main') {
    return (
      <div className="wm-overlay" onClick={onClose}>
        <div className="wm-modal" onClick={e => e.stopPropagation()}>
          <button className="wm-close" onClick={onClose}><i className="bi bi-x-lg"></i></button>
          <div className="wm-header">
            <i className="bi bi-tools wm-header-icon" style={{ color: '#f59e0b' }}></i>
            <div>
              <div className="wm-mode-label">Request Tools</div>
              <h3 className="wm-title">Get Advanced Security Tools</h3>
              <p className="wm-subtitle">Choose your preferred way to request tools.</p>
            </div>
          </div>
          <div className="wm-ticket-ref">
            <i className="bi bi-ticket-perforated me-2"></i>
            Your Ticket Reference: <strong>{ticketId}</strong>
          </div>
          <div className="wm-channels">
            <a href={waLink} target="_blank" rel="noreferrer" className="wm-channel-btn wm-wa">
              <i className="bi bi-whatsapp"></i>
              <span>
                <strong>WhatsApp</strong>
                <small>Pre-filled message with your Ticket ID</small>
              </span>
              <i className="bi bi-arrow-right ms-auto"></i>
            </a>
            <a href={tgLink} target="_blank" rel="noreferrer" className="wm-channel-btn wm-tg">
              <i className="bi bi-telegram"></i>
              <span>
                <strong>Telegram</strong>
                <small>Pre-filled message with your Ticket ID</small>
              </span>
              <i className="bi bi-arrow-right ms-auto"></i>
            </a>
            <button className="wm-channel-btn wm-form" onClick={() => setStep('form')}>
              <i className="bi bi-file-earmark-text"></i>
              <span>
                <strong>Submit Request Form</strong>
                <small>Structured form — creates a support ticket</small>
              </span>
              <i className="bi bi-arrow-right ms-auto"></i>
            </button>
          </div>
        </div>
      </div>
    )
  }

  /* ── REPORT FORM / HIRE FORM / REQUEST FORM ── */
  if (step === 'form' || mode === 'report') {
    const isReport  = mode === 'report'
    const isHire    = mode === 'hire'
    const isRequest = mode === 'request'

    const title  = isReport ? 'Report This Threat' : isHire ? 'Submit Hire Request' : 'Submit Tool Request'
    const icon   = isReport ? 'bi-send' : isHire ? 'bi-headset' : 'bi-tools'
    const submit = isReport ? 'Submit Report' : isHire ? 'Create Ticket & Connect' : 'Send Request'

    const SERVICE_OPTIONS = isHire
      ? ['Scammer Tracking & Investigation', 'Full Recovery Support', 'Evidence Analysis & Reporting',
         'Law Enforcement / Insurance Documentation', 'Ongoing Protection & Monitoring', 'Other (please specify)']
      : []

    const handleSubmit = (e) => {
      e.preventDefault()
      // Backend integration point — POST to /api/reports or /api/tickets
      // For now: simulate success
      setStep('success')
    }

    if (step === 'success') {
      return (
        <div className="wm-overlay" onClick={onClose}>
          <div className="wm-modal" onClick={e => e.stopPropagation()}>
            <button className="wm-close" onClick={onClose}><i className="bi bi-x-lg"></i></button>
            <div className="wm-success">
              <div className="wm-success-icon"><i className="bi bi-check-circle-fill"></i></div>
              <h3 className="wm-success-title">Ticket Created!</h3>
              <div className="wm-ticket-ref wm-ticket-large">{ticketId}</div>
              <p className="wm-success-desc">
                Our specialist will assist you shortly. You'll be connected via your preferred
                contact method. Please keep your Ticket ID for reference.
              </p>
              <div className="d-flex gap-2 flex-wrap justify-content-center">
                <a href={waLink} target="_blank" rel="noreferrer" className="wm-channel-btn wm-wa">
                  <i className="bi bi-whatsapp"></i>Continue on WhatsApp
                </a>
                <a href={tgLink} target="_blank" rel="noreferrer" className="wm-channel-btn wm-tg">
                  <i className="bi bi-telegram"></i>Continue on Telegram
                </a>
              </div>
              <button className="btn btn-outline-cyber mt-3 w-100" onClick={onClose}>Close</button>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="wm-overlay" onClick={onClose}>
        <div className="wm-modal wm-form-modal" onClick={e => e.stopPropagation()}>
          <button className="wm-close" onClick={onClose}><i className="bi bi-x-lg"></i></button>
          <div className="wm-header">
            <i className={`bi ${icon} wm-header-icon`}></i>
            <div>
              <div className="wm-mode-label">WHTSIPA Support Ticket</div>
              <h3 className="wm-title">{title}</h3>
            </div>
          </div>
          <div className="wm-ticket-ref">
            <i className="bi bi-ticket-perforated me-2"></i>
            Ticket: <strong>{ticketId}</strong> — Save this reference number.
          </div>

          <form className="wm-form" onSubmit={handleSubmit}>
            {/* Incident Summary */}
            <div className="wm-field">
              <label>Incident / Case Summary <span className="wm-required">*</span></label>
              <textarea
                rows={3}
                placeholder="Briefly describe the issue or threat you're experiencing..."
                value={form.summary}
                onChange={e => setForm(f => ({ ...f, summary: e.target.value }))}
                required
              />
            </div>

            {/* Services (hire only) */}
            {isHire && (
              <div className="wm-field">
                <label>Services Requested</label>
                <div className="wm-checkboxes">
                  {SERVICE_OPTIONS.map(opt => (
                    <label key={opt} className="wm-checkbox-item">
                      <input
                        type="checkbox"
                        checked={form.services.includes(opt)}
                        onChange={e => setForm(f => ({
                          ...f,
                          services: e.target.checked
                            ? [...f.services, opt]
                            : f.services.filter(s => s !== opt)
                        }))}
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Engagement Duration (hire) */}
            {isHire && (
              <div className="wm-field">
                <label>Desired Engagement Duration</label>
                <select value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))}>
                  {['One-Time Assistance (single incident)', '7 Days', '30 Days', '90 Days', 'Ongoing / Retainer', 'Other (specify)'].map(o => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Goals */}
            <div className="wm-field">
              <label>{isHire ? 'Specific Goals / What You Need Help With' : isRequest ? 'Tools Required / Goals' : 'What Happened — Detailed Description'} <span className="wm-required">*</span></label>
              <textarea
                rows={3}
                placeholder={isHire ? 'Describe outcomes you want...' : isRequest ? 'List the tools or features you need...' : 'Provide as much detail as possible...'}
                value={form.goals}
                onChange={e => setForm(f => ({ ...f, goals: e.target.value }))}
                required
              />
            </div>

            {/* Contact Information */}
            <div className="wm-field">
              <label>Contact Information</label>
              <div className="wm-row">
                <input placeholder="Full Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
                <input type="email" placeholder="Email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
              </div>
              <input placeholder="Phone / WhatsApp number" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
            </div>

            {/* Preferred Contact Method */}
            <div className="wm-field">
              <label>Preferred Contact Method</label>
              <div className="wm-radio-row">
                {['WhatsApp', 'Telegram', 'Email', 'Live Chat'].map(m => (
                  <label key={m} className="wm-radio-item">
                    <input type="radio" name="contactMethod" value={m} checked={form.contactMethod === m}
                      onChange={() => setForm(f => ({ ...f, contactMethod: m }))} />
                    <span>{m}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Evidence Upload */}
            <div className="wm-field">
              <label>Evidence Upload <span className="wm-optional">(optional)</span></label>
              <input
                type="file"
                multiple
                accept="image/*,.pdf,.txt,.doc,.docx"
                className="wm-file-input"
                onChange={e => setForm(f => ({ ...f, evidence: e.target.files }))}
              />
              <small className="wm-hint">Screenshots, transaction records, emails, etc. Secure &amp; encrypted.</small>
            </div>

            <button type="submit" className="btn btn-alert w-100 mt-2">
              <i className="bi bi-send me-2"></i>{submit}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return null
}
