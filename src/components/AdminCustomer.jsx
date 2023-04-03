import React, { useState } from 'react';
import {
    Box,
    Heading,
    IconButton,
    Stack,
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
import useSWR, { useSWRConfig } from 'swr'
import { api } from '../common/service/api'
import { FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';


const itemsPerPage = 8;

function AdminCustomer() {
    const { mutate } = useSWRConfig()
    const [currentPage, setCurrentPage] = useState(0);
    const navigate = useNavigate();

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    const handleEdit = (id) => {
        navigate(`/admin/customer/${id}`);
    }

    const handleDelete = async (id) => {
        await api.delete(`/customer/${id}`);
        mutate("/customer");
    }

    const { data: customers, error, isLoading } = useSWR("/customer", api);

    if (error) return <div></div>
    if (isLoading) return <div></div>

    const currentCustomers = customers.data.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    return (
        <Box textAlign="center" fontSize="xl">
            <Heading as="h1" size="lg" m="6">
                Administração de Clientes
            </Heading>
            <VStack spacing={8}>
                <TableContainer w={'full'}>
                    <Table variant="striped" size={'sm'} colorScheme={'blackAlpha'}>
                        <Thead>
                            <Tr>
                                <Th>Nome</Th>
                                <Th>CPF</Th>
                                <Th>Cartão</Th>
                                <Th>Ação</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {currentCustomers.map((customer) => (
                                <Tr key={customer.id}>
                                    <Td>{customer.name}</Td>
                                    <Td>{customer.cpf}</Td>
                                    <Td>{customer.creditCard}</Td>
                                    <Td>
                                        <Stack direction={'row'}>
                                            <IconButton
                                                size={'sm'}
                                                variant="outline"
                                                colorScheme="gray"
                                                aria-label="Edit item"
                                                icon={<FaEdit />}
                                                onClick={() => handleEdit(customer.id)} />
                                            <IconButton
                                                size={'sm'}
                                                variant="outline"
                                                colorScheme="gray"
                                                aria-label="Remove item"
                                                icon={<FaTrash />}
                                                mr="0"
                                                onClick={() => handleDelete(customer.id)} />
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
                    pageCount={Math.ceil(customers.data.length / itemsPerPage)}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                />
            </VStack>
        </Box>
    );
}

export default AdminCustomer;