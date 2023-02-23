import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AdminLogin from './pages/AdminLogin';
import NotFound from './pages/NotFound';
import Admin from './pages/Admin';
import ToggleTheme from './pages/ToggleTheme';
import CustomerSignup from './pages/CustomerSignup';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/admin-login' element={<AdminLogin/>}></Route>
          <Route path='/admin' element={<Admin/>}></Route>
          <Route path='/signup' element={<CustomerSignup/>}></Route>
          <Route path='/'></Route>
          <Route path='/toggle-theme'  element={<ToggleTheme/>}></Route>
          <Route path='*' element={<NotFound/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
