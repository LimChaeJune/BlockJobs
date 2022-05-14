import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    flex: (direction: string, justify: string, align: string) => string;
    //
    colors: {
      black: string;
      white: string;
      red: string;
      orange: string;
      llow: string;
      green: string;
      blue: string;
      skyBlue: string;
      navy: string;
      purple: string;
      mint: string;
      pink: string;
      lighterGray: string;
      gray: string;
      fontGray: string;
      snow: string;
      main: string;
      lighterGreen: string;
      background: string;
    };
    //
    fonts: {
      large_font_size: string;
      middle_font_size: string;
      small_font_size: string;
    };
  }
}
