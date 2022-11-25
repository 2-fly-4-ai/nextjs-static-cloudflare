import { isEmpty, isArray } from 'lodash';
import { sanitize } from '../../../utils/miscellaneous';
import Link from 'next/link';
import { getIconComponentByName } from '../../../utils/icons-map';


const Footer = ({ footer, footerMenus1, footerMenus2, footerMenus3, footerMenus4 }) => {



	return (



		<footer className="bg-green-900 dark:bg-gray-800">
			<div className="p-4 py-6 mx-auto max-w-screen-xl md:p-8 lg:-10 ">
				<div className=" grid-cols-2 gap-8 lg:grid-cols-4 margin-auto justify-center flex">

					<div className="lg:mx-auto">
						<h2 className="mb-2 text-sm font-bold text-gray-100 uppercase dark:text-white">Footer1</h2>
						{!isEmpty(footerMenus1) && isArray(footerMenus1) ? (
							<ul >
								{footerMenus1.map(footerMenu => (
									<li key={footerMenu?.node?.id} className="text-gray-500 dark:text-gray-400">
										<Link href={footerMenu?.node?.path}>
											<a className='text-gray-100  '>
												{footerMenu?.node?.label}
											</a>
										</Link>
									</li>
								))}
							</ul>
						) : null}
					</div>

					<div className="lg:mx-auto">
						<h2 className="mb-2 text-sm font-bold text-gray-100 uppercase dark:text-white">Footer 2</h2>
						{!isEmpty(footerMenus2) && isArray(footerMenus2) ? (
							<ul>
								{footerMenus2.map(footerMenu => (
									<li key={footerMenu?.node?.id} className="text-gray-500 dark:text-gray-400">
										<Link href={footerMenu?.node?.path}>
											<a className='text-gray-100  '>
												{footerMenu?.node?.label}
											</a>
										</Link>
									</li>
								))}
							</ul>
						) : null}
					</div>
					<div className="lg:mx-auto">
						<h2 className="mb-2 text-sm font-bold text-gray-100 uppercase dark:text-white">Footer 3</h2>
						{!isEmpty(footerMenus3) && isArray(footerMenus3) ? (
							<ul>
								{footerMenus3.map(footerMenu => (
									<li key={footerMenu?.node?.id} className="text-gray-500 dark:text-gray-400">
										<Link href={footerMenu?.node?.path}>
											<a className='text-gray-100  '>
												{footerMenu?.node?.label}
											</a>
										</Link>
									</li>
								))}
							</ul>
						) : null}
					</div>
					<div className="lg:mx-auto">
						<h2 className="mb-2 text-sm font-bold text-gray-100 uppercase dark:text-white">Footer 4</h2>
						{!isEmpty(footerMenus4) && isArray(footerMenus4) ? (
							<ul>
								{footerMenus4.map(footerMenu => (
									<li key={footerMenu?.node?.id} className="text-gray-500 dark:text-gray-400">
										<Link href={footerMenu?.node?.path}>
											<a className='text-gray-100 '>
												{footerMenu?.node?.label}
											</a>
										</Link>
									</li>
								))}
							</ul>
						) : null}
					</div>
				</div>

				<hr className="border-green-900 sm:mx-auto dark:border-gray-700 mt-8 " />
			</div >
			<div className='bg-black py-1'>

				<span className="my-auto block text-sm text-center text-gray-100 font-bold  dark:text-gray-400">{footer?.copyrightText}</span>
			</div>
		</footer >





		// {/* <footer className="bg-teal-500 p-6">
		// 	<div className="flex flex-wrap -mx-1 overflow-hidden text-white">

		// 		{/*Widget One*/}
		// <div className="my-1 px-1 w-full overflow-hidden sm:w-full lg:w-1/2 xl:w-1/3">
		// 	<div dangerouslySetInnerHTML={{ __html: sanitize(footer?.sidebarOne) }} />
		// </div>

		// {/*Widget Two*/ }
		// 			<div className="my-1 px-1 w-full overflow-hidden sm:w-full lg:w-1/2 xl:w-1/3">
		// 				<div dangerouslySetInnerHTML={{ __html: sanitize(footer?.sidebarTwo) }} />
		// 			</div>

		// 			<div className="my-1 px-1 w-full overflow-hidden sm:w-full lg:w-1/2 xl:w-1/3">
		// 				{/*Mailchimp Newsletter Subscription*/}

		// 				{/* Footer Menus*/}
		// 				{!isEmpty(footerMenus) && isArray(footerMenus) ? (
		// 					<ul>
		// 						{footerMenus.map(footerMenu => (
		// 							<li key={footerMenu?.node?.id}>
		// 								<Link href={footerMenu?.node?.path}>
		// 									<a>
		// 										{footerMenu?.node?.label}
		// 									</a>
		// 								</Link>
		// 							</li>
		// 						))}
		// 					</ul>
		// 				) : null}

		// 			</div>


		// 			<div className="my-1 px-1 w-full overflow-hidden sm:w-full lg:w-1/2 xl:w-1/3">
		// 				{/*Mailchimp Newsletter Subscription*/}

		// 				{/* Footer Menus*/}
		// 				{!isEmpty(footerMenus2) && isArray(footerMenus2) ? (
		// 					<ul>
		// 						{footerMenus2.map(footerMenu => (
		// 							<li key={footerMenu?.node?.id}>
		// 								<Link href={footerMenu?.node?.path}>
		// 									<a>
		// 										{footerMenu?.node?.label}
		// 									</a>
		// 								</Link>
		// 							</li>
		// 						))}
		// 					</ul>
		// 				) : null}

		// 			</div>


		// 			<div className="my-1 px-1 w-full overflow-hidden sm:w-full lg:w-1/2 xl:w-1/3">
		// 				{/*Mailchimp Newsletter Subscription*/}

		// 				{/* Footer Menus*/}
		// 				{!isEmpty(footerMenus3) && isArray(footerMenus3) ? (
		// 					<ul>
		// 						{footerMenus3.map(footerMenu => (
		// 							<li key={footerMenu?.node?.id}>
		// 								<Link href={footerMenu?.node?.path}>
		// 									<a>
		// 										{footerMenu?.node?.label}
		// 									</a>
		// 								</Link>
		// 							</li>
		// 						))}
		// 					</ul>
		// 				) : null}

		// 			</div>



		// 		</div >
		// {/*Copyright Text*/ }
		// < div className = "mb-8 mt-8 w-full flex flex-wrap" >
		// 			<div className="w-full md:w-1/2 lg:w-1/4 text-white">{footer?.copyrightText ? footer.copyrightText : '© Codeytek Academy 2020'}</div>
		// 			<div className="w-full lg:w-3/4 flex justify-end">
		// 				{!isEmpty(footer?.socialLinks) && isArray(footer?.socialLinks) ? (
		// 					<ul className="flex items-center">
		// 						{footer.socialLinks.map(socialLink => (
		// 							<li key={socialLink?.iconName} className="ml-4">
		// 								<a href={socialLink?.iconUrl}>
		// 									{getIconComponentByName(socialLink?.iconName)}
		// 								</a>
		// 							</li>
		// 						))}
		// 					</ul>
		// 				) : null}
		// 			</div>
		// 		</ >
		// 	</footer > * /}












	);
};

export default Footer;
