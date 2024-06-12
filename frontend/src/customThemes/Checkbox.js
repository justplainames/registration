import { checkboxAnatomy as parts } from "@chakra-ui/anatomy";
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  // define the part you're going to style

  icon: {
    color: "white",
  },
  control: {
    _disabled: { bg: "gray.700", borderColor: "gray.700" },
    _checked: {
      bg: "rgb(237,137,51)",
      borderColor: "rgb(237,137,51)",
      _hover: {
        bg: "orange.500",
        color: "orange.500",
        borderColor: "orange.500",
      },
    },
  },
});

export const checkboxTheme = defineMultiStyleConfig({ baseStyle });
