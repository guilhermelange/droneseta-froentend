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
import useSWR from 'swr'
import { api } from '../common/service/api'

const itemsPerPage = 10;

function AdminTravel() {
    const [currentPage, setCurrentPage] = useState(0);

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    const { data: travels, error, isLoading } = useSWR("/delivery", api);

    if (error) return <div></div>
    if (isLoading) return <div></div>

    const currentTravels = travels.data.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    return (
        <Box textAlign="center" fontSize="xl">
            <Heading as="h1" size="lg" m="6">
                Viagens do Drone
            </Heading>
            <VStack spacing={8}>
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
                            {currentTravels.map((customer) => (
                                <Tr key={customer.id}>
                                    <Td>{customer.id}</Td>
                                    <Td>{customer.quantity}</Td>
                                    <Td>{customer.status}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
                <ReactPaginate
                    previousLabel={<MdKeyboardArrowLeft />}
                    nextLabel={<MdKeyboardArrowRight />}
                    pageCount={Math.ceil(travels.data.length / itemsPerPage)}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                />
            </VStack>
        </Box>
    );
}

export default AdminTravel;