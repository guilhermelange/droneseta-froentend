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
import { SessionProvider } from './context/SessionContext'
import HomeAdmin from './components/HomeAdmin';
import AdminCustomer from './components/AdminCustomer';
import AdminProduct from './components/AdminProduct';
import AdminTravel from './components/AdminTravel';
import AdminShopping from './components/AdminShopping';
import AdminProductSales from './components/AdminProductSales'
import AdminProductEdit from './components/AdminProductEdit'
import AdminCustomerEdit from './components/AdminCustomerEdit'
import { AuthProvider } from './context/AuthContext';
import AdminPrivateRoute from './components/AdminPrivateRoute'
import PrivateRoute from './components/PrivateRoute';
import Customer from './pages/Customer'

function App() {
  return (
    <div className="App">
      <SessionProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/admin-login' element={<AdminLogin />}></Route>
              <Route path='/admin' element={<AdminPrivateRoute><Admin><HomeAdmin /></Admin></AdminPrivateRoute>}></Route>
              <Route path='/admin/customer' element={<AdminPrivateRoute><Admin><AdminCustomer /></Admin></AdminPrivateRoute>}></Route>
              <Route path='/admin/customer/:id' element={<AdminPrivateRoute><Admin><AdminCustomerEdit /></Admin></AdminPrivateRoute>}></Route>
              <Route path='/admin/product' element={<AdminPrivateRoute><Admin><AdminProduct /></Admin></AdminPrivateRoute>}></Route>
              <Route path='/admin/product/:id' element={<AdminPrivateRoute><Admin><AdminProductEdit /></Admin></AdminPrivateRoute>}></Route>
              <Route path='/admin/shopping' element={<AdminPrivateRoute><Admin><AdminShopping /></Admin></AdminPrivateRoute>}></Route>
              <Route path='/admin/travel' element={<AdminPrivateRoute><Admin><AdminTravel /></Admin></AdminPrivateRoute>}></Route>
              <Route path='/admin/productsales' element={<AdminPrivateRoute><Admin><AdminProductSales /></Admin></AdminPrivateRoute>}></Route>
              <Route path='/signup' element={<Template><CustomerSignup /></Template>}></Route>
              <Route path='/signin' element={<Template><CustomerSignin /></Template>}></Route>
              <Route path='/' element={<Template><Home /></Template>}></Route>
              <Route path='/cart' element={<Template><Cart /></Template>}></Route>
              <Route path='/search' element={<Template><Search /></Template>}></Route>
              <Route path='/shopping' element={<PrivateRoute><Template><Shopping /></Template></PrivateRoute>}></Route>
              <Route path='/product/:id' element={<Template><Product /></Template>}></Route>
              <Route path='/customer' element={<PrivateRoute><Template><Customer/></Template></PrivateRoute>}></Route>
              <Route path='/template' element={<Template />}></Route>
              <Route path='/toggle-theme' element={<ToggleTheme />}></Route>
              <Route path='*' element={<Template><NotFound /></Template>}></Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </SessionProvider>
    </div>
  );
}

export default App;
