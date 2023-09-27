import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { GET_PROJECT } from '../queries/projectQueries';
import { UPDATE_PROJECT } from '../mutations/projectMutations';

const EditProjectForm = ({ project }: { project: any }) => {
  const [projectInfo, setProjectInfo] = useState<{ [key: string]: string }>({
    ...project,
    status:
      project.status === 'In Progress'
        ? 'progress'
        : project.status === 'Completed'
        ? 'completed'
        : 'new',
  });

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: {
      id: projectInfo.id,
      name: projectInfo.name,
      description: projectInfo.description,
      status: projectInfo.status,
    },
    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
  });

  const onSubmit = (e: any) => {
    e.preventDefault();

    if (!project.name || !project.description || !project.status) {
      return alert('Please fill in all fields');
    }

    updateProject({
      variables: {
        id: projectInfo.id,
        name: projectInfo.name,
        description: projectInfo.description,
        status: projectInfo.status,
      },
    });
  };

  return (
    <div className="mt-5">
      <h3>Update Project Details</h3>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={projectInfo.name}
            onChange={(e) =>
              setProjectInfo({ ...projectInfo, name: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            value={projectInfo.description}
            onChange={(e) =>
              setProjectInfo({ ...projectInfo, description: e.target.value })
            }
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            id="status"
            className="form-select"
            value={projectInfo.status}
            onChange={(e) =>
              setProjectInfo({ ...projectInfo, status: e.target.value })
            }
          >
            <option value="new">Not Started</option>
            <option value="progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditProjectForm;
