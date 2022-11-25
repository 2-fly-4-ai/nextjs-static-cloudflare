import { gql } from "@apollo/client";
import MenuFragment from "./fragments/menus";

export const HeaderFooter = `
  header: getHeader {
    favicon
    siteLogoUrl
    siteTagLine
    siteTitle
  }
  headerMenus: menuItems(where: {location: HCMS_MENU_HEADER, parentId: "0"}) {
    edges {
      node {
        ...MenuFragment
        childItems {
          edges {
            node {
              ...MenuFragment
            }
          }
        }
      }
    }
  }
  footerMenus: menuItems(where: {location: HCMS_MENU_FOOTER, parentId: "0"}) {
    edges {
      node {
        ...MenuFragment
      }
    }
  }



  footerMenus1: menuItems(where: {location: FOOTER_MENU_1, parentId: "0"}) {
    edges {
      node {
        ...MenuFragment
      }
    }
  }


  footerMenus2: menuItems(where: {location: FOOTER_MENU_2, parentId: "0"}) {
    edges {
      node {
        ...MenuFragment
      }
    }
  }
  footerMenus3: menuItems(where: {location: FOOTER_MENU_3, parentId: "0"}) {
    edges {
      node {
        ...MenuFragment
      }
    }
  }
  footerMenus4: menuItems(where: {location: FOOTER_MENU_4, parentId: "0"}) {
    edges {
      node {
        ...MenuFragment
      }
    }
  }
  

  
  
  footer: getFooter {
    copyrightText
    sidebarOne
    sidebarTwo
    socialLinks {
      iconName
      iconUrl
    }
  }
  

`

export const GET_MENUS = gql`
query GET_MENUS {
  ${HeaderFooter}
}
  ${MenuFragment}
`
