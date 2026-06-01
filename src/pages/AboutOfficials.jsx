import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/cyber.css'
import './About.css'
import theEquationPoster from '../assets/media/the-equation-image.png'
import lazarusPoster from '../assets/media/lazarus-image.png'


const OFFICIALS = [
  {
    id: 'equation',
    name: 'The Equation Group',
    codename: 'EQUATION',
    type: 'Nation-State Threat Actor',
    origin: 'United States',
    since: 'Est. 2001',
    description: 'Considered the most sophisticated cyber-espionage group ever discovered. Linked to the NSA\'s Tailored Access Operations unit, the Equation Group pioneered firmware-level implants and zero-day exploits that remain unmatched in complexity.',
    capabilities: ['Firmware-level persistence', 'Zero-day exploit development', 'Air-gap bridging', 'Custom malware frameworks'],
    threat: 'EXTREME',
    videoUrl: 'https://res.cloudinary.com/dqch0tjrm/video/upload/v1780028564/the-equation_z7elph.mp4', 
    poster: theEquationPoster,
    color: '#3b82f6',
  },
  {
    id: 'anonymous',
    name: 'Anonymous',
    codename: 'ANONYMOUS',
    type: 'Hacktivist Collective',
    origin: 'Global',
    since: 'Est. 2003',
    description: 'A decentralized international hacktivist collective known for coordinated cyber attacks against governments, corporations, and institutions perceived as corrupt. Operates through social media coordination with no central leadership.',
    capabilities: ['DDoS campaigns', 'Data exfiltration', 'Website defacement', 'Doxxing operations'],
    threat: 'HIGH',
    videoUrl: 'https://res.cloudinary.com/dqch0tjrm/video/upload/v1780028564/the-equation_z7elph.mp4',
    poster: theEquationPoster,
    color: '#6b7280',
  },
  {
    id: 'virus',
    name: 'Virus',
    codename: 'VIRUS',
    type: 'Malware Development Group',
    origin: 'Eastern Europe',
    since: 'Est. 2010',
    description: 'A prolific malware development and distribution network responsible for some of the most destructive ransomware and banking trojans deployed globally. Known for constant evolution to evade detection.',
    capabilities: ['Ransomware development', 'Banking trojan deployment', 'Botnet operations', 'Cryptomining malware'],
    threat: 'HIGH',
    videoUrl: 'https://res.cloudinary.com/dqch0tjrm/video/upload/v1780028564/the-equation_z7elph.mp4',
    poster: theEquationPoster,
    color: '#ef4444',
  },
  {
    id: 'lazarus',
    name: 'Lazarus Group',
    codename: 'LAZARUS',
    type: 'Nation-State APT',
    origin: 'North Korea',
    since: 'Est. 2007',
    description: 'A North Korean state-sponsored advanced persistent threat group responsible for some of the largest financial cyber heists in history, including the $81M Bangladesh Bank theft and widespread cryptocurrency theft.',
    capabilities: ['Financial system targeting', 'Cryptocurrency theft', 'Destructive wiper attacks', 'Supply chain compromise'],
    threat: 'EXTREME',
    videoUrl: 'https://res.cloudinary.com/dqch0tjrm/video/upload/vc_h264/v1780248016/lazarus_nhudt2.mp4',
    poster: lazarusPoster,
    color: '#a855f7',
  },
  {
    id: 'shadow-brokers',
    name: 'The Shadow Brokers',
    codename: 'SHADOW BROKERS',
    type: 'Exploit Broker / Threat Actor',
    origin: 'Unknown',
    since: 'Est. 2016',
    description: 'A mysterious threat actor that leaked classified NSA hacking tools including EternalBlue — the exploit that powered the WannaCry and NotPetya attacks affecting hundreds of thousands of systems worldwide.',
    capabilities: ['Classified exploit leaking', 'NSA tool exfiltration', 'Zero-day brokering', 'Critical infrastructure targeting'],
    threat: 'EXTREME',
    videoUrl: 'https://res.cloudinary.com/dqch0tjrm/video/upload/v1780028564/the-equation_z7elph.mp4',
    poster: theEquationPoster,
    color: '#f59e0b',
  },
  {
    id: 'apt29',
    name: 'APT29 (Cozy Bear)',
    codename: 'APT29',
    type: 'Nation-State APT',
    origin: 'Russia (SVR)',
    since: 'Est. 2008',
    description: 'A Russian intelligence-linked advanced persistent threat group responsible for the SolarWinds supply chain attack, the DNC breach, and ongoing espionage campaigns against governments, think tanks, and COVID-19 vaccine researchers.',
    capabilities: ['Supply chain attacks', 'Long-term stealth persistence', 'Government espionage', 'Cloud infrastructure abuse'],
    threat: 'EXTREME',
    videoUrl: 'https://res.cloudinary.com/dqch0tjrm/video/upload/v1780028564/the-equation_z7elph.mp4',
    poster: theEquationPoster,
    color: '#22c55e',
  },
]

const THREAT_COLORS = {
  'EXTREME': { bg: '#fef2f2', border: '#fca5a5', text: '#dc2626' },
  'HIGH':    { bg: '#fffbeb', border: '#fde68a', text: '#d97706' },
}

