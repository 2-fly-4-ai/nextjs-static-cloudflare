import { gql } from "@apollo/client";
import MenuFragment from "../fragments/menus";
import { HeaderFooter } from "../get-menus";

export const GET_PAGE = gql`
query GET_PAGE {
	${HeaderFooter}     
    productTaxonomies(where: {slug: "pet-supplies"}) {
        nodes {
            name
            uri
          children {
            nodes {
              uri
              name
              children {
                nodes {
                  uri
                  name
                  children {
                    nodes {
                      uri
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
${MenuFragment}
`;
