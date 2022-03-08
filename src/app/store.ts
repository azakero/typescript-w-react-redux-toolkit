import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import products from '../features/products/productsSlice';
import cart from '../features/cart/cartSlice';

export const store = configureStore({
	reducer: {
		products,
		cart,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
