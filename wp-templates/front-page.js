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
import Link from 'next/link';

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
            <p>Thanks for visiting Faust.js International. Do you need our posts in another language?</p>
            <ul>
            <a href='/' ><li>🇺🇸 English</li></a>
             <a href='/es'><li>🇪🇸 Español</li></a>
             <a href='/de' ><li>🇩🇪 Deutsch</li></a>
            </ul>
            <h3>Recent Posts</h3>
            {
              data.posts.nodes.map(post => {
                return (
                  <Link href={post.uri}><h3>{post.title}</h3></Link>
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
  const menuLocations = {
    'EN' : MENUS.PRIMARY_LOCATION,
    'ES' : MENUS.PRIMARY_ES,
    'DE' : MENUS.PRIMARY_DE
  }

  const localizedMenu = ctx?.locale ? menuLocations[ctx.locale.toUpperCase()] : MENUS.PRIMARY_LOCATION;
  return {
    headerLocation: localizedMenu,
    footerLocation: MENUS.FOOTER_LOCATION,
    language: ctx?.locale.toUpperCase()
  };
};
