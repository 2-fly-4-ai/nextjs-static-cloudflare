import { gql } from "@apollo/client";
import MenuFragment from "../../queries/fragments/menus";
import SeoFragment from "../../queries/fragments/seo";
import { HeaderFooter } from "../../queries/get-menus";
import ImageFragment from "../../queries/fragments/image";
import PostFragment from "../../queries/fragments/post";

/**
 * Get News Posts
 *
 */
export const GET_NEWS = gql`
  query GET_PAGE($uri: String, $first: Int, $after: String) {
    ${HeaderFooter}
    page: pageBy(uri: $uri) {
      id
      title
      content
      slug
      uri
      seo {
        openGraph {
          description
          siteName
          title
          url
        }
        breadcrumbTitle
        description
        focusKeywords
        breadcrumbs {
          text
          url
        }
        canonicalUrl
        robots
        title
      }
    }
    posts: posts(first: $first, after: $after) {
      edges {
        node {
          ...PostFragment
        }
      }
      pageInfo {
        offsetPagination {
          total
        }
        hasNextPage
        endCursor
      }
    }
  }
  ${MenuFragment}
  ${ImageFragment}
  ${PostFragment}
`;
