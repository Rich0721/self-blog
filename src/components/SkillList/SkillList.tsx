import SkillCard from "../SkillCard/SkillCard";
import type { Skill } from "../../types/homepage";
export default function SkillList({ skills }: { skills: readonly Skill[] }) {
  return <div className="skills__grid">{skills.map(skill => <SkillCard key={skill.name} skill={skill} />)}</div>;
}
