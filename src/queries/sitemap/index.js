import { gql } from "@apollo/client";
import MenuFragment from "../fragments/menus";
import { HeaderFooter } from "../get-menus";
import SeoFragment from "../fragments/seo";

export const GET_URLS = gql`
  query NewQuery {
    rankMathSettings {
      sitemap {
        sitemapIndexUrl
        contentTypes {
          sitemapUrl
          isInSitemap
          connectedContentNodes(first: 100000) {
            edges {
              node {
                link
                seo {
                  robots
                }
              }
            }
          }
        }
        taxonomies {
          isInSitemap
          sitemapUrl
          connectedTerms(first: 100000) {
            nodes {
              link
              seo {
                robots
              }
            }
          }
        }
      }
    }
  }
`;
