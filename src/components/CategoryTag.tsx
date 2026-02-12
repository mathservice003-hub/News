import React from 'react';
import './CategoryTag.css';

interface CategoryTagProps {
    category: 'AI' | 'Robot' | 'Bio' | 'EdTech';
}

const CategoryTag: React.FC<CategoryTagProps> = ({ category }) => {
    return (
        <span className={`category-tag tag-${category.toLowerCase()}`}>
            {category}
        </span>
    );
};

export default CategoryTag;
