import CommanCard from "../commoncard/CommanCard"
import styles from './FoodCompo.module.css'

function FoodCompo() {
    return (
        <div className={styles.data}>
            <div className={styles.htag}><h2>Top Stories About food</h2></div>
            <div className={styles.main}>
                <CommanCard />
                <CommanCard />
                <CommanCard />
                <CommanCard />
            </div>
        </div>
    )
}

export default FoodCompo