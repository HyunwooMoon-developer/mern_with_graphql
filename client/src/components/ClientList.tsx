import { useQuery } from '@apollo/client';
import ClientRow from './ClientRow';
import Spinner from './Spinner';
import { GET_CLIENTS } from '../queries/clientQueries';

const ClientList = () => {
  const { loading, error, data } = useQuery(GET_CLIENTS);

  if (loading) return <Spinner />;
  if (error) return 'Something went wrong';

  return (
    <>
      {!loading && !error && (
        <table className="table table-hover mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.clients.map((client: any) => (
              <ClientRow key={client.id} client={client} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default ClientList;
