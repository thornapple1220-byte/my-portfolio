export const CATEGORIES = ['전체', 'Design', 'Frontend', 'Framework', '기타'];

export const categoryColors = {
  Design:    '#FF2D55',  // 핫핑크
  Frontend:  '#2D5AA0',  // 네이비
  Framework: '#7B61FF',  // 퍼플
  기타:      '#FF9500',  // 오렌지
};

export const skillsData = [
  { id: 1,  name: 'Adobe Photoshop',   level: 90, category: 'Design',    showInHome: true,  description: '이미지 편집, 합성, 디지털 일러스트레이션' },
  { id: 2,  name: '문서작성',           level: 80, category: '기타',      showInHome: true,  description: 'Word · Excel · PPT 오피스 문서 작성' },
  { id: 3,  name: 'Adobe Illustrator', level: 70, category: 'Design',    showInHome: true,  description: '벡터 그래픽, 로고, 인쇄물 디자인' },
  { id: 4,  name: 'Figma',             level: 70, category: 'Design',    showInHome: true,  description: 'UI/UX 디자인 및 프로토타이핑' },
  { id: 5,  name: 'Adobe Premiere Pro',level: 60, category: 'Design',    showInHome: false, description: '영상 편집 및 컬러그레이딩' },
  { id: 6,  name: 'Adobe After Effects',level: 40, category: 'Design',   showInHome: false, description: '모션 그래픽 및 시각 효과' },
  { id: 7,  name: 'HTML/CSS',          level: 30, category: 'Frontend',  showInHome: false, description: '웹 페이지 마크업 및 스타일링' },
  { id: 8,  name: 'Claude 바이브코딩', level: 30, category: 'Framework', showInHome: false, description: 'AI와 함께하는 창의적 코딩' },
];

export const aboutMeData = {
  basicInfo: {
    name: '장지은',
    education: '서울호서전문학교',
    major: '시각디자인과',
    experience: '6년차',
    photo: '',
  },
  sections: [
    {
      id: 'i-am',
      title: 'I AM',
      content: [
        '트렌드를 읽어가는 디자이너,',
        '사회생활 경험 만땅 디자이너,',
        '귀를 기울일 줄 아는 디자이너.',
      ],
      showInHome: true,
    },
    {
      id: 'skills',
      title: '스킬',
      showInHome: true,
    },
    {
      id: 'personal',
      title: '개인적인 이야기',
      content:
        '인디밴드 음악 듣기, 공연 보러 다니는 취미가 있어요! 여러 종류의 게임을 하는 것도 좋아하고, 사람들과 어울리는 것도 좋아해요.',
      showInHome: false,
    },
  ],
};
