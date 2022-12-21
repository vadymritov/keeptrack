import { Project } from "./Project";

interface Props {
  project: Project;
}

function formatDescription(desc: string): string {
  return desc.substring(0, 60) + "...";
}

function ProjectCard(props: Props) {
  const { project } = props;

  const handleEditClick = (projectBeingEdited: Project) => {
    console.log(projectBeingEdited);
  };

  return (
    <div className="card">
      <img src={project.imageUrl} alt={project.name} />
      <section className="section dark">
        <h5 className="strong">
          <strong>{project.name}</strong>
        </h5>
        <p>{formatDescription(project.description)}</p>
        <p>Budget : {project.budget.toLocaleString()}</p>
        <button className=" bordered" onClick={() => handleEditClick(project)}>
          <span className="icon-edit "></span>
          Edit
        </button>
      </section>
    </div>
  );
}

export default ProjectCard;