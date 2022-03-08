import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import validateProduct from '../../fakeapi';

export interface Product {
	title: string;
	price: number;
	id: string;
}

export enum ValidationState {
	Fulfilled,
	Pending,
	Rejected,
}

interface ProductSliceState {
	products: Product[];
	validationState?: ValidationState;
	errorMessage?: string;
}

export const addProductAsync = createAsyncThunk(
	'products/addNewProduct',
	async ( initialProduct: Product ) => {
		const product = await validateProduct( initialProduct );
		return product;
	}
);

const initialProducts: Product[] = [
	{ title: 'boom', price: 42, id: '1' },
	{ title: 'boom boom', price: 52, id: '2' },
	{ title: 'boom boom boom', price: 62, id: '3' },
];

const initialState: ProductSliceState = {
	products: initialProducts,
	validationState: undefined,
	errorMessage: undefined,
};

const productsSlice = createSlice( {
	name: 'products',
	initialState,
	reducers: {
		addProduct: ( state, action: PayloadAction<Product> ) => {
			// return [ ...state, action.payload ];
			state.products.push( action.payload );
		},
		removeProduct: ( state, action: PayloadAction<string> ) => {
			return {
				...state,
				products: state.products.filter(
					product => product.id !== action.payload
				),
			};
		},
	},
	extraReducers: builder => {
		builder.addCase( addProductAsync.fulfilled, ( state, action ) => {
			return {
				...state,
				validationState: ValidationState.Fulfilled,
				errorMessage: undefined,
				products: [ ...state.products, action.payload ],
			};
		} );
		builder.addCase( addProductAsync.rejected, ( state, action ) => {
			return {
				...state,
				validationState: ValidationState.Rejected,
				errorMessage: action.error.message,
			};
		} );
		builder.addCase( addProductAsync.pending, ( state, action ) => {
			return {
				...state,
				validationState: ValidationState.Pending,
				errorMessage: undefined,
			};
		} );
	},
} );

export const { addProduct, removeProduct } = productsSlice.actions;
export const getProductsSelector = ( state: RootState ) =>
	state.products.products;
export const getErrorMessage = ( state: RootState ) =>
	state.products.errorMessage;
export default productsSlice.reducer;
