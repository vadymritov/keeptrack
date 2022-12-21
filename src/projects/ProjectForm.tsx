import { SyntheticEvent } from "react";
import { Project } from "./Project";

interface Props {
  onSave: (project: Project) => void;
  onCancel: () => void;
}

function ProjectForm(props: Props) {
  const { onSave, onCancel } = props;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    onSave(new Project({ name: "Updated Project" }));
  };

  return (
    <form className="input-group vertical" onSubmit={handleSubmit}>
      <label htmlFor="name">Project Name</label>
      <input type="text" name="name" placeholder="enter name" />
      <label htmlFor="description">Project Description</label>
      <textarea name="description" placeholder="enter description" />
      <label htmlFor="budget">Project Budget</label>
      <input type="number" name="budget" placeholder="enter budget" />
      <label htmlFor="isActive">Active?</label>
      <input type="checkbox" name="isActive" />
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
