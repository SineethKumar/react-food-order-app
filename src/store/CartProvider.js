import React from 'react'
import CartContext from './cart-context'
import { useReducer } from 'react';

const defaultCartState = {
  items: [],
  totalAmount: 0
};

const cartReducer = (state, action) => {
  if (action.type === "ADD")
  {
    const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
    //find the index of the existing item in the items list
    const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
    //take out the item if we get index in the items list else nulll will be stored in it
    const existingCartItem = state.items[existingCartItemIndex];
    
    let updatedItems;
    //if the item exists then update the item itself instead of creating new item with same name
    if (existingCartItem)
    {
      const updatedItem = {
        ...existingCartItem,
      amount: existingCartItem.amount + action.item.amount
      };
      updatedItems = [...state.items]
      updatedItems[existingCartItemIndex] = updatedItem
    }
    //adding the new item if it is not found in the list
    else
    {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  }
  if(action.type === "REMOVE")
  {
    const existingCartItemIndex = state.items.findIndex(item => item.id === action.id)
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;

    let updatedItems;
    if(existingItem.amount ===1 )
    {
      updatedItems = state.items.filter(item => item.id !== action.id)
    }
    else{
      const updatedItem = {...existingItem, amount:existingItem.amount - 1}
      updatedItems = [...state.items]
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    }
  }
  if (action.type === "CLEAR")
  {
    return defaultCartState;
  }
  return defaultCartState;
};

const CartProvider = (props) => {

  const [cartState, dispatchCartAction] = useReducer(cartReducer,defaultCartState);

    const addItemsToCartHandler = (item) => {
      dispatchCartAction({type:"ADD", item:item});
    };

    const removeItemToCartHandler = (id) => {
      dispatchCartAction({type:"REMOVE", id:id})
    };

    const clearCartHandler = () =>{
      dispatchCartAction({type: "CLEAR"})
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemsToCartHandler,
        removeItem: removeItemToCartHandler,
        clearCart: clearCartHandler
    }

  return (
    <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
  )
}

export default CartProvider
