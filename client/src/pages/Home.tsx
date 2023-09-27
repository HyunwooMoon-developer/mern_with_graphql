import ClientList from '../components/ClientList';
import ProjectList from '../components/ProjectList';
import AddClientModal from '../components/AddClientModal';
import AddProjectModal from '../components/AddProjectModal';

const Home = () => (
  <>
    <div className="d-flex gap-3 mb-4">
      <AddClientModal />
      <AddProjectModal />
    </div>
    <ProjectList />
    <hr />
    <ClientList />
  </>
);

export default Home;
