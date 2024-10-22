import "../styles/globals.css";
import "../firebase/client.js"

function MyApp({ Component, pageProps }) {

  return (
  <>
    <Component {...pageProps} />
  </>
  );
}

export default MyApp;
