import { useState } from 'react';
import { FaList } from 'react-icons/fa';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_PROJECT } from '../mutations/projectMutations';
import { GET_PROJECTS } from '../queries/projectQueries';
import { GET_CLIENTS } from '../queries/clientQueries';

const AddProjectModal = () => {
  const [projectInfo, setProjectInfo] = useState<{ [key: string]: string }>({
    name: '',
    description: '',
    status: 'new',
    clientId: '',
  });

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { projectInfo },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS }) as any;

      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] },
      });
    },
  });

  const { loading, error, data } = useQuery(GET_CLIENTS);

  const onSubmit = (e: any) => {
    e.preventDefault();

    if (
      projectInfo.name === '' ||
      projectInfo.description === '' ||
      projectInfo.status === '' ||
      projectInfo.clientId === ''
    ) {
      return alert('Please fill in all fields');
    }

    addProject({ variables: projectInfo });

    setProjectInfo({
      name: '',
      description: '',
      status: 'new',
      clientId: '',
    });
  };

  if (loading) return null;
  if (error) return 'Something went wrong';
  return (
    <>
      {!loading && !error && (
        <>
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#addProjectModal"
          >
            <div className="d-flex align-items-center">
              <FaList className="icon" />
              <div>New Project</div>
            </div>
          </button>

          <div
            className="modal fade"
            id="addProjectModal"
            aria-labelledby="addProjectModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="addProjectModalLabel">
                    New Project
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>
                <div className="modal-body">
                  <form onSubmit={onSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={projectInfo.name}
                        onChange={(e) =>
                          setProjectInfo({
                            ...projectInfo,
                            name: e.target.value,
                          })
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
                          setProjectInfo({
                            ...projectInfo,
                            description: e.target.value,
                          })
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
                          setProjectInfo({
                            ...projectInfo,
                            status: e.target.value,
                          })
                        }
                      >
                        <option value="new">Not Started</option>
                        <option value="progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Client</label>
                      <select
                        id="clientId"
                        className="form-select"
                        value={projectInfo.clientId}
                        onChange={(e) =>
                          setProjectInfo({
                            ...projectInfo,
                            clientId: e.target.value,
                          })
                        }
                      >
                        <option value="">Select Client</option>
                        {data.clients.map((client: any) => (
                          <option key={client.id} value={client.id}>
                            {client.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      className="btn btn-primary"
                      type="submit"
                      data-bs-dismiss="modal"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AddProjectModal;
