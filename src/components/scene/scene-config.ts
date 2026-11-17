import type { ExperienceId } from "@/data/experiences";

export type JourneyFrame = { scroll: number; pointerX: number; pointerY: number };

// Normalized positions are shared by 3D objects and native HTML hit targets.
export const experienceObjects: readonly {
  experienceId: ExperienceId;
  x: number;
  y: number;
  scale: number;
  color: string;
}[] = [
  { experienceId: "experience-01", x: 0.23, y: 0.49, scale: 0.83, color: "#b96042" },
  { experienceId: "experience-02", x: 0.51, y: 0.36, scale: 1.03, color: "#dfb46d" },
  { experienceId: "experience-03", x: 0.79, y: 0.53, scale: 0.74, color: "#688481" },
];
