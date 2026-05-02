/** URL/href placeholders use paths or hashes — do not wrap in [...] or Next `<Link>` will error. Replace these string values when wiring real routes. */

export const SITE = {
  name: "[SITE_NAME]",
  tagline: "[SITE_TAGLINE]",
} as const

export const NAV = {
  logo: "[NAV_LOGO]",
  links: [
    { label: "[NAV_1]", href: "#nav-placeholder-1" },
    { label: "[NAV_2]", href: "#nav-placeholder-2" },
    { label: "[NAV_3]", href: "#nav-placeholder-3" },
    { label: "[NAV_4]", href: "#nav-placeholder-4" },
  ] as const,
  loginLabel: "[LOGIN_LINK]",
  loginHref: "#login-url-placeholder",
  cta: "[CTA_BUTTON]",
  ctaHref: "#cta-url-placeholder",
  mobileMenuLabel: "[MOBILE_MENU_LABEL]",
  mobileSheetTitle: "[MOBILE_MENU_TITLE]",
} as const

export const HERO = {
  badge: "[HERO_BADGE]",
  title: "[HERO_TITLE]",
  subtitle: "[HERO_SUBTITLE]",
  primaryBtn: "[PRIMARY_BTN]",
  primaryHref: "#hero-primary-placeholder",
  secondaryBtn: "[SECONDARY_BTN]",
  secondaryHref: "#hero-secondary-placeholder",
  imageAlt: "[HERO_IMAGE_ALT]",
} as const

export const HOW_TO_ORDER = {
  title: "[HOW_TO_ORDER_TITLE]",
  subtitle: "[HOW_TO_ORDER_SUBTITLE]",
  cards: [
    {
      title: "[OPTION_1_TITLE]",
      description: "[OPTION_1_DESC]",
      linkLabel: "[OPTION_1_LINK]",
      href: "#option-1-link-placeholder",
      linkAria: "[OPTION_1_LINK_ARIA]",
    },
    {
      title: "[OPTION_2_TITLE]",
      description: "[OPTION_2_DESC]",
      linkLabel: "[OPTION_2_LINK]",
      href: "#option-2-link-placeholder",
      linkAria: "[OPTION_2_LINK_ARIA]",
    },
  ] as const,
} as const

export const ADVANTAGES = {
  mainTitle: "[ADV_MAIN_TITLE]",
  mainDescription: "[ADV_MAIN_DESC]",
  features: [
    {
      title: "[ADV_1_TITLE]",
      description: "[ADV_1_DESC]",
    },
    {
      title: "[ADV_2_TITLE]",
      description: "[ADV_2_DESC]",
    },
    {
      title: "[ADV_3_TITLE]",
      description: "[ADV_3_DESC]",
    },
    {
      title: "[ADV_4_TITLE]",
      description: "[ADV_4_DESC]",
    },
  ] as const,
} as const

export const HOW_IT_WORKS = {
  title: "[HOW_IT_WORKS_TITLE]",
  subtitle: "[HOW_IT_WORKS_SUBTITLE]",
  steps: [
    {
      n: 1,
      title: "[STEP_1_TITLE]",
      description: "[STEP_1_DESC]",
    },
    {
      n: 2,
      title: "[STEP_2_TITLE]",
      description: "[STEP_2_DESC]",
    },
    {
      n: 3,
      title: "[STEP_3_TITLE]",
      description: "[STEP_3_DESC]",
    },
    {
      n: 4,
      title: "[STEP_4_TITLE]",
      description: "[STEP_4_DESC]",
    },
  ] as const,
} as const

export const TESTIMONIALS = {
  title: "[TESTIMONIALS_TITLE]",
  items: [
    {
      text: "[TESTIMONIAL_1_TEXT]",
      name: "[CUSTOMER_1_NAME]",
      role: "[CUSTOMER_1_ROLE]",
      avatarAlt: "[CUSTOMER_1_AVATAR_ALT]",
    },
    {
      text: "[TESTIMONIAL_2_TEXT]",
      name: "[CUSTOMER_2_NAME]",
      role: "[CUSTOMER_2_ROLE]",
      avatarAlt: "[CUSTOMER_2_AVATAR_ALT]",
    },
    {
      text: "[TESTIMONIAL_3_TEXT]",
      name: "[CUSTOMER_3_NAME]",
      role: "[CUSTOMER_3_ROLE]",
      avatarAlt: "[CUSTOMER_3_AVATAR_ALT]",
    },
  ] as const,
} as const

export const FOOTER = {
  tagline: "[FOOTER_TAGLINE]",
  logo: "[FOOTER_LOGO]",
  columns: [
    {
      heading: "[FOOTER_COL_2_HEADING]",
      links: [
        { label: "[FOOTER_COL_2_LINK_1]", href: "#footer-col2-link-placeholder-1" },
        { label: "[FOOTER_COL_2_LINK_2]", href: "#footer-col2-link-placeholder-2" },
        { label: "[FOOTER_COL_2_LINK_3]", href: "#footer-col2-link-placeholder-3" },
        { label: "[FOOTER_COL_2_LINK_4]", href: "#footer-col2-link-placeholder-4" },
      ],
    },
    {
      heading: "[FOOTER_COL_3_HEADING]",
      links: [
        { label: "[FOOTER_COL_3_LINK_1]", href: "#footer-col3-link-placeholder-1" },
        { label: "[FOOTER_COL_3_LINK_2]", href: "#footer-col3-link-placeholder-2" },
        { label: "[FOOTER_COL_3_LINK_3]", href: "#footer-col3-link-placeholder-3" },
        { label: "[FOOTER_COL_3_LINK_4]", href: "#footer-col3-link-placeholder-4" },
      ],
    },
    {
      heading: "[FOOTER_COL_4_HEADING]",
      links: [
        { label: "[FOOTER_COL_4_LINK_1]", href: "#footer-col4-link-placeholder-1" },
        { label: "[FOOTER_COL_4_LINK_2]", href: "#footer-col4-link-placeholder-2" },
        { label: "[FOOTER_COL_4_LINK_3]", href: "#footer-col4-link-placeholder-3" },
        { label: "[FOOTER_COL_4_LINK_4]", href: "#footer-col4-link-placeholder-4" },
      ],
    },
  ] as const,
  copyright: "[COPYRIGHT]",
  socialInstagramHref: "#social-instagram-placeholder",
  socialFacebookHref: "#social-facebook-placeholder",
  socialTwitterHref: "#social-twitter-placeholder",
  socialInstagramAria: "[SOCIAL_INSTAGRAM_ARIA]",
  socialFacebookAria: "[SOCIAL_FACEBOOK_ARIA]",
  socialTwitterAria: "[SOCIAL_TWITTER_ARIA]",
} as const
