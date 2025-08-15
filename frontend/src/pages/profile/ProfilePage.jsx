// src/pages/ProfilePage.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaBookmark, FaHeart, FaShareAlt, FaClock, FaEye } from 'react-icons/fa';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('stories');
  const [userData, setUserData] = useState({
    name: "Alex Morgan",
    email: "alex.morgan@example.com",
    bio: "Passionate storyteller and digital creator. I write about technology, travel, and personal growth. Join me on my journey!",
    followers: 1280,
    following: 342,
    storiesCount: 27,
    joinDate: "Jan 2023"
  });

  // Mock data for stories
  const [stories, setStories] = useState([
    {
      id: 1,
      title: "The Journey to the Mountains",
      category: "Adventure",
      date: "May 15, 2023",
      readTime: "5 min",
      likes: 42,
      shares: 12,
      saved: true,
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Learning React in 2023",
      category: "Technology",
      date: "Apr 28, 2023",
      readTime: "8 min",
      likes: 128,
      shares: 24,
      saved: false,
      image: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "A Culinary Adventure in Italy",
      category: "Food & Travel",
      date: "Mar 10, 2023",
      readTime: "6 min",
      likes: 89,
      shares: 18,
      saved: true,
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    }
  ]);

  // Mock data for saved stories
  const [savedStories, setSavedStories] = useState([
    {
      id: 4,
      title: "The Art of Mindfulness",
      category: "Wellness",
      date: "Jun 2, 2023",
      readTime: "4 min",
      likes: 56,
      shares: 7,
      saved: true,
      author: "Sarah Johnson",
      image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 5,
      title: "Sustainable Living in Cities",
      category: "Lifestyle",
      date: "May 20, 2023",
      readTime: "7 min",
      likes: 73,
      shares: 15,
      saved: true,
      author: "Michael Chen",
      image: "https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    }
  ]);

  // Mock data for liked stories
  const [likedStories, setLikedStories] = useState([
    {
      id: 6,
      title: "Building a Startup from Scratch",
      category: "Business",
      date: "Jun 10, 2023",
      readTime: "10 min",
      likes: 210,
      shares: 42,
      saved: false,
      author: "David Wilson",
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    }
  ]);

  // Mock data for shared stories
  const [sharedStories, setSharedStories] = useState([
    {
      id: 7,
      title: "The Future of AI in Healthcare",
      category: "Technology",
      date: "Apr 15, 2023",
      readTime: "9 min",
      likes: 156,
      shares: 68,
      saved: false,
      author: "Emma Rodriguez",
      image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    }
  ]);

  // Mock data for stats
  const [stats, setStats] = useState({
    stories: 27,
    followers: 1280,
    following: 342,
    likes: 894,
    shares: 156,
    readingTime: "42 hours"
  });

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex justify-center">
      <div className="max-w-6xl mx-auto px-4">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80" 
                alt="Profile" 
                className="w-32 h-32 rounded-full object-cover border-4 border-indigo-100"
              />
              <button className="absolute bottom-2 right-2 bg-indigo-600 text-white p-2 rounded-full shadow-md hover:bg-indigo-700 transition-colors">
                <FaEdit className="text-sm" />
              </button>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">{userData.name}</h1>
                  <p className="text-gray-600 mt-1">{userData.email}</p>
                  <p className="text-gray-500 mt-3 max-w-2xl">{userData.bio}</p>
                </div>
                <button className="mt-4 md:mt-0 px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                  Edit Profile
                </button>
              </div>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-indigo-600">{stats.stories}</p>
                  <p className="text-gray-600">Stories</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-indigo-600">{stats.followers}</p>
                  <p className="text-gray-600">Followers</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-indigo-600">{stats.following}</p>
                  <p className="text-gray-600">Following</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-indigo-600">{stats.likes}</p>
                  <p className="text-gray-600">Likes</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-indigo-600">{stats.shares}</p>
                  <p className="text-gray-600">Shares</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-8 overflow-hidden">
          <div className="flex flex-wrap border-b border-gray-200">
            {['stories', 'saved', 'liked', 'shared', 'stats', 'settings'].map((tab) => (
              <button
                key={tab}
                className={`px-6 py-4 font-medium text-sm md:text-base capitalize transition-colors ${
                  activeTab === tab 
                    ? 'text-indigo-600 border-b-2 border-indigo-600' 
                    : 'text-gray-600 hover:text-indigo-500'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'saved' ? 'Saved Stories' : 
                 tab === 'liked' ? 'Liked Stories' : 
                 tab === 'shared' ? 'Shared Stories' : 
                 tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          {/* Stories Tab */}
          {activeTab === 'stories' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Stories</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stories.map((story) => (
                  <StoryCard key={story.id} story={story} isOwner={true} />
                ))}
              </div>
            </div>
          )}

          {/* Saved Stories Tab */}
          {activeTab === 'saved' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Saved Stories</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedStories.map((story) => (
                  <StoryCard key={story.id} story={story} isOwner={false} />
                ))}
              </div>
            </div>
          )}

          {/* Liked Stories Tab */}
          {activeTab === 'liked' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Liked Stories</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {likedStories.map((story) => (
                  <StoryCard key={story.id} story={story} isOwner={false} />
                ))}
              </div>
            </div>
          )}

          {/* Shared Stories Tab */}
          {activeTab === 'shared' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Shared Stories</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sharedStories.map((story) => (
                  <StoryCard key={story.id} story={story} isOwner={false} />
                ))}
              </div>
            </div>
          )}

          {/* Statistics Tab */}
          {activeTab === 'stats' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Statistics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard 
                  title="Total Stories" 
                  value={stats.stories} 
                  icon={<FaEye className="text-indigo-500 text-xl" />} 
                  description="Stories you've published"
                />
                <StatCard 
                  title="Total Likes" 
                  value={stats.likes} 
                  icon={<FaHeart className="text-red-500 text-xl" />} 
                  description="Likes on your stories"
                />
                <StatCard 
                  title="Total Shares" 
                  value={stats.shares} 
                  icon={<FaShareAlt className="text-green-500 text-xl" />} 
                  description="Shares of your stories"
                />
                <StatCard 
                  title="Followers" 
                  value={stats.followers} 
                  icon={<FaHeart className="text-pink-500 text-xl" />} 
                  description="People following you"
                />
                <StatCard 
                  title="Following" 
                  value={stats.following} 
                  icon={<FaEye className="text-blue-500 text-xl" />} 
                  description="People you follow"
                />
                <StatCard 
                  title="Reading Time" 
                  value={stats.readingTime} 
                  icon={<FaClock className="text-yellow-500 text-xl" />} 
                  description="Total time spent reading"
                />
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Account Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Profile Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        defaultValue={userData.name}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        defaultValue={userData.email}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">Bio</label>
                      <textarea
                        defaultValue={userData.bio}
                        rows="3"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      ></textarea>
                    </div>
                    <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                      Update Profile
                    </button>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Security</h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">Change Password</h4>
                      <div className="space-y-3">
                        <input
                          type="password"
                          placeholder="Current Password"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <input
                          type="password"
                          placeholder="New Password"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <input
                          type="password"
                          placeholder="Confirm New Password"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <button className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                        Update Password
                      </button>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200">
                      <h4 className="font-medium text-gray-800 mb-2">Account Actions</h4>
                      <div className="space-y-3">
                        <button className="w-full px-4 py-2 text-left text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
                          Deactivate Account
                        </button>
                        <button className="w-full px-4 py-2 text-left text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Story Card Component
const StoryCard = ({ story, isOwner }) => {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative">
        <img 
          src={story.image} 
          alt={story.title} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3 bg-indigo-600 text-white text-xs font-medium px-2 py-1 rounded">
          {story.category}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-800">{story.title}</h3>
          {isOwner && (
            <button className="text-gray-400 hover:text-indigo-600">
              <FaEdit />
            </button>
          )}
        </div>
        
        <div className="flex justify-between text-sm text-gray-500 mb-3">
          <span>{story.date}</span>
          <span className="flex items-center">
            <FaClock className="mr-1" /> {story.readTime}
          </span>
        </div>
        
        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <div className="flex space-x-4">
            <button className="flex items-center text-gray-500 hover:text-red-500">
              <FaHeart className="mr-1" /> {story.likes}
            </button>
            <button className="flex items-center text-gray-500 hover:text-green-500">
              <FaShareAlt className="mr-1" /> {story.shares}
            </button>
          </div>
          
          <button className={`flex items-center ${story.saved ? 'text-indigo-600' : 'text-gray-400 hover:text-indigo-600'}`}>
            <FaBookmark />
          </button>
        </div>
        
        {!isOwner && (
          <div className="mt-3 text-sm text-gray-600">
            By {story.author}
          </div>
        )}
      </div>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ title, value, icon, description }) => {
  return (
    <div className="bg-gradient-to-br from-white to-indigo-50 border border-indigo-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center mb-3">
        <div className="bg-indigo-100 p-2 rounded-lg mr-3">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      <p className="text-3xl font-bold text-indigo-600 mb-2">{value}</p>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};

export default ProfilePage;