export type Project = {
  order: number;
  isOnHome: boolean;
  slug: string;
  title: string;
  category: string;
  homeTitle: string;
  homeIconPath: string;
  homeIconBg: string;
  homeDescription: string;
  homeCategory: string;
  homeTags: string[];
  descriptionMarkdown: string;
  stack: string;
  demoAccessHTML: string;
  caseSlug?: string;
  screenshots: {
    src: string;
    alt: string;
  }[];
};

export type CaseStageStatus = "done" | "in-progress" | "planned";

export type CaseStage = {
  title: string;
  description: string;
  status: CaseStageStatus;
  projectSlug?: string;
};

export type Case = {
  order: number;
  slug: string;
  title: string;
  category: string;
  summary: string;
  challengeMarkdown: string;
  resultMarkdown: string;
  stages: CaseStage[];
  projectSlugs: string[];
};
