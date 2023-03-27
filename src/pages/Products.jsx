import { Box, SimpleGrid, Image, Text, Container, useBreakpointValue, useDisclosure, Collapse } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Product 1",
    image: "https://via.placeholder.com/150",
    price: 100,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    id: 2,
    name: "Product 2",
    image: "https://via.placeholder.com/150",
    price: 200,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    id: 3,
    name: "Product 3",
    image: "https://via.placeholder.com/150",
    price: 300,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    id: 4,
    name: "Product 4",
    image: "https://via.placeholder.com/150",
    price: 400,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    id: 5,
    name: "Product 5",
    image: "https://via.placeholder.com/150",
    price: 500,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    id: 6,
    name: "Product 6",
    image: "https://via.placeholder.com/150",
    price: 600,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    id: 7,
    name: "Product 1",
    image: "https://via.placeholder.com/150",
    price: 100,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    id: 8,
    name: "Product 2",
    image: "https://via.placeholder.com/150",
    price: 200,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    id: 9,
    name: "Product 3",
    image: "https://via.placeholder.com/150",
    price: 300,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    id: 10,
    name: "Product 4",
    image: "https://via.placeholder.com/150",
    price: 400,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    id: 11,
    name: "Product 5",
    image: "https://via.placeholder.com/150",
    price: 500,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    id: 12,
    name: "Product 6",
    image: "https://via.placeholder.com/150",
    price: 600,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
];

export default function Products() {
  const navigate = useNavigate();
  const handleClick = (data: any) => {
    navigate('/product')
  }

  const columns = useBreakpointValue({ base: 1, sm: 2, md: 3, lg: 4, xl: 5 });
  return (
    <Container maxW="container.xl" py={8}>
      <SimpleGrid columns={columns} spacing={6}>
        {products.map((product) => (
          <Box key={product.id} borderWidth="1px" borderRadius="lg" overflow="hidden" onClick={handleClick} cursor={'pointer'} >
            <Image src={product.image} alt={product.name} h={'150px'} w={'full'} />
            <Box p="6">
              <Box d="flex" alignItems="baseline">
                <Text fontWeight="semibold" fontSize="sm" letterSpacing="wide">
                  {product.name}
                </Text>
                <Text fontSize="sm" color="blackAlpha.700">
                  R$ {product.price}
                </Text>
              </Box>
              <Text mt="2" fontSize="sm" color="gray.500" >
                {product.description}
              </Text>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
}