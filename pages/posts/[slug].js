import { gql, useQuery } from '@apollo/client';
import * as MENUS from '../../constants/menus';
import { getApolloClient } from '@faustwp/core';
import { BlogInfoFragment } from '../../fragments/GeneralSettings';
import {
  Header,
  Hero,
  Footer,
  Main,
  Container,
  NavigationMenu,
  SEO,
} from '../../components';
import { getNextStaticProps } from '@faustwp/core';

export default function Page(props) {
    // const { data } = useQuery(Page.query, {
    //     variables: Page.variables(props.ctx),
    //   });
    const { data } = props;

  const {title, content} = data?.post;


  return (
    <>
      <SEO title={title} description={title} />
      <Header
        title={title}
        description={title}
      />
      <Main>
        <Container>
          <Hero title={title} />
          <div className="text-center" dangerouslySetInnerHTML={{__html: content}}>
          </div>
        </Container>
      </Main>
      <Footer title={title} />
    </>
  );
}

const query = gql`
  ${BlogInfoFragment}
  ${NavigationMenu.fragments.entry}
  query GetPageData(
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
    $slug: ID!
  ) {
    post(id: $slug, idType: SLUG){
        title
        content
    }
    generalSettings {
      ...BlogInfoFragment
    }
    headerMenuItems: menuItems(where: { location: $headerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    footerMenuItems: menuItems(where: { location: $footerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
  }
`;

// Page.variables = (context) => {
//   return {
//     headerLocation: MENUS.PRIMARY_LOCATION,
//     footerLocation: MENUS.FOOTER_LOCATION,
//     slug: context.params.slug
//   };
// };

export async function getStaticProps(ctx) {
  const apolloClient = getApolloClient();
  const { data } = await apolloClient.query({
    query: query,
    variables: {
        headerLocation: MENUS.PRIMARY_LOCATION,
        footerLocation: MENUS.FOOTER_LOCATION,
        slug: ctx.params.slug
  }})
  return {props : {
    data
    }};
//   return getNextStaticProps(ctx, {Page, props: {data}});
}

export function getStaticPaths(){
    return {
        paths: ['/posts/testing'],
        fallback: false
    }
}