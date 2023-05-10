import React from 'react';
import useSWR, { useSWRConfig } from 'swr'
import { api, resources } from '../common/service/api'
import {
  Box,
  Heading,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';

function ProductTable({products}) {
  return (
    <TableContainer w={'full'}>
      <Table variant="striped" size={'sm'} colorScheme={'blackAlpha'}>
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
                <Image boxSize="100px" src={resources + product.img} alt={product.name} />
              </Td>
              <Td>{product.stock}</Td>
              <Td>R$ {(product.price).toFixed(2)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

function App() {
  const { data: prod, error, isLoading } = useSWR("/order-item/3", api);
  
  if (error) return <div></div>
  if (isLoading) return <div></div>

  return (
    <Box textAlign="center" fontSize="xl">
      <Heading as="h1" size="lg" m="6">
        Produtos Mais Vendidos
      </Heading>
      <VStack spacing={8}>
        <ProductTable products = {prod.data} />
      </VStack>
    </Box>
  );
}

export default App;