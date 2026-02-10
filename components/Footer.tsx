'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Twitter, Heart } from 'lucide-react'

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/codemon-ai',
    icon: Github,
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/coffeemon',
    icon: Linkedin,
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/coffeemon',
    icon: Twitter,
  },
  {
    name: 'Email',
    href: 'mailto:hello@codemon.ai',
    icon: Mail,
  },
]

const footerLinks = [
  { name: 'Projects', href: '/projects' },
  { name: 'Blog', href: '/blog' },
  { name: 'Docs', href: '/docs' },
  { name: 'About', href: '/about' },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative py-16 px-6 bg-background border-t border-white/10">
      {/* Background gradient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent-purple/5 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold gradient-text inline-block mb-4">
            Get in Touch
          </h2>
          <p className="text-foreground/60 max-w-md mx-auto mb-8">
            프로젝트 협업, 기술 문의, 또는 그냥 인사도 환영합니다
          </p>

          {/* Email CTA */}
          <Link
            href="mailto:hello@codemon.ai"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent-purple to-accent-pink text-white rounded-xl font-semibold hover:scale-105 transition-transform duration-300 hover:shadow-lg hover:shadow-accent-purple/25"
          >
            <Mail className="w-5 h-5" />
            <span>hello@codemon.ai</span>
          </Link>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex justify-center gap-4 mb-12"
        >
          {socialLinks.map((link) => {
            const Icon = link.icon
            return (
              <Link
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-12 h-12 rounded-xl glass flex items-center justify-center hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
                aria-label={link.name}
              >
                <Icon className="w-5 h-5 text-foreground/60 group-hover:text-accent-purple transition-colors" />
              </Link>
            )
          })}
        </motion.div>

        {/* Footer Links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-6 mb-8 text-sm"
        >
          {footerLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-foreground/60 hover:text-foreground transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center text-sm text-foreground/40"
        >
          <p className="flex items-center justify-center gap-1">
            Made with <Heart className="w-4 h-4 text-accent-pink fill-accent-pink" /> by codemon
          </p>
          <p className="mt-2">
            &copy; {currentYear} codemon. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
