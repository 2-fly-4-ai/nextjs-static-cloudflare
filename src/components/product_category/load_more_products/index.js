import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import PropTypes from "prop-types";
import { isEmpty } from "lodash";
import Products from "../products";
import { PER_PAGE_FIRST } from "../../../utils/pagination";
import { GET_PAGE } from "../../../queries/categories-new/get-load-more-products";

const LoadMorePosts = ({
  product,
  classes,
  graphQLQuery,
  searchQuery,
  slug,
}) => {
  /**
   * First set the posts data and pageInfo received from server side,
   * as initial postsData and pageInfo, so that
   * it sever side posts can be fetched, and the new endcursor( contained in pageInfo )
   * can be sent to get the next set of posts.
   */
  const [postsData, setPostsData] = useState(product?.nodes ?? []);
  const [pageInfo, setPageInfo] = useState(product?.pageInfo);
  const [error, setError] = useState(null);
  /**
   * If value of 'posts' passed to this component changes, set new post data and page info.
   */
  useEffect(() => {
    setPostsData(product?.nodes);
    setPageInfo(product?.pageInfo);
  }, [product?.nodes]);

  const setPosts = (product) => {
    if (!product || !product?.nodes || !product?.pageInfo) {
      return;
    }
    /**
     * Concat the newly received post from client request to the existing posts, using setPostsData()
     * and also set the new pageInfo that contains the new endcursor, so that
     * when user clicks on loadmore again, next set of posts can be fetched again.
     * Same process if repeated to it gets concatenated everytime to the existing posts array.
     */
    const newPosts = postsData.concat(product?.nodes);
    setPostsData(newPosts);
    setPageInfo({ ...product?.pageInfo });
  };
  const [fetchPosts, { loading }] = useLazyQuery(graphQLQuery, {
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      /**
       * Call setPosts to concat the new set of posts to existing one and update pageInfo
       * that contains the cursor and the information about whether we have the next page.
       */
      setPosts(data?.page?.products ?? []);
    },
    onError: (error) => {
      setError(error?.graphQLErrors ?? "");
    },
  });
  /**
   * Calls fetchPosts
   *
   * fetchPosts() makes a client side request with the new endcursor info,
   * to get next set of posts.
   *
   * @param {String} endCursor Endcursor used to fetch the next set of posts.
   */
  const loadMoreItems = (slug, endCursor = null) => {
    let queryVariables = {
      first: PER_PAGE_FIRST, //first: PER_PAGE_FIRST,
      after: endCursor,
      uri: slug,
    };

    // If its a search query then add the query in the query variables.
    if (!isEmpty(searchQuery)) {
      queryVariables.query = searchQuery;
    }

    fetchPosts({
      variables: queryVariables,
    });
  };
  /**
   * Pull the endcursor and hasNextPage values from pageInfo
   *
   * Please note that pageInfo gets updated with new endCursor and hasNextPage
   * values everytime a new client side request is made using setPageInfo()
   */
  const { endCursor, hasNextPage } = pageInfo || {};
  const test = true;
  const p = { nodes: postsData };

  return (
    <div className={classes}>
      <Products product={p} />

      {hasNextPage ? (
        <div className="w-full flex justify-center lg:mb-10">
          {loading ? (
            <div>
              <button
                disabled
                type="button"
                className="py-2.5 px-5 uppercase mr-2 text-sm font-medium text-gray-900 bg-white rounded-full border-4 border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
              >
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="#1C64F2"
                  />
                </svg>
                Loading...
              </button>
            </div>
          ) : (
            <button
              className="py-2.5 uppercase px-7 mr-2 text-sm font-medium text-gray-700 bg-white rounded-full border-4 border-gray-200 hover:bg-gray-100 hover:text-blue-700  focus:outline-none  dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
              onClick={() => loadMoreItems(slug, endCursor)}
            >
              Load more
            </button>
          )}
        </div>
      ) : null}
      {error && (
        <div className="w-full flex justify-center my-10">
          No articles available
        </div>
      )}
    </div>
  );
};
LoadMorePosts.propTypes = {
  products: PropTypes.object,
  classes: PropTypes.string,
  graphQLQuery: PropTypes.object,
  searchQuery: PropTypes.string,
};

LoadMorePosts.defaultProps = {
  products: {},
  classes: "",
  graphQLQuery: GET_PAGE,
  searchQuery: "",
};

export default LoadMorePosts;
