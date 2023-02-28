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
import Footer from './pages/Footer';
import Product from './pages/Product'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/admin-login' element={<AdminLogin/>}></Route>
          <Route path='/admin' element={<Admin/>}></Route>
          <Route path='/signup' element={<CustomerSignup/>}></Route>
          <Route path='/signin' element={<CustomerSignin/>}></Route>
          <Route path='/home' element={<Home/>}></Route>
          <Route path='/product' element={<Product/>}></Route>
          <Route path='/template' element={<Template/>}></Route>
          <Route path='/footer' element={<Footer/>}></Route>
          <Route path='/toggle-theme'  element={<ToggleTheme/>}></Route>
          <Route path='*' element={<NotFound/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
