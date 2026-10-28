import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react'

function useDemoLoop(stepCount: number, interval: number) {
  const rootRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(rootRef, { amount: 0.35 })
  const reduced = Boolean(useReducedMotion())
  const [pageVisible, setPageVisible] = useState(!document.hidden)
  const [phase, setPhase] = useState(0)
  const [sequence, setSequence] = useState(0)

  useEffect(() => {
    const updateVisibility = () => setPageVisible(!document.hidden)
    document.addEventListener('visibilitychange', updateVisibility)
    return () => document.removeEventListener('visibilitychange', updateVisibility)
  }, [])

  useEffect(() => {
    if (reduced) {
      setPhase(stepCount - 1)
      return
    }
    if (!isInView || !pageVisible) return

    setPhase(0)
    const timer = window.setInterval(() => {
      setPhase(current => (current + 1) % stepCount)
    }, interval)
    return () => window.clearInterval(timer)
  }, [interval, isInView, pageVisible, reduced, sequence, stepCount])

  return {
    rootRef,
    phase: reduced ? stepCount - 1 : phase,
    restart: () => setSequence(current => current + 1),
  }
}

const chatContacts = [
  { initials: 'AC', name: 'Ava Chen', status: 'Online', online: true },
  { initials: 'JM', name: 'Jon Miller', status: '12 min ago', online: false },
  { initials: 'NS', name: 'Nia Shah', status: 'Online', online: true },
]

export function ChatDemo() {
  const { rootRef, phase, restart } = useDemoLoop(5, 1300)
  const draft = phase === 1 ? 'Meet at Voyager at 3?' : ''

  return (
    <figure className="project-demo project-demo--chat" aria-label="Source-based Real-Time Chat interface demo with fictional data">
      <div className="demo-window-bar">
        <span className="demo-window-dots" aria-hidden="true"><i /><i /><i /></span>
        <span>Real-Time Chat</span>
        <button type="button" onClick={restart} aria-label="Replay chat demo">Replay</button>
      </div>
      <div className="chat-demo-ui" data-ui ref={rootRef}>
        <aside className="chat-demo-sidebar" aria-label="Fictional contacts">
          <div className="chat-demo-sidebar-title"><strong>Contacts</strong><span>2 online</span></div>
          <div className="chat-demo-contact-list">
            {chatContacts.map((contact, index) => (
              <div className={`chat-demo-contact${index === 0 ? ' is-selected' : ''}`} key={contact.name}>
                <span className="chat-demo-avatar">{contact.initials}{contact.online && <i aria-label="Online" />}</span>
                <span><strong>{contact.name}</strong><small>{contact.status}</small></span>
              </div>
            ))}
          </div>
        </aside>
        <section className="chat-demo-conversation" aria-label="Conversation with Ava Chen">
          <header className="chat-demo-header">
            <span className="chat-demo-avatar">AC<i aria-label="Online" /></span>
            <span><strong>Ava Chen</strong><small>Online</small></span>
          </header>
          <div className="chat-demo-messages" aria-live="off">
            <div className="chat-message is-them"><span>Still free for coffee today?</span><small>2:41 PM</small></div>
            <div className="chat-message is-me"><span>Absolutely — 3 PM works.</span><small>2:42 PM</small></div>
            <AnimatePresence initial={false}>
              {phase >= 2 && <motion.div className="chat-message is-me is-new" key="sent"
                initial={{ opacity: 0, y: 8, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: .28, ease: [0.22, 1, 0.36, 1] }}>
                <span>Meet at Voyager at 3?</span><small>2:43 PM · Sent</small>
              </motion.div>}
              {phase === 3 && <motion.div className="chat-typing" key="typing" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <i /><i /><i /><span className="sr-only">Ava is typing</span>
              </motion.div>}
              {phase === 4 && <motion.div className="chat-message is-them is-new" key="reply"
                initial={{ opacity: 0, y: 8, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: .28, ease: [0.22, 1, 0.36, 1] }}>
                <span>Perfect — see you there!</span><small>2:43 PM</small>
              </motion.div>}
            </AnimatePresence>
          </div>
          <div className="chat-demo-composer">
            <span className={draft ? 'has-draft' : ''}>{draft || 'Type a message…'}</span>
            <span className={`chat-demo-send${draft ? ' is-ready' : ''}`} aria-hidden="true">↗</span>
          </div>
        </section>
      </div>
      <figcaption>Source-based UI demo · Fictional conversation data</figcaption>
    </figure>
  )
}

