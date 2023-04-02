import { Box, Button, Container, Divider, Flex, HStack, IconButton, Image, Input, Stack, Text, useBreakpointValue, useNumberInput } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import { IoMdAdd, IoMdRemove } from "react-icons/io"
import { useNavigate } from "react-router-dom";
import { primary } from "../styles/theme";
import Template from './Template'
import { formatToBRL } from "../common/format";
import { usePersistentState } from "../hook/UsePersistentState"
import { useEffect } from "react";

const dados = [
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
  {
    id: 4,
    name: "Product 3",
    image: "https://via.placeholder.com/150",
    price: 300,
    quantity: 3,
  },
];

function Cart() {
  const isSmallerThanSm = useBreakpointValue({ base: true, sm: false });
  const navigate = useNavigate();
  const [cartItems, setCartItems] = usePersistentState("cart", []);

  const handlePayment = (data: any) => {
    navigate('/shopping')
  }

  const handleRemove = (id) => {
    const arrayFiltrado = cartItems.filter(obj => obj.id !== id);
    setCartItems(arrayFiltrado);
  }

  const handleMinusItem = (id) => {
    const currentItem = cartItems.find(item => item.id === id);
    if (currentItem) {
      if (currentItem.quantity > 1) {
        currentItem.quantity -= 1;
      }
    }
    setCartItems([...cartItems]);
  }

  const handlePlusItem = (id) => {
    const currentItem = cartItems.find(item => item.id === id);
    if (currentItem) {
      currentItem.quantity += 1;
    }
    setCartItems([...cartItems]);
  }

  useEffect(() => {
    setCartItems(dados);
  }, [])

  return (
    <Template>
      <Container maxW="container.xl" py={8}>
        <Box borderWidth="1px" overflow="hidden">
          <Stack direction={isSmallerThanSm ? "column" : "row"} spacing="2">
            <Box flex="3" borderRadius="lg">
              {cartItems && cartItems.map((item) => (
                <Flex key={item.id}
                  p="6"
                  alignItems="center"
                  borderBottomWidth="1px"
                  backgroundColor={'whiteAlpha.700'}
                  _first={{ borderTopRadius: 'lg' }}
                  _last={{ borderBottomRadius: 'lg' }}>
                  <Image src={item.image} alt={item.name} w="75px" h="75px" mr="4" />
                  <Box flex="1">
                    <Text fontWeight="semibold" fontSize="sm">
                      {item.name}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      {formatToBRL(item.price)}
                    </Text>
                  </Box>
                  <Box>
                    <Text fontWeight="semibold" fontSize="sm" textAlign="center">
                      <HStack maxW='320px'>
                        <IconButton
                          variant="outline"
                          colorScheme="gray"
                          aria-label="Diminuir item"
                          icon={<IoMdRemove />}
                          ml="2"
                          onClick={() => {handleMinusItem(item.id)}}
                        />
                        <Text display={'inline'}>{item.quantity}</Text>
                        <IconButton
                          variant="outline"
                          colorScheme="gray"
                          aria-label="Adicionar item"
                          icon={<IoMdAdd />}
                          ml="2"
                          onClick={() => {handlePlusItem(item.id)}}
                        />
                      </HStack>
                    </Text>
                  </Box>
                  <Box onClick={() => { handleRemove(item.id) }}>
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
            <Box flex="1" p="6" backgroundColor={'whiteAlpha.700'} borderRadius="lg" maxH={'230px'}>
              <Stack spacing="4">
                <Box>
                  <Text fontWeight="semibold" fontSize="lg">
                    Sumário
                  </Text>
                </Box>
                <Divider />
                <Box>
                  <Text fontWeight="semibold" fontSize="md">
                    Total:
                  </Text>
                  <Text fontSize="lg" fontWeight="semibold">
                    {!cartItems && formatToBRL(0.0)}
                    {cartItems && formatToBRL(cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0))}
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