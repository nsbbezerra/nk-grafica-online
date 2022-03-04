import { extendTheme, theme } from "@chakra-ui/react";

const defaultTheme = extendTheme({
  ...theme,
  breakpoints: ["30em", "48em", "52em", "62em", "80em"],
  fonts: {
    body: "Lato, sans-serif",
    heading: "Lato, sans-serif",
  },
  colors: {
    ...theme.colors,
    blue: {
      50: "#dbddec",
      100: "#b8bbda",
      200: "#949bc7",
      300: "#707cb5",
      400: "#4a5fa2",
      500: "#114390",
      600: "#173877",
      700: "#192e5e",
      800: "#172447",
      900: "#141a30",
    },
    cyan: {
      50: "#dee6f3",
      100: "#bdcde8",
      200: "#9cb5dc",
      300: "#789dd1",
      400: "#5087c5",
      500: "#0271b9",
      600: "#145d97",
      700: "#1a4b77",
      800: "#1a3959",
      900: "#17273c",
    },
    purple: {
      50: "#d8d3e3",
      100: "#b3a9c8",
      200: "#8d80ad",
      300: "#695993",
      400: "#433579",
      500: "#17135f",
      600: "#18124f",
      700: "#171040",
      800: "#150e31",
      900: "#130923",
    },
  },
  components: {
    Button: {
      baseStyle: {
        _focus: { boxShadow: "none" },
      },
    },
    CloseButton: {
      baseStyle: { _focus: { boxShadow: "none" } },
    },
    Checkbox: {
      baseStyle: { control: { _focus: { boxShadow: "none" } } },
    },
    Radio: {
      baseStyle: { control: { _focus: { boxShadow: "none" } } },
    },
    Menu: {
      baseStyle: {
        list: {
          boxShadow: "lg",
        },
      },
    },
  },
});

export { defaultTheme };
