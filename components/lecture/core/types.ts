export interface SlideConfig {
  id: string;
  section: number; // 0=opening, 1-5=sections
  component: React.ComponentType<SlideProps>;
}

export interface SlideProps {
  isActive: boolean;
  slideIndex: number;
  totalSlides: number;
}

export const SECTION_TITLES: Record<number, string> = {
  0: "",
  1: "왜 지금 AI 에이전트인가",
  2: "Claude 생태계 한눈에",
  3: "에이전시에 에이전틱 팀 도입하기",
  4: "라이브 데모",
  5: "내일부터 할 수 있는 것",
};
