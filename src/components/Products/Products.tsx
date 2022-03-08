import React from 'react';
import {
	getProductsSelector,
	Product,
	removeProduct,
} from '../../features/products/productsSlice';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {addToCart} from '../../features/cart/cartSlice';

interface ProductProps {}

const Products: React.FC<ProductProps> = () => {
	const dispatch = useAppDispatch();
	const products = useAppSelector(getProductsSelector);

	const removeHandler = (id: string) => {
		dispatch(removeProduct(id));
	};

	const addToCartHandler = (product: Product) => {
		dispatch(addToCart(product));
	};

	return (
		<div>
			<h2>Games List</h2>

			{products.map(product => (
				<div key={product.id}>
					<span>{`${product.title}: ${product.price}`}</span>
					<button onClick={() => addToCartHandler(product)}>
						Add To Cart
					</button>
					<button onClick={e => removeHandler(product.id)}>
						Remove from the store
					</button>
				</div>
			))}
		</div>
	);
};

export default Products;
