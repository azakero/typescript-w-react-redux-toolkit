import React from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {
	getCartProducts,
	getTotalPrice,
	removeFromCart,
} from '../../features/cart/cartSlice';

const Cart: React.FC = () => {
	const dispatch = useAppDispatch();
	const cartProducts = useAppSelector(getCartProducts);
	const totalPrice = useAppSelector(getTotalPrice);
	const handleRemoveFromCart = (productID: string) => {
		dispatch(removeFromCart(productID));
	};
	return (
		<div>
			<h2>Cart</h2>
			<h5>{totalPrice}</h5>

			{cartProducts.map(product => (
				<div key={product.id}>
					<span>{product.title}</span>
					<span>{product.amount}</span>
					<button onClick={() => handleRemoveFromCart(product.id)}>
						Remove from cart
					</button>
				</div>
			))}
		</div>
	);
};
export default Cart;
