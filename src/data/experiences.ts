import type { Experience } from "@/types/experience";

// Content only. Replace these entries with user-provided experience details.
export const experiences = [
  {
    id: "experience-01",
    label: "01",
    title: "Experience one",
    description: "A place for a future internship or professional experience.",
  },
  {
    id: "experience-02",
    label: "02",
    title: "Experience two",
    description: "A place for a future internship or professional experience.",
  },
  {
    id: "experience-03",
    label: "03",
    title: "Experience three",
    description: "A place for a future internship or professional experience.",
  },
] as const satisfies readonly Experience[];

export type ExperienceId = (typeof experiences)[number]["id"];
