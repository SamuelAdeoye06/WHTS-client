import { useEffect, useState, useRef } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import api from '../services/api'
import '../styles/cyber.css'

export default function VerifyEmail() {
  const [params]  = useSearchParams()
  const [status,  setStatus]  = useState('loading')
  const [message, setMessage] = useState('')
  const called = useRef(false)   // ← guard against double-fire

  useEffect(() => {
    if (called.current) return   // already ran, do nothing
    called.current = true

    const token = params.get('token')
    if (!token) { setStatus('error'); setMessage('Invalid verification link.'); return }

    api.get(`/auth/verify-email?token=${token}`)
      .then(({ data }) => { setStatus('success'); setMessage(data.message) })
      .catch(err => { setStatus('error'); setMessage(err.response?.data?.message || 'Verification failed.') })
  }, [params])

  const heading = status === 'loading' ? 'Verifying your email…'
                : status === 'success' ? 'Email Confirmed!'
                : 'Verification Failed'

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ maxWidth: 420, textAlign: 'center' }}>
        {status === 'loading' && (
          <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>⏳</div>
        )}
        {status === 'success' && (
          <div style={{ fontSize: '3.5rem', marginBottom: '1rem', color: '#0d9488' }}>
            <i className="bi bi-patch-check-fill"></i>
          </div>
        )}
        {status === 'error' && (
          <div style={{ fontSize: '3.5rem', marginBottom: '1rem', color: '#dc2626' }}>
            <i className="bi bi-x-circle-fill"></i>
          </div>
        )}
        <h2 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>{heading}</h2>
        <p style={{ color: '#4a5568', lineHeight: 1.75, marginBottom: '1.5rem' }}>{message}</p>
        {status !== 'loading' && (
          <Link to="/signin" style={{
            display: 'inline-block', background: '#0d9488', color: '#fff',
            padding: '0.75rem 2rem', borderRadius: '10px', textDecoration: 'none',
            fontWeight: 700, fontSize: '0.95rem'
          }}>
            {status === 'success' ? 'Sign In Now' : 'Back to Sign In'}
          </Link>
        )}
      </div>
    </div>
  )
}