module.exports = {
  title: `Hello World! Hello Jayden!`,
  description: `Jayden's devLog`,
  language: `ko`, // `ko`, `en` => currently support versions for Korean and English
  siteUrl: `https://JaydenLee1116.github.io`,
  ogImage: `/og-image.png`, // Path to your in the 'static' folder
  comments: {
    utterances: {
      repo: ``, // `zoomkoding/zoomkoding-gatsby-blog`,
    },
  },
  ga: '0', // Google Analytics Tracking ID
  author: {
    name: `이재호`,
    bio: {
      role: `프론트엔드 개발자`,
      description: ['세상에 기여하는', '인생을 여행하는', '이로움을 행하는', '책을 좋아하는'],
      thumbnail: 'profile.png', // Path to the image in the 'asset' folder
    },
    social: {
      github: `https://github.com/JaydenLee1116`, // `https://github.com/JaydenLee1116`,
      linkedIn: `ㅁ`, // ``,
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
        date: '2020.12 ~ 2021.10',
        activity: '신사업 기획팀 근무',
        links: {},
      },
      {
        date: '2021.11 ~ 2022.06',
        activity: 'CodeStates AI Bootcamp 수료',
        links: {
          post: 'https://codestates.com/course/ai',
        },
      },
      {
        date: '2022.04 ~ ',
        activity: '웹 개발(프론트엔드) 공부 시작',
        links: {
          github: 'https://github.com/JaydenLee1116',
          post: 'https://jayden1116.tistory.com/',
        },
      },
      {
        date: '2022.08 ~ ',
        activity: 'F-lab 프론트엔드 멘토링 참여',
        links: {
          post: 'https://f-lab.kr/',
        },
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
        title: '준비 중',
        description: '준비 중',
        techStack: ['HTML', 'CSS', 'Javascript'],
        thumbnailUrl: 'blog.png', // assets 폴더에 png 파일 지정 ex) blog.png
        links: {
          github: 'https://github.com/JaydenLee1116',
        },
      },
    ],
  },
};
