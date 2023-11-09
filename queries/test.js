import { gql } from "@apollo/client";
import { BlogInfoFragment } from '../fragments/GeneralSettings';
import {
    NavigationMenu,
    FeaturedImage,
  } from '../components';

const GET_PAGE = gql`
${BlogInfoFragment}
${NavigationMenu.fragments.entry}
${FeaturedImage.fragments.entry}
query GetPageData(
  $databaseId: ID!
  $headerLocation: MenuLocationEnum
  $footerLocation: MenuLocationEnum
  $asPreview: Boolean = false
) {
  page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
    title
    content
    editorBlocks {
      name
      renderedHtml
      clientId
      parentClientId
    }
    translations {
      uri
      language {
        code
      }
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

export default GET_PAGE;