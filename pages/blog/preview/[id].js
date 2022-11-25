import client from '../../../src/apollo/client';
import { GET_PAGE_BY_ID} from '../../../src/queries/pages/get-page';
import Layout from '../../../src/components/layout';
import {handleRedirectsAndReturnData} from '../../../src/utils/slug';
import {getAuthToken} from '../../../src/utils/cookies';
import {getLoginPreviewRedirectUrl} from '../../../src/utils/redirects';
import {GET_POST_BY_ID} from '../../../src/queries/posts/get-post';
import {sanitize} from '../../../src/utils/miscellaneous';

const PostPreview = ( { data } ) => {
	return (
		<Layout data={data} isPost>


			<main className="pb-16 lg:pb-24 bg-white dark:bg-gray-900 px-4">


				<div className="flex relative z-20 justify-between px-4 mx-auto max-w-screen-xl bg-white dark:bg-gray-900 rounded">

					<article className="xl:w-[828px] w-full max-w-none htmlFormat htmlFormat-sm sm:format-base lg:format-lg htmlFormat-blue dark:format-invert">
						<header className="py-12">
							<div className="px-4 mx-auto w-full max-w-screen-xl text-center">
								<span className="block mb-4 font-semibold text-gray-900 dark:text-white">Published <time className="font-normal text-gray-500 dark:text-gray-400" dateTime="2022-03-08" title="August 3rd, 2022">August 3, 2022, 2:20am EDT</time></span>
								<h1 className="mx-auto mb-4 max-w-2xl text-2xl dark:text-white font-extrabold leading-none text-gray-900 sm:text-3xl lg:text-4xl">Flowbite Blocks Tutorial - Learn how to get started with custom sections using the Flowbite Blocks</h1>
								<p className="text-lg font-normal text-gray-500 dark:text-gray-400">Before going digital, you might scribbling down some ideas in a sketchbook.</p>
							</div>
						</header>
						<div className="flex flex-col lg:flex-row justify-between lg:items-center py-6 border-t border-b border-gray-200 dark:border-gray-700">
							<span className="text-base mb-4 lg:mb-0 font-normal text-gray-500 dark:text-gray-400">By <a href="#" rel="author" className="font-bold text-gray-900 dark:text-white no-underline hover:underline">Jese Leos</a> in <a href="#" className="font-normal text-gray-500 dark:text-gray-400 no-underline hover:underline">World News</a></span>
							<aside aria-label="Share social media">
								<a href="#"
									className="inline-flex items-center py-2 px-6 mr-2 text-xs font-medium text-gray-900 no-underline bg-white rounded-lg border border-gray-200 focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"><svg
										className="mr-2 w-4 h-4" fill="currentColor" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 512 512">
										<path
											d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
									</svg> Share</a>
								<a href="#"
									className="inline-flex items-center py-2 px-6 mr-2 text-xs font-medium text-gray-900 no-underline bg-white rounded-lg border border-gray-200 focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"><svg
										className="mr-2 w-4 h-4" fill="currentColor" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 512 512">
										<path
											d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
									</svg> Tweet</a>
								<button type="button"
									className="inline-flex items-center py-2 px-6 text-xs font-medium text-gray-900 no-underline bg-white rounded-lg border border-gray-200 focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"><svg
										className="mr-2 w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg">
										<path fillRule="evenodd"
											d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
											clipRule="evenodd"></path>
									</svg> Copy link</button>
							</aside>
						</div>
						<div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: sanitize(data?.post?.content ?? {}) }} />
						<div className="flex justify-between items-center py-6 border-t border-b border-gray-200 dark:border-gray-700">
							<aside aria-label="Share social media">
								<a href="#"
									className="inline-flex items-center py-2 px-6 mr-2 text-xs font-medium text-gray-900 no-underline bg-white rounded-lg border border-gray-200 focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"><svg
										className="mr-2 w-4 h-4" fill="currentColor" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 512 512">
										<path
											d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
									</svg> Share</a>
								<a href="#"
									className="inline-flex items-center py-2 px-6 mr-2 text-xs font-medium text-gray-900 no-underline bg-white rounded-lg border border-gray-200 focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"><svg
										className="mr-2 w-4 h-4" fill="currentColor" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 512 512">
										<path
											d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
									</svg> Tweet</a>
								<button type="button"
									className="inline-flex items-center py-2 px-6 text-xs font-medium text-gray-900 no-underline bg-white rounded-lg border border-gray-200 focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"><svg
										className="mr-2 w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg">
										<path fillRule="evenodd"
											d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
											clipRule="evenodd"></path>
									</svg> Copy link</button>
							</aside>
							<div className="not-format">
								<button data-tooltip-target="tooltip-save" className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-gray-400 focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600" type="button">
									<svg className="w-6 h-6" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg>
								</button>
								<div id="tooltip-save" role="tooltip" className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
									Save this article
									<div className="tooltip-arrow" data-popper-arrow></div>
								</div>
								<button id="dropdownMenuIconHorizontalButton" data-dropdown-toggle="dropdownDotsHorizontal" className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-gray-400 focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600" type="button">
									<svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path></svg>
								</button>

								<div id="dropdownDotsHorizontal" className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
									<ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconHorizontalButton">
										<li>
											<a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Mute this author</a>
										</li>
										<li>
											<a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
						<section className="mt-8 not-format">
							<div className="flex justify-between items-center mb-6">
								<h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Discussion (20)</h2>
								<div>
									<button type="button"
										className="py-2 px-3 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Subscribe</button>
								</div>
							</div>
							<form className="mb-6">
								<div
									className="mb-4 w-full bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-700">
									<div className="py-2 px-4 bg-gray-50 rounded-t-lg dark:bg-gray-800">
										<label htmlFor="comment" className="sr-only">Your comment</label>
										<textarea id="comment" rows="6"
											className="px-0 w-full text-sm text-gray-900 bg-gray-50 border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
											placeholder="Write a comment..." required></textarea>
									</div>
									<div className="flex justify-between items-center py-2 px-3 border-t dark:border-gray-600">
										<button type="submit"
											className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
											Post comment
										</button>
										<div className="flex pl-0 space-x-1 sm:pl-2">
											<button type="button"
												className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
												<svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
													xmlns="http://www.w3.org/2000/svg">
													<path fillRule="evenodd"
														d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
														clipRule="evenodd"></path>
												</svg>
												<span className="sr-only">Attach file</span>
											</button>
											<button type="button"
												className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
												<svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
													xmlns="http://www.w3.org/2000/svg">
													<path fillRule="evenodd"
														d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
														clipRule="evenodd"></path>
												</svg>
												<span className="sr-only">Set location</span>
											</button>
											<button type="button"
												className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
												<svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
													xmlns="http://www.w3.org/2000/svg">
													<path fillRule="evenodd"
														d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
														clipRule="evenodd"></path>
												</svg>
												<span className="sr-only">Upload image</span>
											</button>
										</div>
									</div>
								</div>
							</form>
							<article className="p-6 mb-6 text-base bg-gray-50 rounded-lg dark:bg-gray-800">
								<footer className="flex justify-between items-center mb-2">
									<div className="flex items-center">
										<p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white"><img
											className="mr-2 w-6 h-6 rounded-full"
											src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
											alt="Michael Gough" />Michael Gough</p>
										<p className="text-sm text-gray-600 dark:text-gray-400"><time dateTime="2022-02-08"
											title="February 8th, 2022">Feb. 8, 2022</time></p>
									</div>
									<button id="dropdownComment1Button" data-dropdown-toggle="dropdownComment1"
										className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-gray-50 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
										type="button">
										<svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg">
											<path
												d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z">
											</path>
										</svg>
										<span className="sr-only">Comment settings</span>
									</button>

									<div id="dropdownComment1"
										className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
										<ul className="py-1 text-sm text-gray-700 dark:text-gray-200"
											aria-labelledby="dropdownMenuIconHorizontalButton">
											<li>
												<a href="#"
													className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
											</li>
											<li>
												<a href="#"
													className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
											</li>
											<li>
												<a href="#"
													className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
											</li>
										</ul>
									</div>
								</footer>
								<p className="text-gray-500 dark:text-gray-400">Very straight-to-point article. Really worth time reading. Thank you! But tools are just the
									instrumentshtmlForthe UX designers. The knowledge of the design tools are as important as the
									creation of the design strategy.</p>
								<div className="flex items-center mt-4 space-x-4">
									<button type="button"
										className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400">
										<svg aria-hidden="true" className="mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg">
											<path fillRule="evenodd"
												d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
												clipRule="evenodd"></path>
										</svg>
										11 Likes
									</button>
									<button type="button"
										className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400">
										<svg aria-hidden="true" className="mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg">
											<path fillRule="evenodd"
												d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
												clipRule="evenodd"></path>
										</svg>
										Reply
									</button>
								</div>
							</article>
							<article className="p-6 mb-6 ml-12 text-base bg-gray-50 rounded-lg dark:bg-gray-800">
								<footer className="flex justify-between items-center mb-2">
									<div className="flex items-center">
										<p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white"><img
											className="mr-2 w-6 h-6 rounded-full"
											src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
											alt="Jese Leos" />Jese Leos</p>
										<p className="text-sm text-gray-600 dark:text-gray-400"><time dateTime="2022-02-12"
											title="February 12th, 2022">Feb. 12, 2022</time></p>
									</div>
									<button id="dropdownComment2Button" data-dropdown-toggle="dropdownComment2"
										className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-gray-50 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
										type="button">
										<svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg">
											<path
												d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z">
											</path>
										</svg>
										<span className="sr-only">Comment settings</span>
									</button>

									<div id="dropdownComment2"
										className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
										<ul className="py-1 text-sm text-gray-700 dark:text-gray-200"
											aria-labelledby="dropdownMenuIconHorizontalButton">
											<li>
												<a href="#"
													className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
											</li>
											<li>
												<a href="#"
													className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
											</li>
											<li>
												<a href="#"
													className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
											</li>
										</ul>
									</div>
								</footer>
								<p className="text-gray-500 dark:text-gray-400">Much appreciated! Glad you liked it ☺️</p>
								<div className="flex items-center mt-4 space-x-4">
									<button type="button"
										className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400">
										<svg aria-hidden="true" className="mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg">
											<path fillRule="evenodd"
												d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
												clipRule="evenodd"></path>
										</svg>
										3 Likes
									</button>
									<button type="button"
										className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400">
										<svg aria-hidden="true" className="mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg">
											<path fillRule="evenodd"
												d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
												clipRule="evenodd"></path>
										</svg>
										Reply
									</button>
								</div>
							</article>
							<article className="p-6 mb-6 text-base bg-gray-50 rounded-lg dark:bg-gray-800">
								<footer className="flex justify-between items-center mb-2">
									<div className="flex items-center">
										<p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white"><img
											className="mr-2 w-6 h-6 rounded-full"
											src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
											alt="Bonnie Green" />Bonnie Green</p>
										<p className="text-sm text-gray-600 dark:text-gray-400"><time dateTime="2022-03-12"
											title="March 12th, 2022">Mar. 12, 2022</time></p>
									</div>
									<button id="dropdownComment3Button" data-dropdown-toggle="dropdownComment3"
										className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-gray-50 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
										type="button">
										<svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg">
											<path
												d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z">
											</path>
										</svg>
										<span className="sr-only">Comment settings</span>
									</button>

									<div id="dropdownComment3"
										className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
										<ul className="py-1 text-sm text-gray-700 dark:text-gray-200"
											aria-labelledby="dropdownMenuIconHorizontalButton">
											<li>
												<a href="#"
													className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
											</li>
											<li>
												<a href="#"
													className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
											</li>
											<li>
												<a href="#"
													className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
											</li>
										</ul>
									</div>
								</footer>
								<p className="text-gray-500 dark:text-gray-400">The article covers the essentials, challenges, myths and stages the UX designer should consider while creating the design strategy.</p>
								<div className="flex items-center mt-4 space-x-4">
									<button type="button"
										className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400">
										<svg aria-hidden="true" className="mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg">
											<path fillRule="evenodd"
												d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
												clipRule="evenodd"></path>
										</svg>
										24 Likes
									</button>
									<button type="button"
										className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400">
										<svg aria-hidden="true" className="mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg">
											<path fillRule="evenodd"
												d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
												clipRule="evenodd"></path>
										</svg>
										Reply
									</button>
								</div>
							</article>
							<article className="p-6 text-base bg-gray-50 rounded-lg dark:bg-gray-800">
								<footer className="flex justify-between items-center mb-2">
									<div className="flex items-center">
										<p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white"><img
											className="mr-2 w-6 h-6 rounded-full"
											src="https://flowbite.com/docs/images/people/profile-picture-4.jpg"
											alt="Helene Engels" />Helene Engels</p>
										<p className="text-sm text-gray-600 dark:text-gray-400"><time dateTime="2022-06-23"
											title="June 23rd, 2022">Jun. 23, 2022</time></p>
									</div>
									<button id="dropdownComment4Button" data-dropdown-toggle="dropdownComment4"
										className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-gray-50 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
										type="button">
										<svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg">
											<path
												d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z">
											</path>
										</svg>
									</button>

									<div id="dropdownComment4"
										className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
										<ul className="py-1 text-sm text-gray-700 dark:text-gray-200"
											aria-labelledby="dropdownMenuIconHorizontalButton">
											<li>
												<a href="#"
													className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
											</li>
											<li>
												<a href="#"
													className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
											</li>
											<li>
												<a href="#"
													className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
											</li>
										</ul>
									</div>
								</footer>
								<p className="text-gray-500 dark:text-gray-400">ThankshtmlForsharing this. I do came from the Backend development and explored some of the tools to design my Side Projects.</p>
								<div className="flex items-center mt-4 space-x-4">
									<button type="button"
										className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400">
										<svg aria-hidden="true" className="mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg">
											<path fillRule="evenodd"
												d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
												clipRule="evenodd"></path>
										</svg>
										9 Likes
									</button>
									<button type="button"
										className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400">
										<svg aria-hidden="true" className="mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg">
											<path fillRule="evenodd"
												d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
												clipRule="evenodd"></path>
										</svg>
										Reply
									</button>
								</div>
							</article>
						</section>
					</article>
					<aside className="hidden xl:block" aria-labelledby="sidebar-label">
						<div className="xl:w-[336px] sticky top-6">
							<h3 id="sidebar-label" className="sr-only">Sidebar</h3>
							<div className="p-4 mb-6 rounded-lg border border-gray-200 dark:border-gray-700">
								<h4 className="mb-2 text-sm font-bold text-gray-900 dark:text-white uppercase">Flowbite News morning headlines</h4>
								<p className="mb-4 text-sm font-light text-gray-500 dark:text-gray-400">Get all the stories you need-to-know from the most powerful name in news delivered first thing every morning to your inbox</p>
								<form action="#">
									<label htmlFor="email-address-icon" className="sr-only">Your Email</label>
									<div className="relative mb-4">
										<div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
											<svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
										</div>
										<input required type="text" id="email-address-icon" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="name@company.com" />
									</div>
									<button type="submit" className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 text-center w-full">Subscribe</button>
								</form>
							</div>
							<div className="p-4 mb-6 rounded-lg border border-gray-200 dark:border-gray-700">
								<h4 className="mb-4 text-sm font-bold text-gray-900 dark:text-white uppercase">Latest news</h4>
								<div className="mb-6">
									<h5 className="mb-2 text-lg font-bold leading-tight text-gray-900 dark:text-white">Our first office</h5>
									<p className="mb-2 font-light text-gray-500 dark:text-gray-400">Over the past year, Volosoft has undergone many changes! After months of preparation.</p>
									<a href="#" className="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline">
										Read in 9 minutes
									</a>
								</div>
								<div className="mb-6">
									<h5 className="mb-2 text-lg font-bold leading-tight text-gray-900 dark:text-white">Enterprise Design tips</h5>
									<p className="mb-2 font-light text-gray-500 dark:text-gray-400">Over the past year, Volosoft has undergone many changes! After months of preparation.</p>
									<a href="#" className="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline">
										Read in 14 minutes
									</a>
								</div>
								<div className="mb-6">
									<h5 className="mb-2 text-lg font-bold leading-tight text-gray-900 dark:text-white">Our first project with React</h5>
									<p className="mb-2 font-light text-gray-500 dark:text-gray-400">Over the past year, Volosoft has undergone many changes! After months of preparation.</p>
									<a href="#" className="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline">
										Read in 4 minutes
									</a>
								</div>
							</div>
							<div>
								<div className="flex justify-center items-center mb-3 w-full h-48 bg-gray-100 rounded-lg dark:bg-gray-800">
									<svg aria-hidden="true" className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"></path></svg>
								</div>
								<p className="mb-2 text-sm font-light text-gray-500 dark:text-gray-400">Students and Teachers, save up to 60% on Flowbite Creative Cloud.</p>
								<p className="text-xs font-light text-gray-400 uppercase dark:text-gray-500">Ads placeholder</p>
							</div>
						</div>
					</aside>
				</div>
			</main>

			<aside aria-label="Related articles" className="py-8 lg:py-24 bg-gray-50 dark:bg-gray-800 px-4">
				<div className="px-4 mx-auto max-w-screen-xl">
					<h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">Read next</h2>
					<article className="flex mb-8">
						<a href="#" className="shrink-0">
							<img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/articles/image-1.png" className="mr-5 w-32 h-32 max-w-fullalign-middle rounded-full" alt="Image 1" />
						</a>
						<div className="flex flex-col justify-center">
							<h2 className="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
								<a href="#">Our first office</a>
							</h2>
							<p className="mb-2 font-light text-gray-500 dark:text-gray-400">Over the past year, Volosoft has undergone many changes! After months of preparation.</p>
							<a href="#" className="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline">
								Read in 2 minutes
							</a>
						</div>
					</article>
					<article className="flex mb-8">
						<a href="#" className="shrink-0">
							<img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/articles/image-2.png" className="mr-5 w-32 h-32 max-w-full align-middle rounded-full" alt="Image 2" />
						</a>
						<div className="flex flex-col justify-center">
							<h2 className="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
								<a href="#">Enterprise design tips</a>
							</h2>
							<p className="mb-2 font-light text-gray-500 dark:text-gray-400">Over the past year, Volosoft has undergone many changes! After months of preparation.</p>
							<a href="#" className="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline">
								Read in 12 minutes
							</a>
						</div>
					</article>
					<article className="flex">
						<a href="#" className="shrink-0">
							<img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/articles/image-3.png" className="mr-5 w-32 h-32 max-w-full align-middle rounded-full" alt="Image 3" />
						</a>
						<div className="flex flex-col justify-center">
							<h2 className="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
								<a href="#">We partnered up with Google</a>
							</h2>
							<p className="mb-2 font-light text-gray-500 dark:text-gray-400">Over the past year, Volosoft has undergone many changes! After months of preparation.</p>
							<a href="#" className="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline">
								Read in 8 minutes
							</a>
						</div>
					</article>
				</div>
			</aside>

			<section className="bg-white dark:bg-gray-900 px-4">
				<div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
					<div className="mx-auto max-w-screen-md sm:text-center">
						<h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">Sign uphtmlForour newsletter</h2>
						<p className="mx-auto mb-8 max-w-2xl font-light text-gray-500 md:mb-12 sm:text-xl dark:text-gray-400">Stay up to date with the roadmap progress, announcements and exclusive discounts feel free to sign up with your email.</p>
						<form action="#">
							<div className="items-center mx-auto mb-3 space-y-4 max-w-screen-sm sm:flex sm:space-y-0">
								<div className="relative w-full">
									<label htmlFor="email" className="hidden mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email address</label>
									<div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
										<svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
									</div>
									<input className="block p-3 pl-10 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 sm:rounded-none sm:rounded-l-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter your email" type="email" id="email" required="" />
								</div>
								<div>
									<button type="submit" className="py-3 px-5 w-full text-sm font-medium text-center text-white rounded-lg border cursor-pointer bg-primary-700 border-primary-600 sm:rounded-none sm:rounded-r-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Subscribe</button>
								</div>
							</div>
							<div className="mx-auto max-w-screen-sm text-sm text-left text-gray-500 newsletter-form-footer dark:text-gray-300">We care about the protection of your data. <a href="#" className="font-medium text-primary-600 dark:text-primary-500 hover:underline">Read our Privacy Policy</a>.</div>
						</form>
					</div>
				</div>
			</section>


		</Layout>
	);
};

export default PostPreview;

export async function getServerSideProps( context ) {

	const authToken = getAuthToken( context.req );

	const { params } = context || {};
	const { data, errors } = await client.query( {
		query: GET_POST_BY_ID,
		variables: {
			id: Number( params?.id ?? '' ),
		},
		context: {
			headers: {
				authorization: authToken ? `Bearer ${authToken}` : '',
			}
		}
	} );

	const defaultProps = {
		props: {
			data: data || {}
		}
	};

	const loginRedirectURL = getLoginPreviewRedirectUrl( 'post', params?.id ?? '' );

	return handleRedirectsAndReturnData( defaultProps, data, errors, 'post', true, loginRedirectURL );

}
