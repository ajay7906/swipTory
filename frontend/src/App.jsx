import Home from "./pages/home/Home"
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BookMark from "./pages/bookmarks/BookMark"
import Layout from "./components/layout/Layout"
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div>
      <BrowserRouter>
      <ToastContainer 
        theme='dark'
        transition:Bounce
      
        />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bookmarks" element={<BookMark />} />

          </Routes>
        </Layout>
      </BrowserRouter>

    </div>
  )
}

export default App