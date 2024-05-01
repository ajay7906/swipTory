
import styles from './BookMark.module.css'
function BookMarkCompo({ allUserStory,index, data }) {


    return (

        <div className={styles.styleImg}>
            <div className={styles.container}>

                {data ? (

                    <div
                        className={styles.main}

                        style={{ backgroundImage: `linear-gradient(0deg, rgb(0, 0, 0) 20%, rgba(0, 0, 0, 0) 40%), linear-gradient(rgb(0, 0, 0) 14%, rgba(0, 0, 0, 0) 30%), url(${data?.stories[0]?.image})` }}

                    >
                        <div className={styles.storyInfo}>
                            <h3>{data?.stories[0]?.heading}</h3>
                            <p>{data?.stories[0]?.description}</p>
                        </div>
                    </div>
                ) : (
                    <div
                        className={styles.main}
                        style={{
                            backgroundImage: ` linear-gradient(0deg, rgb(0, 0, 0) 20%, rgba(0, 0, 0, 0) 40%), linear-gradient(rgb(0, 0, 0) 14%, rgba(0, 0, 0, 0) 30%) ,url(${allUserStory[index]?.stories[0]?.image})`,
                        }}
                    >
                        <div className={styles.storyInfo}>
                            <h3>{allUserStory[index]?.stories[0]?.heading}</h3>
                            <p>{allUserStory[index]?.stories[0]?.description}</p>
                        </div>
                    </div>
                )}
            </div>
        </div >
    )
}

export default BookMarkCompo