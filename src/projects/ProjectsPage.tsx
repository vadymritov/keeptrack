import { MOCK_PROJECTS } from "./MockProjects";
import ProjectList from "./ProjectList";

function ProjectsPage() {
  return (
    <>
      <h1>Projects Page</h1>
      <ProjectList projects={MOCK_PROJECTS} />
    </>
  );
}

export default ProjectsPage;
