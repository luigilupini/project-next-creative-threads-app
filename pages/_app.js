import "../styles/globals.css";
import Layout from "../components/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// This is the default `App` component that you get and it is used by Next.js to
// initialize pages. Imagine it as an entry point of all your `pages` component
// which rendered within this `App` container.

// This `App` component receives two parameters `Component` and `pageProps`.
// `Component` is basically the current active page component, and whenever the
// route of our app is changed `Component` is updated to the new page component.
// `pageProps` is the initial data we inject into `pages` when a page is first
// loaded. This could be done by calling 'getInitialProps' on a custom `App`.

// There are several useful cases for this `_app.js` component:
// - Persisting partial layout throughout the pages (eg. navbar and footer)
// - Applying global CSS (which we have done in series #1)
// - Keeping states between pages (as this custom `App` component is a HOC）

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <ToastContainer limit={1} />
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
