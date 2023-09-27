import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { DELETE_PROJECT } from '../mutations/projectMutations';
import { GET_PROJECTS } from '../queries/projectQueries';
import { useMutation } from '@apollo/client';

const DeleteProjectButton = ({ id }: { id: string }) => {
  const navigate = useNavigate();

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: id },
    onCompleted: () => navigate('/'),
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  return (
    <div className="d-flex mt-5 ms-auto">
      <button
        className="btn btn-danger m-2"
        onClick={(e: any) => deleteProject(e)}
      >
        <FaTrash className="icon" /> Delete Project
      </button>
    </div>
  );
};

export default DeleteProjectButton;
