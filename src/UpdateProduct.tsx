import { useForm } from "@mantine/form";
import { TextInput, Button, Group, Box } from "@mantine/core";
import { useState } from "react";
import axios from "axios";
import AppLayout from "./AppLayout";

export default function GetProducts() {
  const [product, setProduct] = useState(null);
  const [msg, setMsg] = useState("");

  const form = useForm({
    initialValues: {
      id: "",
      name: "",
      price: "",
      stock: "",
    },
  });

  return (
    <AppLayout>
      <Box maw={340} mt="xl" mx="auto">
        <TextInput
          label="Inser product Id"
          placeholder="Inser product Id"
          {...form.getInputProps("id")}
        />

        <Button
          mt="xl"
          variant="outline"
          onClick={() => {
            // Get the id value from the form
            const id = form.values.id;
            if (!form.values.id) return alert("Insert product Id");
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
          }}
        >
          Get Products
        </Button>

        <Group justify="center" mt="xl"></Group>

        {product && (
          <Group>
            <TextInput
              label={product.name}
              placeholder="Insert updated name"
              {...form.getInputProps("name")}
            />
            <TextInput
              label={`$ ${product.price}`}
              placeholder="Insert updated Price"
              {...form.getInputProps("price")}
            />

            <TextInput
              label={product.stock}
              placeholder="Inset updated Stock"
              {...form.getInputProps("stock")}
            />
            <Button
              mt="xl"
              variant="outline"
              onClick={() => {
                // Get the id value from the form
                const id = form.values.id;
                const updatedData = {
                  name: form.values.name,
                  price: parseInt(form.values.price),
                  stock: parseInt(form.values.stock),
                };
                if (
                  !form.values.id ||
                  !form.values.name ||
                  !form.values.price ||
                  !form.values.stock
                )
                  return alert("Please complete all input fields");
                // Send a PUT request to your backend with the id as a parameter
                axios
                  .put(`http://localhost:3000/api/products/${id}`, updatedData)
                  .then(function (response) {
                    // handle success
                    if (response.status === 200) {
                      setProduct(response.data);
                      setMsg("Product was modified successfully");
                    } else {
                      console.error(`Error: ${response.status}`);
                    }
                    // The product data should be in response.data
                  })
                  .catch(function (error) {
                    // handle error
                    console.error(error);
                  });
              }}
            >
              Submit Product Changes
            </Button>
            <Box m="md"> {msg} </Box>
          </Group>
        )}
      </Box>
    </AppLayout>
  );
}
