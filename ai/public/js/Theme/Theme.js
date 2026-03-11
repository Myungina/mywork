// ========================================
// 카테고리 설정
// ========================================
const {useState, useMemo, useEffect, useRef} = React;
const categoryConfig = {
    "전문자격": {
        bg: "bg-indigo-100",
        text: "text-indigo-600",
        icon: "⚖️",
        gradient: "from-indigo-500 to-purple-500"
    },
    "금융/보험/회계": {
        bg: "bg-emerald-100",
        text: "text-emerald-600",
        icon: "💰",
        gradient: "from-emerald-500 to-teal-500"
    },
    "소방/전기/위험물": {
        bg: "bg-orange-100",
        text: "text-orange-600",
        icon: "⚡",
        gradient: "from-orange-500 to-red-500"
    },
    "심리/상담": {
        bg: "bg-pink-100",
        text: "text-pink-600",
        icon: "💝",
        gradient: "from-pink-500 to-rose-500"
    },
    "생활/산업기술": {
        bg: "bg-sky-100",
        text: "text-sky-600",
        icon: "🔧",
        gradient: "from-sky-500 to-blue-500"
    },
    "무역/물류/유통": {
        bg: "bg-violet-100",
        text: "text-violet-600",
        icon: "🚢",
        gradient: "from-violet-500 to-purple-500"
    },
    "나무/조경/식물": {
        bg: "bg-lime-100",
        text: "text-lime-600",
        icon: "🌳",
        gradient: "from-lime-500 to-green-500"
    },
    "언어/외국어": {
        bg: "bg-amber-100",
        text: "text-amber-600",
        icon: "🌏",
        gradient: "from-amber-500 to-yellow-500"
    },
    "면허증": {
        bg: "bg-cyan-100",
        text: "text-cyan-600",
        icon: "📋",
        gradient: "from-cyan-500 to-teal-500"
    },
    "기타 자격": {
        bg: "bg-gray-100",
        text: "text-gray-600",
        icon: "📌",
        gradient: "from-gray-500 to-slate-500"
    },
    "공무원": {
        bg: "bg-blue-100",
        text: "text-blue-600",
        icon: "🏛️",
        gradient: "from-blue-500 to-indigo-500"
    },
    "대학/학점": {
        bg: "bg-purple-100",
        text: "text-purple-600",
        icon: "🎓",
        gradient: "from-purple-500 to-fuchsia-500"
    },
    "안쌤 영재교육": {
        bg: "bg-rose-100",
        text: "text-rose-600",
        icon: "⭐",
        gradient: "from-rose-500 to-pink-500"
    }
};

const difficultyConfig = {
    1: {
        label: "쉬움",
        color: "text-green-500",
        bg: "bg-green-100",
        emoji: "🟢"
    },
    2: {
        label: "보통",
        color: "text-blue-500",
        bg: "bg-blue-100",
        emoji: "🔵"
    },
    3: {
        label: "중상",
        color: "text-yellow-500",
        bg: "bg-yellow-100",
        emoji: "🟡"
    },
    4: {
        label: "어려움",
        color: "text-orange-500",
        bg: "bg-orange-100",
        emoji: "🟠"
    },
    5: {
        label: "최고난도",
        color: "text-red-500",
        bg: "bg-red-100",
        emoji: "🔴"
    }
};

const STUDY_BACKGROUND = [
    {
        value: "비전공자",
        icon: "BookOpen",
        desc: "새로운 분야 도전",
        sub: "진입장벽 낮은 자격증",
        color: "from-emerald-500 to-teal-500"
    },
    {
        value: "전공자",
        icon: "Award",
        desc: "관련 학과 전공",
        sub: "전공 활용 자격증",
        color: "from-violet-500 to-purple-500"
    },
    {
        value: "경력자",
        icon: "Briefcase",
        desc: "실무 경험 보유",
        sub: "경력 연계 자격증",
        color: "from-orange-500 to-amber-500"
    }
];
const EMPLOYMENT_OPTIONS = [
    {
        value: "직장인",
        desc: "근무 중",
        tip: "야간/주말 학습",
        icon: "💼"
    },
    {
        value: "취업준비생",
        desc: "구직 중",
        tip: "풀타임 집중",
        icon: "🎯"
    },
    {
        value: "학생",
        desc: "재학 중",
        tip: "학업 병행",
        icon: "📚"
    },
    {
        value: "기타",
        desc: "경력단절/프리랜서",
        tip: "유연한 시간",
        icon: "🌟"
    }
];

const ACQUISITION_PERIOD = ["3개월", "6개월", "12개월", "24개월", "36개월 이상"];

const GOAR =[
    {value: "고소득", icon: "TrendingUp", desc: "전문직 고연봉", emoji: "💰"},
    {value: "안정적 취업", icon: "Building",  desc: "공기업/대기업",  emoji: "🏢"},
    {value: "이직/전환", icon: "Zap", desc: "커리어 전환", emoji: "🔄"},
    {value: "창업", icon: "Star", desc: "독립 개업", emoji: "🚀"}
]
