import type { ExperienceId } from "@/data/experiences";

type PlaceholderConfig = {
  experienceId: ExperienceId;
  position: [number, number, number];
  scale: number;
  color: string;
};

// Provisional scene coordinates and colors, deliberately separate from content.
export const placeholderObjects: readonly PlaceholderConfig[] = [
  { experienceId: "experience-01", position: [-1.25, 0.65, -0.5], scale: 0.72, color: "#e5a988" },
  { experienceId: "experience-02", position: [0.35, -0.5, 0.4], scale: 0.9, color: "#a6b3d3" },
  { experienceId: "experience-03", position: [1.7, 1.3, -1.2], scale: 0.55, color: "#e9d7aa" },
];
