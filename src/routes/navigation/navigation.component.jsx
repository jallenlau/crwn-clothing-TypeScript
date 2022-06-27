import { Outlet } from "react-router-dom";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';

import { ReactComponent as CrwnLogo } from '../../assest/crown.svg'
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { selectCurrentUser } from '../../store/user/user.selector'
import { selectIsCartOpen } from '../../store/cart/cart.selector'
import { signOutStart } from "../../store/user/user.action";

import { NavigationContainer, LogoContainer, NavLinks, NavLink } from './navigation.styles.jsx'

const Navigation = () => {
    const currentUser = useSelector(selectCurrentUser);
    const isCartOpen = useSelector(selectIsCartOpen);
    const dispatch = useDispatch();

    const signOut = () => dispatch(signOutStart());

    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to="/">
                    <CrwnLogo className="logo"/>
                </LogoContainer>
                <NavLinks>
                    <NavLink to="/shop">SHOP</NavLink>
                    <NavLink to="/shop">CONTACT</NavLink>      
                    {currentUser ? (
                        <NavLink as='span' onClick={ signOut }>SIGN OUT</NavLink>
                    ) : (
                        <NavLink to="/auth">SIGN IN</NavLink>
                    )}       
                    <CartIcon/>
                </NavLinks>
                {isCartOpen && <CartDropdown /> }  
            </NavigationContainer>
            <Outlet />
        </Fragment>
    )
}
   
export default Navigation;