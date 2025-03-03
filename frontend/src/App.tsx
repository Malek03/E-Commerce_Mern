import { BrowserRouter ,Routes,Route} from "react-router-dom"
import HomePage from "./pages/HomePage"
import RegisterPage from "./pages/RegisterPage"
import NavBar from "./components/Bar"
import LoginPage from "./pages/LoginPage"
import AuthProvider from "./context/Auth/AuthProvider"
import CartPage from "./pages/CartPage"
import ProtecetedRoute from "./components/ProtecedRoute"
import CartProvider from "./context/Cart/CartProvider"
import CheckoutPage from "./pages/CheckoutPage"

function App() {
  return (
    // # Shared State To All App Range
    <AuthProvider>
      <CartProvider>
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/register' element={<RegisterPage/>}></Route>
          <Route path='/login' element={<LoginPage/>}></Route>
          <Route element={<ProtecetedRoute/>}> /* ProtecetedRoute is A Component Work As MiddleWare*/
              <Route path='/cart' element={<CartPage/>}></Route>
              <Route path='/checkout' element={<CheckoutPage/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
