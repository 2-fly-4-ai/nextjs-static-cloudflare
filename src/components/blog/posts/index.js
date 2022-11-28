import { isEmpty, isArray } from "lodash";
import Post from "../post";
import PropTypes from "prop-types";

const Posts = ({ posts }) => {
  if (isEmpty(posts) && !isArray(posts)) {
    return null;
  }

  return (
    <section className="bg-white dark:bg-gray-900 max-w-screen-2xl mx-auto px-6 ">
      <div className="py-4 px-0  mx-auto max-w-screen-2xl sm:py-16 lg:px-0">
        <div className="grid gap-8   lg:grid-cols-3">
          {posts.map((post, index) => {
            return (
              <div key={`${post?.node?.id}-${index}` ?? ""} className="w-96">
                <Post post={post?.node} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

Posts.propTypes = {
  posts: PropTypes.array,
};

Posts.defaultProps = {
  posts: [],
};

export default Posts;
