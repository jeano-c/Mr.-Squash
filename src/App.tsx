import "./App.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Menu from "./pages/Menu";
import { CartProvider } from "./context/CartProvider";
import Career from "./pages/Career";
import AboutUs from "./pages/AboutUs";
import Footer from "./components/Footer";


function Layout() {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/menu", element: <Menu /> },
      { path: "/career", element: <Career /> },
      { path: "/about", element: <AboutUs /> },
    ],
  },
]);

function App() {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-transparent">
        <RouterProvider router={router} />
      </div>
    </CartProvider>
  );
}

export default App;
