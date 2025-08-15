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

function CommanCard({ filteredData }) {
  return (
    <div className="relative overflow-hidden rounded-2xl shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 group">
      {/* Background Image with Gradient Overlay */}
      <div 
        className="relative h-80 w-full"
        style={{ 
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.8) 100%), url(${filteredData?.stories[0]?.image})`,
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
          <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-400 group-hover:to-purple-400 transition-all duration-500">
            {filteredData?.stories[0]?.heading}
          </h3>
          
          {/* Description with Read More Button */}
          <div className="relative overflow-hidden">
            <p className="text-gray-200 text-sm mb-4 transition-all duration-500 group-hover:opacity-80">
              {filteredData?.stories[0]?.description.substring(0, 100)}...
            </p>
            
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
          
          {/* Author Info */}
          <div className="flex items-center mt-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold mr-3">
              {filteredData?.postedBy?.name?.charAt(0)}
            </div>
            <div>
              <p className="text-white text-sm font-medium">{filteredData?.postedBy?.name}</p>
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
      
      {/* Stats Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gray-200 z-20">
        <div 
          className="h-full bg-gradient-to-r from-pink-500 to-purple-500" 
          style={{ width: `${Math.random() * 100}%` }}
        ></div>
      </div>
    </div>
  );
}

export default CommanCard;