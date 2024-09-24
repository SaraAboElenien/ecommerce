import Home from './Components/Home/Home';
import Layout from "./Components/Layout/Layout";
import Shop from "./Components/Shop/Shop";
import Contact from "./Components/Contact/Contact";
import Cart from "./Components/Cart/Cart";
import Notfound from "./Components/Notfound/Notfound";
import ProductDetails from './Components/ProductDetails/ProductDetails'; // Import ProductDetails
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './Context/CartContext';

let routers = createBrowserRouter([
  {
    path: '/', element: <Layout />, children: [
      { index: true, element: <Home /> },
      { path: 'shop', element: <Shop /> },
      { path: 'contact', element: <Contact /> },
      { path: 'cart', element: <Cart /> },
      { path: 'product/:id', element: <ProductDetails /> }, // Add ProductDetails route with dynamic ID
      { path: '*', element: <Notfound /> },
    ],
  },
]);

function App() {
  return (
    <CartProvider> {/* Wrapping RouterProvider with CartProvider */}
      <RouterProvider router={routers} />
      <Toaster /> {/* Toast notification provider */}
    </CartProvider>
  );
}

export default App;
