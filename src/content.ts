export const projects = [
  {
    category: 'Full-stack · Real-time',
    title: 'Real-Time Chat',
    description: 'Real-time conversation across authentication, presence, and history.',
    challenge:
      'Keep private conversation immediate while maintaining identity, online status, and message history.',
    contribution:
      'Built protected flows, online presence, persistent chat history, and bidirectional messaging with Socket.IO.',
    tags: ['React', 'TypeScript', 'Socket.IO', 'Zustand', 'MongoDB'],
    href: 'https://github.com/XingchengH/chatapp/tree/deployment',
    artwork: 'chat',
    artLabel: 'Concept artwork for the Real-Time Chat project',
  },
  {
    category: 'Full-stack · Music',
    title: 'Music Streaming',
    description: 'Playback, publishing, and app state in one music-focused interface.',
    challenge:
      'Bring playback, sign-in, catalog state, and publishing into one coherent experience.',
    contribution:
      'Built audio playback, authentication, and an admin upload flow. AWS S3 stores songs and artwork while Redux Toolkit manages app state.',
    tags: ['React', 'TypeScript', 'Redux Toolkit', 'AWS S3'],
    href: 'https://github.com/XingchengH/Spotify-Clone',
    artwork: 'music',
    artLabel: 'Concept artwork for the Music Streaming project',
  },
  {
    category: 'Team project · Scheduling',
    title: 'Inline Scheduler',
    description: 'A shared place for friends to make plans and stay connected.',
    challenge:
      'Help friends create plans and understand shared availability in one place.',
    contribution:
      'Contributed pages, authentication, event creation, and real-time notifications in a CUNY Tech Prep team project.',
    tags: ['React', 'Firebase', 'Tailwind CSS'],
    href: 'https://github.com/XingchengH/Inline-schedule/tree/curr',
    liveHref: 'https://inline-schedule.vercel.app/',
    artwork: 'schedule',
    artLabel: 'Animated product demo of the Inline Scheduler home page',
    image: 'inline-scheduler-home.gif',
  },
] as const

export const experience = [
  {
    title: 'Make access make sense',
    description:
      'Built a role reconciliation workflow with dependency-aware filtering, asynchronous jobs, and searchable history.',
  },
  {
    title: 'A smoother way to onboard',
    description:
      'Delivered a multi-step React onboarding wizard inside a legacy AngularJS application, with validation and feature-flagged rollout.',
  },
  {
    title: 'Clarity in the details',
    description:
      'Created a configuration comparison interface and bulk CSV workflows, and improved reliability across Safari and Chrome.',
  },
] as const

export const artists = [
  'Ariana Grande',
  'Taylor Swift',
  'Mariah Carey',
  'Adele',
  '莫文蔚',
  '黄丽玲',
  '阿妹',
] as const
