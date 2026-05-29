import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/cyber.css'
import './Contact.css'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    // ── BACKEND: POST /api/contact with form data ──
    setSubmitted(true)
  }

  return (
    <div className="page-light">

      <header className="template-hero contact-template-hero">
        <div className="container">
          <nav aria-label="breadcrumb" className="template-breadcrumb">
            <Link to="/">Home</Link>
            <span>Contact us</span>
          </nav>
          <div className="row align-items-center g-4">
            <div className="col-12 col-lg-7">
              <h1 className="template-hero-title">Contact us</h1>
              <p className="template-hero-copy">
                Get support, ask a question, or reach our active representative
                for urgent cybersecurity help.
              </p>
            </div>
            <div className="col-12 col-lg-5">
              <div className="template-hero-art" aria-hidden="true">
                <div className="art-desk"></div>
                <div className="art-person art-person-left">
                  <span className="art-head"></span>
                  <span className="art-body"></span>
                  <span className="art-laptop"></span>
                </div>
                <div className="art-person art-person-right">
                  <span className="art-head"></span>
                  <span className="art-body"></span>
                  <span className="art-paper"></span>
                </div>
                <div className="art-shield"><i className="bi bi-chat-dots"></i></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="section-pad-lg" style={{ background: '#ffffff' }}>
        <div className="container">
          <div className="row g-4">

            {/* Contact form */}
            <div className="col-12 col-lg-7">
              {submitted ? (
                <div className="about-cta-banner p-5 text-center">
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                  <h3 className="fw-bold mb-3" style={{ color: '#0f172a' }}>Message Sent</h3>
                  <p className="mb-4" style={{ color: '#4a5568' }}>
                    Thank you for reaching out. Our team will get back to you as soon as possible.
                  </p>
                  <button className="btn btn-outline-primary" style={{ borderRadius: 12 }}
                    onClick={() => { setSubmitted(false); setForm({ name:'', email:'', subject:'', message:'' }) }}>
                    Send Another Message
                  </button>
                </div>
              ) : (
                <div className="contact-form-card p-4 p-md-5">
                  <h3 className="fw-bold mb-4" style={{ color: '#0f172a' }}>Send us a Message</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                      <div className="col-12 col-sm-6">
                        <label className="contact-label">Full Name</label>
                        <div className="contact-input-wrap">
                          <i className="bi bi-person contact-icon"></i>
                          <input className="contact-field ps-contact" type="text"
                            placeholder="Your full name" value={form.name} onChange={set('name')} required />
                        </div>
                      </div>
                      <div className="col-12 col-sm-6">
                        <label className="contact-label">Email Address</label>
                        <div className="contact-input-wrap">
                          <i className="bi bi-envelope contact-icon"></i>
                          <input className="contact-field ps-contact" type="email"
                            placeholder="you@example.com" value={form.email} onChange={set('email')} required />
                        </div>
                      </div>
                      <div className="col-12">
                        <label className="contact-label">Subject</label>
                        <div className="contact-input-wrap">
                          <i className="bi bi-chat-left-text contact-icon"></i>
                          <input className="contact-field ps-contact" type="text"
                            placeholder="What is this about?" value={form.subject} onChange={set('subject')} required />
                        </div>
                      </div>
                      <div className="col-12">
                        <label className="contact-label">Message</label>
                        <textarea className="contact-field" rows={5}
                          placeholder="Type your message here..."
                          value={form.message} onChange={set('message')} required />
                      </div>
                      <div className="col-12">
                        <button type="submit" className="btn btn-primary w-100" style={{ padding: '0.85rem', borderRadius: 12, fontWeight: 600 }}>
                          <i className="bi bi-send me-2"></i>Send Message
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </div>

            {/* Contact info sidebar */}
            <div className="col-12 col-lg-5">
              <div className="d-flex flex-column gap-3">

                <div className="about-cta-banner p-4">
                  <div className="section-label mb-2">Emergency Support</div>
                  <h4 className="fw-bold mb-2" style={{ color: '#0f172a' }}>Need Help Right Now?</h4>
                  <p className="mb-3" style={{ color: '#4a5568', fontSize: '0.9rem' }}>
                    If you're actively experiencing a cybersecurity incident, don't wait —
                    use our secure reporting portal immediately.
                  </p>
                  <Link className="btn btn-danger w-100" to="/report" style={{ borderRadius: 12, fontWeight: 600 }}>
                    <i className="bi bi-exclamation-triangle me-2"></i>Report an Incident
                  </Link>
                </div>

                <div className="contact-info-card p-4">
                  <div className="fw-bold mb-3" style={{ color: '#0f172a' }}>Other Ways to Reach Us</div>
                  <div className="d-flex flex-column gap-3">
                    <div className="d-flex align-items-center gap-3">
                      <div className="contact-icon-box" style={{ background: '#e8f4fd', border: '1px solid #bee3f8' }}>
                        <i className="bi bi-telegram" style={{ color: '#0088cc' }}></i>
                      </div>
                      <div>
                        <div className="fw-bold small" style={{ color: '#0f172a' }}>Telegram</div>
                        {/* ── CLIENT: Replace with actual Telegram link ── */}
                        <a href="https://t.me/WHTS_support" target="_blank" rel="noopener noreferrer"
                          style={{ color: '#4a5568', fontSize: '0.85rem', textDecoration: 'none' }}>
                          @WHTS_support
                        </a>
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                      <div className="contact-icon-box">
                        <i className="bi bi-globe" style={{ color: '#1d4ed8' }}></i>
                      </div>
                      <div>
                        <div className="fw-bold small" style={{ color: '#0f172a' }}>Official Website</div>
                        <a href="https://wehelptrackscammersipaddress.com" target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: '#4a5568', fontSize: '0.85rem', textDecoration: 'none' }}>
                          wehelptrackscammersipaddress.com
                        </a>
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                      <div className="contact-icon-box">💬</div>
                      <div>
                        <div className="fw-bold small" style={{ color: '#0f172a' }}>Live Chat</div>
                        <div style={{ color: '#4a5568', fontSize: '0.85rem' }}>Available on the Report page — a representative joins urgent cases.</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="contact-info-card p-4">
                  <div className="fw-bold mb-3 small" style={{ color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Response Time
                  </div>
                  <div className="d-flex gap-3">
                    <div className="contact-stat flex-1 text-center">
                      <div className="contact-stat-value">24/7</div>
                      <div style={{ color: '#6b7280', fontSize: '0.8rem', marginTop: '0.25rem' }}>Emergency reports</div>
                    </div>
                    <div className="contact-stat flex-1 text-center">
                      <div className="contact-stat-value">48h</div>
                      <div style={{ color: '#6b7280', fontSize: '0.8rem', marginTop: '0.25rem' }}>General enquiries</div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
