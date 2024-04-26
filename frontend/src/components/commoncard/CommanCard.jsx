import Images from '../../assets/img1.jpg'
import styles from './CommonCard.module.css'
function CommanCard({ filteredData , allUserStory}) {
    console.log(filteredData?.stories[0]?.image);

    return (
        <div className={styles.styleImg}>

            <div className={styles.container}>
                <div className={styles.main} style={{ backgroundImage: `url(${filteredData?.stories[0]?.image})` }}>
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