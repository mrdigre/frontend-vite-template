import { useForm } from "@mantine/form";
import { TextInput, Button, Group, Box } from "@mantine/core";
import { useState } from "react";
import AppLayout from "./AppLayout";

import axios from "axios";

export default function DeleteProduct() {
  const [deletedProduct, setDeletedProduct] = useState(null);

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
      .delete(`http://localhost:3000/api/products/${id}`) // Adjust the URL as per your backend API
      .then(function (response) {
        // handle success
        setDeletedProduct(response.data);
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
            Delete Product
          </Button>
        </Group>

        {deletedProduct && (
          <div>
            <h2>Product {deletedProduct.name} was deleted</h2>
          </div>
        )}
      </Box>
    </AppLayout>
  );
}
