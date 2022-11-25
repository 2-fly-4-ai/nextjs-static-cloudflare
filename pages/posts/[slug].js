import Image from "next/image"
import { Markup } from "interweave";

export default function Post(data) {
  console.log({ data })

  const posts = data.posts
  const featuredImage = posts.featuredImage;


  return (
    <div>
      <h1 className="m-4 ml-8 text-xl tracking-tight font-extrabold text-black lg:text-6xl dark:text-white">{posts.title}</h1>
      {featuredImage
        ? <Image width="640" height="640" src={posts.featuredImage.node.sourceUrl} />
        : <Image width="640" height="640" src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" />
      }
      <article dangerouslySetInnerHTML={{ __html: posts.content }}></article>
    </div>
  )
}

export async function getStaticProps(context) {

  const res = await fetch("https://staging-petsmarketplace-staging.kinsta.cloud/graphql", {
    method: 'POST',
    headers: { "Content-Type": 'application/json' },
    body: JSON.stringify({
      query: `
        query SinglePost($id: ID!, $idType: PostIdType!) {
            post(id: $id, idType: $idType) {
              title
              slug
              content
              featuredImage {
                node {
                  sourceUrl
                }
              }
            }
          }
        `,
      variables: {
        id: context.params.slug,
        idType: "SLUG"
      }
    })
  })

  const json = await res.json()

  return {
    props: {
      posts: json.data.post,
    },
  }

}
// Tells next to build posts
export async function getStaticPaths() {
  const res = await fetch("https://staging-petsmarketplace-staging.kinsta.cloud/graphql", {
    method: 'POST',
    headers: { "Content-Type": 'application/json' },
    body: JSON.stringify({
      query: `
        query AllPostsQuery {
          posts {
            nodes {
              content
              slug
              title
            }
          }
        }
        `
    })
  })

  const json = await res.json()
  const posts = json.data.posts.nodes;
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }))

  // console.log(paths)
  return { paths, fallback: false }

}

