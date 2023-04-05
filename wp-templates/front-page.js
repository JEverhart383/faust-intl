import { useQuery, gql } from '@apollo/client';
import * as MENUS from '../constants/menus';
import { BlogInfoFragment } from '../fragments/GeneralSettings';
import {
  Header,
  Footer,
  Main,
  Container,
  NavigationMenu,
  Hero,
  SEO,
} from '../components';

export default function Component(props) {

  // const variables = Component.variables();
  // const { data } = useQuery(Component.query, {
  //   variables: variables,
  // });

  const { data } = props;

  const { title: siteTitle, description: siteDescription } =
    data?.generalSettings;
  const primaryMenu = data?.headerMenuItems?.nodes ?? [];
  const footerMenu = data?.footerMenuItems?.nodes ?? [];

  return (
    <>
      <SEO title={siteTitle} description={siteDescription} />
      <Header
        title={siteTitle}
        description={siteDescription}
        menuItems={primaryMenu}
      />
      <Main>
        <Container>
          <Hero title={'Front Page'} />
          <div className="text-center">
            <p>This page is utilizing the "front-page" WordPress template.</p>
            <code>wp-templates/front-page.js</code>
            {
              data.posts.nodes.map(post => {
                return (
                  <h3>{post.title}</h3>
                )
              })
            }
          </div>
        </Container>
      </Main>
      <Footer title={siteTitle} menuItems={footerMenu} />
    </>
  );
}

Component.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenu.fragments.entry}
  query GetPageData(
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
    $language: LanguageCodeFilterEnum!
  ) {
      posts(where: {language:$language}){
        nodes {
          title
          excerpt
          uri
        }
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

Component.variables = (seedNode, ctx) => {
  const localizedMenu = ctx?.locale === 'en' ? MENUS.PRIMARY_LOCATION : MENUS.PRIMARY_ES;
  return {
    headerLocation: localizedMenu,
    footerLocation: MENUS.FOOTER_LOCATION,
    language: ctx?.locale.toUpperCase()
  };
};
