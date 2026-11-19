export interface IntroductionData {
  name: string;
  description: string;
  catchphrase: string;
  avatar: string;
}

export interface Skill {
  icon: string;
  name: string;
  tag: readonly string[];
  description?: string;
}
