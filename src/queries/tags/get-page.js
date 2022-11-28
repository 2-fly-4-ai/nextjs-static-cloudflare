import { gql } from "@apollo/client";
import MenuFragment from "../fragments/menus";
import { HeaderFooter } from "../get-menus";
import SeoFragment from "../fragments/seo";

export const GET_PAGE = gql`
query GET_PAGE($uri: [String]) {
	${HeaderFooter}
	page: productTags(where: {slug: $uri}) {
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
		products(first: 30, where: {taxQuery: {taxArray: {taxonomy: PRODUCTTAG}}}) {
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
				name
				brand_fields {
				  searchVolume
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
	  }
	  pageInfo {
		hasNextPage
		endCursor
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
	    seo {
          ...SeoFragment
        }
		status
	  }
	}
	${MenuFragment}
	${SeoFragment}
`;
