import React, { useState } from 'react';
import {
    Box,
    Heading,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    VStack,
} from '@chakra-ui/react';
import ReactPaginate from 'react-paginate';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

const travels = [
    { id: 1, count: 10, state: 'Pendente' },
    { id: 2, count: 5, state: 'Pendente' },
    { id: 3, count: 10, state: 'Concluído' },
    { id: 4, count: 10, state: 'Concluído' },
    { id: 5, count: 10, state: 'Concluído' },
    { id: 6, count: 10, state: 'Concluído' },
    { id: 7, count: 10, state: 'Concluído' },
    { id: 8, count: 10, state: 'Concluído' },
    { id: 9, count: 10, state: 'Concluído' },
    { id: 10, count: 10, state: 'Concluído' },
    { id: 11, count: 10, state: 'Concluído' },
    { id: 12, count: 10, state: 'Concluído' },
    { id: 13, count: 10, state: 'Concluído' },
    { id: 14, count: 10, state: 'Concluído' },
    { id: 15, count: 10, state: 'Concluído' },
    { id: 16, count: 10, state: 'Concluído' },
    { id: 17, count: 10, state: 'Concluído' },
    { id: 18, count: 10, state: 'Concluído' },
    { id: 19, count: 10, state: 'Concluído' },
    { id: 20, count: 10, state: 'Concluído' },
    { id: 21, count: 10, state: 'Concluído' },
    { id: 22, count: 10, state: 'Concluído' },
    { id: 23, count: 10, state: 'Concluído' },
    { id: 24, count: 10, state: 'Concluído' },
    { id: 25, count: 10, state: 'Concluído' },
];

const itemsPerPage = 10;

function TravelsTable({ travels }) {
    return (
        <TableContainer w={'full'}>
            <Table variant="striped" size={'sm'} colorScheme={'blackAlpha'}>
                <Thead>
                    <Tr>
                        <Th>Id</Th>
                        <Th>Quantidade</Th>
                        <Th>Status</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {travels.map((customer) => (
                        <Tr key={customer.id}>
                            <Td>{customer.id}</Td>
                            <Td>{customer.count}</Td>
                            <Td>{customer.state}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
}

function AdminTravel() {
    const [currentPage, setCurrentPage] = useState(0);

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    const currentTravels = travels.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    return (
        <Box textAlign="center" fontSize="xl">
            <Heading as="h1" size="lg" m="6">
                Viagens do Drone
            </Heading>
            <VStack spacing={8}>
                <TravelsTable travels={currentTravels} />
                <ReactPaginate
                    previousLabel={<MdKeyboardArrowLeft />}
                    nextLabel={<MdKeyboardArrowRight />}
                    pageCount={Math.ceil(travels.length / itemsPerPage)}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                />
            </VStack>
        </Box>
    );
}

export default AdminTravel;