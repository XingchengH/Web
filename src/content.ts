export const projects = [
  {
    number: '01',
    category: 'FULL-STACK · REAL-TIME',
    title: 'Real-Time Chat',
    description: 'A little more connection, in real time.',
    detail:
      'A messaging app with authentication, online presence, and persistent chat history. Socket.IO keeps conversations moving in both directions.',
    tags: ['React', 'TypeScript', 'Socket.IO', 'Zustand', 'MongoDB'],
    href: 'https://github.com/XingchengH/chatapp/tree/deployment',
    artwork: 'chat',
    artLabel: 'A conversation, in motion',
  },
  {
    number: '02',
    category: 'FULL-STACK · MUSIC',
    title: 'Music Streaming',
    description: 'A music app made for the music lover.',
    detail:
      'A Spotify-inspired project with audio playback, authentication, and an admin upload flow. AWS S3 stores songs and artwork; Redux Toolkit manages app state.',
    tags: ['React', 'TypeScript', 'Redux Toolkit', 'AWS S3'],
    href: 'https://github.com/XingchengH/Spotify-Clone',
    artwork: 'music',
    artLabel: 'A little something on repeat',
  },
  {
    number: '03',
    category: 'TEAM PROJECT · SCHEDULING',
    title: 'Inline Scheduler',
    description: 'Making room for the people in your life.',
    detail:
      'A CUNY Tech Prep team project for scheduling and connecting with friends. I contributed pages, authentication, event creation, and real-time notifications.',
    tags: ['React', 'Firebase', 'Tailwind CSS'],
    href: 'https://github.com/XingchengH/Inline-schedule/tree/curr',
    liveHref: 'https://inline-schedule.vercel.app/',
    artwork: 'schedule',
    artLabel: 'Plans are better together',
  },
] as const

export const experience = [
  {
    number: '01',
    title: 'Make access make sense',
    description:
      'Built a role reconciliation workflow with dependency-aware filtering, asynchronous jobs, and searchable history.',
  },
  {
    number: '02',
    title: 'A smoother way to onboard',
    description:
      'Delivered a multi-step React onboarding wizard inside a legacy AngularJS application, with validation and feature-flagged rollout.',
  },
  {
    number: '03',
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
