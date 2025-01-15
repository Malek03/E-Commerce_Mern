import { BrowserRouter ,Routes,Route} from "react-router-dom"
import HomePage from "./pages/HomePage"
import RegisterPage from "./pages/RegisterPage"
import NavBar from "./components/Bar"
import LoginPage from "./pages/LoginPage"
import AuthProvider from "./context/Auth/AuthProvider"

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
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
