import { getWordPressProps, WordPressTemplate } from '@faustwp/core';
import { useAuth } from '@faustwp/core';

export default function Page(props) {
  const { isAuthenticated, isReady, loginUrl } = useAuth();
  if (!isReady) {
    return <>Loading...</>;
  }

  if (isAuthenticated === true) {
    return <WordPressTemplate {...props} />;
  }
  return (
    <>
      <p>Welcome!</p>
      <a href={loginUrl}>Login</a>
    </>
  );
}

export function getStaticProps(ctx) {
  return getWordPressProps({ ctx });
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}