// ── Mini video player for each official ──
function OfficialPlayer({ official }) {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const fmt = (s) => {
    if (!s || isNaN(s)) return '0:00'
    return `${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,'0')}`
  }

  const toggle = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) { v.play(); setIsPlaying(true) }
    else { v.pause(); setIsPlaying(false) }
  }

  const seek = (e) => {
    const v = videoRef.current
    if (!v) return
    const r = e.currentTarget.getBoundingClientRect()
    v.currentTime = ((e.clientX - r.left) / r.width) * v.duration
  }

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const onTime = () => { setCurrentTime(v.currentTime); setProgress((v.currentTime/v.duration)*100||0) }
    const onMeta = () => setDuration(v.duration)
    const onEnd  = () => setIsPlaying(false)
    v.addEventListener('timeupdate', onTime)
    v.addEventListener('loadedmetadata', onMeta)
    v.addEventListener('ended', onEnd)
    return () => { v.removeEventListener('timeupdate', onTime); v.removeEventListener('loadedmetadata', onMeta); v.removeEventListener('ended', onEnd) }
  }, [])

  useEffect(() => { if (videoRef.current) videoRef.current.muted = muted }, [muted])

  const tc = THREAT_COLORS[official.threat]

  return (
    <div className="official-player-card">

      {/* ── Video frame ── */}
      <div className="official-player-frame" onClick={toggle} style={{ borderColor: official.color + '44' }}>
        <video
          ref={videoRef}
          className="official-player-video"
          src={official.videoUrl}
          playsInline
          preload="metadata"
          poster={official.poster}
        />

        {/* Gradient */}
        <div className="official-player-gradient" />

        {/* Codename watermark */}
        <div className="official-player-watermark" style={{ color: official.color + '55' }}>
          {official.codename}
        </div>

        {/* Play overlay */}
        {!isPlaying && (
          <div className="official-player-overlay">
            <button className="official-play-btn" style={{ borderColor: official.color, background: official.color + '22' }}>
              <i className="bi bi-play-fill" style={{ color: official.color }}></i>
            </button>
          </div>
        )}
      </div>

      {/* ── Controls ── */}
      <div className="official-player-controls">
        <button className="official-ctrl" onClick={toggle}>
          <i className={`bi ${isPlaying ? 'bi-pause-fill' : 'bi-play-fill'}`}></i>
        </button>
        <div className="official-ctrl-progress" onClick={seek}>
          <div className="official-progress-track">
            <div className="official-progress-fill" style={{ width: `${progress}%`, background: official.color }} />
          </div>
        </div>
        <span className="official-ctrl-time">{fmt(currentTime)}</span>
        <button className="official-ctrl" onClick={() => setMuted(p => !p)}>
          <i className={`bi ${muted ? 'bi-volume-mute-fill' : 'bi-volume-up-fill'}`}></i>
        </button>
      </div>

      {/* ── Caption / info ── */}
      <div className="official-caption">
        <div className="d-flex align-items-start justify-content-between gap-2 mb-2">
          <div>
            <div className="official-caption-codename" style={{ color: official.color }}>
              {official.codename}
            </div>
            <div className="official-caption-name">{official.name}</div>
            <div className="official-caption-type">{official.type} · {official.origin}</div>
          </div>
          <span className="official-threat-badge" style={{ background: tc.bg, borderColor: tc.border, color: tc.text }}>
            {official.threat}
          </span>
        </div>

        <p className="official-caption-desc">{official.description}</p>

        <div className="official-caption-capabilities">
          <div className="official-cap-label">Key Capabilities</div>
          <div className="d-flex flex-wrap gap-1 mt-1">
            {official.capabilities.map(c => (
              <span key={c} className="official-cap-tag">{c}</span>
            ))}
          </div>
        </div>

        <div className="official-caption-since">{official.since}</div>
      </div>

    </div>
  )
}

export default function AboutOfficials() {
  return (
    <div className="page-light">

      {/* ── Hero ── */}
      <header className="about-hero">
        <div className="container text-center" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
          <div className="section-label mb-2">The Officials</div>
          <h1 className="fw-bold mb-3" style={{ color: '#0f172a', fontSize: 'clamp(1.8rem,3vw,2.8rem)', lineHeight: 1.1 }}>
            Meet The Six Officials
          </h1>
          <p className="mx-auto mb-4" style={{ maxWidth: '60ch', fontSize: '1.05rem', color: '#4a5568' }}>
            WHTSIPA tracks and monitors six elite threat actor groups — the most sophisticated
            cyber operations in the world. Understanding them is the first step to staying protected.
          </p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <Link className="btn btn-primary px-4" to="/about" style={{ borderRadius: 12, fontWeight: 600 }}>
              <i className="bi bi-arrow-left me-2"></i>About WHTS
            </Link>
            <Link className="btn btn-danger px-4" to="/report" style={{ borderRadius: 12, fontWeight: 600 }}>
              <i className="bi bi-exclamation-triangle me-2"></i>Report an Incident
            </Link>
          </div>
        </div>
      </header>

      {/* ── Officials video grid ── */}
      <section className="section-pad-lg" style={{ background: '#ffffff' }}>
        <div className="container">
          <div className="row g-5">
            {OFFICIALS.map(official => (
              <div key={official.id} className="col-12 col-lg-6">
                <OfficialPlayer official={official} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-pad" style={{ background: '#f8fafc' }}>
        <div className="container">
          <div className="about-cta-banner p-4 p-md-5 text-center">
            <div className="section-label mb-3">Stay Informed</div>
            <h2 className="fw-bold mb-3" style={{ color: '#0f172a' }}>
              These threats are real. Your protection matters.
            </h2>
            <p className="mb-4 mx-auto" style={{ maxWidth: '50ch', color: '#4a5568' }}>
              WHTSIPA actively monitors all six groups. If you suspect you've been targeted
              by any of these actors, report it immediately.
            </p>
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <Link className="btn btn-danger px-4" to="/report" style={{ borderRadius: 12, fontWeight: 600 }}>
                <i className="bi bi-exclamation-triangle me-2"></i>Report an Incident
              </Link>
              <Link className="btn btn-outline-secondary px-4" to="/threats" style={{ borderRadius: 12, fontWeight: 600 }}>
                <i className="bi bi-grid me-2"></i>Threat Library
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
