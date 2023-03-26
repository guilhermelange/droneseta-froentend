import React from 'react';
import {
  Box,
  ChakraProvider,
  extendTheme,
  Heading,
  Image,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const breakpoints = createBreakpoints({
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em',
  '2xl': '96em',
});

const theme = extendTheme({ breakpoints });

const products = [
  {
    id: 1,
    name: 'Produto 1',
    imageUrl: 'https://via.placeholder.com/150',
    price: 49.99,
    quantitySold: 100,
  },
  {
    id: 2,
    name: 'Produto 2',
    imageUrl: 'https://via.placeholder.com/150',
    price: 89.99,
    quantitySold: 150,
  },
  {
    id: 3,
    name: 'Produto 3',
    imageUrl: 'https://via.placeholder.com/150',
    price: 29.99,
    quantitySold: 200,
  },
];

function ProductTable() {
  return (
    <Table variant="striped">
      <Thead>
        <Tr>
          <Th>Nome do Produto</Th>
          <Th>Imagem</Th>
          <Th>Quantidade Vendida</Th>
          <Th>Valor Obtido</Th>
        </Tr>
      </Thead>
      <Tbody>
        {products.map((product) => (
          <Tr key={product.id}>
            <Td>{product.name}</Td>
            <Td>
              <Image boxSize="100px" src={product.imageUrl} alt={product.name} />
            </Td>
            <Td>{product.quantitySold}</Td>
            <Td>R$ {(product.price * product.quantitySold).toFixed(2)}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Heading as="h1" size="2xl" m="6">
          Produtos Mais Vendidos
        </Heading>
        <VStack spacing={8}>
          <ProductTable />
        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default App;