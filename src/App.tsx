import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { Routes, Route } from "react-router-dom";
import AddProduct from "./AddProduct.tsx";
import Home from "./Home.tsx";
import GetUniqueProducts from "./GetUniqueProduct.tsx";
import DeleteProduct from "./DeleteProduct.tsx";
import UpdateProduct from "./UpdateProduct.tsx";

export default function App() {
  return (
    <MantineProvider theme={{}}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/get-unique-products" element={<GetUniqueProducts />} />
        <Route path="/delete-product" element={<DeleteProduct />} />
        <Route path="/update-product" element={<UpdateProduct />} />
      </Routes>
    </MantineProvider>
  );
}
