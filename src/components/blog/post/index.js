import Link from "next/link";
import Image from "../../image";
import { sanitize } from "../../../utils/miscellaneous";
import { isEmpty } from "lodash";

const Post = ({ post }) => {
  console.log({ post });
  return (
    <div className="mb-8 ">
      {/* <div>
        {!isEmpty(post?.single_product_acf?.productImageMainUrl) ? (
          <Image
            src={post?.single_product_acf?.productImageMainUrl}
            height="256"
            width="256"
            objectFit="contain"
          />
        ) : null}
      </div> */}
      <Link href={`blog/${post?.slug}`}>
        <a>
          <h2
            className="my-1 text-2xl  tracking-tight text-gray-900 dark:text-white hover:text-blue-700"
            dangerouslySetInnerHTML={{ __html: sanitize(post?.title ?? "") }}
          />
        </a>
      </Link>
      <div
        className="mb-4  text-gray-700 dark:text-gray-400 prose prose-a:text-blue-600"
        dangerouslySetInnerHTML={{ __html: sanitize(post?.excerpt ?? "") }}
      />
    </div>
  );
};

export default Post;
