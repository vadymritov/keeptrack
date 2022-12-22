import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { projectAPI } from "./ProjectAPI";
import ProjectDetail from "./ProjectDetails";
import { Project } from "./Project";

function ProjectPage() {
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState<Project | null>(null);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const projectId = Number(params.id);
  console.log(projectId);

  useEffect(() => {
    setLoading(true);
    projectAPI
      .find(projectId)
      .then((p) => {
        setProject(p);
        setLoading(false);
      })
      .catch((e) => {
        if (e instanceof Error) setError(e.message);
        setLoading(false);
      });
  }, [projectId]);

  return (
    <>
      <h1>Project Detail</h1>

      {loading && (
        <div className="center-page">
          <span className="spinner primary"></span>
          <p>Loading...</p>
        </div>
      )}

      {error && (
        <div className="row">
          <div className="card large error">
            <section>
              <p>
                <span className="icon-alert inverse "></span> {error}
              </p>
            </section>
          </div>
        </div>
      )}

      {project && <ProjectDetail project={project} />}
    </>
  );
}

export default ProjectPage;
