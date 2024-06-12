export const chakraMultiSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    borderWidth: "1px",
    "& > div > span > span": {
      paddingY: "1px",
    },
    "& > div > span > div > svg > path": {
      fill: "gray.900",
    },
    _focusVisible: {
      borderColor: "rgb(237,137,51)",
      borderWidth: "2px",
      outline: "none", // Remove default focus outline
    },
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    background: "transparent",
  }),
  crossIcon: (provided, state) => ({
    ...provided,
    textColor: "white",
  }),
  menuList: (provided, state) => ({
    ...provided,
    background: "gray.900",
  }),
  multiValue: (provided, state) => ({
    ...provided,
    background: "rgb(237,137,51)",
    textColor: "gray.900",
  }),
  option: (provided, state) => ({
    ...provided,
    background: "gray.900",
    _hover: { background: "rgb(237,137,51)", textColor: "gray.900" },
  }),
};

export const chakraSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    borderWidth: "1px",
    "& > div > span > span": {
      paddingY: "1px",
    },
    "& > div > span > div > svg > path": {
      fill: "gray.900",
    },
    textColor: "white",
    _focusVisible: {
      borderColor: "rgb(237,137,51)",
      borderWidth: "2px",
      outline: "none", // Remove default focus outline
      textColor: "white",
    },
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    background: "transparent",
    textColor: "white",
  }),
  crossIcon: (provided, state) => ({
    ...provided,
    textColor: "white",
  }),
  menuList: (provided, state) => ({
    ...provided,
    background: "gray.900",
    textColor: "white",
  }),

  option: (provided, state) => ({
    ...provided,
    background: "gray.900",
    _hover: { background: "rgb(237,137,51)", textColor: "gray.900" },
  }),
};
