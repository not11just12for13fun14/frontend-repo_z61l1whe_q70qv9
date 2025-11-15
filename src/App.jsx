import React, { useEffect, useMemo, useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon, ArrowRight, ChevronRight, Filter, Mail, Phone, MapPin, Github, Linkedin, Twitter, Globe, Play } from 'lucide-react'
import Spline from '@splinetool/react-spline'

const usePrefersDark = () => {
  const [isDark, setIsDark] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => setIsDark(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return isDark
}

const useTheme = () => {
  const prefersDark = usePrefersDark()
  const [theme, setTheme] = useState('light')
  useEffect(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'dark' || saved === 'light') setTheme(saved)
    else setTheme(prefersDark ? 'dark' : 'light')
  }, [prefersDark])
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    localStorage.setItem('theme', theme)
  }, [theme])
  return { theme, setTheme }
}

const Nav = ({ onToggleTheme, theme }) => {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const handler = () => setOpen(false)
    window.addEventListener('hashchange', handler)
    return () => window.removeEventListener('hashchange', handler)
  }, [])
  const links = [
    { href: '#about', label: 'About' },
    { href: '#portfolio', label: 'Portfolio' },
    { href: '#services', label: 'Services' },
    { href: '#blog', label: 'Articles' },
    { href: '#testimonials', label: 'Testimonials' },
    { href: '#contact', label: 'Contact' },
  ]
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-neutral-900/60 border-b border-white/20 dark:border-white/10">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 font-semibold text-blue-700 dark:text-blue-300">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-blue-600" />
          <span>Web Design Art</span>
        </a>
        <div className="hidden md:flex items-center gap-6">
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-sm text-neutral-700 hover:text-blue-600 dark:text-neutral-300 dark:hover:text-blue-300 transition-colors">
              {l.label}
            </a>
          ))}
          <button aria-label="Toggle theme" onClick={onToggleTheme} className="p-2 rounded-full border border-neutral-200 dark:border-neutral-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors">
            {theme === 'dark' ? <Sun className="w-4 h-4"/> : <Moon className="w-4 h-4"/>}
          </button>
        </div>
        <div className="md:hidden flex items-center gap-2">
          <button aria-label="Toggle theme" onClick={onToggleTheme} className="p-2 rounded-full border border-neutral-200 dark:border-neutral-700">
            {theme === 'dark' ? <Sun className="w-5 h-5"/> : <Moon className="w-5 h-5"/>}
          </button>
          <button aria-label="Open menu" onClick={() => setOpen(v => !v)} className="p-2 rounded-md text-neutral-700 dark:text-neutral-200">
            {open ? <X/> : <Menu/>}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="md:hidden bg-white/90 dark:bg-neutral-900/90 backdrop-blur border-t border-neutral-200/60 dark:border-neutral-800/60">
            <div className="px-4 py-3 space-y-2">
              {links.map(l => (
                <a key={l.href} href={l.href} className="block py-2 text-neutral-800 dark:text-neutral-200 hover:text-blue-600 dark:hover:text-blue-300">{l.label}</a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

const Hero = () => {
  return (
    <section className="relative h-[85vh] min-h-[520px] w-full" aria-label="Hero">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/zhZFnwyOYLgqlLWk/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/40 to-white dark:from-neutral-950/70 dark:via-neutral-950/50 dark:to-neutral-950 pointer-events-none" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="max-w-2xl">
          <motion.h1 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: 'easeOut' }} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Web Design Art
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7 }} className="mt-4 text-neutral-700 dark:text-neutral-300 text-lg">
            Modern, minimalist websites with a blue-on-white visual rhythm. Smooth motion, clear hierarchy, and delightful micro-interactions.
          </motion.p>
          <div className="mt-8 flex items-center gap-4">
            <a href="#portfolio" className="group inline-flex items-center gap-2 rounded-full bg-blue-600 text-white px-6 py-3 text-sm font-semibold shadow-sm hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
              View Work <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5"/>
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-neutral-300 dark:border-neutral-700 px-6 py-3 text-sm font-semibold text-neutral-800 dark:text-neutral-200 hover:border-blue-400 dark:hover:border-blue-500">
              Start a Project
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

const About = () => {
  const stats = [
    { k: '7+', v: 'Years crafting interfaces' },
    { k: '120+', v: 'Projects shipped' },
    { k: '20', v: 'Awards & features' },
  ]
  return (
    <section id="about" className="relative py-20 sm:py-28 bg-white dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white">Design that feels effortless</h2>
          <p className="mt-4 text-neutral-700 dark:text-neutral-300">I balance negative space with a bold blue accent to guide attention. Every interaction is purposeful—fast, accessible, and delightful.</p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {stats.map((s) => (
              <div key={s.v} className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-4 text-center">
                <div className="text-2xl font-extrabold text-blue-600">{s.k}</div>
                <div className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">{s.v}</div>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="relative">
          <div className="aspect-video rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/10 border border-blue-200/50 dark:border-blue-800/30 overflow-hidden">
            <div className="absolute inset-0 grid grid-cols-6 opacity-30">
              {[...Array(36)].map((_,i) => (
                <motion.div key={i} className="border border-blue-200/40 dark:border-blue-800/30" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.01 }} />
              ))}
            </div>
            <div className="relative z-10 p-6 sm:p-8">
              <p className="text-neutral-800 dark:text-neutral-200 max-w-md">Interactive patterns, subtle parallax, and carefully tuned easing curves keep the experience lively without noise.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

const Portfolio = () => {
  const categories = ['All', 'Web', 'E-commerce', 'Brand', 'App']
  const [active, setActive] = useState('All')
  const items = Array.from({ length: 9 }).map((_, i) => ({
    id: i + 1,
    title: `Project ${i + 1}`,
    cat: categories[(i % (categories.length - 1)) + 1],
    img: `https://picsum.photos/seed/art-${i}/800/600`,
  }))
  const filtered = active === 'All' ? items : items.filter(i => i.cat === active)
  const [selected, setSelected] = useState(null)

  return (
    <section id="portfolio" className="py-20 sm:py-28 bg-white dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white">Portfolio</h2>
          <div className="flex flex-wrap items-center gap-2">
            {categories.map(c => (
              <button key={c} onClick={() => setActive(c)} className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${active === c ? 'bg-blue-600 text-white border-blue-600' : 'border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-blue-400 dark:hover:border-blue-500'}`}>
                {c}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(card => (
            <motion.button key={card.id} onClick={() => setSelected(card)} className="group relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
              <img src={card.img} alt={card.title} loading="lazy" className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                <div>
                  <div className="font-semibold">{card.title}</div>
                  <div className="text-xs opacity-80">{card.cat}</div>
                </div>
                <ChevronRight className="w-5 h-5"/>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {selected && (
          <motion.div role="dialog" aria-modal="true" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.98, opacity: 0 }} className="max-w-3xl w-full rounded-2xl overflow-hidden bg-white dark:bg-neutral-900" onClick={(e) => e.stopPropagation()}>
              <img src={selected.img} alt={selected.title} className="w-full h-80 object-cover" />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">{selected.title}</h3>
                <p className="mt-2 text-neutral-700 dark:text-neutral-300">A modern, minimal interface exploring white space and blue accents. Built with performance and accessibility in mind.</p>
                <div className="mt-4 flex gap-3">
                  <a href="#" className="px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700">Visit</a>
                  <button onClick={() => setSelected(null)} className="px-4 py-2 rounded-full border border-neutral-300 dark:border-neutral-700 text-sm font-semibold text-neutral-800 dark:text-neutral-200">Close</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

const Services = () => {
  const services = [
    { title: 'UI/UX Design', desc: 'Research, wireframes, and interfaces that convert.', icon: <Globe className="w-5 h-5"/> },
    { title: 'Web Development', desc: 'Fast, accessible, and SEO-friendly builds.', icon: <Play className="w-5 h-5"/> },
    { title: 'Brand Systems', desc: 'Cohesive visual languages across products.', icon: <Filter className="w-5 h-5"/> },
  ]
  return (
    <section id="services" className="py-20 sm:py-28 bg-white dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white">Services</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(s => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 bg-white/70 dark:bg-neutral-900/60">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">{s.icon}</div>
              <h3 className="mt-4 font-semibold text-neutral-900 dark:text-white">{s.title}</h3>
              <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const Blog = () => {
  const posts = Array.from({ length: 3 }).map((_, i) => ({
    id: i + 1,
    title: `Design Notes ${i + 1}`,
    excerpt: 'Layout rhythms, contrast, and micro-interactions that enhance clarity.',
    date: '2025-01-0' + (i + 1),
    img: `https://picsum.photos/seed/blog-${i}/1200/800`,
  }))
  return (
    <section id="blog" className="py-20 sm:py-28 bg-white dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white">Articles</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map(p => (
            <article key={p.id} className="rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800">
              <img src={p.img} alt="" className="h-48 w-full object-cover" loading="lazy" />
              <div className="p-6">
                <div className="text-xs text-neutral-500">{p.date}</div>
                <h3 className="mt-2 font-semibold text-neutral-900 dark:text-white">{p.title}</h3>
                <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">{p.excerpt}</p>
                <a href="#" className="mt-3 inline-block text-blue-600 hover:text-blue-700">Read more</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

const Testimonials = () => {
  const testimonials = [
    { name: 'Ava', role: 'Product Lead', quote: 'Crisp, modern, and undeniably thoughtful. Our conversions climbed.' },
    { name: 'Noah', role: 'Founder', quote: 'Interaction details feel effortless and premium.' },
    { name: 'Mia', role: 'Marketing', quote: 'Accessible, quick, and visually distinct.' },
  ]
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % testimonials.length), 4000)
    return () => clearInterval(t)
  }, [])

  return (
    <section id="testimonials" className="py-20 sm:py-28 bg-white dark:bg-neutral-950">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white">What clients say</h2>
        <div className="mt-8 relative">
          <AnimatePresence mode="wait">
            <motion.div key={idx} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4 }}>
              <p className="text-xl text-neutral-800 dark:text-neutral-200">“{testimonials[idx].quote}”</p>
              <div className="mt-4 text-neutral-600 dark:text-neutral-400">— {testimonials[idx].name}, {testimonials[idx].role}</div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

const Contact = () => {
  return (
    <section id="contact" className="py-20 sm:py-28 bg-white dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white">Let’s build something beautiful</h2>
          <p className="mt-3 text-neutral-700 dark:text-neutral-300">Tell me about your project and timeline. I’ll reply within 24 hours.</p>
          <div className="mt-6 space-y-3 text-neutral-700 dark:text-neutral-300">
            <div className="flex items-center gap-2"><Mail className="w-4 h-4"/> hello@studio.com</div>
            <div className="flex items-center gap-2"><Phone className="w-4 h-4"/> +1 (555) 123-4567</div>
            <div className="flex items-center gap-2"><MapPin className="w-4 h-4"/> Remote / Worldwide</div>
          </div>
        </div>
        <form className="grid grid-cols-1 gap-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-medium text-neutral-800 dark:text-neutral-200">Name</label>
            <input className="mt-1 w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your name" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-800 dark:text-neutral-200">Email</label>
            <input type="email" className="mt-1 w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="you@company.com" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-800 dark:text-neutral-200">Message</label>
            <textarea rows="4" className="mt-1 w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Tell me about your project..." required />
          </div>
          <button className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 text-white px-6 py-3 text-sm font-semibold shadow-sm hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
            Send <ArrowRight className="w-4 h-4"/>
          </button>
        </form>
      </div>
    </section>
  )
}

const Footer = () => (
  <footer className="pt-12 pb-8 bg-white dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <div className="font-semibold text-neutral-900 dark:text-white">Web Design Art</div>
          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">Minimal aesthetics, meaningful motion.</p>
        </div>
        <div className="flex items-center gap-4 text-neutral-600 dark:text-neutral-400">
          <a href="#" aria-label="Twitter" className="hover:text-blue-600"> <Twitter className="w-5 h-5"/> </a>
          <a href="#" aria-label="GitHub" className="hover:text-blue-600"> <Github className="w-5 h-5"/> </a>
          <a href="#" aria-label="LinkedIn" className="hover:text-blue-600"> <Linkedin className="w-5 h-5"/> </a>
        </div>
      </div>
      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm text-neutral-600 dark:text-neutral-400">
        <div>
          <div className="font-semibold text-neutral-800 dark:text-neutral-200">Explore</div>
          <ul className="mt-3 space-y-2">
            <li><a href="#about" className="hover:text-blue-700">About</a></li>
            <li><a href="#portfolio" className="hover:text-blue-700">Portfolio</a></li>
            <li><a href="#services" className="hover:text-blue-700">Services</a></li>
            <li><a href="#blog" className="hover:text-blue-700">Articles</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-neutral-800 dark:text-neutral-200">Resources</div>
          <ul className="mt-3 space-y-2">
            <li><a href="#" className="hover:text-blue-700">Brand Kit</a></li>
            <li><a href="#" className="hover:text-blue-700">Press</a></li>
            <li><a href="#" className="hover:text-blue-700">Case Studies</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-neutral-800 dark:text-neutral-200">Legal</div>
          <ul className="mt-3 space-y-2">
            <li><a href="#" className="hover:text-blue-700">Terms</a></li>
            <li><a href="#" className="hover:text-blue-700">Privacy</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-neutral-800 dark:text-neutral-200">Contact</div>
          <ul className="mt-3 space-y-2">
            <li>hello@studio.com</li>
            <li>+1 (555) 123-4567</li>
          </ul>
        </div>
      </div>
      <div className="mt-8 text-xs text-neutral-500">© {new Date().getFullYear()} Web Design Art. All rights reserved.</div>
    </div>
  </footer>
)

function App() {
  const { theme, setTheme } = useTheme()
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      <Nav theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Portfolio />
        <Services />
        <Blog />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
