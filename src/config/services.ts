import type { Service } from "../types/service";

export const services: Service[] = [
  {
    id: "developer",
    name: "developer.cleanbrain.me",
    description: "백엔드 엔지니어 포트폴리오 & 라이브 엔지니어링 랩",
    descriptionEn: "Backend engineer portfolio & live engineering lab",
    url: "https://developer.cleanbrain.me",
    status: "active",
    category: "Portfolio",
  },
  {
    id: "english-core-speaking",
    name: "English Core Speaking",
    description: "영어 말하기 학습 서비스",
    descriptionEn: "An English speaking practice service",
    url: "https://english-core-speaking.education.cleanbrain.me",
    status: "active",
    category: "Learning",
  },
];
