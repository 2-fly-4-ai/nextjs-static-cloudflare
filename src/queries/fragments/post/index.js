const PostFragment = `
 fragment PostFragment on Post {
  id
  title
  excerpt
  content
  slug
  featuredImage {
    node {
      ...ImageFragment
    }
  }
 }
`;
export default PostFragment;
