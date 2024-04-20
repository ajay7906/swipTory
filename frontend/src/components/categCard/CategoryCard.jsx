import styles from './CategoryCard.module.css'

function CategoryCard({ categoryName, categoryImage }) {
    return (
        // <div className={styles.main}>
            
        // </div>
        <div  className={styles.imageCard} >
            <img src={categoryImage} alt={categoryName} className={styles.image} />
            <h3 className={styles.title}>{categoryName}</h3>

        </div>
    )
}

export default CategoryCard