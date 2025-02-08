import { BrowserRouter ,Routes,Route} from "react-router-dom"
import HomePage from "./pages/HomePage"
import RegisterPage from "./pages/RegisterPage"
import NavBar from "./components/Bar"
import LoginPage from "./pages/LoginPage"
import AuthProvider from "./context/Auth/AuthProvider"
import CartPage from "./pages/CartPage"
import ProtecetedRoute from "./components/ProtecedRoute"

function App() {
  return (
    // # Shared State To All App Range
    <AuthProvider>
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/register' element={<RegisterPage/>}></Route>
          <Route path='/login' element={<LoginPage/>}></Route>
          <Route element={<ProtecetedRoute/>}>
              <Route path='/cart' element={<CartPage/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
