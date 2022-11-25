
import { gql } from '@apollo/client'

/**
 * Get pages.
 *
 */
export const GET_PAGES_URI = gql`
 query GET_PAGES {
  productTaxonomies(last: 1)  {
    nodes {
      id
      uri
    }
  }
}
 `;
