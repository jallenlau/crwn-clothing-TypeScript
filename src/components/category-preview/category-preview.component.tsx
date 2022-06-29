import ProductCard from '../product-card/product-card.component'
import { CategoryItem } from '../../utiles/firebase/firebase.utiles';
import { FC } from 'react';

import {
    CategoryPreviewContainer,
    Title,
    Preview
} from './category-preview.styles'

type CategoryPreviewProps = {
    title: string;
    category: CategoryItem[];
}

const CategoryPreview: FC<CategoryPreviewProps> = ({ title, category }) => {
    return (
        <CategoryPreviewContainer>
            <h2>
                <Title to={title}>{title.toUpperCase()}</Title>
            </h2>
           <Preview>
                {category
                    .filter((_, idx) => idx < 4)
                    .map((product) =>
                        <ProductCard key={product.id} product={product} />
                    )}  
           </Preview>    
        </CategoryPreviewContainer>
    );
};

export default CategoryPreview;