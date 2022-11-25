
import Link from 'next/link';
import Image from '../../image';
import { sanitize } from '../../../utils/miscellaneous';

const Post = ({ post }) => {

	return (
		<div className="mb-8">

			<Link href={`/blog/${post?.slug}/`}>
				<a>
					<h2 className="font-bold mb-3 text-lg hover:text-blue-500" dangerouslySetInnerHTML={{ __html: sanitize(post?.title ?? '') }} />
				</a>
			</Link>
			<div dangerouslySetInnerHTML={{ __html: sanitize(post?.excerpt ?? '') }} />
		</div>
	);
};

export default Post;
