
import { gql } from '@apollo/client'

/**
 * Get pages.
 *
 */
export const GET_PAGES_URI = gql`
query GET_PAGES {
  pages: productTags(last: 1)  {
    nodes {
      id
      uri
    }
  }
}
 `;
