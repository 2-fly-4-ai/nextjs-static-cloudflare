import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import PropTypes from "prop-types";
import { isEmpty } from "lodash";
import Product from "../products";
import { PER_PAGE_FIRST } from "../../../utils/pagination";
import { GET_LOAD_MORE_PRODUCTS } from "../../../queries/categories-new/get-load-more-products";

const LoadMorePosts = ({ product, classes, graphQLQuery, searchQuery, slug }) => {
  console.log(product, slug);
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
      setPosts(data?.page?.nodes?.filter(node => node.slug === slug)[0].products ?? []);
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
  const loadMoreItems = (product, endCursor) => {
    let queryVariables = {
      first: PER_PAGE_FIRST, //first: PER_PAGE_FIRST,
      after: endCursor,
      uri: product?.uri,
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

  const p = {nodes: postsData};

  return (
    <div className={classes}>
      <Product product={ p } />

      {hasNextPage ? (
        <div className="w-full flex justify-center lg:mb-10">
          {loading ? (
            <div className="flex justify-center w-full border border-white px-4 py-3">
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

LoadMorePosts.propTypes = {
  product: PropTypes.object,
  classes: PropTypes.string,
  graphQLQuery: PropTypes.object,
  searchQuery: PropTypes.string,
};

LoadMorePosts.defaultProps = {
  product: {},
  classes: "",
  graphQLQuery: GET_LOAD_MORE_PRODUCTS,
  searchQuery: "",
};

export default LoadMorePosts;
