import { useForm } from "@mantine/form";
import { TextInput, Button, Group, Box, Select } from "@mantine/core";
import { useEffect, useState } from "react";

import axios from "axios";

export default function AddProduct() {
  const form = useForm({
    initialValues: {
      name: "",
      price: "",
      categoryId: "",
      stock: "",
    },
  });

  const [msg, setMsg] = useState("");
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3000/api/categories").then((response) => {
      const categories = response.data;
      const newCategories = categories.map((item) => {
        return { value: String(item.id), label: item.name };
      });
      setCategories(newCategories);
    });
  }, []);

  const handleAddProduct = () => {
    const newProduct = {
      name: form.values.name,
      price: parseFloat(form.values.price),
      categoryId: parseFloat(form.values.categoryId),
      stock: parseFloat(form.values.stock),
    };

    axios
      .post("http://localhost:3000/api/products", newProduct) // Adjust the URL as per your backend API
      .then(function (response) {
        // Handle success
        setMsg("Product Added Successfully");
        console.log("Product added successfully.");
        // You can perform further actions like clearing the form or updating the UI after successful addition.
      })
      .catch(function (error) {
        // Handle error
        console.error(error);
      });
  };

  return (
    <Box maw={340} mx="auto" mt="md">
      <TextInput
        label="Name"
        placeholder="Name"
        {...form.getInputProps("name")}
      />
      <TextInput
        mt="md"
        label="Price"
        placeholder="Price"
        {...form.getInputProps("price")}
      />
      <Select
        mt="md"
        color="black"
        label="Category"
        placeholder="Pick Category"
        data={categories}
        {...form.getInputProps("categoryId")}
      />
      <TextInput
        mt="md"
        label="Stock"
        placeholder="Stock"
        {...form.getInputProps("stock")}
      />
      <Group justify="center" mt="xl">
        <Button variant="outline" onClick={handleAddProduct}>
          Add Product
        </Button>
      </Group>
      <Box m="md"> {msg} </Box>
    </Box>
  );
}
