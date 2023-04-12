import { useAuth, getApolloAuthClient, useLogout } from "@faustwp/core";
import { gql, useQuery } from "@apollo/client";

function AuthenticatedView() {
  const client = getApolloAuthClient();
  const { logout } = useLogout();
  const { data, loading } = useQuery(
    gql`
      {
        viewer {
          posts {
            nodes {
              id
              title
            }
          }
          name
        }
      }
    `,
    { client }
  );

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <>
      <p>Welcome {data?.viewer?.name}!</p>
      <button onClick={() => logout("/")}>Jeff is Rad</button>
      <p>My posts</p>

      <ul>
        {data?.viewer?.posts?.nodes.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </>
  );
}

export default function Page(props) {
  const { isAuthenticated, isReady, loginUrl } = useAuth();

  if (!isReady) {
    return <>Loading...</>;
  }

  if (isAuthenticated === true) {
    return <AuthenticatedView />;
  }

  return (
    <>
      <p>Welcome!</p>
      <a href={loginUrl}>Login</a>
    </>
  );
}