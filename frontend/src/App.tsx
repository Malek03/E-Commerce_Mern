import { BrowserRouter ,Routes,Route} from "react-router-dom"
import HomePage from "./pages/HomePage"
import RegisterPage from "./pages/RegisterPage"
import NavBar from "./components/Bar"
import LoginPage from "./pages/LoginPage"

function App() {
  return (
    <BrowserRouter>
        <NavBar/>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/register' element={<RegisterPage/>}></Route>
        <Route path='/login' element={<LoginPage/>}></Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App
