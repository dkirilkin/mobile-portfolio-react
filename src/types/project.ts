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
  screenshots: {
    src: string;
    alt: string;
  }[];
};
