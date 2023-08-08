module.exports = {
  title: `Jayden {do: smite}`,
  description: `Jayden's devLog`,
  language: `ko`, // `ko`, `en` => currently support versions for Korean and English
  siteUrl: `https://JaydenLee1116.github.io`,
  ogImage: `/og-image.png`, // Path to your in the 'static' folder
  comments: {
    utterances: {
      repo: `JaydenLee1116/JaydenLee1116.github.io`, // `zoomkoding/zoomkoding-gatsby-blog`,
    },
  },
  ga: 'G-BGBP496RK4', // Google Analytics Tracking ID
  author: {
    name: `이재호`,
    bio: {
      role: `프론트엔드 개발자`,
      description: [
        '꾸준히 나아가는',
        '매일 기록하는',
        '지금을 살아가는',
        '새로움에 도전하는',
        '함께의 힘을 아는',
        '세상에 기여하는',
        '행복을 추구하는',
      ],
      thumbnail: 'jayden-emoji-ani.gif', // Path to the image in the 'asset' folder
    },
    social: {
      github: `https://github.com/JaydenLee1116`, // `https://github.com/JaydenLee1116`,
      linkedIn: `https://www.linkedin.com/in/jaeho-jayden-%E2%80%8Dlee-a0a902216/`, // `https://www.linkedin.com/in/jaeho-jayden-%E2%80%8Dlee-a0a902216/`,
      email: `vv55adss@gmail.com`, // `vv55adss@gmail.com`,
    },
  },

  // metadata for About Page
  about: {
    timestamps: [
      // =====       [Timestamp Sample and Structure]      =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!) =====
      {
        date: '',
        activity: '',
        links: {
          github: '',
          post: '',
          googlePlay: '',
          appStore: '',
          demo: '',
        },
      },
      // ========================================================
      // ========================================================
      {
        date: '2023.01 ~ 2023.06',
        activity: '코드스쿼드 프론트엔드 마스터즈 수료',
        links: {
          post: 'https://codesquad.kr/',
        },
      },
      {
        date: '2022.08 ~ 2022.11',
        activity: 'F-lab 프론트엔드 멘토링 참여',
        links: {
          post: 'https://f-lab.kr/',
        },
      },
      {
        date: '2022.06 ~ ',
        activity: '웹 개발(프론트엔드) 공부 시작',
        links: {
          github: 'https://github.com/JaydenLee1116',
          post: 'https://jayden1116.tistory.com/',
        },
      },
      {
        date: '2021.11 ~ 2022.06',
        activity: 'CodeStates AI Bootcamp 수료',
        links: {
          post: 'https://codestates.com/course/ai',
        },
      },
      {
        date: '2020.12 ~ 2021.10',
        activity: '신사업 기획팀 근무',
        links: {},
      },
    ],

    projects: [
      // =====        [Project Sample and Structure]        =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!)  =====
      {
        title: '',
        description: '',
        techStack: ['', ''],
        thumbnailUrl: '',
        links: {
          post: '',
          github: '',
          googlePlay: '',
          appStore: '',
          demo: '',
        },
      },
      // ========================================================
      // ========================================================
      {
        title: 'Bottle Letter',
        description: '랜덤한 회원에게 유리병에 담긴 편지를 받고 보낼 수 있는 힐링 서비스',
        techStack: ['TypeScript', 'React', 'Recoil', 'Tanstack Query', 'emotion'],
        thumbnailUrl: 'sample.png', // assets 폴더에 png 파일 지정 ex) blog.png
        links: {
          github: 'https://github.com/HoYunBros/bottle-letter-fe',
        },
      },
      {
        title: 'Second Hand',
        description: '동네 별 중고 물품을 거래할 수 있는 서비스',
        techStack: [
          'TypeScript',
          'React',
          'Tanstack Query',
          'Styled Components',
          'Storybook',
          'Express',
          'MongoDB',
        ],
        thumbnailUrl: 'second-hand-main.gif', // assets 폴더에 png 파일 지정 ex) blog.png
        links: {
          github: 'https://github.com/masters2023-2nd-project-02/second-hand',
        },
      },
      {
        title: 'Issue Tracker',
        description: '이슈 단위로 프로젝트를 관리할 수 있는 서비스',
        techStack: ['TypeScript', 'React', 'Tailwind CSS', 'Storybook', 'Express', 'MongoDB'],
        thumbnailUrl: 'issue-tracker-main.gif', // assets 폴더에 png 파일 지정 ex) blog.png
        links: {
          github: 'https://github.com/codesquad-members-2023-team2/issue-tracker',
          demo:
            'https://github.com/codesquad-members-2023-team2/issue-tracker/wiki/%EA%B8%B0%EB%8A%A5-%EB%8D%B0%EB%AA%A8',
        },
      },
    ],
  },
};
