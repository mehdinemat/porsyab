import { Global } from "@emotion/react";

export const Fonts = ({ lang }) => (
  <Global
    styles={`
      @font-face {
        font-family: 'Estedadfd';
        src: url('/fonts/estedadfd.woff2') format('woff2');
        font-weight: 400;
        font-style: normal;
        font-display: swap;
      }

      @font-face {
        font-family: 'Estedad';
        src: url('/fonts/estedad.woff2') format('woff2');
        font-weight: 400;
        font-style: normal;
        font-display: swap;
      }

       
      @font-face {
        font-family: 'morabba';
        src: url('/fonts/moraba/Morabba-Regular.ttf') format('truetype');
        font-weight: 400;
        font-style: normal;
        font-display: swap;
      }

      html {
        font-feature-settings: ${lang === "fa" ? `"locl", "ss01"` : "normal"};
      }
    `}
  />
);
