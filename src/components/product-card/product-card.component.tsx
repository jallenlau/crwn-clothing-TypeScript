import { useSelector, useDispatch } from 'react-redux';
import { FC } from 'react';

import { addItemToCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';
import { CategoryItem } from '../../utiles/firebase/firebase.utiles';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component'

import {
    ProductCardContainer,
    Footer,
    Name,
    Price,
} from './product-card.styles'

type ProductProps = {
    product: CategoryItem;
}

const ProductCard:FC<ProductProps> = ({ product }) => {
    const dispatch = useDispatch();
    const { name, price, imageUrl } = product;
    const cartItems = useSelector(selectCartItems);

    const addItem = () => dispatch(addItemToCart(cartItems, product));

    return (
        <ProductCardContainer>
            <img src={ imageUrl } alt={`${name}`} />
            <Footer>
                <Name>{ name }</Name>
                <Price>{ price }</Price>
            </Footer>
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addItem}>
                Add to Card
            </Button>
        </ProductCardContainer>
    )
}

export default ProductCard;
