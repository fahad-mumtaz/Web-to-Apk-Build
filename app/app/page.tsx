export default function AppPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #1e293b, #581c87, #1e293b)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      textAlign: 'center'
    }}>
      <div>
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          🚀 Vibe2APK Working!
        </h1>
        <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>
          Your SaaS is now functional
        </p>
        <div>
          <a href="/login-simple" style={{ 
            color: '#60a5fa', 
            textDecoration: 'none',
            fontSize: '1.2rem',
            border: '2px solid #60a5fa',
            padding: '1rem 2rem',
            borderRadius: '0.5rem',
            display: 'inline-block'
          }}>
            Go to Login →
          </a>
        </div>
      </div>
    </div>
  )
}
