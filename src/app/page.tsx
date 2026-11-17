import { ExperienceList } from "@/components/portfolio/experience-list";
import { SkyScene } from "@/components/scene/sky-scene";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#experiences">Skip to experiences</a>
      <main id="top" className="sky-journey">
        <section className="sky-viewport" aria-labelledby="sky-heading">
          <header className="flex flex-wrap items-center justify-between gap-3">
            <span className="project-name">Interactive sky</span>
            <span className="prototype-label">Milestone 01 · Foundation</span>
          </header>
          <div className="scene-composition">
            <div className="scene-intro">
              <p className="eyebrow">01 / A starting point</p>
              <h1 id="sky-heading">A journey<br />through the sky.</h1>
              <p className="intro-description">An early space to explore depth, objects, and the stories along the way.</p>
              <a href="#experiences" className="text-link">Explore the placeholders <span aria-hidden="true">↓</span></a>
            </div>
            <figure className="scene-figure">
              <SkyScene />
              <figcaption>Three simple forms. A world to build around them.</figcaption>
            </figure>
          </div>
          <footer className="scene-footer">
            <span>Scene study / 001</span>
            <span>Provisional visuals &amp; content</span>
          </footer>
        </section>
        <ExperienceList />
      </main>
    </>
  );
}
