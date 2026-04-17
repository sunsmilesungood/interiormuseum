export type Portfolio = {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  youtubeUrl: string;
};

export type Expert = {
  id: string;
  name: string;
  category: string;
  categorySlug: string;
  specialty: string;
  bio: string;
  experience: string;
  imageUrl: string | null;
  quote?: string;
  longBio?: string;
  tags?: string[];
  portfolios?: Portfolio[];
};

export const dummyExperts: Expert[] = [
  {
    id: "expert-kim",
    name: "김철수",
    category: "목공",
    categorySlug: "carpentry",
    specialty: "Carpentry Master · 목공 전문",
    bio: "손으로 빚은 공간이 가장 오래갑니다. 맞춤 가구부터 전체 목공까지 책임집니다.",
    experience: "경력 20년",
    imageUrl: "/images/experts/kim-cheolsu.jpg",
    quote: '"나무의 결을 이해하는 것은 공간의 숨결을 만드는 일입니다."',
    longBio: "단순한 조립과 재단의 과정을 넘어, 공간의 뼈대를 세우고 생명력을 부여하는 목공 마스터입니다. 수십 년간 다듬어온 정교한 기술과 예술적 감각으로, 변치 않는 견고함과 아름다움을 동시에 구현합니다. 고급 주거 공간부터 상업 인테리어까지, 고객의 꿈을 현실로 만드는 진정한 장인정신으로 매 프로젝트에 임하고 있습니다. 나무라는 소재가 가진 자연의 따뜻함을 공간에 온전히 담아내는 것이 저의 사명입니다.",
    tags: ["맞춤 가구 제작", "원목 인테리어", "주방 시공", "붙박이장", "몰딩 시공", "데크 시공"],
    portfolios: [
      {
        id: "p1",
        title: "한남동 고급 빌라 — 전체 목공 시공",
        description: "원목 월넛을 활용한 거실 패널링과 맞춤 수납장 제작. 공간의 격을 한 차원 높인 프리미엄 목공 프로젝트입니다.",
        thumbnailUrl: "/images/portfolios/kim-hannam-villa.jpg",
        youtubeUrl: "https://youtube.com"
      },
      {
        id: "p2",
        title: "청담 라운지 바 — 바 카운터 & 인테리어",
        description: "오크 원목을 활용한 대형 바 카운터와 선반 제작. 공간에 클래식한 분위기를 더한 상업 시공 프로젝트입니다.",
        thumbnailUrl: "/images/portfolios/kim-cheongdam-lounge.jpg",
        youtubeUrl: "https://youtube.com"
      }
    ]
  },
  {
    id: "expert-lee",
    name: "이영호",
    category: "타일",
    categorySlug: "tile",
    specialty: "Tiling Master · 타일 전문",
    bio: "줄눈 하나도 허투루 하지 않습니다. 욕실·주방 타일 시공의 정석을 보여드립니다.",
    experience: "경력 15년",
    imageUrl: "/images/experts/lee-yeongho.jpg",
  },
  {
    id: "expert-park",
    name: "박지은",
    category: "도배",
    categorySlug: "wallpaper",
    specialty: "Wallpaper Master · 도배 전문",
    bio: "벽 한 장이 공간의 분위기를 바꿉니다. 소재 선택부터 마감까지 꼼꼼하게 챙깁니다.",
    experience: "경력 12년",
    imageUrl: "/images/experts/park-jieun.jpg",
  },
  {
    id: "expert-choi",
    name: "최동현",
    category: "철거",
    categorySlug: "demolition",
    specialty: "Demolition Master · 철거 전문",
    bio: "빠르고 깔끔한 철거가 좋은 시공의 시작입니다. 먼지 없는 현장을 약속합니다.",
    experience: "경력 18년",
    imageUrl: "/images/experts/choi-donghyeon.jpg",
  },
  {
    id: "expert-jung",
    name: "정민수",
    category: "가구",
    categorySlug: "furniture",
    specialty: "Furniture Master · 가구 전문",
    bio: "색 하나로 공간의 온도가 달라집니다. 조색부터 마감 코팅까지 직접 작업합니다.",
    experience: "경력 14년",
    imageUrl: "/images/experts/jeong-minsu.jpg",
  },
  {
    id: "expert-han",
    name: "한승우",
    category: "전기",
    categorySlug: "electric",
    specialty: "Electrical Master · 전기 전문",
    bio: "안전이 먼저입니다. 분전반 교체부터 조명 설계까지 전기 전 분야를 다룹니다.",
    experience: "경력 16년",
    imageUrl: "/images/experts/han-seungwoo.jpg",
  },
  {
    id: "expert-yoon",
    name: "윤재호",
    category: "타일",
    categorySlug: "tile",
    specialty: "Tile Master · 타일 전문",
    bio: "패턴과 컬러를 읽는 눈이 다릅니다. 수입 타일 시공 경험이 풍부합니다.",
    experience: "경력 12년",
    imageUrl: "/images/experts/yun-jaeho.jpg",
  },
  {
    id: "expert-lim",
    name: "임성진",
    category: "창호",
    categorySlug: "window", // Fallback for standard style although standard didn't have window var
    specialty: "Window Master · 창호 전문",
    bio: "단열과 방음, 두 마리 토끼를 잡습니다. 시스템창호 설치의 베테랑입니다.",
    experience: "경력 20년",
    imageUrl: "/images/experts/im-seongjin.jpg",
  }
];
