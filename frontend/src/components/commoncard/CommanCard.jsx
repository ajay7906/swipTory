import Images from '../../assets/img1.jpg'
import styles from './CommonCard.module.css'
function CommanCard({ filteredData , allUserStory}) {
    console.log(filteredData?.stories[0]?.image);

    return (
        <div className={styles.styleImg}>

            <div className={styles.container}>
                <div className={styles.main} style={{ backgroundImage: `linear-gradient(0deg, rgb(0, 0, 0) 20%, rgba(0, 0, 0, 0) 40%), linear-gradient(rgb(0, 0, 0) 14%, rgba(0, 0, 0, 0) 30%), url(${filteredData?.stories[0]?.image})` }}>
                    <div className={styles.storyInfo}>
                        <h3>{filteredData?.stories[0]?.heading}</h3>
                        <p>
                            {filteredData?.stories[0]?.description}
                            </p>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default CommanCard