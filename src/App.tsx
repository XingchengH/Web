import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, MotionConfig, useReducedMotion } from 'motion/react'
import { HashRouter, Link, NavLink, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { artists, experience, projects } from './content'

const resumeUrl = `${import.meta.env.BASE_URL}xingcheng-huang-resume.pdf`
const pageNames: Record<string, string> = {
  '/': 'Home', '/work': 'Work', '/experience': 'Experience', '/about': 'About', '/contact': 'Contact',
}
const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Work', to: '/work' },
  { label: 'Experience', to: '/experience' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

function Star({ className = '' }: { className?: string }) {
  return <span className={`star ${className}`} aria-hidden="true">✳</span>
}

function Header() {
  return (
    <header className="site-header wrap">
      <Link className="wordmark" to="/" aria-label="Xingcheng Huang, home">VINCENT<Star />HUANG</Link>
      <span className="header-note">ENGINEER / MUSIC LOVER / READER</span>
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
        <div className="cover-top mono"><span>THE VINCENT MIX</span><span>VOL. 01 / PERSONAL PORTFOLIO</span></div>
        <div className="cover-title">CODE<br />MEETS<br />POP<span>.</span></div>
        <div className="cover-bottom"><span className="mono">A LITTLE LOGIC<br />A LOT OF CURIOSITY</span><div className="cover-record" aria-hidden="true"><Star /></div></div>
      </div>
      <span className="cover-caption mono">SIDE A: THE WORK &nbsp; / &nbsp; SIDE B: THE PERSON</span>
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
          <motion.div className="eyebrow" {...reveal(.04)}><span className="eyebrow-dot" /> XINGCHENG HUANG · SUNNYVALE, CA</motion.div>
          <motion.h1 id="hero-title" {...reveal(.1)}>Creative mind.<br /><span>Builder</span> by<br />nature<span className="period">.</span></motion.h1>
          <motion.p {...reveal(.19)}>Hi, I’m Vincent — a frontend-focused full-stack engineer making complex things feel simple. Pop music is somewhere in the mix, too.</motion.p>
          <motion.div className="hero-actions" {...reveal(.27)}>
            <Link className="button button-primary" to="/work">Explore my work <span aria-hidden="true">↗</span></Link>
            <Link className="button button-outline" to="/about">A little about me <Star /></Link>
          </motion.div>
          <motion.div className="hero-footnote mono" {...reveal(.36)}><span>FRONTEND-FOCUSED</span><span>FULL-STACK CAPABLE</span></motion.div>
        </div>
        <Cover />
      </section>
      <div className="wrap"><div className="marquee" aria-label="Engineering, good interfaces, pop music, new ideas">
        {['ENGINEERING', 'GOOD INTERFACES', 'POP MUSIC', 'NEW IDEAS'].map(word => <span className="marquee-item" key={word}>{word}<Star /></span>)}
      </div></div>
    </div>
  )
}

function PageHeading({ eyebrow, title, detail }: { eyebrow: string; title: string; detail: string }) {
  return <div className="page-heading"><div><p className="eyebrow">{eyebrow}</p><h1>{title}<Star /></h1></div><p className="page-heading-detail">{detail}</p></div>
}

function ProjectArtwork({ type, label }: { type: string; label: string }) {
  return (
    <div className={`project-art project-art--${type}`} role="img" aria-label={label}>
      {type === 'chat' && <><span className="art-chat art-chat-one">HELLO</span><span className="art-chat art-chat-two">RIGHT<br />HERE ↗</span><span className="art-caption mono">A CONVERSATION IN MOTION</span></>}
      {type === 'music' && <><span className="art-music-disc"><span>ON<br />REPEAT</span></span><span className="art-caption mono">FOR THE LOVE OF MUSIC</span></>}
      {type === 'schedule' && <><span className="art-schedule-top mono">GOOD THINGS AHEAD</span><div className="art-schedule-grid"><span>LET’S</span><span>MAKE</span><span>TIME</span><span><Star /></span></div><span className="art-caption mono">PLANS ARE BETTER TOGETHER</span></>}
    </div>
  )
}

function Work() {
  const [selected, setSelected] = useState(0)
  const project = projects[selected]
  const reduced = useReducedMotion()
  return (
    <section className="wrap view-section work-view" aria-labelledby="work-heading">
      <PageHeading eyebrow="A FEW THINGS I'VE BUILT" title="Things I’ve made" detail="A few projects that bring ideas, interfaces, and the details together." />
      <h2 id="work-heading" className="sr-only">Selected projects</h2>
      <div className="work-layout">
        <div className="project-picker" aria-label="Choose a project">
          <div className="picker-label mono"><span>THE PROJECT INDEX</span><span>01—03</span></div>
          {projects.map((item, index) => (
            <motion.button type="button" key={item.number} className="project-choice" aria-pressed={selected === index}
              onClick={() => setSelected(index)} whileHover={reduced ? undefined : { x: 4 }} whileTap={reduced ? undefined : { scale: .98 }}>
              <span className="project-choice-number mono">{item.number}</span><span className="project-choice-name">{item.title}<small>{item.category}</small></span><span className="choice-arrow" aria-hidden="true">↗</span>
            </motion.button>
          ))}
          <p className="picker-note">Select a project to take a closer look. <Star /></p>
        </div>
        <div className="project-stage" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.article key={project.number} className="project-detail-view"
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14, scale: .99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: .25, ease: 'easeOut' }}>
              <ProjectArtwork type={project.artwork} label={project.artLabel} />
              <div className="project-meta mono"><span>{project.category}</span><span>/{project.number}</span></div>
              <h2>{project.title}</h2><p className="project-subtitle">{project.description}</p><p className="project-description">{project.detail}</p>
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
        <div className="experience-intro"><p className="eyebrow">A LITTLE BACKGROUND</p><h1 id="experience-title">Complexity,<br /><span>meet clarity.</span></h1><p>I enjoy working through the details that make software more useful, understandable, and dependable.</p><a className="text-link" href={resumeUrl} target="_blank" rel="noreferrer">See my résumé <span aria-hidden="true">↗</span></a></div>
        <div className="experience-content">
          <div className="experience-heading"><div><span className="mono">2024 — 2026</span><h2>Apple</h2><p>Full Stack Developer · Cupertino, CA</p></div><Star /></div>
          <p className="experience-summary">Frontend-focused work on an internal identity and access management platform: connecting people, applications, and the access they need.</p>
          <div className="experience-list">{experience.map((item, index) => <motion.article className="experience-item" key={item.number} initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .12 + index * .08, duration: .35 }}><span className="mono">{item.number}</span><div><h3>{item.title}</h3><p>{item.description}</p></div></motion.article>)}</div>
          <p className="experience-stack mono">REACT / TYPESCRIPT / ANGULARJS / ZUSTAND / JAVA / SPRING BOOT</p>
          <div className="earlier-experience"><p className="mono">BEFORE THAT</p><p><strong>Pilot Technologies</strong> · Software Engineer Intern <span>2023</span></p><p><strong>CUNY Tech Prep</strong> · Web Development Fellow <span>2022–2023</span></p><p><strong>Research Foundation of CUNY</strong> · Software Engineer Intern <span>2022</span></p></div>
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
      <div className="about-intro"><p className="eyebrow">THE PERSON BEHIND THE CODE</p><h1 id="about-title">A little more<br /><span>about me.</span></h1><p>I’m Xingcheng, but you can call me Vincent. I’m a Queens College computer science grad who loves a good problem, a good story, and a very good pop song.</p><motion.div className="about-stamp" aria-hidden="true" whileHover={reduced ? undefined : { rotate: 8, scale: 1.06 }}><Star /><span>CURIOUS<br />BY NATURE</span></motion.div></div>
      <div className="about-card"><div className="about-card-top"><span className="mono">OFF THE CLOCK / 01</span><Star /></div>
        <div className="interest-controls" aria-label="Choose an interest"><button type="button" aria-pressed={interest === 'music'} onClick={() => setInterest('music')}>Music ♫</button><button type="button" aria-pressed={interest === 'reading'} onClick={() => setInterest('reading')}>Reading ✳</button></div>
        <div className="interest-content" aria-live="polite"><AnimatePresence mode="wait" initial={false}><motion.div key={interest} initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }} transition={{ duration: .2 }}>
          {interest === 'music' ? <><p className="interest-kicker mono">SOME OF MY FAVORITES</p><h2>Pop is my<br />soundtrack<span>.</span></h2><p>From big vocals to the songs I keep coming back to — there’s always room for more on the playlist.</p><div className="artist-list">{artists.map(artist => <span key={artist}>{artist}</span>)}<span>+ many more</span></div></> : <><p className="interest-kicker mono">BETWEEN THE PAGES</p><h2>A novel kind<br />of escape<span>.</span></h2><p>When I’m away from the screen, I love getting lost in a good novel and discovering a different kind of world.</p><div className="book-art" aria-hidden="true"><span>GOOD<br />STORIES</span><Star /></div></>}
        </motion.div></AnimatePresence></div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section className="contact-section view-contact" aria-labelledby="contact-title"><div className="wrap contact-inner"><div><p className="eyebrow">HAVE SOMETHING IN MIND?</p><h1 id="contact-title">Let’s make<br /><span>something good.</span></h1><p className="contact-intro">Have a project, a question, or just want to say hello? I’d love to hear from you.</p><a className="contact-email" href="mailto:Huangxcxc@gmail.com">Huangxcxc@gmail.com <span aria-hidden="true">↗</span></a><div className="contact-links"><a href="https://github.com/XingchengH" target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/in/xingcheng-huang67/" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href={resumeUrl} target="_blank" rel="noreferrer">Résumé ↗</a></div></div><motion.div className="contact-side" aria-hidden="true" whileHover={{ rotate: 12, scale: 1.05 }}><Star /><p>GOOD WORK.<br />GOOD MUSIC.<br />GOOD COMPANY.</p></motion.div></div></section>
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
  </main><Footer /></div>
}

export default function App() {
  return <MotionConfig reducedMotion="user"><HashRouter><AppShell /></HashRouter></MotionConfig>
}
