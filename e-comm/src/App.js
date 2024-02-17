import React from "react";
import Dash from "./Dashboard/Dash";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateComponent from "./PrivateComponent";
import Login from "./Auth/Login";
import Register from "./Register/Register";
import "./App.css";

import { Layout } from "antd";
import AddProduct from "./Components/AddProduct";
import ShowProduct from "./Components/ShowProducts";
import ProductDetails from "./Components/ProductDetails";
import UpdateProduct from "./Components/UpdateProduct";
import ShowCart from "./Components/ShowCart";

function App() {
  return (
    <Layout className="site-layout">
      <BrowserRouter>
        {/* <Header />
        <Layout
          style={{
            minHeight: "100vh",
          }}
        >
          <Sidebar /> */}
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/addProduct" element={<AddProduct />} />
            <Route path="/showProduct" element={<ShowProduct />} />
            <Route path="/productDetails/:id" element={<ProductDetails />} />
            <Route path="/updateProduct/:id" element={<UpdateProduct />} />
            <Route path="/showCart" element={<ShowCart />} />
          </Route>
          <Route path="/" element={<Dash />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        {/* <Footer
          style={{
            textAlign: 'center',
          }}
        >
        </Footer> */}
        {/* </Layout> */}
      </BrowserRouter>
    </Layout>
  );
}

export default App;
