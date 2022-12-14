import client from "../../src/apollo/client";
import { isEmpty } from "lodash";
import { useRouter } from "next/router";
import Layout from "../../src/components/layout";
import {
  FALLBACK,
  handleRedirectsAndReturnData,
  isCustomPageUri,
} from "../../src/utils/slug";
import { GET_POST } from "../../src/queries/posts/get-post";
import { GET_POST_SLUGS } from "../../src/queries/posts/get-posts";
import { sanitize } from "../../src/utils/miscellaneous";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import { FacebookIcon, TwitterIcon } from "react-share";
import Image from "next/image";
import NewsletterSubscribe from "../../src/components/layout/footer/NewsletterSubscribe";

// THis is just an example, we wont be using pagination in this way. (Just LOAD MORE Everything)

const Post = ({ data }) => {
  const router = useRouter();

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Layout data={data} isPost>
      <main className="pb-16 lg:pb-24 bg-white dark:bg-gray-900 px-4 ">
        <div className="flex relative z-20 gap-6 justify-between px-4 mx-auto max-w-screen-xl  bg-white dark:bg-gray-900 rounded">
          <article className="w-full max-w-none htmlFormat htmlFormat-sm sm:format-base lg:format-lg htmlFormat-blue dark:format-invert">
            <header className="py-12 bg-gradient-to-r from-gray-100 to-gray-300 mt-4 h-max">
              <div className="px-4 mx-auto w-full max-w-screen-xl text-center">
                <span className="block mb-4 font-semibold text-gray-900 dark:text-white">
                  Published{" "}
                  <time className="uppercase font-normal text-gray-500 dark:text-gray-400">
                    {data?.post?.date}
                  </time>
                </span>

                {!isEmpty(data?.post?.title) ? (
                  <div
                    className="mx-auto my-6  max-w-2xl text-2xl dark:text-white font-extrabold leading-none text-gray-900 sm:text-3xl lg:text-4xl"
                    dangerouslySetInnerHTML={{
                      __html: sanitize(data?.post?.title ?? {}),
                    }}
                  />
                ) : null}

                <p className="text-lg font-normal text-gray-500 dark:text-gray-400"></p>
              </div>
            </header>

            {/* h1/author info + Share Buttons */}
            <div className="px-4 flex flex-col lg:flex-row justify-between lg:items-center py-6 border-t border-b border-gray-200 dark:border-gray-700">
              <span className="text-base mb-4 lg:mb-0 font-normal text-gray-500 dark:text-gray-400">
                By{" "}
                <a
                  href="#"
                  rel="author"
                  className="font-bold text-gray-900 dark:text-white no-underline hover:underline capitalize"
                >
                  {data?.post?.author?.node?.name}
                </a>{" "}
                in{" "}
                <a
                  href="#"
                  className="font-normal text-gray-500 dark:text-gray-400 no-underline hover:underline"
                >
                  Posts
                </a>
              </span>

              <aside aria-label="Share social media">
                <div className="inline-flex items-center  mr-2 text-xs font-medium text-gray-900 no-underline bg-white rounded-lg border border-gray-200 focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600  dark:hover:text-white dark:hover:bg-gray-700">
                  <FacebookShareButton
                    url={`https://petsmarketplace.com${data?.post?.uri}`}
                    quote={"Best Pets Products"}
                    hashtag={`#${data?.page?.nodes[0]?.name.replace(" ", "")}`}
                    description={"aiueo"}
                    className="inline-flex items-center  text-xs font-medium w-24 justify-center h-8 border"
                  >
                    <FacebookIcon
                      size={18}
                      iconFillColor="white"
                      round
                      className="mr-2 p-0 "
                      bgStyle={{ fill: "black" }}
                    />{" "}
                    Share
                  </FacebookShareButton>
                </div>
                <div className="inline-flex items-center  mr-2 text-xs font-medium text-gray-900 no-underline bg-white rounded-lg border border-gray-200 focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600  dark:hover:text-white dark:hover:bg-gray-700">
                  <TwitterShareButton
                    title={"test"}
                    url={`https://petsmarketplace.com${data?.post?.uri}`}
                    hashtags={[
                      `#${data?.page?.nodes[0]?.name.replace(" ", "")}`,
                    ]}
                    className="inline-flex items-center  text-xs font-medium w-24 justify-center h-8 border"
                  >
                    <TwitterIcon
                      size={18}
                      iconFillColor="white"
                      round
                      className="mr-2 p-0 "
                      bgStyle={{ fill: "black" }}
                    />
                    Tweet
                  </TwitterShareButton>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    navigator.clipboard.writeText(
                      `https://petsmarketplace.com${data?.post?.uri}`
                    )
                  }
                  className="inline-flex items-center py-2 px-6 text-xs font-medium text-gray-900 no-underline bg-white rounded-lg border border-gray-200 focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-0 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  {" "}
                  <svg
                    className="mr-2 w-4 h-4"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                      clipRule="evenodd"
                    ></path>
                  </svg>{" "}
                  Copy link
                </button>
              </aside>
            </div>

            <div
              className="px-4 prose max-w-none my-8"
              dangerouslySetInnerHTML={{
                __html: sanitize(data?.post?.content ?? {}),
              }}
            />
            <div className="flex justify-between items-center py-6 border-t border-b border-gray-200 dark:border-gray-700">
              <aside aria-label="Share social media">
                <a
                  href="#"
                  className="inline-flex items-center py-2 px-6 mr-2 text-xs font-medium text-gray-900 no-underline bg-white rounded-lg border border-gray-200 focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  <svg
                    className="mr-2 w-4 h-4"
                    fill="currentColor"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
                  </svg>{" "}
                  Share
                </a>
                <a
                  href="#"
                  className="inline-flex items-center py-2 px-6 mr-2 text-xs font-medium text-gray-900 no-underline bg-white rounded-lg border border-gray-200 focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  <svg
                    className="mr-2 w-4 h-4"
                    fill="currentColor"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
                  </svg>{" "}
                  Tweet
                </a>
                <button
                  type="button"
                  className="inline-flex items-center py-2 px-6 text-xs font-medium text-gray-900 no-underline bg-white rounded-lg border border-gray-200 focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  <svg
                    className="mr-2 w-4 h-4"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                      clipRule="evenodd"
                    ></path>
                  </svg>{" "}
                  Copy link
                </button>
              </aside>
              <div className="not-format">
                <button
                  data-tooltip-target="tooltip-save"
                  className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-gray-400 focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600"
                  type="button"
                >
                  <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    ></path>
                  </svg>
                </button>
                <div
                  id="tooltip-save"
                  role="tooltip"
                  className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700"
                >
                  Save this article
                  <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
                <button
                  id="dropdownMenuIconHorizontalButton"
                  data-dropdown-toggle="dropdownDotsHorizontal"
                  className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-gray-400 focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600"
                  type="button"
                >
                  <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
                  </svg>
                </button>

                <div
                  id="dropdownDotsHorizontal"
                  className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                >
                  <ul
                    className="py-1 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownMenuIconHorizontalButton"
                  >
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Mute this author
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Report
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </article>
          <aside
            className="hidden mt-4 xl:block"
            aria-labelledby="sidebar-label"
          >
            <div className="xl:w-[336px] sticky top-6">
              <div className="p-4 mb-6  border border-gray-200 dark:border-gray-700">
                <h4 className="mb-2 text-sm font-bold text-gray-900 dark:text-white uppercase">
                  PETSMARKET PLACE LATEST NEWS
                </h4>

                <p className="mb-4 text-sm font-light text-gray-500 dark:text-gray-400">
                  Get all the stories you need-to-know from the most powerful
                  name in news delivered first thing every morning to your inbox
                </p>

                <NewsletterSubscribe />
              </div>

              <div className="p-4 mb-6 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="mb-4 text-sm font-bold text-gray-900 dark:text-white uppercase">
                  Latest Posts
                </h4>

                {!isEmpty(data?.posts?.nodes)
                  ? data?.posts?.nodes.map((post) => {
                      return (
                        <div className="mb-6" key={post?.title}>
                          <h5 className="mb-2 text-lg font-bold leading-tight text-gray-800 dark:text-white">
                            {post?.title}
                          </h5>
                          <p className="mb-2 font-light text-gray-500 dark:text-gray-400">
                            {post?.excert}
                          </p>
                          <a
                            href={post?.uri}
                            className="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline"
                          >
                            Read Article
                          </a>
                        </div>
                      );
                    })
                  : null}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </Layout>
  );
};

