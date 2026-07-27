export default function PurpleTest() {
  return (
    <div style={{ 
      backgroundColor: '#0a0a0f', 
      minHeight: '100vh',
      padding: '50px'
    }}>
      <h1 style={{ 
        color: '#8b5cf6', 
        fontSize: '60px',
        fontWeight: 'bold'
      }}>
        PURPLE DESIGN TEST
      </h1>
      <p style={{ color: '#94a3b8', fontSize: '24px' }}>
        If you can see this purple text, inline styles work
      </p>
      <button style={{
        background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
        color: 'white',
        padding: '20px 40px',
        border: 'none',
        borderRadius: '10px',
        fontSize: '18px',
        cursor: 'pointer'
      }}>
        PURPLE BUTTON
      </button>
    </div>
  )
}
