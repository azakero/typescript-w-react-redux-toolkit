import { Product } from './features/products/productsSlice';

const validateProduct = ( product: Product ): Promise<Product> => {
	return new Promise( ( resolve, reject ) =>
		setTimeout( () => {
			if ( product.title.length === 0 ) {
				reject( 'No Title' );
			}

			if ( product.price <= 0 ) {
				reject( 'Price is incorrect' );
			}

			resolve( product );
		}, 1500 )
	);
};

export default validateProduct;
