import { useState, useEffect, useRef } from 'react'
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import logoWhts from '../assets/media/logo-whts.jpg'
import { THREAT_DATA } from '../data/threatData'
import './Navbar.css'

/* ── Build a flat search index from threatData ── */
const SEARCH_INDEX = [
  { title: 'Home', desc: 'Cybersecurity intelligence platform — protect yourself online', path: '/' },
  { title: 'Threats', desc: 'Browse all cyber threat categories and scenarios', path: '/threats' },
  { title: 'Report an Incident', desc: 'Submit a cybercrime or scam report', path: '/report' },
  { title: 'About WHTSIPA', desc: 'Learn who we are, our mission and government alignment', path: '/about' },
  { title: 'The Officials', desc: 'Meet the team and cybersecurity partners', path: '/about-officials' },
  { title: 'For Victims & Government', desc: 'Guidance for victims and government agencies', path: '/for-victims-government' },
  { title: 'Essential Eight', desc: 'The essential eight cybersecurity strategies', path: '/essential-eight' },
  { title: 'Knowledge Base', desc: 'Articles, tips and awareness resources', path: '/blog' },
  { title: 'Contact Us', desc: 'Get in touch with the WHTSIPA team', path: '/contact' },
  { title: 'Recover Now', desc: 'Start your asset and identity recovery process', path: '/report' },
  ...Object.entries(THREAT_DATA || {}).map(([slug, t]) => ({
    title: t.title || '',
    desc: t.overview ? t.overview.slice(0, 100) : '',
    path: `/threats/${slug}`,
  })).filter(t => t.title),
]

