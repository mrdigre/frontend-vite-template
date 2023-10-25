import { Group, Button, Container } from "@mantine/core";
import { Link } from "react-router-dom";

export default function AppBar() {
  return (
    <Container size="lg">
      <Group justify="center" mt="xl">
        <Link to="/add-product">
          <Button>Add Product</Button>{" "}
        </Link>

        <Link to="/delete-product">
          <Button>Delete Product</Button>
        </Link>

        <Link to="/get-unique-products">
          <Button>Get Unique Product</Button>
        </Link>

        <Link to="/update-product">
          <Button>Update Product</Button>
        </Link>
      </Group>
    </Container>
  );
}
