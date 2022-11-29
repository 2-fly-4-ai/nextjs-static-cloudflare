import { gql } from "@apollo/client";
import MenuFragment from "../fragments/menus";
import { HeaderFooter } from "../get-menus";
import SeoFragment from "../fragments/seo";

export const GET_PAGE = gql`
query GET_PAGE($uri: [String], $first: Int!, $after: String) {
	${HeaderFooter}
	page: productTaxonomies(where: {slug: $uri}) {
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
		parent {
			node {
			  name
			  uri
			  parent {
				node {
				  name
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
		children {
			nodes {
			  name
			  uri
			  products(
				after: $after 
				first: 10 where: {taxQuery: {taxArray: {taxonomy: PRODUCTTAXONOMY}}}) {
				nodes {
				  title
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
				 
				}
				pageInfo {
					hasNextPage
					endCursor
				  }
			  }
			  children {
				nodes {
				  name
				  uri
				  products(
					after: $after 
					first: 10 where: {taxQuery: {taxArray: {taxonomy: PRODUCTTAXONOMY}}}) {
					nodes {
					  title
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
					 
					}
					pageInfo {
						hasNextPage
						endCursor
					  }
				  }
				  children {
					nodes {
					  name
					  uri
					  products(
						first: 10
						after: $after 
						where: {taxQuery: {taxArray: {taxonomy: PRODUCTTAXONOMY}}}) {
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
						  
						}
						pageInfo {
							hasNextPage
							endCursor
						  }
					  }
					}
				  }
				}
			  }
			}
		  }
		
		  products: products(
			first: $first
			after: $after
			where: { taxQuery: { taxArray: { taxonomy: PRODUCTTAXONOMY } } }
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
			  
		  }
		  pageInfo {
			hasNextPage
			endCursor
		  }
		}
	  }
	}
	productBrands(where: {orderby: COUNT}, last: 100) {
		nodes {
		  name
		  uri
		  seo {
		
			metaRobotsNoindex
			
		  }
		}}
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
