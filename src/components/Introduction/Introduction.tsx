import type { IntroductionData } from "../../types/homepage";
import "./Introduction.css";

interface IntroductionProps {
  data: IntroductionData;
}

function Introduction({ data }: IntroductionProps) {
  return (
    <section className="introduction" aria-labelledby="introduction-title">
      <div className="introduction__copy">
        <p className="introduction__eyebrow">ABOUT ME</p>
        <h1 id="introduction-title">{data.name}</h1>
        <p className="introduction__description">{data.description}</p>
        <p className="introduction__catchphrase">{data.catchphrase}</p>
      </div>
      <img className="introduction__avatar" src={data.avatar} alt="Rich 的個人照片" />
    </section>
  );
}

export default Introduction;
