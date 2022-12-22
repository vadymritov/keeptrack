import { Project } from "./Project";
import { Link } from "react-router-dom";

interface Props {
  project: Project;
  onEdit: (project: Project) => void;
}

function formatDescription(desc: string): string {
  return desc.substring(0, 90) + "...";
}

function ProjectCard(props: Props) {
  const { project, onEdit } = props;

  const handleEditClick = (projectBeingEdited: Project) => {
    onEdit(projectBeingEdited);
  };

  return (
    <div className="card">
      <img src={project.imageUrl} alt={project.name} />
      <section className="section dark">
        <Link to={`/projects/${project.id}`}>
          <h5 className="strong">
            <strong>{project.name}</strong>
          </h5>
          <p>{formatDescription(project.description)}</p>
          <p>Budget : {project.budget.toLocaleString()}</p>
        </Link>
        <button className=" bordered" onClick={() => handleEditClick(project)}>
          <span className="icon-edit "></span>
          Edit
        </button>
      </section>
    </div>
  );
}

export default ProjectCard;
