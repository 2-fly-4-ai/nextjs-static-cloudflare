import Header from "./header";
import Footer from "./footer";
import Head from "next/head";
import Seo from "../seo";
import { isEmpty } from "lodash";
import { sanitize } from "../../utils/miscellaneous";
import PropTypes from "prop-types";

const Layout = ({ data, isPost, children }) => {
  console.warn(data);
  const {
    page,
    post,
    posts,
    header,
    footer,
    headerMenus,
    footerMenus,
    footerMenus1,
    footerMenus2,
    footerMenus3,
  } = data || {};

  // if (isEmpty(page) && isEmpty(post) && isEmpty(posts)) {
  //     return null;
  // }

  //REMEBER TO UNCOMMENT ABOVE LINE

  // If it does not have either post or page.
  // if (isEmpty(page) && isEmpty(post) && isEmpty(posts) && isEmpty(product)) {
  //     return null;
  // }

  const seo = isPost ? post?.seo ?? {} : page?.seo ?? {};
  const uri = isPost ? post?.uri ?? {} : page?.uri ?? {};

  return (
    <div>
      {/* <Seo seo={seo} uri={uri} /> */}
      <Head>
        <link rel="shortcut icon" href={header?.favicon} />
      </Head>
      <Header header={header} headerMenus={headerMenus?.edges} />
      <div className="min-h-almost-screen dark:bg-gray-900">{children}</div>
      <Footer
        footer={footer}
        footerMenus1={footerMenus1?.edges}
        footerMenus2={footerMenus2?.edges}
        footerMenus3={footerMenus3?.edges}
        footerMenus4={footerMenus3?.edges}
      />
    </div>
  );
};

Layout.propTypes = {
  data: PropTypes.object,
  isPost: PropTypes.bool,
  children: PropTypes.node,
};

Layout.defaultProps = {
  data: {},
  isPost: false,
  children: {},
};

export default Layout;
