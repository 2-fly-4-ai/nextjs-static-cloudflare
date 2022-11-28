import { gql } from '@apollo/client';
import ImageFragment from '../fragments/image';
import PostFragment from '../fragments/post';

/**
 * Get Search Results.
 *
 */
export const GET_SEARCH_RESULTS = gql`
 query GET_SEARCH_RESULTS( $first: Int, $after: String, $query: String ) {
  posts: products(where: {search: "cat house"}) {
    edges {
      node {
        title
        uri
        single_product_acf {
          asin
          brand
          productAida
          productImageMainUrl
          productUrl
        }
      }
      cursor
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
 ${ImageFragment}
 ${PostFragment}
 `;

/**
 * Get Search Results with Total Pages
 *
 */
export const GET_SEARCH_RESULTS_WITH_TOTAL_PAGES = gql`
 query GET_SEARCH_RESULTS( $first: Int, $after: String, $query: String ) {
  posts: products(where: {search: "cat house"}) {
    edges {
      node {
        title
        uri
        single_product_acf {
          asin
          brand
          productAida
          productImageMainUrl
          productUrl
        }
      }
      cursor
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
 ${ImageFragment}
 ${PostFragment}
 `;
