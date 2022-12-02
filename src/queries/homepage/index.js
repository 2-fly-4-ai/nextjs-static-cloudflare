import { gql } from "@apollo/client";

export const GET_PAGE = gql`
  query GET_PAGE($uri: [String]) {
    query GET_PAGE {
        productTags(first: 12, where: {orderby: COUNT , order: DESC}) {
          nodes {
            roundupFields {
              hero
            }
            uri
            name
            count
          }
        }
      }
`;
