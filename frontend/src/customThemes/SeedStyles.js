export function getSeedStyles(
  xDirection,
  yDirection,
  connectorLength,
  nextMatchInfo
) {
  let styler1 = {};
  let styler2 = {};
  let styler3 = {};

  if (xDirection === "right") {
    styler3 = {
      position: "absolute",
      left: "219px",
      top: "26px",
      width: "16px",
      height: "1px",
      backgroundColor: "white",
    };
    if (nextMatchInfo.round === 2) {
    } else {
      if (yDirection === "down") {
        styler1 = {
          position: "absolute",
          transform: "rotate(90deg)",
          left: `-${connectorLength / 2 - 16}px`,
          top: `${connectorLength / 2}px`,
          width: `${connectorLength}px`,
          height: "1px",
          backgroundColor: "white",
        };
        styler2 = {
          position: "absolute",
          left: `${16}px`,
          top: `${connectorLength}px`,
          width: "14px",
          height: "1px",
          backgroundColor: "white",
        };
      } else {
        styler1 = {
          position: "absolute",
          transform: "rotate(90deg)",
          left: `-${connectorLength / 2 - 16}px`,
          bottom: `${connectorLength / 2}px`,
          width: `${connectorLength}px`,
          height: "1px",
          backgroundColor: "white",
        };
        styler2 = {
          position: "absolute",
          left: `${16}px`,
          bottom: `${connectorLength - 5}px`,
          width: "14px",
          height: "1px",
          backgroundColor: "white",
        };
      }
    }
  } else if (xDirection == "left") {
    styler3 = {
      position: "absolute",
      left: "-16px",
      top: "26px",
      width: "16px",
      height: "1px",
      backgroundColor: "white",
    };
    if (nextMatchInfo.round == 2) {
    } else {
      if (yDirection === "down") {
        styler1 = {
          position: "absolute",
          transform: "rotate(90deg)",
          right: `-${connectorLength / 2 - 16}px`,
          top: `${connectorLength / 2}px`,
          width: `${connectorLength}px`,
          height: "1px",
          backgroundColor: "white",
        };
        styler2 = {
          position: "absolute",
          right: `${16}px`,
          top: `${connectorLength}px`,
          width: "15px",
          height: "1px",
          backgroundColor: "white",
        };
      } else {
        styler1 = {
          position: "absolute",
          transform: "rotate(90deg)",
          left: `-${connectorLength / 2}px`,
          bottom: `${connectorLength / 2}px`,
          width: `${connectorLength}px`,
          height: "1px",
          backgroundColor: "white",
        };
      }
    }
  } else {
    styler2 = {
      position: "absolute",
      left: "219px",
      top: "26px",
      width: "16px",
      height: "1px",
      backgroundColor: "white",
    };

    styler1 = {
      position: "absolute",
      left: "-16px",
      top: "26px",
      width: "16px",
      height: "1px",
      backgroundColor: "white",
    };
  }

  return { styler1, styler2, styler3 };
}

export const bottomSeedFlex = {
  width: "100%",
  py: "1px",
  px: "2px",
  justifyContent: "space-between",
  _hover: {
    background: "gray.800",
    color: "white",
    "& > .seedStatusNull": {
      background: "gray.700",
      color: "white",
    },
    "& > .seedStatusLost": {
      background: "rgb(130,31,34)",
      color: "black",
    },
    "& > .seedStatusWon": {
      background: "rgb(213, 125, 47)",
      color: "black",
    },
    borderBottomLeftRadius: "15px",
    borderBottomRightRadius: "15px",
  },
};

export const topSeedFlex = {
  width: "100%",
  py: "1px",
  px: "2px",
  justifyContent: "space-between",
  borderBottom: "1px solid white",
  _hover: {
    background: "gray.800",
    color: "white",
    "& > .seedStatusNull": {
      background: "gray.700",
      color: "white",
    },
    "& > .seedStatusLost": {
      background: "rgb(130,31,34)",
      color: "black",
    },
    "& > .seedStatusWon": {
      background: "rgb(213, 125, 47)",
      color: "black",
    },
    borderTopLeftRadius: "15px",
    borderTopRightRadius: "15px",
  },
};

export const topSeedTextWon = {
  borderTopRightRadius: "15px",
  borderLeftRadius: "3px",
  textColor: "gray.900",
  bg: "rgb(237,137,51)",
  width: "50px",
  px: "3px",
  isTruncated: true,
  className: "seedStatusWon",
};
export const topSeedTextLost = {
  borderTopRightRadius: "15px",
  borderLeftRadius: "3px",
  textColor: "white",
  width: "50px",
  px: "3px",
  bg: "#9b2226",
  isTruncated: true,
  className: "seedStatusLost",
};
export const topSeedTextNull = {
  borderTopRightRadius: "15px",
  borderLeftRadius: "3px",
  width: "50px",
  bg: "gray.600",
  px: "3px",
  className: "seedStatusNull",
};
export const bottomSeedTextWon = {
  borderBottomRightRadius: "15px",
  borderLeftRadius: "3px",
  textColor: "gray.900",
  bg: "rgb(237,137,51)",
  width: "50px",
  px: "3px",
  isTruncated: true,
  className: "seedStatusWon",
};
export const bottomSeedTextLost = {
  borderBottomRightRadius: "15px",
  borderLeftRadius: "3px",
  textColor: "white",
  bg: "#9b2226",
  width: "50px",
  px: "3px",
  isTruncated: true,
  className: "seedStatusLost",
};
export const bottomSeedTextNull = {
  borderBottomRightRadius: "15px",
  borderLeftRadius: "3px",
  width: "50px",
  bg: "gray.600",
  px: "3px",
  isTruncated: true,
  className: "seedStatusNull",
};
