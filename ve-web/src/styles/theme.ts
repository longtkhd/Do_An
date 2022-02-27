const theme = {
  colors: {
    whiteColor: '#ffffff',
    blackColor: '#000000',
    navDarkBg: '#003366',
    grey2: '#fafafa',
    navDarkTextColor: '#038fdd',
    primaryColor: '#f26524',
    primaryColorLighten: '#f37439',
    headerTextColor: '#262626',
    lightGrey: '#ccc',
    darkGray: '#aaa',
    nightRider: '#333',
    lightOrange: '#f37439',
    violetRed: '#BA1075',
  },
  variables: {
    sidebarPaddingLr: 30,
    layoutHeaderHeight: 72,
    cardShadowLg: `0 0 4px 4px rgba(0, 0, 0, 0.08);`,
    layoutHeaderHeightRes: 50,
    layoutHeaderPadding: '0 32px',
    layoutHeaderPaddingRes: '0 15px',
  },
  mediaQueries: {
    xs: 480,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1600,
  },
  mixins: {
    boxShadow: (shadow: string) => `
      -webkit-box-shadow: ${shadow};
      -moz-box-shadow: ${shadow};
      box-shadow: ${shadow};
    `,
    flexDisPlay: (display: string, direction: string, wrap: string) => `
      ${display ? 
        ` 
        display: -webkit-${display};
        display: -ms-${display}box;
        display: -ms-${display};
        display: ${display};
      ` : ''}
      ${direction ? 
        `
        -webkit-flex-direction: ${direction};
        -ms-flex-direction: ${direction};
        flex-direction: ${direction};
      ` : ''}
      ${wrap ? 
        `
        -webkit-flex-wrap: ${wrap};
        -ms-flex-wrap: ${wrap};
        flex-wrap: ${wrap};
      ` : ''}
    `,
    alignItems: (align = 'stretch') => `
      -webkit-align-items: ${align};
      -ms-align-items: ${align};
      align-items: ${align};
    `,
    borderRadius: (radius: string) => `
      -webkit-border-radius: ${radius};
      -moz-border-radius: ${radius};
      border-radius: ${radius};
    `,
    justifyContent: (justify: string) => `
      -webkit-justify-content: ${justify};
      -ms-justify-content: ${justify};
      justify-content: ${justify};
    `,
    transition: (transition: string) => `
      -webkit-transition: ${transition};
      -moz-transition: ${transition};
      -ms-transition: ${transition};
      -o-transition: ${transition};
      transition: ${transition};
    `,
    userSelect: () => `
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    `,
  },
};

export default theme;