function SearchOverlay({ onClose }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const inputRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => { inputRef.current?.focus() }, [])

  useEffect(() => {
    const q = query.trim().toLowerCase()
    if (!q) { setResults([]); return }
    setResults(
      SEARCH_INDEX.filter(item =>
        item.title.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q)
      ).slice(0, 8)
    )
  }, [query])

  const go = (path) => { navigate(path); onClose() }

  return (
    <div className="search-overlay" onClick={onClose}>
      <div className="search-modal" onClick={e => e.stopPropagation()}>
        <div className="search-modal-header">
          <i className="bi bi-search search-modal-icon" />
          <input
            ref={inputRef}
            className="search-modal-input"
            placeholder="Search threats, topics, pages…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Escape') onClose()
              if (e.key === 'Enter' && results.length > 0) go(results[0].path)
            }}
          />
          <button className="search-modal-close" onClick={onClose} aria-label="Close search">
            <i className="bi bi-x-lg" />
          </button>
        </div>
        {results.length > 0 && (
          <ul className="search-results">
            {results.map((r, i) => (
              <li key={i}>
                <button className="search-result-item" onClick={() => go(r.path)}>
                  <span className="search-result-title">{r.title}</span>
                  {r.desc && <span className="search-result-desc">{r.desc}</span>}
                </button>
              </li>
            ))}
          </ul>
        )}
        {query.trim() && results.length === 0 && (
          <div className="search-no-results">No results for "<strong>{query}</strong>"</div>
        )}
        {!query.trim() && (
          <div className="search-hint">
            <span>Try: <button className="search-hint-tag" onClick={() => setQuery('phishing')}>phishing</button></span>
            <button className="search-hint-tag" onClick={() => setQuery('ransomware')}>ransomware</button>
            <button className="search-hint-tag" onClick={() => setQuery('report')}>report</button>
            <button className="search-hint-tag" onClick={() => setQuery('recovery')}>recovery</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function Navbar() {
  const [navOpen, setNavOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [language, setLanguage] = useState('EN')
  const location = useLocation()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => { setNavOpen(false) }, [location])

  // Close search on Escape globally
  useEffect(() => {
    if (!searchOpen) return
    const handler = (e) => { if (e.key === 'Escape') setSearchOpen(false) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [searchOpen])

  const isAboutActive = location.pathname.startsWith('/about') || location.pathname === '/for-victims-government'
  const isResourcesActive = ['/essential-eight', '/blog'].includes(location.pathname)
  const isReportActive = location.pathname.startsWith('/report')
  const isDarkPage = location.pathname === '/threats' || location.pathname.startsWith('/threats/')

  const SearchBtn = ({ className = '' }) => (
    <button
      className={`nav-search-btn ${className}`}
      onClick={() => setSearchOpen(true)}
      aria-label="Search site"
      type="button"
    >
      <i className="bi bi-search" aria-hidden="true"></i>
      <span>Search</span>
    </button>
  )

  const languageSelector = (className = '') => (
    <label className={`nav-language-select ${className}`} aria-label="Select language">
      <span className="visually-hidden">Language</span>
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="EN">EN</option>
        <option value="FR">FR</option>
        <option value="ES">ES</option>
      </select>
      <i className="bi bi-chevron-down" aria-hidden="true"></i>
    </label>
  )

  return (
    <>
      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}

      <nav className={`navbar navbar-expand-lg cyber-navbar ${isDarkPage ? 'navbar-dark' : 'navbar-light navbar-white'}`}>
        <div className="container nav-inner">

          <Link className="navbar-brand" to="/" aria-label="WHTS home">
            <img src={logoWhts} alt="The Watch Eyes - WHTS" className="brand-logo" />
          </Link>

          <div className="nav-top-actions">
            <div className="nav-primary-actions">
              <SearchBtn />
              <Link className="btn btn-report-cta btn-sm-nav" to="/report" state={{ scrollTo: 'report' }}>
                <i className="bi bi-shield-exclamation me-1"></i>Report
              </Link>
            </div>
            <div className="nav-utility-row">
              {languageSelector()}
              <Link className="nav-utility-link" to="/contact">Contact us</Link>
              {user ? (
                <button className="nav-utility-link" type="button" onClick={() => { logout(); navigate('/') }}>
                  Sign out
                </button>
              ) : (
                <>
                  <Link className="nav-utility-link" to="/signin">Sign in</Link>
                  <Link className="nav-utility-link" to="/signup">Sign up</Link>
                </>
              )}
            </div>
          </div>

          <div className="nav-mobile-left">
            {languageSelector('nav-language-mobile')}
            <button className="navbar-toggler border-0" type="button"
              aria-controls="mainNav" aria-expanded={navOpen}
              aria-label="Toggle navigation" onClick={() => setNavOpen(p => !p)}>
              <span className={`cyber-toggler-icon ${navOpen ? 'open' : ''}`}>
                <span /><span /><span />
              </span>
              <span className="nav-menu-label">Menu</span>
            </button>
          </div>

          <div className="nav-mobile-actions" aria-label="Quick actions">
            <Link className="btn btn-report-cta btn-sm-nav" to="/report" state={{ scrollTo: 'report' }}>
              <i className="bi bi-shield-exclamation me-1"></i>Report
            </Link>
            <SearchBtn />
          </div>

          <div className={`collapse navbar-collapse nav-menu-row ${navOpen ? 'show' : ''}`} id="mainNav">
            <ul className="navbar-nav mb-2 mb-lg-0 align-items-lg-center gap-lg-1">

              <li className="nav-item">
                <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active-link' : ''}`} to="/">Home</NavLink>
              </li>

              <li className="nav-item">
                <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active-link' : ''}`} to="/threats">Threats</NavLink>
              </li>

              <li className="nav-item dropdown">
                <a className={`nav-link dropdown-toggle nav-dropdown-toggle ${isAboutActive ? 'active-link' : ''}`}
                  href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  About
                  <span className="nav-underline" aria-hidden="true"></span>
                </a>
                <ul className="dropdown-menu dropdown-menu-end cyber-dropdown p-3">
                  <li><Link className="dropdown-item cyber-dropdown-item" to="/about"><i className="bi bi-info-circle me-2" style={{ color: 'var(--cyan)' }}></i>About WHTSIPA</Link></li>
                  <li><Link className="dropdown-item cyber-dropdown-item" to="/about-officials"><i className="bi bi-people me-2" style={{ color: 'var(--cyan)' }}></i>The Officials</Link></li>
                  <li><Link className="dropdown-item cyber-dropdown-item" to="/for-victims-government"><i className="bi bi-heart me-2" style={{ color: 'var(--red)' }}></i>For Victims &amp; Government</Link></li>
                </ul>
              </li>

              <li className="nav-item dropdown">
                <a className={`nav-link dropdown-toggle nav-dropdown-toggle ${isResourcesActive ? 'active-link' : ''}`}
                  href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Resources
                  <span className="nav-underline" aria-hidden="true"></span>
                </a>
                <ul className="dropdown-menu dropdown-menu-end cyber-dropdown p-3">
                  <li><Link className="dropdown-item cyber-dropdown-item" to="/essential-eight"><i className="bi bi-shield-check me-2" style={{ color: 'var(--green)' }}></i>Essential Eight</Link></li>
                  <li><Link className="dropdown-item cyber-dropdown-item" to="/blog"><i className="bi bi-newspaper me-2" style={{ color: 'var(--cyan)' }}></i>Knowledge Base</Link></li>
                </ul>
              </li>

              <li className="nav-item dropdown">
                <a className={`nav-link dropdown-toggle nav-dropdown-toggle ${isReportActive ? 'active-link' : ''}`}
                  href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Report &amp; Recover
                  <span className="nav-underline" aria-hidden="true"></span>
                </a>
                <ul className="dropdown-menu dropdown-menu-end cyber-dropdown p-3">
                  <li><Link className="dropdown-item cyber-dropdown-item" to="/report" state={{ scrollTo: 'report' }}><i className="bi bi-exclamation-triangle me-2 text-danger"></i>Report Incident</Link></li>
                  <li><Link className="dropdown-item cyber-dropdown-item" to="/report" state={{ scrollTo: 'recover' }}><i className="bi bi-shield-check me-2 text-success"></i>Recover Now</Link></li>
                </ul>
              </li>

              <li className="nav-item">
                <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active-link' : ''}`} to="/contact">Contact</NavLink>
              </li>

            </ul>

            <div className="nav-auth-actions">
              {user ? (
                <>
                  <span className="nav-user-name"><i className="bi bi-person-circle me-1"></i>{user.name?.split(' ')[0] || 'Account'}</span>
                  <button className="btn btn-outline-cyber btn-sm-nav" onClick={() => { logout(); navigate('/') }}>Sign Out</button>
                </>
              ) : (
                <>
                  <Link className="btn btn-outline-cyber btn-sm-nav" to="/signin">Sign In</Link>
                  <Link className="btn btn-cyber btn-sm-nav" to="/signup">Sign Up</Link>
                </>
              )}
              <Link className="btn btn-report-cta btn-sm-nav nav-report-mobile" to="/report" state={{ scrollTo: 'report' }}>
                <i className="bi bi-shield-exclamation me-1"></i>Report
              </Link>
            </div>
          </div>

        </div>
      </nav>
    </>
  )
}