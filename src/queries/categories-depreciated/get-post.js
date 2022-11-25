import { gql } from "@apollo/client";
import MenuFragment from "../fragments/menus";
import { HeaderFooter } from "../get-menus";
import SeoFragment from "../fragments/seo";
import ImageFragment from "../fragments/image";

export const GET_POST = gql`
	query GET_POST($uri: String) {
      ${HeaderFooter}
	  post: productBy(uri: $uri) {
	    id
	    title
	    content
	    slug
	    uri
		single_product_acf {
			asin
			brand
			productAida
			productDescription
			productFeatures
			productImageGalleryUrls
			productImageMainUrl
			productProsCons
			productRating
			upc
			productReviewsQuantity
			productReviewShort
			productReviewLong
			modelNumber
			keywordTerm
			fieldGroupName
		  }

	    seo {
          ...SeoFragment
      }
      featuredImage {
        node {
        ...ImageFragment
        }
		  }
		  
	  }
	}
	${MenuFragment}
	${SeoFragment}
	${ImageFragment}
`;

export const GET_POST_BY_ID = gql`
	query GET_POST_BY_ID($id: ID!) {
		${HeaderFooter}
	  product(idType: DATABASE_ID, id: $id) {
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
