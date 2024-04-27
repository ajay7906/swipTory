import Home from "./pages/home/Home"
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BookMark from "./pages/bookmarks/BookMark"
import Layout from "./components/layout/Layout"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import YourStory from "./pages/yourstory/YourStory"
import useMediaQuery from "./utils/screenSize"


// import { ApiProvider } from './api/post';
function App() {
  const isMobile = useMediaQuery('(max-width: 780px)');
  // const navigate = useNavigate();
  // if (!isMobile) {
  //   navigate('/');
  // }
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
            {/* <Route path="/" element={<Home isMobile={isMobile} />} /> */}
            <Route path="/bookmarks" element={<BookMark />} />
            <Route path="/your_story" element={<YourStory />} />
            {/* {isMobile && <Route path="/your_story" element={<YourStory />} />} */}
            {/* {isMobile ? <Route path="/your_story" element={<YourStory />} /> : null} */}
            {/* {isMobile ? <Route path="/your_story" element={<YourStory />} /> : <Route path="/" element={<Home />} />} */}
            
          </Routes>
        </Layout>
      </BrowserRouter>

    </div>
  )
}

export default App