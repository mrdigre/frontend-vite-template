import { useForm } from "@mantine/form";
import { TextInput, Button, Group, Box } from "@mantine/core";
import { useState } from "react";
import axios from "axios";
import AppLayout from "./AppLayout";

export default function GetProducts() {
  const [product, setProduct] = useState(null);
  const form = useForm({
    initialValues: {
      id: "",
    },
  });

  const handleGetProducts = () => {
    // Get the id value from the form
    const id = form.values.id;

    // Send a GET request to your backend with the id as a parameter
    axios
      .get(`http://localhost:3000/api/products/${id}`) // Adjust the URL as per your backend API
      .then(function (response) {
        // handle success
        if (response.status === 200) {
          setProduct(response.data);
        } else {
          console.error(`Error: ${response.status}`);
        }
        // The product data should be in response.data
      })
      .catch(function (error) {
        // handle error
        console.error(error);
      });
  };

  return (
    <AppLayout>
      <Box maw={340} mx="auto">
        <TextInput label="Id" placeholder="Id" {...form.getInputProps("id")} />

        <Group justify="center" mt="xl">
          <Button variant="outline" onClick={handleGetProducts}>
            Get Products
          </Button>
        </Group>

        {product && (
          <div>
            <h2>Product Details</h2>
            <p>ID: {product.id}</p>
            <p>Name: {product.name}</p>
            <p>Price: ${product.price}</p>
            <p>Category: {product.category}</p>
          </div>
        )}
      </Box>
    </AppLayout>
  );
}
