import { DefaultTheme } from "styled-components";

const flex = (direnction = "row", jusitify = "center", align = "center") => {
  return `
    display:flex;
    justify-content: ${jusitify};
    align-items: ${align};
    flex-direction:${direnction};
    `;
};

const colors = {
  black: "#000000",
  white: "#FFFFFF",
  red: "#eb2f06",
  orange: "#e67e22",
  llow: "#f1c40f",
  green: "#2ecc71",
  blue: "#0984e3",
  skyBlue: "#75a4f5",
  navy: "#000080",
  purple: "#6c5ce7",
  mint: "#00d2d3",
  pink: "#e84393",
  lighterGray: "#dfe6e9",
  gray: "#b2bec3",
  fontGray: "#6b6b6b",
  snow: "#dff9fb",
  main: "#5982c8",
  lighterGreen: "#55efc4",
  background: "#ffffff",
};

const fonts = {
  large_font_size: "32px",
  middle_font_size: " 16px",
  small_font_size: "12px",
};

const theme: DefaultTheme = {
  colors,
  flex,
  fonts,
};

export default theme;