const musicTracks = [
  { title: '给我一个理由忘记', artist: 'A-Lin', cover: 'project-demos/music/a-lin.jpg' },
  { title: 'Love Story', artist: 'Taylor Swift', cover: 'project-demos/music/love-story.jpg' },
  { title: 'Hello', artist: 'Adele', cover: 'project-demos/music/hello.jpg' },
]

const musicProgress = [0.12, 0.12, 0.18, 0.48, 0.62, 0.24]

export function MusicDemo() {
  const { rootRef, phase, restart } = useDemoLoop(6, 1300)
  const activeIndex = phase >= 5 ? 2 : phase >= 2 ? 1 : 0
  const previewIndex = phase === 1 ? 1 : phase === 4 ? 2 : -1
  const activeTrack = musicTracks[activeIndex]
  const isPlaying = phase >= 2

  return (
    <figure className="project-demo project-demo--music" aria-label="Source-based Music Streaming interface demo using repository assets">
      <div className="demo-window-bar">
        <span className="demo-window-dots" aria-hidden="true"><i /><i /><i /></span>
        <span>Music Streaming</span>
        <button type="button" onClick={restart} aria-label="Replay music demo">Replay</button>
      </div>
      <div className="music-demo-ui" data-ui ref={rootRef}>
        <aside className="music-demo-sidebar" aria-label="Music navigation">
          <strong>WAVE</strong>
          <span className="is-active">Home</span>
          <span>Search</span>
          <span>Library</span>
        </aside>
        <section className="music-demo-main">
          <div className="music-demo-heading"><span><small>Good afternoon</small><strong>Made for you</strong></span><span className="music-demo-profile">VH</span></div>
          <div className="music-demo-grid">
            {musicTracks.map((track, index) => (
              <article className={`music-demo-card${activeIndex === index ? ' is-active' : ''}${previewIndex === index ? ' is-previewed' : ''}`} key={track.title}>
                <div className="music-demo-cover">
                  <img src={`${import.meta.env.BASE_URL}${track.cover}`} alt="" />
                  <motion.span className="music-card-play" aria-hidden="true"
                    animate={{ opacity: previewIndex === index || activeIndex === index ? 1 : 0, scale: previewIndex === index ? 1.08 : 1 }}
                    transition={{ duration: .25 }}><i /></motion.span>
                </div>
                <strong>{track.title}</strong><small>{track.artist}</small>
              </article>
            ))}
          </div>
        </section>
        <footer className="music-demo-player">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div className="music-now-playing" key={activeTrack.title}
              initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: .22 }}>
              <img src={`${import.meta.env.BASE_URL}${activeTrack.cover}`} alt="" />
              <span><strong>{activeTrack.title}</strong><small>{activeTrack.artist}</small></span>
            </motion.div>
          </AnimatePresence>
          <div className="music-demo-controls" aria-label={isPlaying ? 'Playing' : 'Paused'}>
            <div><span aria-hidden="true">‹</span><span className={`music-control-play${isPlaying ? ' is-playing' : ''}`} aria-hidden="true"><i /><i /></span><span aria-hidden="true">›</span></div>
            <div className="music-progress"><motion.span animate={{ scaleX: musicProgress[phase] }} transition={{ duration: .65, ease: 'easeInOut' }} /></div>
          </div>
          <span className="music-demo-volume" aria-hidden="true">VOL ···</span>
        </footer>
      </div>
      <figcaption>Source-based UI demo · Original repository artwork and song data</figcaption>
    </figure>
  )
}
