import { useEffect, useState } from "react";
// import { MOCK_PROJECTS } from "./MockProjects";
import { Project } from "./Project";
import ProjectList from "./ProjectList";
import { projectAPI } from "./ProjectAPI";

function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);

  const saveProject = (project: Project) => {
    projectAPI
      .put(project)
      .then((updatedProject) => {
        let updatedProjects = projects.map((p) => {
          return p.id === updatedProject.id ? updatedProject : p;
        });
        setProjects(updatedProjects);
      })
      .catch((e) => {
        if (e instanceof Error) setError(e.message);
      });
  };

  const handleMoreClick = () => {
    setCurrentPage((page) => {
      return page + 1;
    });
  };

  useEffect(() => {
    async function LoadProjects() {
      setLoading(true);
      try {
        const data = await projectAPI.get(currentPage);
        setError(undefined);
        setProjects((p) => [...p, ...data]);
      } catch (error) {
        if (error instanceof Error) setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    LoadProjects();
  }, [currentPage]);

  // useEffect(() => {
  //   setLoading(true);
  //   projectAPI
  //     .get(1)
  //     .then((data) => {
  //       if (data) {
  //         setLoading(false);
  //         setError(undefined);
  //         setProjects(data);
  //       }
  //     })
  //     .catch((e) => {
  //       setLoading(false);
  //       setError(e.message);
  //       if (e instanceof Error) setError(e.message);
  //     });
  // }, []);

  return (
    <>
      <h1>Projects Page</h1>

      {error && (
        <div className="row">
          <div className="card large error">
            <section>
              <p>
                <span className="icon-alert inverse "></span>
                {error}
              </p>
            </section>
          </div>
        </div>
      )}

      <ProjectList projects={projects} onSave={saveProject} />

      {!loading && !error && (
        <div className="row">
          <div className="col-sm-12">
            <div className="button-group fluid">
              <button className="button default" onClick={handleMoreClick}>
                More...
              </button>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="center-page">
          <span className="spinner primary"></span>
          <p>Loading...</p>
        </div>
      )}
    </>
  );
}

export default ProjectsPage;
