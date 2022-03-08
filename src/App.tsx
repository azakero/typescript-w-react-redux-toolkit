import './App.css';
import Products from './components/Products/Products';
import ProductForm from './components/Products/ProductForm';
import Cart from './components/Cart/Cart';

const App = () => {
	return (
		<div className='App'>
			<Products />
			<ProductForm />
			<Cart />
		</div>
	);
};

export default App;
