"use client";

import { useEffect, useRef } from "react";
import { experiences, type ExperienceId } from "@/data/experiences";

export type StorySelection = "about" | ExperienceId | null;

export function StoryDialog({ selection, onClose }: { selection: StorySelection; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const returnButton = useRef<HTMLButtonElement>(null);
  const experience = experiences.find((item) => item.id === selection);

  useEffect(() => {
    const dialog = ref.current;
    if (!selection || !dialog) return;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [selection]);

  return (
    <dialog ref={ref} className="story-dialog" aria-labelledby="story-title"
      onClose={() => { if (!ref.current?.open) onClose(); }}
      onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        // Explicit wrapping also supports embedded browsers with limited native tab navigation.
        event.preventDefault();
        (document.activeElement === closeButton.current ? returnButton.current : closeButton.current)?.focus();
      }}
      onClick={(event) => { if (event.target === event.currentTarget) ref.current?.close(); }}>
      <div className="story-paper">
        <div className="story-topline"><span className="micro">A story in the sky</span><button ref={closeButton} autoFocus onClick={() => ref.current?.close()} aria-label="Close story">×</button></div>
        <span className="story-number">{selection === "about" ? "SK" : experience?.label}</span>
        <p className="micro">{selection === "about" ? "The person behind the journey" : "Experience / content to come"}</p>
        <h2 id="story-title">{selection === "about" ? "Hello, I’m Sanjeev." : experience?.title}</h2>
        <p>{selection === "about"
          ? "This is where my story will live. For now, we’re exploring how it feels to discover a person through a world of their own."
          : experience?.description}</p>
        <div className="story-note">Prototype content. Real details will be added here.</div>
        <button ref={returnButton} className="return-button" onClick={() => ref.current?.close()}>Return to the sky <span aria-hidden="true">↗</span></button>
      </div>
    </dialog>
  );
}
