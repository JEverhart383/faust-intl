import { gql, useQuery } from '@apollo/client';
import * as MENUS from '../constants/menus';
import { BlogInfoFragment } from '../fragments/GeneralSettings';
import {
  Hero,
  Footer,
  Main,
  Container,
  NavigationMenu,
  SEO,
} from '../components';
import { getNextStaticProps, getApolloAuthClient, useAuth } from '@faustwp/core';

export default function Page(props) {
    const { isAuthenticated, isReady, loginUrl } = useAuth({
        strategy: 'redirect',
        shouldRedirect: false,
      });   


    if (isAuthenticated){
        const client = getApolloAuthClient();
        const { data } = useQuery(Page.query, {
            variables: Page.variables(),
            client
        });
        const title = props.title;
    }

  return (
    <>
      <SEO title={'gated'} description={'gated'} />

      <Main>
        <Container>
          <Hero title={ 'Gated Content'} />
          <div className="text-center">
            <p>This page is utilizing the Next.js File based routes...</p>
            <code>pages/example.js</code>
            <p>{JSON.stringify(data)}</p>
            <ul>
                {data?.viewer?.posts?.nodes.map((post) => (
                <li key={post.id}>{post.title}</li>
                ))}
            </ul>
          </div>
        </Container>
      </Main>
    </>
  );
}

Page.query = gql`
  query GetPageData {
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
`;

Page.variables = () => {
  return {
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION
  };
};

export async function getStaticProps(ctx) {
    const client = getApolloAuthClient();
    const { data } = await client.query({query: Page.query});
    console.log(data)
  return getNextStaticProps(ctx, {Page, props: {title: 'File Page Example.'}});
}