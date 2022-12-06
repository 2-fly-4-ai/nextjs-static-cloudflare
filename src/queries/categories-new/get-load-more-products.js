import { gql } from "@apollo/client";
import MenuFragment from "../fragments/menus";
import { HeaderFooter } from "../get-menus";
import SeoFragment from "../fragments/seo";

export const GET_PAGE = gql`
  query GET_PAGE($uri: ID!, $first: Int!, $after: String) {
    page: productTaxonomy(id: $uri, idType: SLUG) {
      name
      slug
      uri
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
    productBrands(where: { orderby: COUNT, order: DESC }, first: 100) {
      nodes {
        name
        uri
      }
    }
  }
`;
