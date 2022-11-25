import Link from 'next/link';
import client from '../src/apollo/client';
import Header from '../src/components/layout/header';
import Footer from '../src/components/layout/footer';
import { GET_MENUS } from '../src/queries/get-menus';

function Error404({ data }) {
    console.warn({ data })
    const { header, footer, headerMenus, footerMenus1, footerMenus2, footerMenus3 } = data || {};

    return (
        <>
            <Header header={header} headerMenus={headerMenus?.edges} />
            <section className="bg-gray-50 dark:bg-gray-900 min-h-almost-screen flex">
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 flex flex-col justify-center">
                    <div className="mx-auto max-w-screen-sm text-center">
                        <h1 className="mb-4 text-4xl tracking-tight font-extrabold text-primary-600">404 Not Found</h1>
                        <p className="mb-8 font-medium text-gray-500 sm:text-2xl dark:text-gray-400">Whoops! That page doesn’t exist.</p>
                        <form action="#" method="post">
                            <div className="items-center mx-auto mb-3 space-y-4 max-w-screen-sm sm:flex sm:space-y-0">
                                <div className="relative mr-3 w-full">
                                    <label htmlFor="member_email" className="hidden mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Email address</label>
                                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                        <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                                    </div>
                                    <input className="block p-3 pl-10 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="e.g. Flowbite, components" type="email" id="member_email" required="" />
                                </div>
                                <div>
                                    <button type="submit" className="py-3 px-5 w-full text-sm font-medium text-center text-white rounded-lg cursor-pointer bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="grid gap-6 mt-8 lg:mt-12 sm:grid-cols-2 lg:grid-cols-4">
                        <a href="#" className="p-6 text-center bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700 hover:shadow-lg">
                            <div className="flex justify-center items-center mx-auto mb-4 w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900 lg:h-12 lg:w-12">
                                <svg className="w-5 h-5 text-primary-600 dark:text-primary-400 lg:w-6 lg:h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                            </div>
                            <h3 className="mb-2 text-lg font-semibold tracking-tight text-gray-500 dark:text-gray-400">Homepage</h3>
                        </a>
                        <a href="#" className="p-6 text-center bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700 hover:shadow-lg">
                            <div className="flex justify-center items-center mx-auto mb-4 w-10 h-10 bg-teal-100 rounded-lg dark:bg-teal-900 lg:h-12 lg:w-12">
                                <svg className="w-5 h-5 text-teal-600 lg:w-6 lg:h-6 dark:text-teal-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z"></path></svg>
                            </div>
                            <h3 className="mb-2 text-lg font-semibold tracking-tight text-gray-500 dark:text-gray-400">Library</h3>
                        </a>
                        <a href="#" className="p-6 text-center bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700 hover:shadow-lg">
                            <div className="flex justify-center items-center mx-auto mb-4 w-10 h-10 bg-purple-100 rounded-lg dark:bg-purple-900 lg:h-12 lg:w-12">
                                <svg className="w-5 h-5 text-purple-600 dark:text-purple-400 lg:w-6 lg:h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"></path></svg>
                            </div>
                            <h3 className="mb-2 text-lg font-semibold tracking-tight text-gray-500 dark:text-gray-400">Knowledge Center</h3>
                        </a>
                        <a href="#" className="p-6 text-center bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700 hover:shadow-lg">
                            <div className="flex justify-center items-center mx-auto mb-4 w-10 h-10 bg-green-100 rounded-lg dark:bg-green-900 lg:h-12 lg:w-12">
                                <svg className="w-5 h-5 text-green-600 dark:text-green-400 lg:w-6 lg:h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd"></path><path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"></path></svg>
                            </div>
                            <h3 className="mb-2 text-lg font-semibold tracking-tight text-gray-500 dark:text-gray-400">Blog</h3>
                        </a>
                    </div>
                </div>
            </section>
            <Footer footer={footer} footerMenus1={footerMenus1?.edges} footerMenus2={footerMenus2?.edges} footerMenus3={footerMenus3?.edges} footerMenus4={footerMenus3?.edges} />
        </>
    );
}

export default Error404;

export async function getStaticProps() {

    const { data } = await client.query({
        query: GET_MENUS,
    });


    return {
        props: {
            data: data || {}
        },
    };
}