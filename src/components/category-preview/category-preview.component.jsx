import ProductCard from '../product-card/product-card.component.tsx'

import {
    CategoryPreviewContainer,
    Title,
    Preview
} from './category-preview.styles.jsx'

const CategoryPreview = ({ title, category }) => {
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