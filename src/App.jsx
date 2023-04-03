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
import {SessionProvider} from './context/SessionContext'
import HomeAdmin from './components/HomeAdmin';
import AdminCustomer from './components/AdminCustomer';
import AdminProduct from './components/AdminProduct';
import AdminTravel from './components/AdminTravel';
import AdminShopping from './components/AdminShopping';
import AdminProductSales from './components/AdminProductSales'

function App() {
  return (
    <div className="App">
      <SessionProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/admin-login' element={<AdminLogin />}></Route>
            <Route path='/admin' element={<Admin><HomeAdmin/></Admin>}></Route>
            <Route path='/admin/customer' element={<Admin><AdminCustomer/></Admin>}></Route>
            <Route path='/admin/product' element={<Admin><AdminProduct/></Admin>}></Route>
            <Route path='/admin/shopping' element={<Admin><AdminShopping/></Admin>}></Route>
            <Route path='/admin/travel' element={<Admin><AdminTravel/></Admin>}></Route>
            <Route path='/admin/productsales' element={<Admin><AdminProductSales/></Admin>}></Route>
            <Route path='/signup' element={<CustomerSignup />}></Route>
            <Route path='/signin' element={<CustomerSignin />}></Route>
            <Route path='/' element={<Home />}></Route>
            <Route path='/cart' element={<Cart />}></Route>
            <Route path='/search' element={<Search />}></Route>
            <Route path='/shopping' element={<Shopping />}></Route>
            <Route path='/product/:id' element={<Product />}></Route>
            <Route path='/template' element={<Template />}></Route>
            <Route path='/toggle-theme' element={<ToggleTheme />}></Route>
            <Route path='*' element={<NotFound />}></Route>
          </Routes>
        </BrowserRouter>
      </SessionProvider>
    </div>
  );
}

export default App;
