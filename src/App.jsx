import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkLoginStatus } from "./slices/authSlice";
import Navbar from "./components/navbar/Navbar";
import { Outlet } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import Footer from "./components/Footer";
import LoadingMessage from "./components/util/LoadingMessage";
import { ToastContainer } from "react-toastify";

function App() {
  const dispatch = useDispatch();
  const { token, loading } = useSelector((state) => state.auth);
  const theme = useSelector((state) => state.theme);

  useEffect(() => {
    if (token) {
      dispatch(checkLoginStatus(token));
    }
  }, [token, dispatch]);

  return (
    <HelmetProvider>
      <Helmet>
        <title>CFMS</title>
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <body
          className={`${theme} bg-gradient-to-r from-pale-yellow via-light-peach via-20% to-primary-light bg-gradient-to-t from-pale-yellow via-light-peach to-primary-light`}
        />
      </Helmet>
      <Navbar />
      <main className="container h-full mx-auto flex justify-center items-center px-4 sm:px-6 lg:px-8 max-w-5xl">
        {loading ? <LoadingMessage /> : <Outlet />}
      </main>
      <Footer />
      <ToastContainer />
    </HelmetProvider>
  );
}

export default App;
