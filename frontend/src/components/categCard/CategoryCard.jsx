import styles from './CategoryCard.module.css'

function CategoryCard({ categoryName, categoryImage , isActive, handleCategorySelect}) {
    // handleCategorySelect(categoryName)
    return (
        // <div className={styles.main}>
            
        // </div>
        <div  className={`${styles.imageCard} ${isActive ? styles.activeCategory : ''}`} >
            <img src={categoryImage} alt={categoryName} className={`${styles.image} ${isActive ? styles.activeCategry : ''}`} />
            <h3 className={styles.title}>{categoryName}</h3>

        </div>
    )
}

export default CategoryCard