import { gql } from "@apollo/client";
import MenuFragment from "../fragments/menus";
import { HeaderFooter } from "../get-menus";
import SeoFragment from "../fragments/seo";

export const GET_PAGE = gql`
  query GET_PAGE($uri: [String], $first: Int!, $after: String) {
    page: productTaxonomies(where: { slug: $uri }) {
      nodes {
        name
        slug
        uri
        seo {
          title
          canonical
          metaDesc
          metaRobotsNofollow
          metaRobotsNoindex
          breadcrumbs {
            text
            url
          }
        }
        products: products(
          first: $first
          after: $after
          where: { taxQuery: { taxArray: { taxonomy: PRODUCTTAXONOMY } } }
        ) {
          nodes {
            title
            uri
            single_product_acf {
              asin
              brand
              productAida
              productImageMainUrl
              upc
              modelNumber
              keywordTerm
              fieldGroupName
              productUrl
            }
            productTags {
              nodes {
                name
                uri
              }
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    }
  }
`;
