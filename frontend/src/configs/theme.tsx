//import fonts
import "@fontsource-variable/inter";
import "@fontsource-variable/manrope";

import { extendBaseTheme, theme } from "@chakra-ui/react";


const customTheme = extendBaseTheme({
  ...theme,
  styles: {
    ...theme.styles,
    global: {
      ...theme.styles.global,
      body: {
        fontFamily: `'Inter', ${theme.fonts?.body}`,
      },
    },
  },
  fontSizes: {
    ...theme.fontSizes,
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
  },
  breakpoints: {
    base: "0em",
    sm: "48em",
    md: "62em",
    lg: "80em",
  },
  sizes: {
    ...theme.sizes,
    container: {
      ...theme.sizes.container,
      sm: "560px",
      xl: "1200px",
    },
  },
  // fonts: {
  //   heading: `"Manrope", ${theme.fonts?.heading}`,
  //   body: `'Inter', ${theme.fonts?.body}`,
  // },
  colors: {
    ...theme.colors,
    brand: {
      primary: "#611CB9",
      primaryScheme: {
        50: "#f4e7ff",
        100: "#d6bcf9",
        200: "#ba8ff0",
        300: "#9e64e9",
        400: "#8238e1",
        500: "#691ec7",
        600: "#51169c",
        700: "#3a1071",
        800: "#230845",
        900: "#0f011c",
      },
      primaryBackground: "#611cb91a",
      primaryLightBackground: "#F7F4FB",
      border: "#E2E8F0",
      footer: "#0C1C24",
      link: "#06F",
      lightBackground: "#F9FAFB",
      lightText: "#A0A1AB",
      hover: "whitesmoke",
      grayBackground: "#F3F6F9",
      auditBackground: "#F3F5F8",
      appealBackground: "#4d4d4d50",
      documentItemBackground: "#F1F3F5",
      documentTableHeadBackground: "#F3F5F8",
      documentTableHeadText: "#F3F5F8",
      grayText: "#9CA3AF",
      portalBackground: "#F3F5F8",
      resultHeading: "#00B884",
      resultBackground: "#F7F4FB",
      propertyListingButtonBackground: "#EDF2F7",
      propertyListingAccordionBackground: "#F7F4FB",
      status: {
        success: "#F6FFEC",
        "success-border": "#B7EA8F",
        "success-icon": "#52C41A",
        info: "#E6F4FF",
        "info-border": "#91C9FF",
        "info-icon": "#1890FF",
        warning: "#FEFBE6",
        "warning-border": "#FFE58F",
        "warning-icon": "#FAAD14",
        error: "#FFF1EF",
        "error-border": "#FFCCC6",
        "error-icon": "#F5222D",
      },
      notice: {
        info: "#EAE4F4",
        "info-border": "#611CB9",
        "info-icon": "#4D4D4D",
        "info-heading": "#4D4D4D",
        "info-text": "#4D4D4D",
        "info-button": "#611CB9",
        warning: "rgba(255, 200, 0, 0.10)",
        "warning-border": "#FFC800",
        "warning-icon": "#4D4D4D",
        "warning-heading": "#4D4D4D",
        "warning-text": "#4D4D4D",
        "warning-button": "#FFC800",
        error: "rgba(218, 35, 40, 0.10)",
        "error-border": "#DA2328",
        "error-icon": "#4D4D4D",
        "error-heading": "#111111",
        "error-text": "#4D4D4D",
        "error-button": "#DA2328",
      },
    },
  },
  components: {
    ...theme.components,
    FormLabel: {
      ...theme.components.FormLabel,
      baseStyle: {
        ...theme.components.FormLabel.baseStyle,
        fontSize: ["xs", "xs", "sm"],
      },
    },
    Input: {
      ...theme.components.Input,
      baseStyle: {
        ...theme.components.Input.baseStyle,
        fontSize: ["xs", "xs", "sm"],
      },
    },
  },
});

export default customTheme;
