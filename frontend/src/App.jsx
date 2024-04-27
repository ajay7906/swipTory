import Home from "./pages/home/Home"
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BookMark from "./pages/bookmarks/BookMark"
import Layout from "./components/layout/Layout"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import YourStory from "./pages/yourstory/YourStory"
import useMediaQuery from "./utils/screenSize"
import { PostIdProvider } from './utils/postIdcontext'
import ShareStoryPage from "./pages/sharestory/ShareStoryPage"
import { AuthProvider } from "./context/authContext"

// import { ApiProvider } from './api/post';
function App() {
  const isMobile = useMediaQuery('(max-width: 780px)');
  // const navigate = useNavigate();
  // if (!isMobile) {
  //   navigate('/');
  // }
  return (

    <div>
      
      <AuthProvider>
        <BrowserRouter>
        <ToastContainer
            theme='dark'
            transition:Bounce
            position="top-center"

          />
          
          {/* <Layout>
          <Routes>
         
            <Route path="/" element={<Home />} />
           
            <Route path="/bookmarks" element={<BookMark />} />
            <Route path="/your_story" element={<YourStory />} />
           
           
            <Route path="/share/:postId" element={<ShareStoryPage />} />
          </Routes>
          </Layout> */}
          <Routes>
         
         <Route path="/" element={<Layout><Home /></Layout>} />
        
         <Route path="/bookmarks" element={<Layout><BookMark /></Layout>} />
         <Route path="/your_story" element={<Layout><YourStory /></Layout>} />
        
        
         <Route path="/share/:postId" element={<ShareStoryPage />} />
       </Routes>

         
          
        </BrowserRouter>

      </AuthProvider>


    </div>
  )
}

export default App