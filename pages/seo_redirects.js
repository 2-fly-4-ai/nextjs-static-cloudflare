import { GET_URLS } from "../src/queries/sitemap";
import React from "react";
import client from "../src/apollo/client";

const Seo_redirects = ({ data }) => {
  console.log(data);
  const full_list = [];

  data?.rankMathSettings?.sitemap?.contentTypes.map((sitemap) => {
    if (sitemap?.isInSitemap == true) {
      full_list.push(sitemap);
    }
  });

  data?.rankMathSettings?.sitemap?.taxonomies.map((sitemap) => {
    if (sitemap?.isInSitemap == true) {
      full_list.push(sitemap);
    }
  });

  const seo_redirects_data = [];

  full_list.map((output) => {
    console.log(output?.sitemapUrl.split("/").slice(-1)[0]);
    seo_redirects_data.push(
      `{
      source: "/${output?.sitemapUrl.split("/").slice(-1)[0]}",
      destination:
        "${output?.sitemapUrl}",
      permanent: false,
      basePath: false,
    }`
    );
  });

  let xtest = seo_redirects_data.join(",");

  return xtest;
};

export default Seo_redirects;

export async function getStaticProps() {
  const { data, errors } = await client.query({
    query: GET_URLS,
  });

  const defaultProps = {
    props: {
      data: data || {},
    },
    /**
     * Revalidate means that if a new request comes to server, then every 1 sec it will check
     * if the data is changed, if it is changed then it will update the
     * static file inside .next folder with the new data, so that any 'SUBSEQUENT' requests should have updated data.
     */
    revalidate: 1,
  };

  return defaultProps;
}
