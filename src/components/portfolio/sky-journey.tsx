"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { SkyScene } from "@/components/scene/sky-scene";
import { experienceObjects, type JourneyFrame } from "@/components/scene/scene-config";
import { experiences } from "@/data/experiences";
import { useMotionPreference } from "@/hooks/use-motion-preference";
import { StoryDialog, type StorySelection } from "./story-dialog";

const chapters = [
  { id: "top", name: "Above it all" },
  { id: "about", name: "A passing hello" },
  { id: "experiences", name: "Along the way" },
  { id: "horizon", name: "Beyond the clouds" },
];

export function SkyJourney() {
  const root = useRef<HTMLElement>(null);
  const frame = useRef<JourneyFrame>({ scroll: 0, pointerX: 0, pointerY: 0 });
  const [chapter, setChapter] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [selection, setSelection] = useState<StorySelection>(null);
  const motionAllowed = useMotionPreference();
  const motion = motionAllowed && !paused && !selection;
  const close = useCallback(() => setSelection(null), []);

  useEffect(() => {
    let pending = 0;
    const update = () => {
      pending = 0;
      const element = root.current;
      if (!element) return;
      const unit = element.querySelector<HTMLElement>("#about")?.offsetTop || innerHeight;
      const progress = Math.max(0, (scrollY - element.offsetTop) / unit);
      frame.current.scroll = progress;
      element.style.setProperty("--depth", String(Math.min(progress / 2.7, 1)));
      element.style.setProperty("--cloud-shift", `${motion ? progress * -27 : 0}vh`);
      element.style.setProperty("--cloud-opacity", String(Math.max(0, 1 - progress * 0.75)));
      element.style.setProperty("--sky-shift", `${motion ? progress * -3 : 0}%`);
      element.style.setProperty("--journey-progress", `${Math.min(progress / 2.7, 1) * 100}%`);
      setChapter(Math.min(3, Math.floor(progress + 0.28)));
    };
    const schedule = () => { if (!pending) pending = requestAnimationFrame(update); };
    const pointer = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !motion) return;
      frame.current.pointerX = event.clientX / innerWidth - 0.5;
      frame.current.pointerY = event.clientY / innerHeight - 0.5;
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("pointermove", pointer, { passive: true });
    return () => {
      cancelAnimationFrame(pending);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("pointermove", pointer);
    };
  }, [motion]);

  return (
    <>
      <a className="skip-link" href="#experiences">Skip to experiences</a>
      <main className="sky-journey" ref={root} data-motion={motion ? "on" : "off"}>
        <div className="world" aria-hidden="true">
          <div className="sky-art" />
          <div className="atmosphere" />
          <SkyScene frame={frame} motion={motion && chapter > 0 && chapter < 3} hovered={hovered} />
          <div className="cloud-foreground" />
          <div className="world-vignette" />
        </div>
        <header className="world-header">
          <a href="#top" className="monogram" aria-label="Sanjeev Kamath, back to top">sk<span aria-hidden="true">.</span></a>
          <span className="header-caption micro">A personal exploration</span>
          <div className="header-actions">
            <button className="motion-toggle micro" aria-pressed={paused} onClick={() => setPaused((value) => !value)}
              disabled={!motionAllowed} aria-label={motionAllowed ? (paused ? "Resume motion" : "Pause motion") : "Reduced motion enabled"}>
              <span aria-hidden="true">{motion && !selection ? "Ⅱ" : "▷"}</span><span>{motionAllowed ? (paused ? "Motion off" : "Motion on") : "Still mode"}</span>
            </button>
            <a className="index-link micro" href="#experiences">Explore <span aria-hidden="true">↗</span></a>
          </div>
        </header>
        <nav className="chapter-nav" aria-label="Journey chapters">
          {chapters.map((item, index) => <a key={item.id} href={`#${item.id}`} aria-current={chapter === index ? "location" : undefined} aria-label={item.name}>
            <span className="chapter-label micro">{item.name}</span><span className="chapter-tick" /></a>)}
        </nav>
        <section id="top" className="chapter chapter-opening" aria-labelledby="name-heading">
          <div className="opening-copy">
            <p className="micro opening-eyebrow">Somewhere between imagination &amp; possibility</p>
            <h1 id="name-heading"><span>Sanjeev</span><em>Kamath</em><span className="sr-only"> — a portfolio in the sky</span></h1>
            <p className="opening-subtitle">A world of my own.<br />An invitation to wander.</p>
          </div>
          <a href="#about" className="descend-link" aria-label="Begin the descent to About me"><span className="micro">Let curiosity lead</span><span className="descent-line" /><span aria-hidden="true">↓</span></a>
          <span className="opening-coordinate micro" aria-hidden="true">An open sky.<br />An unwritten journey.</span>
        </section>
        <section id="about" className="chapter chapter-about" aria-labelledby="about-heading">
          <div className="chapter-copy"><p className="micro">01 / An introduction</p><h2 id="about-heading">Oh, hello<br /><em>up here.</em></h2></div>
          <button className="airship-target" onClick={() => setSelection("about")} onPointerEnter={() => setHovered("about")} onPointerLeave={() => setHovered(null)} onFocus={() => setHovered("about")} onBlur={() => setHovered(null)} aria-label="Meet Sanjeev, open About me">
            <span className="airship-lettering" aria-hidden="true">a passing hello</span>
            <span className="object-caption"><span className="micro">Meet Sanjeev</span><span className="plus" aria-hidden="true">+</span></span>
          </button>
          <p className="chapter-whisper">Every journey begins<br />with a little curiosity.</p>
        </section>
        <section id="experiences" className="chapter chapter-experiences" aria-labelledby="experience-heading">
          <div className="chapter-copy"><p className="micro">02 / Experience</p><h2 id="experience-heading">Carried by<br /><em>experience.</em></h2></div>
          <div className="encounters">
            {experienceObjects.map((object) => {
              const experience = experiences.find((item) => item.id === object.experienceId)!;
              return <button key={object.experienceId} className="balloon-target" style={{ "--x": `${object.x * 100}%`, "--y": `${object.y * 100}%`, "--object-scale": object.scale } as CSSProperties}
                onClick={() => setSelection(object.experienceId)} onPointerEnter={() => setHovered(object.experienceId)} onPointerLeave={() => setHovered(null)} onFocus={() => setHovered(object.experienceId)} onBlur={() => setHovered(null)} aria-label={`Open ${experience.title}`}>
                <span className="object-caption"><span className="micro">{experience.label} / {experience.title}</span><span className="plus" aria-hidden="true">+</span></span>
              </button>;
            })}
          </div>
          <p className="chapter-whisper">Three encounters.<br />Each with a story to tell.</p>
        </section>
        <section id="horizon" className="chapter chapter-horizon" aria-labelledby="horizon-heading">
          <p className="micro">03 / The next horizon</p>
          <h2 id="horizon-heading">Where to<br /><em>from here?</em></h2>
          <p>There’s a whole world below.<br />This part of the journey is still taking shape.</p>
          <a href="#top" className="horizon-link micro">Back to the clouds <span aria-hidden="true">↗</span></a>
        </section>
        <footer className="world-footer"><span className="micro">Scroll to descend <span aria-hidden="true">↓</span></span><span className="micro chapter-readout">0{chapter + 1} <span className="footer-rule" /> {chapters[chapter].name}</span><span className="micro study-label">Sky study / 002</span></footer>
        <div className="journey-progress" aria-hidden="true" />
        <StoryDialog selection={selection} onClose={close} />
      </main>
    </>
  );
}
