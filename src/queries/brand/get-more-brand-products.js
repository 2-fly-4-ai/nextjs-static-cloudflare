import { gql } from "@apollo/client";
import MenuFragment from "../fragments/menus";
import { HeaderFooter } from "../get-menus";
import SeoFragment from "../fragments/seo";

export const GET_PAGE = gql`
query GET_PAGE($uri: ID!, $first: Int!, $after: String) {
	${HeaderFooter}
	page: productBrand(id: $uri, idType: SLUG) {
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
	  brand_fields {
		description
		searchVolume
	  }
	  products(
		first: $first
		after: $after
		where: {taxQuery: {taxArray: {taxonomy: PRODUCTBRAND}}}
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
${MenuFragment}

`;
