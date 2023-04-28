import classes from './HeaderCartButton.module.css';
import { FaShoppingCart } from "react-icons/fa";
import { useContext, useEffect,useState } from 'react';
import CartContext from '../../store/cart-context';

const HeaderCartButton = props =>{

    const [btnIsHighlited, setBtnIsHighlited] = useState(false);

    const CartCtx = useContext(CartContext);
    const {items} = CartCtx;

    const numberOfCartContext = items.reduce((curNumber, item) => {
        return curNumber + item.amount
    }, 0);

    const btnClasses = `${classes.button} ${btnIsHighlited ? classes.bump : ''}`;

    useEffect(() => {
        if(items.length ===0)
        {
            return
        }
        setBtnIsHighlited(true);
        const timer = setTimeout(() => {
            setBtnIsHighlited(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        }

    }, [items]);

    return(
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}><FaShoppingCart/></span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartContext}</span>
        </button>
    )
}

export default HeaderCartButton;