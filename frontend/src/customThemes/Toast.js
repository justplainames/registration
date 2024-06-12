import { alertAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(alertAnatomy.keys);

const toastSuccess = definePartsStyle({
  container: {
    textColor: "white",
    border: "1px solid",
    borderColor: "rgb(74 , 117 , 51)",
    background: "rgb(74 , 117 , 51)",
  },
});

const toastFail = definePartsStyle({
  container: {
    textColor: "white",
    border: "1px solid",
    borderColor: "rgb(229, 62, 62)",
    background: "rgb(229, 62, 62)",
  },
});

const toastInfo = definePartsStyle({
  container: {
    textColor: "black",
    border: "1px solid",
    borderColor: "rgb(66, 153, 225)",
    background: "rgb(66, 153, 225)",
  },
});

export const toastTheme = defineMultiStyleConfig({
  variants: {
    toastSuccess: toastSuccess,
    toastFail: toastFail,
    toastInfo: toastInfo,
  },
});
