import { Html, Head, Main, NextScript } from "next/document";
// https://nextjs.org/docs/advanced-features/custom-document
// A custom `Document` can update <html> & <body> tags used to render a `Page`.
// This file is only rendered on the server, so event handlers cannot be used
// To override the default `Document`, create the file `pages/_document.js`.
export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,700;1,500&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
