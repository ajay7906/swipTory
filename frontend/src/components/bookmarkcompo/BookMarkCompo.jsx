import Images from '../../assets/img1.jpg'
import styles from './BookMark.module.css'
function BookMarkCompo({   allUserStory}) {
   

    return (
        <div className={styles.styleImg}>

            <div className={styles.container}>
                <div className={styles.main} style={{ backgroundImage: `url(${allUserStory[0]?.stories[0]?.image})` }}>
                    <div className={styles.storyInfo}>
                        <h3>{allUserStory[0]?.stories[0]?.heading}</h3>
                        <p>
                       { allUserStory[0]?.stories[0]?.description}
                            </p>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default BookMarkCompo