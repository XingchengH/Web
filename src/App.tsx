import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, MotionConfig, useReducedMotion } from 'motion/react'
import { HashRouter, Link, NavLink, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { artists, experience, projects } from './content'
import { ChatDemo, MusicDemo } from './ProjectDemos'
import CapybaraPet from './CapybaraPet'
import CapybaraMark from './CapybaraMark'

const resumeUrl = `${import.meta.env.BASE_URL}xingcheng-huang-resume.pdf`
const pageNames: Record<string, string> = {
  '/': 'Home', '/work': 'Work', '/experience': 'Experience', '/about': 'About', '/contact': 'Contact',
}
const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Experience', to: '/experience' },
  { label: 'Work', to: '/work' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

function Header() {
  return (
    <header className="site-header wrap">
      <Link className="wordmark" to="/" aria-label="Xingcheng Huang, home">
        <span aria-hidden="true">
          {'VINCENT'.split('').map((letter, index) => <span className="wordmark-letter" style={{ animationDelay: `${index * 0.2}s` }} key={`first-${letter}-${index}`}>{letter}</span>)}
          <CapybaraMark />
          {'HUANG'.split('').map((letter, index) => <span className="wordmark-letter" style={{ animationDelay: `${(index + 8) * 0.2}s` }} key={`last-${letter}-${index}`}>{letter}</span>)}
        </span>
      </Link>
      <span className="header-note">FRONTEND ENGINEER · POP ON REPEAT</span>
      <nav aria-label="Main navigation">
        {navItems.map(({ label, to }) => (
          <NavLink key={to} to={to} end={to === '/'}>
            {({ isActive }) => <>{label}{isActive && <motion.span className="nav-indicator" layoutId="nav-indicator" />}</>}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}

function Cover() {
  const reduced = useReducedMotion()
  return (
    <motion.div className="cover-wrap" aria-label="Decorative artwork inspired by pop music"
      initial={reduced ? { opacity: 0 } : { opacity: 0, rotate: -6, scale: .94, y: 24 }}
      animate={{ opacity: 1, rotate: 0, scale: 1, y: 0 }}
      transition={{ duration: .7, delay: .2, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduced ? undefined : { rotate: -2, y: -5 }}>
      <div className="cover-shadow" />
      <div className="cover">
        <div className="cover-top mono"><span>THE VINCENT MIX</span><span>ENGINEERING / POP STUDIO</span></div>
        <div className="cover-title">CODE<br />MEETS<br />POP<span>.</span></div>
        <div className="cover-bottom"><span className="mono">CLEAR INTERFACES<br />CURIOUS BY NATURE</span><div className="cover-record" aria-hidden="true"><CapybaraMark /></div></div>
      </div>
      <span className="cover-caption mono">SIDE A: ENGINEERING &nbsp; / &nbsp; SIDE B: THE PERSON</span>
    </motion.div>
  )
}

function Home() {
  const reduced = useReducedMotion()
  const reveal = (delay: number) => ({
    initial: reduced ? { opacity: 0 } : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: .55, delay, ease: [0.22, 1, 0.36, 1] as const },
  })
  return (
    <div className="home-view">
      <section className="hero wrap" aria-labelledby="hero-title">
        <div className="hero-copy">
          <motion.div className="eyebrow" {...reveal(.04)}><span className="eyebrow-dot" /> FRONTEND ENGINEER · SUNNYVALE, CA</motion.div>
          <motion.h1 id="hero-title" {...reveal(.1)}>Complex systems.<br /><span>Clear interfaces</span><span className="period">.</span></motion.h1>
          <motion.p {...reveal(.19)}>I’m Xingcheng (Vincent), a React and TypeScript engineer who builds dependable enterprise workflows and thoughtful web experiences.</motion.p>
          <motion.div className="hero-actions" {...reveal(.27)}>
            <Link className="button button-primary" to="/experience">See my experience <span aria-hidden="true">↗</span></Link>
            <a className="button button-outline" href={resumeUrl} target="_blank" rel="noreferrer">Open résumé <CapybaraMark /></a>
          </motion.div>
          <motion.div className="hero-proof" {...reveal(.36)}><span>React + TypeScript</span><span>Enterprise workflows</span><span>Frontend-focused</span></motion.div>
        </div>
        <Cover />
      </section>
      <div className="wrap"><div className="marquee" aria-label="Engineering, good interfaces, pop music, new ideas">
        {['React + TypeScript', 'Enterprise workflows', 'Reliable interfaces', 'Pop on repeat'].map(word => <span className="marquee-item" key={word}>{word}<CapybaraMark /></span>)}
      </div></div>
    </div>
  )
}

function PageHeading({ id, eyebrow, title, detail }: { id: string; eyebrow: string; title: string; detail: string }) {
  return <div className="page-heading"><div><p className="eyebrow">{eyebrow}</p><h1 id={id}>{title}<CapybaraMark /></h1></div><p className="page-heading-detail">{detail}</p></div>
}

function ProjectArtwork({ type, label, image }: { type: string; label: string; image?: string }) {
  if (image) return <figure className="project-product-shot"><img src={`${import.meta.env.BASE_URL}${image}`} alt={label} /><figcaption>Real product demo · Inline Scheduler</figcaption></figure>
  if (type === 'chat') return <ChatDemo />
  if (type === 'music') return <MusicDemo />
  return (
    <div className={`project-art project-art--${type}`} role="img" aria-label={label}>
      {type === 'chat' && <><span className="art-chat art-chat-one">HELLO</span><span className="art-chat art-chat-two">RIGHT<br />HERE ↗</span><span className="art-caption">Concept artwork · Real-Time Chat</span></>}
      {type === 'music' && <><span className="art-music-disc"><span>ON<br />REPEAT</span></span><span className="art-caption">Concept artwork · Music Streaming</span></>}
    </div>
  )
}

function Work() {
  const [selected, setSelected] = useState(0)
  const project = projects[selected]
  const reduced = useReducedMotion()
  return (
    <section className="wrap view-section work-view" aria-labelledby="work-heading">
      <PageHeading id="work-heading" eyebrow="Selected work" title="Things I’ve built" detail="Three projects showing how I approach real-time systems, product flows, and collaborative builds." />
      <div className="work-layout">
        <div className="project-picker" aria-label="Choose a project">
          <p className="picker-label">Choose a project</p>
          {projects.map((item, index) => (
            <motion.button type="button" key={item.title} className="project-choice" aria-pressed={selected === index}
              onClick={() => setSelected(index)} whileHover={reduced ? undefined : { x: 4 }} whileTap={reduced ? undefined : { scale: .98 }}>
              <span className="project-choice-name">{item.title}<small>{item.category}</small></span><span className="choice-arrow" aria-hidden="true">↗</span>
            </motion.button>
          ))}
          <p className="picker-note">Each selection opens the project story, tools, and source. <CapybaraMark /></p>
        </div>
        <div className="project-stage" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.article key={project.title} className="project-detail-view"
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14, scale: .99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: .25, ease: 'easeOut' }}>
              <ProjectArtwork type={project.artwork} label={project.artLabel} image={'image' in project ? project.image : undefined} />
              <p className="project-meta">{project.category}</p>
              <h2>{project.title}</h2><p className="project-subtitle">{project.description}</p>
              <div className="project-story"><div><h3>Challenge</h3><p>{project.challenge}</p></div><div><h3>Contribution</h3><p>{project.contribution}</p></div></div>
              <ul className="tag-list" aria-label="Technologies">{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
              <div className="project-links"><a href={project.href} target="_blank" rel="noreferrer">View source <span aria-hidden="true">↗</span></a>{'liveHref' in project && <a href={project.liveHref} target="_blank" rel="noreferrer">Visit project <span aria-hidden="true">↗</span></a>}</div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

function Experience() {
  const reduced = useReducedMotion()
  return (
    <section className="experience-section view-section" aria-labelledby="experience-title">
      <div className="wrap experience-layout">
        <div className="experience-intro"><p className="eyebrow">Professional experience</p><h1 id="experience-title">Complexity,<br /><span>meet clarity.</span></h1><p>Frontend-focused engineering for the workflows people depend on: clear steps, reliable state, and details that hold up in production.</p><a className="button button-primary experience-resume" href={resumeUrl} target="_blank" rel="noreferrer">Open my résumé <span aria-hidden="true">↗</span></a></div>
        <div className="experience-content">
          <div className="experience-heading"><div><span className="mono">2024 — 2026</span><h2>Apple</h2><p>Full Stack Developer · Cupertino, CA</p></div><CapybaraMark /></div>
          <p className="experience-summary">Frontend-focused work on an internal identity and access management platform: connecting people, applications, and the access they need.</p>
          <div className="experience-list">{experience.map((item, index) => <motion.article className="experience-item" key={item.title} initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .12 + index * .08, duration: .35 }}><h3>{item.title}</h3><p>{item.description}</p></motion.article>)}</div>
          <ul className="experience-stack" aria-label="Technologies"><li>React</li><li>TypeScript</li><li>AngularJS</li><li>Zustand</li><li>Java</li><li>Spring Boot</li></ul>
          <div className="earlier-experience"><h3>Earlier experience</h3><p><strong>Pilot Technologies</strong> · Software Engineer Intern <span>2023</span></p><p><strong>CUNY Tech Prep</strong> · Web Development Fellow <span>2022–2023</span></p><p><strong>Research Foundation of CUNY</strong> · Software Engineer Intern <span>2022</span></p></div>
        </div>
      </div>
    </section>
  )
}

function About() {
  const [interest, setInterest] = useState<'music' | 'reading'>('music')
  const reduced = useReducedMotion()
  return (
    <section className="about-section wrap view-section" aria-labelledby="about-title">
      <div className="about-intro"><p className="eyebrow">About</p><h1 id="about-title">The person behind<br /><span>the interface.</span></h1><p>I’m Xingcheng, but you can call me Vincent. I’m a Queens College computer science grad who loves a good problem, a good story, and a very good pop song.</p><div className="about-facts"><div><span>Based in</span><strong>Sunnyvale, California</strong></div><div><span>Education</span><strong>Queens College · B.A. Computer Science, 2024</strong></div><div><span>Focus</span><strong>Frontend-focused · Full-stack capable</strong></div></div><motion.div className="about-stamp" aria-hidden="true" whileHover={reduced ? undefined : { rotate: 8, scale: 1.06 }}><CapybaraMark /><span>CURIOUS<br />BY NATURE</span></motion.div></div>
      <div className="about-card"><div className="about-card-top"><h2>Outside the code</h2><CapybaraMark /></div>
        <div className="interest-controls" aria-label="Choose an interest"><button type="button" aria-pressed={interest === 'music'} onClick={() => setInterest('music')}>Music ♫</button><button type="button" aria-pressed={interest === 'reading'} onClick={() => setInterest('reading')}>Reading <CapybaraMark /></button></div>
        <div className="interest-content" aria-live="polite"><AnimatePresence mode="wait" initial={false}><motion.div key={interest} initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }} transition={{ duration: .2 }}>
          {interest === 'music' ? <><h3>Pop is my<br />soundtrack<span>.</span></h3><p>From big vocals to the songs I keep coming back to, there’s always room for more on the playlist.</p><div className="artist-list">{artists.map(artist => <span key={artist}>{artist}</span>)}<span>+ many more</span></div></> : <><h3>A novel kind<br />of escape<span>.</span></h3><p>When I’m away from the screen, I love getting lost in a good novel and discovering a different kind of world.</p><div className="book-art" aria-hidden="true"><span>GOOD<br />STORIES</span><CapybaraMark /></div></>}
        </motion.div></AnimatePresence></div>
      </div>
    </section>
  )
}

function Contact() {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>('idle')
  const reduced = useReducedMotion()

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText('Huangxcxc@gmail.com')
      setCopyStatus('copied')
    } catch {
      setCopyStatus('error')
    }
  }

  return (
    <section className="contact-view wrap" aria-labelledby="contact-title">
      <p className="contact-location">Sunnyvale, California · Open to the next opportunity</p>
      <div className="contact-layout">
        <div className="contact-copy">
          <h1 id="contact-title" aria-label="Let’s make something good.">Let’s make<br /><span>something</span><br />good<CapybaraMark /><span className="contact-period">.</span></h1>
          <p className="contact-description">A project, an opportunity, or just a good conversation — I’d love to hear from you.</p>
          <div className="contact-actions">
            <a className="contact-primary" href="mailto:Huangxcxc@gmail.com">Send me an email <span aria-hidden="true">↗</span></a>
            <button className="contact-copy-button" type="button" onClick={copyEmail}>{copyStatus === 'copied' ? 'Email copied ✓' : 'Copy email'}</button>
          </div>
          <p className="contact-address">Huangxcxc@gmail.com</p>
          <p className="contact-feedback" aria-live="polite">{copyStatus === 'copied' ? 'Email address copied.' : copyStatus === 'error' ? 'Could not copy automatically. You can select the address above.' : ''}</p>
        </div>
        <motion.div className="contact-postcard" aria-hidden="true" initial={reduced ? { opacity: 0 } : { opacity: 0, rotate: -5, y: 20 }} animate={{ opacity: 1, rotate: 0, y: 0 }} transition={{ duration: .6, delay: .12, ease: [0.22, 1, 0.36, 1] }} whileHover={reduced ? undefined : { rotate: -2, y: -5 }}>
          <div className="postcard-title">GOOD<br />IDEAS<br /><span>WELCOME</span><span className="postcard-dot">.</span></div>
          <div className="postcard-bottom"><div className="postcard-stamp"><CapybaraMark /><span>LET’S<br />CONNECT</span></div><p className="mono">GOOD WORK.<br />GOOD MUSIC.<br />GOOD COMPANY.</p></div>
        </motion.div>
      </div>
      <div className="contact-elsewhere"><div><h2>Connect elsewhere</h2><p>More places to connect and explore.</p></div><div className="contact-socials"><a href="https://github.com/XingchengH" target="_blank" rel="noreferrer"><span>GitHub</span><span aria-hidden="true">↗</span></a><a href="https://www.linkedin.com/in/xingcheng-huang67/" target="_blank" rel="noreferrer"><span>LinkedIn</span><span aria-hidden="true">↗</span></a><a href={resumeUrl} target="_blank" rel="noreferrer"><span>Résumé</span><span aria-hidden="true">↗</span></a></div></div>
    </section>
  )
}

function Footer() {
  return <footer className="site-footer wrap"><span>© {new Date().getFullYear()} XINGCHENG HUANG</span><span>MADE WITH CURIOSITY & A GOOD SOUNDTRACK</span><div><a href="https://github.com/XingchengH" target="_blank" rel="noreferrer">GITHUB ↗</a><a href="https://www.linkedin.com/in/xingcheng-huang67/" target="_blank" rel="noreferrer">LINKEDIN ↗</a><a href={resumeUrl} target="_blank" rel="noreferrer">RÉSUMÉ ↗</a></div></footer>
}

function AppShell() {
  const location = useLocation()
  const reduced = useReducedMotion()
  const mainRef = useRef<HTMLElement>(null)
  const previousPath = useRef(location.pathname)
  useEffect(() => {
    document.title = `${pageNames[location.pathname] || 'Home'} · Xingcheng Huang`
    window.scrollTo({ top: 0, behavior: 'instant' })
    if (previousPath.current !== location.pathname) mainRef.current?.focus({ preventScroll: true })
    previousPath.current = location.pathname
  }, [location.pathname])
  return <div className="app-shell"><a className="skip-link" href="#main" onClick={event => { event.preventDefault(); mainRef.current?.focus() }}>Skip to content</a><Header /><main id="main" ref={mainRef} tabIndex={-1}>
    <AnimatePresence mode="wait" initial={false}>
      <motion.div key={location.pathname} className="route-view" initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={reduced ? { opacity: 0 } : { opacity: 0, y: -10 }} transition={{ duration: .24, ease: 'easeOut' }}>
        <Routes location={location}><Route path="/" element={<Home />} /><Route path="/work" element={<Work />} /><Route path="/experience" element={<Experience />} /><Route path="/about" element={<About />} /><Route path="/contact" element={<Contact />} /><Route path="*" element={<Navigate to="/" replace />} /></Routes>
      </motion.div>
    </AnimatePresence>
  </main><Footer /><CapybaraPet /></div>
}

export default function App() {
  return <MotionConfig reducedMotion="user"><HashRouter><AppShell /></HashRouter></MotionConfig>
}
