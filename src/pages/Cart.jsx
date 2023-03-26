import { Box, Button, Container, Divider, Flex, IconButton, Image, Stack, Text, useBreakpointValue } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { primary } from "../styles/theme";
import Template from './Template'

const cartItems = [
  {
    id: 1,
    name: "Product 1",
    image: "https://via.placeholder.com/150",
    price: 100,
    quantity: 2,
  },
  {
    id: 2,
    name: "Product 2",
    image: "https://via.placeholder.com/150",
    price: 200,
    quantity: 1,
  },
  {
    id: 3,
    name: "Product 3",
    image: "https://via.placeholder.com/150",
    price: 300,
    quantity: 3,
  },
];

function Cart() {
  const isSmallerThanSm = useBreakpointValue({ base: true, sm: false });
  const navigate = useNavigate();

  const handlePayment = (data: any) => {
    navigate('/shopping')
  }

  return (
    <Template>
      <Container maxW="container.xl" py={8}>
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
          <Stack direction={isSmallerThanSm ? "column" : "row"} spacing="0">
            <Box flex="3">
              {cartItems.map((item) => (
                <Flex key={item.id} p="6" alignItems="center" borderBottomWidth="1px">
                  <Image src={item.image} alt={item.name} w="75px" h="75px" mr="4" />
                  <Box flex="1">
                    <Text fontWeight="semibold" fontSize="sm">
                      {item.name}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      ${item.price}
                    </Text>
                  </Box>
                  <Box>
                    <Text fontWeight="semibold" fontSize="sm" textAlign="center">
                      {item.quantity}
                    </Text>
                  </Box>
                  <Box>
                    <IconButton
                      variant="outline"
                      colorScheme="red"
                      aria-label="Remove item"
                      icon={<FaTrash />}
                      ml="2"
                    />
                  </Box>
                </Flex>
              ))}
            </Box>
            <Box flex="1" p="6" bg="gray.50">
              <Stack spacing="4">
                <Box>
                  <Text fontWeight="semibold" fontSize="lg">
                    Sumário
                  </Text>
                </Box>
                <Divider />
                <Box d="flex" justifyContent="space-between">
                  <Text fontSize="md">Subtotal:</Text>
                  <Text fontSize="md">${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}</Text>
                </Box>
                <Divider />
                <Box>
                  <Text fontWeight="semibold" fontSize="md">
                    Total:
                  </Text>
                  <Text fontSize="md" color="gray.500">
                    (Taxas incluídas)
                  </Text>
                  <Text fontSize="lg" fontWeight="semibold">
                    ${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) * 1.1}
                  </Text>
                </Box>
                <Box>
                  <Button colorScheme={primary} onClick={handlePayment}>Confirmar Compra</Button>
                </Box>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Container>
    </Template>
  );
}

export default Cart;