import { useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const PROJECTS = [
  {
    title: "Project Two",
    description: "In SWE 326, I completed a project covering black-box testing, white-box testing, and coverage.",
    tags: ["testing"],
    date: "2023-11-15",
    image: "/assets/images/testing.jpg",
    alt: "Testing project",
  },
  {
    title: "Project One",
    description: "In ICS 104, I built a grocery store application using Python.",
    tags: ["web"],
    date: "2024-05-01",
    image: "/assets/images/store.png",
    alt: "Grocery store project",
  },
];

const sortProjects = (projects, sort) => {
  const sorted = [...projects];
  if (sort === "title") {
    return sorted.sort((a, b) => a.title.localeCompare(b.title));
  }
  return sorted.sort((a, b) => {
    const aDate = new Date(a.date).getTime();
    const bDate = new Date(b.date).getTime();
    return sort === "oldest" ? aDate - bDate : bDate - aDate;
  });
};

const Projects = () => {
  const [state, setState] = useLocalStorage("project-state", {
    search: "",
    filter: "all",
    sort: "latest",
  });

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setState((prev) => ({ ...prev, [field]: value }));
  };

  const filteredProjects = useMemo(() => {
    const search = (state.search || "").toLowerCase().trim();
    const tag = state.filter || "all";

    const visible = PROJECTS.filter((project) => {
      const matchesTag = tag === "all" || project.tags.includes(tag);
      const matchesSearch =
        !search ||
        project.title.toLowerCase().includes(search) ||
        project.description.toLowerCase().includes(search);
      return matchesTag && matchesSearch;
    });

    return sortProjects(visible, state.sort || "latest");
  }, [state.filter, state.search, state.sort]);

  return (
    <section id="projects" className="section">
      <h2>Projects</h2>
      <div className="project-controls">
        <input
          id="project-search"
          type="search"
          placeholder="Search projects..."
          aria-label="Search projects"
          value={state.search}
          onChange={handleChange("search")}
        />
        <select id="project-filter" aria-label="Filter projects" value={state.filter} onChange={handleChange("filter")}>
          <option value="all">All</option>
          <option value="web">Web</option>
          <option value="testing">Testing</option>
        </select>
        <select id="project-sort" aria-label="Sort projects" value={state.sort} onChange={handleChange("sort")}>
          <option value="latest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="title">Title A-Z</option>
        </select>
      </div>

      {filteredProjects.length === 0 && (
        <div id="project-empty" role="status" aria-live="polite">
          No projects found.
        </div>
      )}

      <div className="projects-container">
        {filteredProjects.map((project) => (
          <div
            key={project.title}
            className="project-card"
            data-tags={project.tags.join(",")}
            data-date={project.date}
            data-title={project.title}
          >
            <img
              src={project.image}
              alt={project.alt}
              width="400"
              height="240"
              loading="lazy"
              decoding="async"
            />
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
