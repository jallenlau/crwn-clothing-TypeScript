import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ProductCard from '../../components/product-card/product-card.component';
import { selectCategoriesMap, isSetCategoriesIsLoading } from '../../store/categories/category.selector';

import { CategoryContainer, Title } from './category.styles';
import Spinner from '../../components/spinner/spinner.component';

type CategoryRouteProps = {
    category: string;
}

const Category = () => {
    const { category } = useParams<keyof CategoryRouteProps>() as CategoryRouteProps;
    console.log('render/re-rendering component');
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(isSetCategoriesIsLoading);
    const [ products, setProducts ] = useState(categoriesMap[category]);

    useEffect(() => {
        console.log('effect fired calling setProducts');
        setProducts(categoriesMap[category]);
     },[category, categoriesMap])
    
    return (
        <Fragment>
            <Title>{category.toUpperCase()}</Title>
            {
            isLoading ? (<Spinner />) :
            (<CategoryContainer>
                {products &&
                    products.map((product) =>  
                    <ProductCard key={product.id} product={product} />   
                )}
            </CategoryContainer>)
            }
        </Fragment>
    )
};

export default Category;