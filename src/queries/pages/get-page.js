import { gql } from "@apollo/client";
import MenuFragment from "../fragments/menus";
import { HeaderFooter } from "../get-menus";
import SeoFragment from "../fragments/seo";

export const GET_PAGE = gql`
	query GET_PAGE($uri: String) {
      ${HeaderFooter}
	  page: pageBy(uri: $uri) {
	    id
	    title
	    content
	    slug
	    uri
	    seo {
          ...SeoFragment
        }
	  }
	  productTags(first: 15, where: {orderby: COUNT , order: DESC}) {
		nodes {
		  roundupFields {
			hero
		  }
		  uri
		  name
		  count
		}
	  }
	  productTaxonomies(first: 6, where: {orderby: COUNT, childless: true}) {
		nodes {
		  uri
		  name
		  product_taxonomy_fields {
			taxonomyFeaturedImage
		  }
		}
	  }
	}
	${MenuFragment}
	${SeoFragment}
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
