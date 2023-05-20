import { Box, Button, Container, Divider, Flex, HStack, IconButton, Image, Stack, Text, useBreakpointValue, useToast } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import { IoMdAdd, IoMdRemove } from "react-icons/io"
import { useNavigate } from "react-router-dom";
import { primary } from "../styles/theme";
import { formatToBRL } from "../common/format";
import { useContext } from 'react';
import { SessionContext } from "../context/SessionContext";
import { api, resources } from "../common/service/api"
import { AuthContext } from "../context/AuthContext";

function Cart() {
  const toast = useToast();
  const isSmallerThanSm = useBreakpointValue({ base: true, sm: false });
  const navigate = useNavigate();
  const { cartState: [cartItems, setCartItems] } = useContext(SessionContext);
  const { user } = useContext(AuthContext);
  const userId = user.id;

  const handlePayment = (data: any) => {
    let products = [];

    cartItems.forEach((product) => {
      products.push({
        "quantity": product.quantity,
        "product_id": product.id,
        "price": product.price
      });
    });

    api.post("/order", {
      "customer_id": userId,
      "price": cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
      "items": products
    }).then(e => {
        toast({
            title: 'Compra realizada!',
            description: "Compra Realizada.",
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
        setCartItems([]);
        navigate('/shopping')
    })
    .catch(e => {
        console.log(e)

        if (e.response?.data?.status === 400) {
          toast({
            title: 'Necessário efetuar login!',
            status: 'warning',
            duration: 2000,
            description: 'Você será redirecionado para o Login!',
            isClosable: true,
          })
          setTimeout(() => {
            navigate('/signin')
          }, 2000)
        } else {
          toast({
            title: 'Algo deu errado!',
            status: 'error',
            duration: 2000,
            description: e.response?.data?.message || 'Erro interno',
            isClosable: true,
          })
        }
        
    })
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

  return (

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
              // _first={{ borderTopRadius: 'lg' }}
              // _last={{ borderBottomRadius: 'lg' }}
              >
                <Image display={{base: 'none', md: 'inline-block'}} src={resources + item.image} alt={item.name} w="75px" h="75px" mr="4" />
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
                        // ml="2"
                        onClick={() => { handleMinusItem(item.id) }}
                      />
                      <Text display={'inline'}>{item.quantity}</Text>
                      <IconButton
                        variant="outline"
                        colorScheme="gray"
                        aria-label="Adicionar item"
                        icon={<IoMdAdd />}
                        // ml="2"
                        onClick={() => { handlePlusItem(item.id) }}
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
              {cartItems && cartItems.length > 0 && <Box>
                <Button colorScheme={primary} onClick={handlePayment}>Confirmar Compra</Button>
              </Box>}
              {(cartItems && cartItems.length <= 0) || !cartItems &&
                <Box>
                  <Text fontSize={'sm'} color={'blackAlpha.700'}>Adicione itens ao carrinho para prosseguir!</Text>
                </Box>}
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Container>
  );
}

export default Cart;