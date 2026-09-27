import Home from "./pages/home/Home"
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BookMark from "./pages/bookmarks/BookMark"
import Layout from "./components/layout/Layout"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import YourStory from "./pages/yourstory/YourStory"

import ShareStoryPage from "./pages/sharestory/ShareStoryPage"
import { AuthProvider } from "./context/authContext"
import ProfilePage from "./pages/profile/ProfilePage"
import AddStoryPage from "./components/addStory/AddStory"
import FollowingFeed from "./pages/social/FollowingFeed"
import Notifications from "./pages/social/Notifications"
import Drafts from "./pages/social/Drafts"
import AccountAction from "./pages/auth/AccountAction"
import { NotificationProvider } from "./context/notificationContext"


function App() {

  return (

    <div>

      <AuthProvider>
        <BrowserRouter>
          <ToastContainer

            theme='dark'
            transition:Bounce
            position="top-center"

          />


          <NotificationProvider>
          <Routes>

            <Route path="/" element={<Layout><Home /></Layout>} />

            <Route path="/bookmarks" element={<Layout><BookMark /></Layout>} />
            <Route path="/your_story" element={<Layout><YourStory /></Layout>} />


            <Route path="/share/:postId" element={<ShareStoryPage />} />
            <Route path="/profile" element={<Layout><ProfilePage /></Layout>} />
            <Route path="/creator/:userId" element={<Layout><ProfilePage /></Layout>} />
            <Route path="/following" element={<Layout><FollowingFeed /></Layout>} />
            <Route path="/notifications" element={<Layout><Notifications /></Layout>} />
            <Route path="/drafts" element={<Layout><Drafts /></Layout>} />
            <Route path="/account/recover" element={<AccountAction mode="recover" />} />
            <Route path="/verify-email" element={<AccountAction mode="verify" />} />
            <Route path="/reset-password" element={<AccountAction mode="reset" />} />
            <Route path="/addstory" element={<Layout><AddStoryPage /></Layout>} />
          </Routes>
          </NotificationProvider>



        </BrowserRouter>

      </AuthProvider>


    </div>
  )
}

export default App
