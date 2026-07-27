'use client'

import Link from 'next/link'
import Reveal from '@/components/animations/Reveal'
import { Github, Twitter, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-border/30 py-16 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      
      <div className="relative container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <Reveal direction="up" delay={0.1}>
            <div>
              <h3 className="text-2xl font-bold mb-4 gradient-text">Vibe2APK</h3>
              <p className="text-muted-foreground mb-6">
                Convert web apps to Android APKs in minutes. No coding required.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-lg glass-card flex items-center justify-center hover:border-primary/50 transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-lg glass-card flex items-center justify-center hover:border-primary/50 transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-lg glass-card flex items-center justify-center hover:border-primary/50 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-lg glass-card flex items-center justify-center hover:border-primary/50 transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.2}>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li>
                  <Link href="/features" className="hover:text-primary transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-primary transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/docs" className="hover:text-primary transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/changelog" className="hover:text-primary transition-colors">
                    Changelog
                  </Link>
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.3}>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li>
                  <Link href="/about" className="hover:text-primary transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-primary transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-primary transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-primary transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.4}>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li>
                  <Link href="/privacy" className="hover:text-primary transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-primary transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="hover:text-primary transition-colors">
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link href="/gdpr" className="hover:text-primary transition-colors">
                    GDPR
                  </Link>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal direction="up" delay={0.5}>
          <div className="border-t border-border/30 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; 2024 Vibe2APK. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">
                Status
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Security
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                API
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  )
}
