// import Images from '../../assets/img1.jpg'
// import styles from './CommonCard.module.css'
// function CommanCard({ filteredData }) {
   
//     return (
//         <div className={styles.styleImg}>

//             <div className={styles.container}>
//                 <div className={styles.main} style={{ backgroundImage: `linear-gradient(0deg, rgb(0, 0, 0) 20%, rgba(0, 0, 0, 0) 40%), linear-gradient(rgb(0, 0, 0) 14%, rgba(0, 0, 0, 0) 30%), url(${filteredData?.stories[0]?.image})` }}>
//                     <div className={styles.storyInfo}>
//                         <h3>{filteredData?.stories[0]?.heading}</h3>
//                         <p>
//                             {filteredData?.stories[0]?.description}
//                             </p>
//                     </div>


//                 </div>
//             </div>
//         </div>
//     )
// }

// export default CommanCard






import React from 'react';
import { Link } from 'react-router-dom';

function CommanCard({ filteredData }) {
  const firstSlide = filteredData?.stories?.[0] || {};
  const title = filteredData?.title || firstSlide.heading || 'Untitled post';
  const preview = filteredData?.body || firstSlide.description || '';
  const cover = filteredData?.coverImage || firstSlide.image;
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-slate-900 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl focus-within:ring-4 focus-within:ring-violet-300">
      {/* Background Image with Gradient Overlay */}
      <div 
        className="relative h-[270px] w-full sm:h-80"
        style={{ 
          backgroundImage: `linear-gradient(to bottom, rgba(15,23,42,0.02) 15%, rgba(15,23,42,0.88) 100%), ${cover ? `url(${cover})` : 'linear-gradient(135deg,#6d28d9,#db2777)'}`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Category Badge */}
        <div className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm font-bold py-1 px-3 rounded-full z-10">
          {filteredData?.chooseCategory}
        </div>
        
        {/* Content Container */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
          {/* Title with Gradient Text */}
          <h3 className="mb-2 line-clamp-2 break-words text-xl font-bold text-white transition-colors duration-300 group-hover:text-violet-200 md:text-2xl">
            {title}
          </h3>
          
          {/* Description with Read More Button */}
          <div className="relative overflow-hidden">
            <p className="mb-3 line-clamp-2 break-words text-sm text-gray-200 transition-all duration-300 group-hover:opacity-90">
              {preview}
            </p>
            
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
          
          {/* Author Info */}
          <div className="flex items-center mt-4">
            <Link to={filteredData?.author?._id ? `/creator/${filteredData.author._id}` : '#'} onClick={(e) => e.stopPropagation()} className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold mr-3 overflow-hidden">
              {filteredData?.author?.avatar ? <img src={filteredData.author.avatar} alt="" className="h-full w-full object-cover" /> : filteredData?.author?.username?.charAt(0)?.toUpperCase() || 'S'}
            </Link>
            <div>
              <Link to={filteredData?.author?._id ? `/creator/${filteredData.author._id}` : '#'} onClick={(e) => e.stopPropagation()} className="text-white text-sm font-medium hover:underline">@{filteredData?.author?.username || 'Storyteller'}</Link>
              <p className="text-gray-300 text-xs">
                {new Date(filteredData?.createdAt).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </p>
            </div>
          </div>
        </div>
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
      
      <div className="absolute left-4 top-4 z-20 rounded-full bg-black/35 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">♡ {filteredData?.likes?.length || 0} <span className="mx-1 text-white/50">·</span> {filteredData?.viewCount || 0} reads</div>
    </div>
  );
}

export default CommanCard;
