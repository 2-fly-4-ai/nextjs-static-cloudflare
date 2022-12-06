import { gql } from "@apollo/client";
import MenuFragment from "../fragments/menus";
import { HeaderFooter } from "../get-menus";
import SeoFragment from "../fragments/seo";

export const GET_URLS = gql`
  query GET_PAGE {
    rankMathSettings {
      sitemap {
        sitemapIndexUrl
        taxonomies {
          sitemapUrl
          isInSitemap
        }
        contentTypes {
          sitemapUrl
          isInSitemap
        }
      }
    }
  }
`;
