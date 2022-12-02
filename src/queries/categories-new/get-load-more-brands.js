import { gql } from "@apollo/client";
import MenuFragment from "../fragments/menus";
import { HeaderFooter } from "../get-menus";
import SeoFragment from "../fragments/seo";

export const GET_PAGE = gql`
  query GET_PAGE($first: Int!, $after: String) {
    productBrands(first: $first, after: $after) {
      nodes {
        name
        uri
        seo {
          metaRobotsNoindex
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;
