// theme.js
import { extendTheme, StyleFunctionProps } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config = {
  initialColorMode: "dark", // Set the initial color mode to dark
  useSystemColorMode: false, // Disable system color mode preference
};

const styles = {
  global: (props: StyleFunctionProps) => ({
    body: {
      bg: mode(
        props.theme.colors["chakra-body-bg"] || "white", // Light mode background
        "blackAlpha.200" // Dark mode background
      )(props),
    },
  }),
};

const theme = extendTheme({ config, styles });

export default theme;
