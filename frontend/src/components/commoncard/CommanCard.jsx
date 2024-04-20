import Images from '../../assets/img1.jpg'
import styles from './CommonCard.module.css'
function CommanCard() {
    return (
        <div className={styles.styleImg}>
         
            <div className={styles.container}>
                <div className={styles.main} style={{ backgroundImage: `url(${Images})` }}>
                    <div className={styles.storyInfo}>
                        <h3>Heading</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                         
                            accusantium quibusdam praesentium ipsam obcaecati nobis?</p>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default CommanCard