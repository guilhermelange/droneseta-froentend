import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AdminLogin from './pages/AdminLogin';
import NotFound from './pages/NotFound';
import Admin from './pages/Admin';
import ToggleTheme from './pages/ToggleTheme';
import CustomerSignup from './pages/CustomerSignup';
import CustomerSignin from './pages/CustomerSignin';
import Home from './pages/Home';
import Template from './pages/Template';
import Product from './pages/Product'
import Cart from './pages/Cart'
import Search from './pages/Search';
import Shopping from './pages/Shopping';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/admin-login' element={<AdminLogin/>}></Route>
          <Route path='/admin' element={<Admin/>}></Route>
          <Route path='/signup' element={<CustomerSignup/>}></Route>
          <Route path='/signin' element={<CustomerSignin/>}></Route>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/cart' element={<Cart/>}></Route>
          <Route path='/search' element={<Search/>}></Route>
          <Route path='/shopping' element={<Shopping/>}></Route>
          <Route path='/product' element={<Product/>}></Route>
          <Route path='/template' element={<Template/>}></Route>
          <Route path='/toggle-theme'  element={<ToggleTheme/>}></Route>
          <Route path='*' element={<NotFound/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
