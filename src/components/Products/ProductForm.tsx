import React, { useState } from 'react';
import {
	addProductAsync,
	getErrorMessage,
	Product,
} from '../../features/products/productsSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

interface ProductFormProps { }

const ProductForm: React.FC<ProductFormProps> = () => {
	const dispatch = useAppDispatch();

	const errorMessage = useAppSelector( getErrorMessage );

	const [ product, setProduct ] = useState<Product>( {
		id: '',
		title: '',
		price: 0,
	} );

	const handleChange = ( {
		target: { name, value },
	}: React.ChangeEvent<HTMLInputElement> ) =>
		setProduct( prev => {
			( prev as any )[ name ] = value;
			const newValue = { ...prev };
			return newValue;
		} );

	const handleSubmit = ( e: React.FormEvent ) => {
		e.preventDefault();

		dispatch( addProductAsync( product ) );
	};

	const { title, id, price } = product;

	return (
		<div>
			<h2>Add Game to the store</h2>

			{ errorMessage && <span>error: { errorMessage }</span> }

			<form onSubmit={ handleSubmit }>
				<input
					type='text'
					placeholder='Game title'
					name='title'
					value={ title }
					onChange={ handleChange }
					style={ {
						border: errorMessage
							? '1px solid red'
							: '1px solid black',
					} }
				/>
				<input
					type='number'
					placeholder='Price'
					name='price'
					value={ price }
					onChange={ handleChange }
					style={ {
						border: errorMessage
							? '1px solid red'
							: '1px solid black',
					} }
				/>
				<input
					type='text'
					placeholder='id'
					name='id'
					value={ id }
					onChange={ handleChange }
					style={ {
						border: errorMessage
							? '1px solid red'
							: '1px solid black',
					} }
				/>
				<button
					style={ { backgroundColor: errorMessage ? 'red' : '#999999' } }
					type='submit'
				>
					Add Product
				</button>
			</form>
		</div>
	);
};

export default ProductForm;
