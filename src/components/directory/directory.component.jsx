import CategoryItem from '../category-item/category-item.components';

import './directory.styles.scss'

const Directory = ({categories}) => {

    return (
        <div className='directory-container'>
      
            {categories.map((category) => (
            <CategoryItem key={CategoryItem.id} category={category} />
      ))}
      
    </div>
    )
}

export default Directory;