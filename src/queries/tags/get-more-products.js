import { gql } from "@apollo/client";
import MenuFragment from "../fragments/menus";
import { HeaderFooter } from "../get-menus";
import SeoFragment from "../fragments/seo";

export const GET_PAGE = gql`
  query GET_PAGE($uri: [String], $first: Int!, $after: String) {
    page: productTags(where: { slug: $uri }) {
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
          where: { taxQuery: { taxArray: { taxonomy: PRODUCTTAG } } }
        ) {
          nodes {
            title
            uri
            single_product_acf {
              asin
              brand
              productAida
              productDescription
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

export const GET_PAGE_BY_ID = gql`
	query GET_PAGE_BY_ID($id: ID!) {
		${HeaderFooter}
	  page(idType: DATABASE_ID, id: $id) {
	    id
	    title
	    content
	    slug
	    uri
	    seo {
          ...SeoFragment
        }
		status
	  }
	}
	${MenuFragment}
	${SeoFragment}
`;
