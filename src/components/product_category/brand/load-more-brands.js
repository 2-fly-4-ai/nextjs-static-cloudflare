import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import PropTypes from "prop-types";
import { isEmpty } from "lodash";
import Brands from ".";
import { PER_PAGE_FIRST_BRAND } from "../../../utils/pagination";
import { GET_PAGE } from "../../../queries/categories-new/get-load-more-brands";

const LoadMoreBrands = ({ brands, classes, graphQLQuery, searchQuery }) => {
  /**
   * First set the posts data and pageInfo received from server side,
   * as initial postsData and pageInfo, so that
   * it sever side posts can be fetched, and the new endcursor( contained in pageInfo )
   * can be sent to get the next set of posts.
   */
  console.log("BRANDSTEST", brands);
  const [postsData, setPostsData] = useState(brands?.nodes ?? []);
  const [pageInfo, setPageInfo] = useState(brands?.pageInfo);
  const [error, setError] = useState(null);

  /**
   * If value of 'posts' passed to this component changes, set new post data and page info.
   */
  useEffect(() => {
    setPostsData(brands?.nodes);
    setPageInfo(brands?.pageInfo);
  }, [brands?.nodes]);

  /**
   * Set posts.
   *
   * @param {Object} posts Posts.
   *
   * @return {void}
   */
  const setPosts = (brands) => {
    if (!brands || !brands?.nodes || !brands?.pageInfo) {
      console.warn("not available");
      return;
    }

    /**
     * Concat the newly received post from client request to the existing posts, using setPostsData()
     * and also set the new pageInfo that contains the new endcursor, so that
     * when user clicks on loadmore again, next set of posts can be fetched again.
     * Same process if repeated to it gets concatenated everytime to the existing posts array.
     */
    const newPosts = postsData.concat(brands?.nodes);
    setPostsData(newPosts);
    setPageInfo({ ...brands?.pageInfo });
  };

  const [fetchPosts, { loading }] = useLazyQuery(graphQLQuery, {
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      console.log("THE ONE TRUE TEST FUCK", data);
      /**
       * Call setPosts to concat the new set of posts to existing one and update pageInfo
       * that contains the cursor and the information about whether we have the next page.
       */
      setPosts(data?.productBrands ?? []);
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
  const loadMoreItems = (endCursor = null) => {
    let queryVariables = {
      first: PER_PAGE_FIRST_BRAND,
      after: PER_PAGE_FIRST_BRAND,
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
  const p = { nodes: postsData };
  console.warn("YTEST", postsData);

  return (
    <div className={classes}>
      <Brands data={postsData} />
      {hasNextPage ? (
        <div className="w-full flex justify-center lg:my-10">
          {loading ? (
            <div className="flex justify-center w-full border border-white px-3 py-2 my-8">
              Loading...
            </div>
          ) : (
            <button
              className="flex items-center cursor-pointer	bg-gray-100 hover:bg-gray-600 hover:text-white transition-colors duration-500 border border-gray-500 px-4 py-3"
              onClick={() => loadMoreItems(endCursor)}
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

LoadMoreBrands.propTypes = {
  brands: PropTypes.object,
  classes: PropTypes.string,
  graphQLQuery: PropTypes.object,
  searchQuery: PropTypes.string,
};

LoadMoreBrands.defaultProps = {
  brands: {},
  classes: "",
  graphQLQuery: GET_PAGE,
  searchQuery: "",
};

export default LoadMoreBrands;
