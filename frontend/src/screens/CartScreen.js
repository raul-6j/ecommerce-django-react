import React, { useEffect } from "react";
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../actions/cartActions';

function CartScreen() {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  const productId = id;
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart
  console.log('cartItems', cartItems)

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  return <div>Cart</div>;
}

export default CartScreen;

