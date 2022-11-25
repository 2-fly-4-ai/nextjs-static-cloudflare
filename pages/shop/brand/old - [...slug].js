import client from '../../../src/apollo/client';
import { GET_PAGES_URI } from '../../../src/queries/brand/get-pages';
import { isEmpty, slice } from 'lodash';
import { GET_PAGE } from '../../../src/queries/brand/get-page';
import { useRouter } from 'next/router';
import Layout from '../../../src/components/layout';
import { FALLBACK, handleRedirectsAndReturnData, isCustomPageUri } from '../../../src/utils/slug';
import { sanitize } from '../../../src/utils/miscellaneous';

const Page = ({ data }) => {
	console.warn(data)
	const router = useRouter();

	// If the page is not yet generated, this will be displayed
	// initially until getStaticProps() finishes running
	if (router.isFallback) {
		return <div>Loading...</div>;
	}

	return (
		<Layout data={data}>
			<section className="bg-white dark:bg-gray-900">
				<div className='py-16 border-b flex'>
					<div>
						<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Original_Adidas_logo.svg/2077px-Original_Adidas_logo.svg.png" className='w-56' />

					</div>
					<div>

					</div>



				</div>

				<div className="py-8 px-4 mx-auto max-w-screen-2xl text-center lg:py-0 lg:px-5 flex bg-gray-50">



					<div className="w-56 mb-5 flex-none border-r">
						TEST

					</div>



					<div className="flex-1 flex-col px-3 bg-gray-50">
						<div className="h-10 flex rounded-lg">
							<p className="text-gray-400 p-1 ml-1 text-lg font-medium">RESULTS</p>


						</div>

						{/* PRODUCT BOX */}
						<div className="flex-1">
							<div className="grid gap-4 p-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

								{/* Number 1 */}
								<div className="p-0 pb-3 max-w-sm bg-white rounded-none  dark:bg-gray-800 dark:border-gray-700">
									<a href="#">
										<div className="h-72 flex flex-col bg-white">
											<img src="https://m.media-amazon.com/images/I/61mDBGHFcxL.__AC_SX300_SY300_QL70_FMwebp_.jpg" className="m-auto max-h-72" />
										</div>
										<h5 className="py-3 text-xl px-2 tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
									</a>

								</div>


								{/* Number 2 */}
								<div className="p-0 pb-3 max-w-sm bg-white rounded-none  dark:bg-gray-800 dark:border-gray-700">
									<a href="#">
										<div className="h-72 flex flex-col bg-white">
											<img src="https://m.media-amazon.com/images/I/61mDBGHFcxL.__AC_SX300_SY300_QL70_FMwebp_.jpg" className="m-auto max-h-72" />
										</div>
										<h5 className="py-3 text-xl px-2 tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
									</a>

								</div>


								{/* number 3 */}
								<div className="p-0 pb-3 max-w-sm bg-white rounded-none  dark:bg-gray-800 dark:border-gray-700">
									<a href="#">
										<div className="h-72 flex flex-col bg-white">
											<img src="https://m.media-amazon.com/images/I/712OyBPPL0L._AC_SX679_.jpg" className="m-auto max-h-72" />
										</div>
										<h5 className="py-3 text-xl px-2 tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
									</a>

								</div>

								{/* number 3 */}
								<div className="p-0 pb-3 max-w-sm bg-white rounded-none  dark:bg-gray-800 dark:border-gray-700">
									<a href="#">
										<div className="h-72 flex flex-col bg-white">
											<img src="https://m.media-amazon.com/images/I/61j6ey6mBpL._AC_SX679_.jpg" className="m-auto max-h-72" />
										</div>
										<h5 className="py-3 text-xl px-2 tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
									</a>

								</div>

								{/* number 4 */}
								<div className="p-0 pb-3 max-w-sm bg-white rounded-none  dark:bg-gray-800 dark:border-gray-700">
									<a href="#">
										<div className="h-72 flex flex-col bg-white">
											<img src="https://m.media-amazon.com/images/I/71wXQyxCENL.__AC_SX300_SY300_QL70_FMwebp_.jpg" className="m-auto max-h-72" />
										</div>
										<h5 className="py-3 text-xl px-2 tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
									</a>

								</div>

								{/* number 5*/}
								<div className="p-0 pb-3 max-w-sm bg-white rounded-none  dark:bg-gray-800 dark:border-gray-700">
									<a href="#">
										<div className="h-72 flex flex-col bg-white">
											<img src="https://m.media-amazon.com/images/I/71+jTaVbHxL._AC_UY327_FMwebp_QL65_.jpg" className="m-auto max-h-72" />
										</div>
										<h5 className="py-3 text-xl px-2 tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
									</a>

								</div>

								{/* number 6 */}
								<div className="p-0 pb-3 max-w-sm bg-white rounded-none  dark:bg-gray-800 dark:border-gray-700">
									<a href="#">
										<div className="h-72 flex flex-col bg-white">
											<img src="https://m.media-amazon.com/images/I/61+iCbVTWcS._AC_UY327_FMwebp_QL65_.jpg" className="m-auto max-h-72" />
										</div>
										<h5 className="py-3 text-xl px-2 tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
									</a>

								</div>

								{/* number 7 */}
								<div className="p-0 pb-3 max-w-sm bg-white rounded-none  dark:bg-gray-800 dark:border-gray-700">
									<a href="#">
										<div className="h-72 flex flex-col bg-white">
											<img src="https://m.media-amazon.com/images/I/51CSzjwiYyL._AC_UY327_FMwebp_QL65_.jpg" className="m-auto max-h-72" />
										</div>
										<h5 className="py-3 text-xl px-2 tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
									</a>

								</div>



							</div>


						</div>

					</div>


				</div>
			</section>
		</Layout>
	);
};

