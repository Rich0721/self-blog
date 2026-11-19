import Introduction from "../../components/Introduction/Introduction";
import SkillCard from "../../components/SkillCard/SkillCard";
import type { IntroductionData, Skill } from "../../types/homepage";
import myselfImage from "../../asserts/images/myself.jpg";
import backendIcon from "../../asserts/icons/backend.png";
import frontendIcon from "../../asserts/icons/frontend.png";
import databaseIcon from "../../asserts/icons/database.png";
import dockerIcon from "../../asserts/icons/docker.png";
import agentIcon from "../../asserts/icons/software-agent.png";
import "./HomePage.css";

const introduction: IntroductionData = {
  name: "Hi, I'm Rich",
  description:
    "目前任職於 NEC HK，專注於影像辨識、系統開發與架構設計。曾服務於友達光電與玉山銀行，具備製造業影像演算法開發及金融系統自動化的實務經驗。近期致力於研究 AI Multi-Agent 協同開發框架，探索如何建立涵蓋系統設計、開發、程式碼審查與自動化測試的可驗證開發流程。這裡記錄我的技術研究、實作經驗與學習歷程。",
  catchphrase: "Build. Verify. Improve.",
  avatar: myselfImage,
};

const skills: readonly Skill[] = [
  {
    icon: backendIcon,
    name: "後端開發",
    tag: ["FastAPI", "Spring Boot"],
    description: "開發後端應用程式並使用Restful API與資料庫進行整合",
  },
  {
    icon: frontendIcon,
    name: "前端開發",
    tag: ["React", "Vue3", "TypeScript"],
    description:
      "開發前端應用程式並與後端API進行整合，使用Figma MCP進行UI/UX設計與原型製作",
  },
  {
    icon: databaseIcon,
    name: "資料庫管理",
    tag: ["PostgreSQL"],
    description: "關聯性資料庫的設計與管理，確保資料的完整性與效能",
  },
  {
    icon: dockerIcon,
    name: "容器化與部署",
    tag: ["Docker"],
    description:
      "建立容器化開發與部署環境，應用於Side Project 與 NEC 專案中，打造可攜式的系統。",
  },
  {
    icon: agentIcon,
    name: "AI Multi-Agent 協同開發",
    tag: ["Agents", "MCP", "Skill", "Instructions"],
    description:
      "研究並打造具備不同職責的 AI Agent，透過角色分工與協作機制，整合需求分析、系統設計、程式開發、程式碼審查與自動化測試流程。",
  },
];

function HomePage() {
  return (
    <main className="home-page">
      <div className="home-page__content">
        <Introduction data={introduction} />
        <section className="skills" aria-labelledby="skills-title">
          <div className="skills__intro">
            <p className="skills__eyebrow">WHAT I DO</p>
            <h2 id="skills-title">專長技能</h2>
          </div>
          <div className="skills__grid">
            {skills.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default HomePage;
