import { gql } from "@apollo/client";
import MenuFragment from "../fragments/menus";
import { HeaderFooter } from "../get-menus";
import SeoFragment from "../fragments/seo";

export const GET_PAGE = gql`
  query GET_PAGE($uri: ID!, $first: Int!, $after: String) {
    page: productTag(id: $uri, idType: SLUG) {
      name
      slug
      seo {
        openGraph {
          description
          locale
          siteName
          title
          type
          updatedTime
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
      }
      products(first: $first, after: $after) {
        nodes {
          title
          uri
          single_product_acf {
            asin
            brand
            productAida
            productDescription
            productImageMainUrl
            productUrl
          }
          productTags {
            nodes {
              name
              uri
              roundupFields {
                hero
                roundupFeatureImage
              }
            }
          }
          productBrands {
            nodes {
              name
              uri
            }
          }
          productTaxonomies {
            nodes {
              uri
              name
              parent {
                node {
                  name
                  uri
                  parent {
                    node {
                      name
                      uri
                      parent {
                        node {
                          name
                          uri
                        }
                      }
                    }
                  }
                }
              }
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
		status
    seo {
      openGraph {
        description
        locale
        siteName
        title
        type
        updatedTime
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
      }
	  }
	}
	${MenuFragment}
	${SeoFragment}
`;
