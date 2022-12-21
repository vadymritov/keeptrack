import { Project } from "./Project";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";

interface Props {
  projects: Project[];
}

function ProjectList(props: Props) {
  const { projects } = props;
  const items = projects.map((project) => (
    <div key={project.id} className="cols-sm">
      <ProjectCard project={project} />
      <ProjectForm />
    </div>
  ));

  return <ul className="row">{items}</ul>;
}

export default ProjectList;
