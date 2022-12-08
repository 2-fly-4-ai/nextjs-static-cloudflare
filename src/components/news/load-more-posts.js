import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import PropTypes from "prop-types";
import { isEmpty } from "lodash";

import Posts from "../blog/posts";
import { PER_PAGE_FIRST } from "../../utils/pagination";
import { GET_LOAD_MORE_NEWS } from "../../queries/news/get-load-more-news";

const LoadMorePosts = ({ posts, classes, graphQLQuery, searchQuery }) => {
  /**
   * First set the posts data and pageInfo received from server side,
   * as initial postsData and pageInfo, so that
   * it sever side posts can be fetched, and the new endcursor( contained in pageInfo )
   * can be sent to get the next set of posts.
   */
  const [postsData, setPostsData] = useState(posts?.edges ?? []);
  const [pageInfo, setPageInfo] = useState(posts?.pageInfo);

  const [error, setError] = useState(null);

  /**
   * If value of 'posts' passed to this component changes, set new post data and page info.
   */
  useEffect(() => {
    setPostsData(posts?.edges);
    setPageInfo(posts?.pageInfo);
  }, [posts?.edges]);

  /**
   * Set posts.
   *
   * @param {Object} posts Posts.
   *
   * @return {void}
   */
  const setPosts = (posts) => {
    if (!posts || !posts?.edges || !posts?.pageInfo) {
      return;
    }

    /**
     * Concat the newly received post from client request to the existing posts, using setPostsData()
     * and also set the new pageInfo that contains the new endcursor, so that
     * when user clicks on loadmore again, next set of posts can be fetched again.
     * Same process if repeated to it gets concatenated everytime to the existing posts array.
     */
    const newPosts = postsData.concat(posts?.edges);
    setPostsData(newPosts);
    setPageInfo({ ...posts?.pageInfo });
  };

  const [fetchPosts, { loading }] = useLazyQuery(graphQLQuery, {
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      /**
       * Call setPosts to concat the new set of posts to existing one and update pageInfo
       * that contains the cursor and the information about whether we have the next page.
       */
      setPosts(data?.posts ?? []);
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
      first: PER_PAGE_FIRST,
      after: endCursor,
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

  return (
    <div className={classes}>
      <Posts posts={postsData} />
      {hasNextPage ? (
        <div className="w-full flex justify-center mb-10">
          {loading ? (
            <div className="py-2.5 uppercase px-7 mr-2 text-sm font-medium text-gray-700 bg-white rounded-full border-4 border-gray-200 hover:bg-gray-100 hover:text-blue-700  focus:outline-none  dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center">
              Loading...
            </div>
          ) : (
            <button
              className="py-2.5 uppercase px-7 mr-2 text-sm font-medium text-gray-700 bg-white rounded-full border-4 border-gray-200 hover:bg-gray-100 hover:text-blue-700  focus:outline-none  dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
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

LoadMorePosts.propTypes = {
  posts: PropTypes.object,
  classes: PropTypes.string,
  graphQLQuery: PropTypes.object,
  searchQuery: PropTypes.string,
};

LoadMorePosts.defaultProps = {
  posts: {},
  classes: "",
  graphQLQuery: GET_LOAD_MORE_NEWS,
  searchQuery: "",
};

export default LoadMorePosts;
