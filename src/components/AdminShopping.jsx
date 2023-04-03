import React from 'react';
import {
  Box,
  Button,
  Heading,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
  Stack,
  IconButton
} from '@chakra-ui/react';
import { BsCheckLg } from "react-icons/bs"
import { VscChromeClose } from "react-icons/vsc"
import useSWR, { useSWRConfig } from 'swr'
import { api } from '../common/service/api'
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { formatToBRL } from '../common/format';

const payments = [
  {
    id: 1,
    name: 'João Silva',
    creditCard: '1234 5678 9012 3456',
    amount: 49.99,
  },
  {
    id: 2,
    name: 'Maria Souza',
    creditCard: '2345 6789 0123 4567',
    amount: 89.99,
  },
  {
    id: 3,
    name: 'Carlos Pereira',
    creditCard: '3456 7890 1234 5678',
    amount: 29.99,
  },
];

const itemsPerPage = 8;

function App() {
  const { mutate } = useSWRConfig()
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
};

  const handleApprovePayment = async (paymentId) => {
    await api.patch(`/order/status/${paymentId}`, {
      status: "CONFIRMADO"
    })
    mutate("/order?status=PENDENTE")
  };

  const handleRepprovePayment = async (paymentId) => {
    await api.patch(`/order/status/${paymentId}`, {
      status: "CANCELADO"
    })

    mutate("/order?status=PENDENTE")
  };

  const generateReport = () => {
    api.get('/order/report', {
      responseType: 'blob'
    }).then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'OrdersReport.xlsx');
      document.body.appendChild(link);
      link.click();
    })
  };

  const { data: orders, error, isLoading } = useSWR("/order?status=PENDENTE", api);

  if (error) return <div></div>
  if (isLoading) return <div></div>

  const currentOrders = orders.data.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <Box textAlign="center" fontSize="xl">
      <Heading as="h1" size="lg" m="6">
        Aprovação Manual de Pagamentos
      </Heading>
      <VStack spacing={8}>
        <TableContainer w={'full'}>
          <Table variant="striped" size={'sm'} colorScheme={'blackAlpha'}>
            <Thead>
              <Tr>
                <Th>Nome da Pessoa</Th>
                <Th>Número do Cartão de Crédito</Th>
                <Th>Valor da Compra</Th>
                <Th>Ação</Th>
              </Tr>
            </Thead>
            <Tbody>
              {currentOrders.map((order) => (
                <Tr key={order.id}>
                  <Td>{order.name}</Td>
                  <Td>{order.creditCard}</Td>
                  <Td>{formatToBRL(order.price)}</Td>
                  <Td>
                    <Stack direction={'row'}>
                      <IconButton
                        size={'sm'}
                        variant="outline"
                        colorScheme="green"
                        aria-label="Aprovar pagamento"
                        icon={<BsCheckLg />}
                        onClick={() => handleApprovePayment(order.id)} />
                      <IconButton
                        size={'sm'}
                        variant="outline"
                        colorScheme="red"
                        aria-label="Cancelar pagamento"
                        icon={<VscChromeClose />}
                        mr="0"
                        onClick={() => handleRepprovePayment(order.id)} />
                    </Stack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <ReactPaginate
            previousLabel={<MdKeyboardArrowLeft />}
            nextLabel={<MdKeyboardArrowRight />}
            pageCount={Math.ceil(orders.data.length / itemsPerPage)}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            activeClassName={'active'}
        />
        <HStack>
          <Button colorScheme="blue" onClick={generateReport}>
            Gerar Relatório de Aprovados
          </Button>
        </HStack>
      </VStack>
    </Box>
  )
}

export default App;