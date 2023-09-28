import { gql } from "@apollo/client";

export class LocaleTemplatePlugin {
    apply(hooks){
        const { addAction, addFilter } = hooks;

        addFilter(
          'seedQueryDocumentNode',
          'faust',
          (seedNode, context) => {
            console.log(context)
            return gql`
              query GetNodeByUri(
                $id: ID! = 0
                $uri: String = ""
                $asPreview: Boolean = false
              ) {

                ... on RootQuery @skip(if: $asPreview) {
                  nodeByUri(uri: $uri) {
                    __typename
                    ...LangNodeByUri
                  }
                }
                ... on RootQuery @include(if: $asPreview) {
                  contentNode(id: $id, idType: DATABASE_ID, asPreview: true) {
                    __typename
                    ...LangNodeByUri
                  }
                }
              }
              fragment LangNodeByUri on UniformResourceIdentifiable {
                __typename
                uri
                id
                ...LangDatabaseIdentifier
                ...LangContentType
                ...LangUser
                ...LangTermNode
                ...LangContentNode
                ...LangMediaItem
                ...LangPage
                ...LangPost
              }
              fragment LangDatabaseIdentifier on DatabaseIdentifier {
                databaseId
              }
              fragment LangMediaItem on MediaItem {
                id
                mimeType
              }
              fragment LangContentType on ContentType {
                name
                isFrontPage
                isPostsPage
              }
              fragment LangPost on Post {
                language {
                  code
                }
              }
              fragment LangPage on Page {
                isFrontPage
                isPostsPage
                language {
                  code
                }
              }
              fragment LangTermNode on TermNode {
                isTermNode
                slug
                taxonomyName
              }
              fragment LangContentNode on ContentNode {
                isContentNode
                slug
                contentType {
                  node {
                    name
                  }
                }
                template {
                  templateName
                }
              }
              fragment LangUser on User {
                name
                userId
                databaseId
              }
            `;
          },
        ); 
        addFilter(
            'possibleTemplatesList',
            'faust',
            (possibleTemplates, context) => {
              // if (context?.seedNode?.language?.code === 'ES' && context?.seedNode?.__typename === 'Page' ) {
              //   return Array.from(new Set(['es-page', ...possibleTemplates]));
              // }
              return possibleTemplates
            },
          );
    }
}