import { GET_URLS } from "../src/queries/sitemap";
import React from "react";
import client from "../src/apollo/client";

function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${posts
       .map((test2) => {
         console.log;
         return `
       <url>
           <loc>${`${test2}`}</loc>
       </url>
     `;
       })
       .join("")}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site
  // const request = await fetch(EXTERNAL_DATA_URL);

  const { data } = await client.query({
    query: GET_URLS,
  });

  const url_list = [];

  data?.rankMathSettings?.sitemap?.contentTypes.map((test) => {
    if (
      test?.sitemapUrl != null &&
      test?.isInSitemap != false &&
      test?.sitemapUrl === "https://petsmarketplc.com/page-sitemap.xml"
    ) {
      test?.connectedContentNodes?.edges.map((test2) => {
        if (test2?.node?.seo?.robots[1] == "index") {
          url_list.push(test2?.node?.link);
          console.warn(test2?.node?.link);
        }
      });
    }
  });

  console.log(url_list);

  const posts = url_list;

  const sitemap = generateSiteMap(posts);

  res.setHeader("Content-Type", "text/xml");

  res.write(sitemap);
  res.end();

  return {
    props: {
      data: data || {},
    },
  };
}

export default SiteMap;
