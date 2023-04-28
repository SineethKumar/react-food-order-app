import {useRef, useState} from 'react';
import classes from './Checkout.module.css';

const isEmpty = (value) => value.trim() ==='';
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {

  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalcode:true,
  })

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalcodeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredname = nameInputRef.current.value;
    const enteredstreet = streetInputRef.current.value;
    const enteredpostalcode = postalcodeInputRef.current.value;
    const enteredcity = cityInputRef.current.value;

    const nameIsValid = !isEmpty(enteredname);
    const streetIsValid = !isEmpty(enteredstreet);
    const cityIsValid = !isEmpty(enteredcity)
    const postalcodeIsValid = isFiveChars(enteredpostalcode)

    setFormInputValidity({
      name: nameIsValid,
      street: streetIsValid,
      city: cityIsValid,
      postacode: postalcodeIsValid
    })

    const isFormValid = nameIsValid && streetIsValid && cityIsValid && postalcodeIsValid;
    if (!isFormValid)
    {
      return;
    }
    props.onConfirm({
      name: enteredname,
      street: enteredstreet,
      postalcode: enteredpostalcode,
      city: enteredcity
    })
  };

  const nameControlClasses = `${classes.control} ${formInputValidity.name ? "" : classes.invalid}`
  const streetControlClasses = `${classes.control} ${formInputValidity.street ? "" : classes.invalid}`
  const cityControlClasses = `${classes.control} ${formInputValidity.city ? "" : classes.invalid}`
  const postalcodeControlClasses = `${classes.control} ${formInputValidity.postalcode ? "" : classes.invalid}`

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef}/>
        {!formInputValidity.name && <p>Please enter the valid name</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef} />
        {!formInputValidity.street && <p>Please enter the valid street</p>}
      </div>
      <div className={postalcodeControlClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalcodeInputRef} />
        {!formInputValidity.postalcode && <p>Please enter the valid postalcode of 5 char long</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef}/>
        {!formInputValidity.city && <p>Please enter the valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;