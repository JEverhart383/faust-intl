import { gql } from '@apollo/client';
import * as MENUS from '../constants/menus';
import { BlogInfoFragment } from '../fragments/GeneralSettings';
import {
  Header,
  Footer,
  Main,
  Container,
  ContentWrapper,
  EntryHeader,
  NavigationMenu,
  FeaturedImage,
  SEO,
} from '../components';
import { useRouter } from "next/router";
import  Link  from  'next/link';
 
export default function Component(props) {
  console.log(props)
  const { locale: activeLocale, locales } = useRouter();

  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>;
  }

  const { title: siteTitle, description: siteDescription } =
    props?.data?.generalSettings;
  const primaryMenu = props?.data?.headerMenuItems?.nodes ?? [];
  const footerMenu = props?.data?.footerMenuItems?.nodes ?? [];
  console.log(props.data)
  const { title, content, featuredImage, translation } = props?.data?.page ?? { title: '' };
  console.log(props)

  return (
    <>
      <SEO
        title={siteTitle}
        description={siteDescription}
        imageUrl={featuredImage?.node?.sourceUrl}
      />
      <Header
        title={siteTitle}
        description={siteDescription}
        menuItems={primaryMenu}
      />
      <Main>
      <ul>
          {activeLocale === 'en' ? (
              <li>
                <Link href={translation.uri} locale={'es'}>
                  <a>ES</a>
                </Link>
              </li>
              ) :
              (
                <li>
                  <Link href={translation.uri} locale={'en'}>
                    <a>EN</a>
                  </Link>
                </li>
                )
          }
      </ul>
        <>
          <EntryHeader title={title} image={featuredImage?.node} />
          <Container>
            <ContentWrapper content={content} />
          </Container>
        </>
      </Main>
      <Footer title={siteTitle} menuItems={footerMenu} />
    </>
  );
}

Component.variables = ({ databaseId }, ctx) => {
  const translatedLanguage = ctx?.locale === 'en' ? 'ES' : 'EN';
  const localizedMenu = ctx?.locale === 'en' ? MENUS.PRIMARY_LOCATION : MENUS.PRIMARY_ES;
  return {
    databaseId,
    headerLocation: localizedMenu,
    footerLocation: MENUS.FOOTER_LOCATION,
    asPreview: ctx?.asPreview,
    language: translatedLanguage
  };
};

Component.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenu.fragments.entry}
  ${FeaturedImage.fragments.entry}
  query GetPageData(
    $databaseId: ID!
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
    $asPreview: Boolean = false
    $language: LanguageCodeEnum!
  ) {
    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content
      translation(language: $language) {
        uri
      }
      ...FeaturedImageFragment
    }
    generalSettings {
      ...BlogInfoFragment
    }
    footerMenuItems: menuItems(where: { location: $footerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    headerMenuItems: menuItems(where: { location: $headerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
  }
`;
