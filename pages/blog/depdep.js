import client from "../../src/apollo/client";
import Layout from "../../src/components/layout";
import { PER_PAGE_FIRST } from "../../src/utils/pagination";
import { handleRedirectsAndReturnData } from "../../src/utils/slug";
import { GET_NEWS } from "../../src/queries/news/get-news";
import LoadMorePosts from "../../src/components/news/load-more-posts";

//This is an example of loadmore being used. But not on a catch all route. Doesn't really do what I need and I am unable to deconstruct this code into something useful.
//Also do not like the way evey little piece has been made into seperate component. Seperate posts component, seperate post component.

const Posts = ({ data }) => {
  return (
    <Layout data={data}>
      <LoadMorePosts posts={data?.posts} />
    </Layout>
  );
};

export default Posts;

export async function getStaticProps() {
  const { data, errors } = await client.query({
    query: GET_NEWS,
    variables: {
      uri: "/blog/",
      first: PER_PAGE_FIRST,
      after: null,
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

  return handleRedirectsAndReturnData(defaultProps, data, errors, "posts");
}
