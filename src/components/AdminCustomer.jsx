import React, { useState } from 'react';
import {
    Box,
    Heading,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    VStack,
} from '@chakra-ui/react';
import ReactPaginate from 'react-paginate';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

const customers = [
    { id: 1, name: 'João Silva', amountSpent: 1234.56 },
    { id: 2, name: 'Maria Souza', amountSpent: 789.01 },
    { id: 3, name: 'Carlos Pereira', amountSpent: 2345.67 },
];

const itemsPerPage = 2;

function CustomerTable({ customers }) {
    return (
        <Table variant="striped" size={'sm'}>
            <Thead>
                <Tr>
                    <Th>Nome da Pessoa</Th>
                    <Th>Valor em Compras</Th>
                </Tr>
            </Thead>
            <Tbody>
                {customers.map((customer) => (
                    <Tr key={customer.id}>
                        <Td>{customer.name}</Td>
                        <Td>R$ {customer.amountSpent.toFixed(2)}</Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
}

function App() {
    const [currentPage, setCurrentPage] = useState(0);

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    const currentCustomers = customers.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    return (
        <Box textAlign="center" fontSize="xl">
            <Heading as="h1" size="xl" m="6">
                Visualização de Clientes
            </Heading>
            <VStack spacing={8}>
                <CustomerTable customers={currentCustomers} />
                <ReactPaginate
                    previousLabel={<MdKeyboardArrowLeft />}
                    nextLabel={<MdKeyboardArrowRight />}
                    pageCount={Math.ceil(customers.length / itemsPerPage)}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                />
            </VStack>
        </Box>
    );
}

export default App;