export default Page;

export async function getStaticProps({ params }) {
	const { data, errors } = await client.query({
		query: GET_PAGE,
		variables: {
			uri: params?.slug.join('/'),
		},
	});
	console.warn("XXXXXXXXXXXXXXXXXXXXX", params?.slug.join('/'))

	const defaultProps = {
		props: {
			data: data || {}
		},
		/**
		 * Revalidate means that if a new request comes to server, then every 1 sec it will check
		 * if the data is changed, if it is changed then it will update the
		 * static file inside .next folder with the new data, so that any 'SUBSEQUENT' requests should have updated data.
		 */
		revalidate: 1,
	};

	return handleRedirectsAndReturnData(defaultProps, data, errors, 'page');
}

/**
 * Since the page name uses catch-all routes,
 * for example [...slug],
 * that's why params would contain slug which is an array.
 * For example, If we need to have dynamic route '/foo/bar'
 * Then we would add paths: [ params: { slug: ['foo', 'bar'] } } ]
 * Here slug will be an array is ['foo', 'bar'], then Next.js will statically generate the page at /foo/bar
 *
 * At build time next js will will make an api call get the data and
 * generate a page bar.js inside .next/foo directory, so when the page is served on browser
 * data is already present, unlike getInitialProps which gets the page at build time but makes an api
 * call after page is served on the browser.
 *
 * @see https://nextjs.org/docs/basic-features/data-fetching#the-paths-key-required
 *
 * @returns {Promise<{paths: [], fallback: boolean}>}
 */
export async function getStaticPaths() {
	const { data } = await client.query({
		query: GET_PAGES_URI
	});

	const pathsData = [];

	data?.pages?.nodes && data?.pages?.nodes.map(page => {
		if (!isEmpty(page?.uri) && !isCustomPageUri(page?.uri)) {
			const slugs = page?.uri?.split('/').filter(pageSlug => pageSlug);
			pathsData.push({ params: { slug: slugs } });
		}
	});
	return {
		paths: pathsData,
		fallback: FALLBACK
	};
}