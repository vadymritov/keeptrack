import React, { SyntheticEvent, useState } from "react";
import { Project } from "./Project";

interface Props {
  project: Project;
  onSave: (project: Project) => void;
  onCancel: () => void;
}

function ProjectForm(props: Props) {
  const { project: intialProject, onSave, onCancel } = props;
  const [project, setProject] = useState(intialProject);
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    budget: "",
  });

  function validate(project: Project) {
    let errors = { name: "", description: "", budget: "" };

    if (!project.name.length) errors.name = "Name is required.";
    else if (project.name.length < 3)
      errors.name = "Name should have more than 3 characters.";

    if (!project.description.length)
      errors.description = "Description is required";
    if (!project.budget) errors.budget = "Budget is required";

    return errors;
  }

  function isValid(): boolean {
    return (
      errors.name.length === 0 &&
      errors.description.length === 0 &&
      errors.budget.length === 0
    );
  }

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { type, name, value, checked } = e.target;

    let updatedValue =
      type === "checkbox" ? checked : type === "number" ? Number(value) : value;
    const change = {
      [name]: updatedValue,
    };

    let updateProject: Project;
    setProject((p) => {
      updateProject = new Project({ ...p, ...change });
      return updateProject;
    });

    setErrors(() => validate(updateProject));
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!isValid()) return;
    onSave(project);
  };

  return (
    <form className="input-group vertical" onSubmit={handleSubmit}>
      <label htmlFor="name">Project Name</label>
      <input
        type="text"
        name="name"
        placeholder="enter name"
        value={project.name}
        onChange={handleChange}
      />
      {errors.name.length > 0 && (
        <div className="card error">
          <p>{errors.name}</p>
        </div>
      )}
      <label htmlFor="description">Project Description</label>
      <textarea
        name="description"
        placeholder="enter description"
        value={project.description}
        onChange={handleChange}
      />
      {errors.description.length > 0 && (
        <div className="card error">
          <p>{errors.description}</p>
        </div>
      )}
      <label htmlFor="budget">Project Budget</label>
      <input
        type="number"
        name="budget"
        placeholder="enter budget"
        value={project.budget}
        onChange={handleChange}
      />
      {errors.budget.length > 0 && (
        <div className="card error">
          <p>{errors.budget}</p>
        </div>
      )}
      <label htmlFor="isActive">Active?</label>
      <input
        type="checkbox"
        name="isActive"
        checked={project.isActive}
        onChange={handleChange}
      />
      <div className="input-group">
        <button className="primary bordered medium">Save</button>
        <span />
        <button type="button" className="bordered medium" onClick={onCancel}>
          cancel
        </button>
      </div>
    </form>
  );
}

export default ProjectForm;
