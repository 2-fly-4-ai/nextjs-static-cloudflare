import { gql } from "@apollo/client";
import MenuFragment from "../fragments/menus";
import { HeaderFooter } from "../get-menus";
import SeoFragment from "../fragments/seo";

export const GET_PAGE = gql`
query GET_PAGE($uri: [String]) {
	${HeaderFooter}
	page: productTag(id: $uri, idType: SLUG) {
		name
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
	  productTags(where: {slug: $uri}) {
		nodes {
		  name
		  slug
		  uri
		  products: products(
			first: 10
			where: {taxQuery: {taxArray: {taxonomy: PRODUCTTAG}}}
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
				  roundupFields {
					hero
					roundupFeatureImage
				  }
				}
			  }
			  productBrands {
				nodes {
				  uri
				  name
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
			hero
			faqs
			howWeChose
			intro
			typesOf
			whatToConsider
			author
			roundupFeatureImage
			datepublished
		  }
		  seo {
			breadcrumbTitle
			breadcrumbs {
			  text
			}
			description
			focusKeywords
		  }
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
	  }
	}
	${MenuFragment}
	${SeoFragment}
`;
