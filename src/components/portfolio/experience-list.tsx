import { experiences } from "@/data/experiences";

export function ExperienceList() {
  return (
    <section id="experiences" className="experience-section" aria-labelledby="experience-heading">
      <div className="section-intro">
        <p className="eyebrow">02 / Along the way</p>
        <h2 id="experience-heading">Room for experience.</h2>
        <p>Three placeholders for the stories to come.</p>
      </div>
      <ol className="experience-list">
        {experiences.map((experience) => (
          <li key={experience.id} id={experience.id} className="experience-row">
            <span className="experience-number" aria-hidden="true">{experience.label}</span>
            <div>
              <h3>{experience.title}</h3>
              <p>{experience.description}</p>
            </div>
            <span className="placeholder-label">Placeholder</span>
          </li>
        ))}
      </ol>
      <a className="text-link" href="#top">Back to the sky <span aria-hidden="true">↑</span></a>
    </section>
  );
}
