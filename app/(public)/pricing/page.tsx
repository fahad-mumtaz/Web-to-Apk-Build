import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Shield, Zap, Crown, Check } from 'lucide-react'

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[#00f5ff] to-[#00ccff] bg-clip-text text-transparent">
              Simple, Transparent Pricing
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Choose the perfect plan for your needs. All plans include core features with varying limits.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="glass-card p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Free</h3>
              <div className="text-4xl font-bold mb-4">
                $0<span className="text-lg text-muted-foreground">/month</span>
              </div>
              <p className="text-muted-foreground mb-6">
                Perfect for trying out Vibe2APK
              </p>
              <ul className="text-left space-y-3 mb-8">
                <li className="flex items-start">
                  <Check className="w-5 h-5 mr-2 text-[#00f5ff] mt-0.5 flex-shrink-0" />
                  <span>5 builds per day</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 mr-2 text-[#00f5ff] mt-0.5 flex-shrink-0" />
                  <span>URL to APK conversion</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 mr-2 text-[#00f5ff] mt-0.5 flex-shrink-0" />
                  <span>Basic app customization</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 mr-2 text-[#00f5ff] mt-0.5 flex-shrink-0" />
                  <span>Build history</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 mr-2 text-[#00f5ff] mt-0.5 flex-shrink-0" />
                  <span>Community support</span>
                </li>
              </ul>
              <Link href="/login">
                <Button className="w-full" variant="outline">
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="glass-card p-8 text-center neon-glow relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-[#00f5ff] to-[#00ccff] text-black px-4 py-1 rounded-full text-sm font-semibold">
                  MOST POPULAR
                </span>
              </div>
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-[#00f5ff] to-[#00ccff] rounded-full flex items-center justify-center mt-4">
                <Zap className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Pro</h3>
              <div className="text-4xl font-bold mb-4">
                $29<span className="text-lg text-muted-foreground">/month</span>
              </div>
              <p className="text-muted-foreground mb-6">
                For professional developers and teams
              </p>
              <ul className="text-left space-y-3 mb-8">
                <li className="flex items-start">
                  <Check className="w-5 h-5 mr-2 text-[#00f5ff] mt-0.5 flex-shrink-0" />
                  <span>50 builds per day</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 mr-2 text-[#00f5ff] mt-0.5 flex-shrink-0" />
                  <span>All input methods (URL, GitHub, ZIP)</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 mr-2 text-[#00f5ff] mt-0.5 flex-shrink-0" />
                  <span>Advanced app customization</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 mr-2 text-[#00f5ff] mt-0.5 flex-shrink-0" />
                  <span>Custom app icons & splash screens</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 mr-2 text-[#00f5ff] mt-0.5 flex-shrink-0" />
                  <span>Priority build queue</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 mr-2 text-[#00f5ff] mt-0.5 flex-shrink-0" />
                  <span>Email support</span>
                </li>
              </ul>
              <Link href="/login">
                <Button className="w-full neon-button">
                  Start Pro Trial
                </Button>
              </Link>
            </div>

            {/* Business Plan */}
            <div className="glass-card p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-[#00ff88] to-[#00dd77] rounded-full flex items-center justify-center">
                <Crown className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Business</h3>
              <div className="text-4xl font-bold mb-4">
                $99<span className="text-lg text-muted-foreground">/month</span>
              </div>
              <p className="text-muted-foreground mb-6">
                For enterprises and large teams
              </p>
              <ul className="text-left space-y-3 mb-8">
                <li className="flex items-start">
                  <Check className="w-5 h-5 mr-2 text-[#00ff88] mt-0.5 flex-shrink-0" />
                  <span>Unlimited builds</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 mr-2 text-[#00ff88] mt-0.5 flex-shrink-0" />
                  <span>Everything in Pro</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 mr-2 text-[#00ff88] mt-0.5 flex-shrink-0" />
                  <span>Custom branding removal</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 mr-2 text-[#00ff88] mt-0.5 flex-shrink-0" />
                  <span>API access</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 mr-2 text-[#00ff88] mt-0.5 flex-shrink-0" />
                  <span>White-label options</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 mr-2 text-[#00ff88] mt-0.5 flex-shrink-0" />
                  <span>Dedicated account manager</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 mr-2 text-[#00ff88] mt-0.5 flex-shrink-0" />
                  <span>Priority phone support</span>
                </li>
              </ul>
              <Link href="/login">
                <Button className="w-full neon-secondary-button">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-b from-transparent to-[#00f5ff]/5">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-[#00f5ff] to-[#00ccff] bg-clip-text text-transparent">
              Frequently Asked Questions
            </span>
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-3">Can I change plans anytime?</h3>
              <p className="text-muted-foreground">
                Yes! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
              </p>
            </div>
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-3">What happens if I exceed my build limit?</h3>
              <p className="text-muted-foreground">
                You'll need to upgrade to a higher plan to continue building. We'll notify you when you're approaching your limit.
              </p>
            </div>
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-3">Do you offer refunds?</h3>
              <p className="text-muted-foreground">
                We offer a 14-day money-back guarantee for all paid plans. If you're not satisfied, contact us for a full refund.
              </p>
            </div>
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-3">Can I cancel my subscription anytime?</h3>
              <p className="text-muted-foreground">
                Yes, you can cancel your subscription at any time. You'll continue to have access to your plan until the end of your billing period.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[#00f5ff] to-[#00ccff] bg-clip-text text-transparent">
              Ready to Get Started?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of developers who are already using Vibe2APK to build amazing Android apps.
          </p>
          <Link href="/login">
            <Button className="neon-button text-lg px-8 py-4">
              Start Building Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
