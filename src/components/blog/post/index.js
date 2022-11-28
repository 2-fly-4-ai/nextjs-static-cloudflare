import Link from "next/link";
import Image from "../../image";
import { sanitize } from "../../../utils/miscellaneous";

const Post = ({ post }) => {
  console.warn({ post });

  return (
    <div className="mb-8 ">
      <Link href={`/blog/${post?.slug}/`}>
        <a>
          <h2
            className="my-1 text-2xl  tracking-tight text-gray-900 dark:text-white"
            dangerouslySetInnerHTML={{ __html: sanitize(post?.title ?? "") }}
          />
        </a>
      </Link>
      <div
        className="mb-4  text-gray-700 dark:text-gray-400 prose"
        dangerouslySetInnerHTML={{ __html: sanitize(post?.excerpt ?? "") }}
      />
    </div>
  );
};

export default Post;
