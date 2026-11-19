import type { Skill } from "../../types/homepage";
import "./SkillCard.css";

interface SkillCardProps {
  skill: Skill;
}

function SkillCard({ skill }: SkillCardProps) {
  return (
    <article className="skill-card">
      <div className="skill-card__heading">
        <img src={skill.icon} alt="" />
        <h3>{skill.name}</h3>
      </div>
      <ul className="skill-card__tags" aria-label={`${skill.name} 技術標籤`}>
        {skill.tag.map((tag) => <li key={tag}>{tag}</li>)}
      </ul>
      {skill.description && <p>{skill.description}</p>}
    </article>
  );
}

export default SkillCard;
