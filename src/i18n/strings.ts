import type { Locale } from "./locale";

interface Strings {
  subtitle: string;
  metaDescription: string;
  actionActive: string;
  actionInactive: string;
  visitorCountPrefix: string;
}

export const strings: Record<Locale, Strings> = {
  ko: {
    subtitle: "개인 프로젝트/서비스 Entrance",
    metaDescription: "cleanbrain.me 서비스 Entrance",
    actionActive: "이동하기 →",
    actionInactive: "준비 중",
    visitorCountPrefix: "오늘",
  },
  en: {
    subtitle: "Personal projects & services",
    metaDescription: "cleanbrain.me service entrance",
    actionActive: "Open →",
    actionInactive: "Coming soon",
    visitorCountPrefix: "Today",
  },
};
