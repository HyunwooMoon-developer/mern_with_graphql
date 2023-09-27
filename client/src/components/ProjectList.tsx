import Spinner from './Spinner';
import { useQuery } from '@apollo/client';
import ProjectCard from './ProjectCard';
import { GET_PROJECTS } from '../queries/projectQueries';

const ProjectList = () => {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) return <Spinner />;
  if (error) return 'Something went wrong';
  return (
    <>
      {data.projects.length > 0 ? (
        <div className="row mt4">
          {data.projects.map((project: any) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <p>No Projects</p>
      )}
    </>
  );
};

export default ProjectList;
