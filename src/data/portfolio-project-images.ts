import type { Project } from "@/types/project";
import type { PortfolioImage } from "@/types/portfolio";
import dimensions from "./project-image-dimensions.json";

export function projectImages(project: Project): PortfolioImage[] {
  return project.screenshots.map(image => {
    const size = dimensions[image.src as keyof typeof dimensions];
    return { ...image, width: size.width, height: size.height, caption: image.alt, kind: project.slug === "ev-clients" ? "promo" : "screenshot" };
  });
}
