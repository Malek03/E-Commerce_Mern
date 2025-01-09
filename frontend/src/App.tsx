import { BrowserRouter ,Routes,Route} from "react-router-dom"
// import HomePage from "./pages/HomePage"
import NavBar from "./components/bar"

function App() {
  return (
    <BrowserRouter>
        <NavBar/>
      <Routes>
        {/* <Route path='/login' element={<HomePage />}></Route> */}
      </Routes>
    </BrowserRouter>

  )
}

export default App
