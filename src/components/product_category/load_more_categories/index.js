import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import PropTypes from "prop-types";
import { isEmpty } from "lodash";
import Product from "../products";
import { PER_PAGE_FIRST } from "../../../utils/pagination";
import { GET_PAGE } from "../../../queries/categories-new/get-load-more-products_children";

const LoadMorePosts = ({ data, classes, graphQLQuery, searchQuery, slug }) => {
  let product_list = [];
  //REQUESTED_FEATURES = SHOULD ADD MORE TAGS AS I LOAD MORE PRODUCTS
  // Product Tags - For display purposes

  ////REQUESTED_FEATURES = LOAD MORE BUTTON SHOULD ALSO CONSIDER THESE. FOR PARENT PAGES THIS IS WHERE THE PRODUCTS ARE ACCESSED FROM AND THE LOADMORE NEEDS TO TAKE THAT INTO ACCOUNT.
  //Child Component For Finding Products in Child Categories
  function readChildren(child) {
    {
      !isEmpty(child?.children?.nodes)
        ? child?.children?.nodes.map((child) => {
            readChildren(child);
          })
        : child?.products.map((product) => {
            product_list.push(product);
          });
    }
  }

  {
    !isEmpty(data?.page?.nodes[0]?.children?.nodes)
      ? data?.page?.nodes[0]?.children?.nodes.map((child) => {
          readChildren(child);
        })
      : data?.page?.nodes[0]?.products?.nodes.map((product) => {
          product_list.push(product);
          // Brand Tags- For display & Search Volume logic need to covert to a loadMore Brands Component
          // Kill all page creation for brand tags under 200SV
        });
  }

  //REMOVAL OF DUPLICATE TAGS/BRANDS/PRODUCTS. SINCE using Recursive Function seem to have duplicate products appearing.

  //THE RECURSIVE FUNCTION SEEMS TO CREATE DUPLICATES
  product_list = product_list.filter(
    (v, i, a) =>
      a.findIndex((t) => JSON.stringify(t) === JSON.stringify(v)) === i
  );

  /**
   * First set the posts data and pageInfo received from server side,
   * as initial postsData and pageInfo, so that
   * it sever side posts can be fetched, and the new endcursor( contained in pageInfo )
   * can be sent to get the next set of posts.
   */

  console.warn("TEST1", product);
  const [postsData, setPostsData] = useState(product?.nodes ?? []);
  const [pageInfo, setPageInfo] = useState(product?.pageInfo);
  const [error, setError] = useState(null);
  /**
   * If value of 'posts' passed to this component changes, set new post data and page info.
   */
  useEffect(() => {
    setPostsData(product?.nodes);
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
      console.warn("YEEZUS", data);
      /**
       * Call setPosts to concat the new set of posts to existing one and update pageInfo
       * that contains the cursor and the information about whether we have the next page.
       */
      setPosts(data?.page?.nodes[0].products ?? []);
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
    console.warn("SLUGGGGGGGGGGG", slug);
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
  console.warn("HELLO", endCursor);

  const p = { nodes: postsData };

  return (
    <div className={classes}>
      <Product product={p} />

      {hasNextPage ? (
        <div className="w-full flex justify-center lg:mb-10">
          {loading ? (
            <div className="flex justify-center w-full border border-white px-4 py-3">
              Loading...
            </div>
          ) : (
            <button
              className="flex items-center cursor-pointer	bg-gray-100 hover:bg-gray-600 hover:text-white transition-colors duration-500 border border-gray-500 px-4 py-3"
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
