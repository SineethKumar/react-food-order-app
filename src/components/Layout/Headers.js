import React, { Fragment } from 'react';
import classes from './Headers.module.css';
import MealsImage from '../../assets/meals.jpg'
import HeaderCartButton from './HeaderCartButton';

const Headers = props => {
    return (
        <Fragment>
            <header className={classes.header}>
                <h1>ReactMeals</h1>
                <HeaderCartButton onClick={props.onShowCart}/>
            </header>
            <div className={classes['main-image']}>
                <img src={MealsImage} alt="A table of delicious meals."/>
            </div>
        </Fragment>
    )
}

export default Headers;