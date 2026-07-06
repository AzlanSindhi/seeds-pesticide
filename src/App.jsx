import './App.css'
import Nav from './components/Nav'
import Footer from './components/Footer'
import PageTransition from './components/ui/PageTransition'
import ToastHost from './components/ui/Toast'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Public Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Category from './pages/Category'
import Signup from './pages/Signup'
import About from './pages/About'
import Contact from './pages/Contact'
import Seeds from './pages/SeedsPage'
import Pest from './pages/PestPage'
import ProductPage from './pages/ProductDetails'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'

// Admin Pages & Layout
import AdminLayout from './pages/admin/AdminLayout'
import AdminLogin from './pages/admin/AdminLogin'
import Dashboard from "./pages/admin/Dashboard"
import Cust from './pages/admin/Customers'
import Products from './pages/admin/Products'
import Sales from './pages/admin/Sales'
import Reports from './pages/admin/Reports'
import Suppliers from './pages/admin/Suppliers'

// Supplier Pages & Layout
import SupplierLayout from './pages/supplier/SupplierLayout'
import SupDashboard from './pages/supplier/SupplierDashboard'
import SupProducts from './pages/supplier/MyProducts'
import Orders from './pages/supplier/Orders'
import SupplierReport from './pages/supplier/SupplierReport'
import SupLogin from './pages/supplier/SupplierLogin'
import SupSignup from './pages/supplier/SupplierSignup'
import AddProduct from './pages/supplier/AddProduct'

const PublicLayout = () => (
  <div className="d-flex flex-column min-vh-100">
    <Nav />
    <main className="flex-grow-1">
      <PageTransition />
    </main>
    <Footer />
    <ToastHost />
  </div>
)

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <PublicLayout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/login", element: <Login /> },
        { path: "/category", element: <Category /> },
        { path: "/signup", element: <Signup /> },
        { path: "/user/:admin", element: <AdminLogin /> },
        { path: "/about", element: <About /> },
        { path: "/contact", element: <Contact /> },
        { path: "/seeds", element: <Seeds /> },
        { path: "/pest-page", element: <Pest /> },
        { path: "/products/:category/:id", element: <ProductPage /> },
        { path: "/cart", element: <Cart /> },
        { path: "/checkout", element: <Checkout /> }
      ],
    },
    {
      path: "/user-module",
      element: <AdminLayout />,
      children: [
        { path: "dashboard", element: <Dashboard /> },
        { path: "products", element: <Products /> },
        { path: "sales", element: <Sales /> },
        { path: "reports", element: <Reports /> },
        { path: "cust", element: <Cust /> },
        { path: "supplier", element: <Suppliers /> },
      ],
    },
    {
      path: "/supplier-module",
      children: [
        { path: "login", element: <SupLogin /> },
        { path: "signup", element: <SupSignup /> },
        {
          element: <SupplierLayout />,
          children: [
            { path: "sup-dashboard", element: <SupDashboard /> },
            { path: "myproducts", element: <SupProducts /> },
            { path: "orders", element: <Orders /> },
            { path: "sup-report", element: <SupplierReport /> },
            { path: "addproducts", element: <AddProduct /> }
          ],
        },
      ],
    },
  ])

  return <RouterProvider router={router} />
}

export default App
