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
    const { data } = useQuery(Page.query, {
        variables: Page.variables(props.ctx),
      });

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

Page.query = gql`
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

Page.variables = (context) => {
  console.log(context)
  return {
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
    slug: context.params.slug
  };
};

export async function getStaticProps(ctx) {
  
  return getNextStaticProps(ctx, {Page, props: {
    

    ctx: {
      params: ctx.params
    }
  }});
}

export function getStaticPaths(){
    return {
        paths: ['/posts/testing'],
        fallback: false
    }
}