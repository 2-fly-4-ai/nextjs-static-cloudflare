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

  data?.rankMathSettings?.sitemap?.taxonomies.map((test) => {
    if (
      test?.sitemapUrl != null &&
      test?.isInSitemap != false &&
      test?.sitemapUrl === "https://petsmarketplc.com/product_tag-sitemap.xml"
    ) {
      test?.connectedTerms?.nodes.map((test2) => {
        if (test2?.seo?.robots[1] == "index") {
          url_list.push(test2?.link);
        }
      });
    }
  });

  console.log(url_list);

  const posts = url_list;

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(posts);

  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {
      data: data || {},
    },
  };
}

export default SiteMap;