export default Post;

export async function getStaticProps({ params }) {
  const { data, errors } = await client.query({
    query: GET_POST,
    variables: {
      uri: `/blog/${params.slug}`,
    },
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

  return handleRedirectsAndReturnData(defaultProps, data, errors, "post");
}

/**
 * Since the page name 'does not' use catch-all routes,
 *htmlForexample [slug],
 * that's why params would contain just slug and not an array of slugs , unlike [...slug].
 *htmlForexample, If we need to have dynamic route '/foo/'
 * Then we would add paths: [ params: { slug: 'foo' } } ]
 * Here slug will be 'foo', then Next.js will statically generate the page at /foo/
 *
 * At build time next js will will make an api call get the data and
 * generate a page bar.js inside .next/foo directory, so when the page is served on browser
 * data is already present, unlike getInitialProps which gets the page at build time but makes an api
 * call after page is served on the browser.
 *
 * @see https://nextjs.org/docs/basic-features/data-fetching#the-paths-key-required
 *
 * @returns {Promise<{paths: [], fallback: boolean}>}
 */
export async function getStaticPaths() {
  const { data } = await client.query({
    query: GET_POST_SLUGS,
  });

  const pathsData = [];

  data?.posts?.nodes &&
    data?.posts?.nodes.map((post) => {
      if (!isEmpty(post?.uri)) {
        const slugs = post?.uri?.split("/").filter((pageSlug) => pageSlug);
        pathsData.push({ params: { slug: slugs } });
      }
    });

  return {
    paths: pathsData,
    fallback: FALLBACK,
  };
}
