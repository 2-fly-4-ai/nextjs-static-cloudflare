import { isEmpty } from "lodash";
import { NextSeo } from "next-seo";
import PropTypes from "prop-types";

/**
 * Custom SEO component
 *
 * Used to seo meta tags for each page
 *
 * @param {Object} seo Seo.
 * @param {string} uri Page URI.
 * @see https://www.npmjs.com/package/next-seo
 *
 * @returns {JSX.Element}
 *
 */
const Seo = ({ seo, uri }) => {
  console.log("HELLO", seo);
  const {
    breadcrumbTitle,
    breadcrumbs,
    canonicalUrl,
    description,
    openGraph,
    robots,
    title,
  } = seo;

  const metaRobotsNofollow = robots[0] ?? null;
  const metaRobotsNoindex = robots[1] ?? null;
  const opengraphImage = openGraph?.image ?? null;
  const opengraphDescription = openGraph?.description ?? null;
  const opengraphTitle = title ?? null;
  const opengraphSiteName = openGraph?.siteName ?? null;
  const metaDesc = description ?? null;

  const currentLocation = process.browser ? window.location.origin : null;
  const opengraphUrl =
    (process.env.NEXT_PUBLIC_NEXTJS_SITE_URL
      ? process.env.NEXT_PUBLIC_NEXTJS_SITE_URL
      : currentLocation) + uri;

  return (
    <NextSeo
      title={title}
      description={opengraphDescription || metaDesc}
      canonical={opengraphUrl}
      noindex={metaRobotsNoindex}
      nofollow={metaRobotsNofollow}
      openGraph={{
        type: "website",
        locale: "en_US",
        url: opengraphUrl || canonicalUrl,
        title: opengraphTitle,
        description: opengraphDescription,
        images: [
          {
            url: opengraphImage?.sourceUrl,
            width: 1280,
            height: 720,
          },
        ],
        /* eslint-disable */
        site_name: opengraphSiteName,
        /* eslint-enable */
      }}
      twitter={{
        handle: "@Petsmarketplc",
        site: "@Petsmarketplc",
        cardType: "summary_large_image",
      }}
    />
  );
};

Seo.propTypes = {
  seo: PropTypes.object,
};

Seo.defaultProps = {
  seo: {
    canonical: "",
    title: "",
    metaDesc: "",
    metaRobotsNoindex: "",
    metaRobotsNofollow: "",
    opengraphDescription: "",
    opengraphTitle: "",
    opengraphImage: {
      sourceUrl: "",
    },
    opengraphUrl: "",
    opengraphSiteName: "",
  },
};

export default Seo;
