import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SiteDataProvider } from './context/SiteDataContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Products from './pages/Products';
import Customers from './pages/Customers';
import Finance from './pages/Finance';
import Settings from './pages/Settings';
import Personalize from './pages/Personalize';
import AddProduct from './pages/AddProduct';
import AddCustomer from './pages/AddCustomer';

export default function App() {
  return (
    <BrowserRouter>
      <SiteDataProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="orders" element={<Orders />} />
            <Route path="products" element={<Products />} />
            <Route path="products/add" element={<AddProduct />} />
            <Route path="customers" element={<Customers />} />
            <Route path="customers/add" element={<AddCustomer />} />
            <Route path="finance" element={<Finance />} />
            <Route path="settings" element={<Settings />} />
            <Route path="personalize" element={<Personalize />} />
          </Route>
        </Routes>
      </SiteDataProvider>
    </BrowserRouter>
  );
}