import { gql } from "@apollo/client";
import MenuFragment from "../fragments/menus";
import { HeaderFooter } from "../get-menus";
import SeoFragment from "../fragments/seo";

export const GET_PAGE = gql`
query GET_PAGE($uri: ID!) {
	${HeaderFooter}
	page: productTag(id: $uri, idType: SLUG) {
	  name
	  slug
	  uri
	  seo {
		openGraph {
		  description
		  siteName
		  title
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
		robots
		title
	  }
	  products {
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
			  seo {
                robots
              }
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
	  roundupFields {
		whatToConsider
		typesOf
		roundupFeatureImage
		intro
		howWeChose
		hero
		faqs
		author
		datepublished
	  }
	}
  }
${MenuFragment}

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
