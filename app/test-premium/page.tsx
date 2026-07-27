export default function TestPremium() {
  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-4xl font-bold gradient-text mb-4">Premium Design Test</h1>
      <p className="text-muted-foreground">If you can see this, the design system is working!</p>
      <div className="glass-card p-6 mt-8">
        <h2 className="text-2xl font-semibold mb-2">Glass Card Test</h2>
        <p className="text-muted-foreground">This should have glassmorphism effect</p>
      </div>
      <button className="btn-primary mt-8">Primary Button Test</button>
    </div>
  )
}
