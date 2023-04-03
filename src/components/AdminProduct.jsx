import React, { useState } from 'react';
import {
    Box,
    Heading,
    IconButton,
    Image,
    Stack,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
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
import { formatToBRL } from '../common/format'
import { useReducer } from 'react';


const itemsPerPage = 10;

function AdminProduct() {
    const { mutate } = useSWRConfig()
    const [currentPage, setCurrentPage] = useState(0);

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    const handleEdit = (id) => {

    }

    const handleDelete = async (id) => {
        await api.delete(`/product/${id}`);
        mutate("/product");
    }

    const { data: products, error, isLoading } = useSWR("/product", api);

    if (error) return <div></div>
    if (isLoading) return <div></div>

    const currentProducts = products.data.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    return (
        <Box textAlign="center" fontSize="xl">
            <Heading as="h1" size="lg" m="6">
                Administração de Produtos
            </Heading>
            <VStack spacing={8}>
                <TableContainer w={'full'}>
                    <Table variant="striped" size={'sm'} colorScheme={'blackAlpha'}>
                        <Thead>
                            <Tr>
                                <Th>Nome</Th>
                                <Th>Descrição</Th>
                                <Th>Tamanho</Th>
                                <Th>Preço</Th>
                                <Th>Estoque</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {currentProducts.map((product) => (
                                <Tr key={product.id}>
                                    <Td>{product.name}</Td>
                                    {/* <Td>
                                        <Image src={resources + product.img} alt={product.name} h={'100px'} w={'full'} />
                                    </Td> */}
                                    <Td maxWidth={'20ch'}
                                        overflow={'hidden'}
                                        textOverflow={'ellipsis'}
                                        whiteSpace={'nowrap'}>
                                        {product.description}
                                    </Td>
                                    <Td>{product.size}</Td>
                                    <Td>{formatToBRL(product.price)}</Td>
                                    <Td>{product.stock}</Td>
                                    <Td>
                                        <Stack direction={'row'}>
                                            <IconButton
                                                size={'sm'}
                                                variant="outline"
                                                colorScheme="gray"
                                                aria-label="Edit item"
                                                icon={<FaEdit />} />
                                            <IconButton
                                                size={'sm'}
                                                variant="outline"
                                                colorScheme="gray"
                                                aria-label="Remove item"
                                                icon={<FaTrash />}
                                                mr="0"
                                                onClick={() => {handleDelete(product.id)}} />
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
                    pageCount={Math.ceil(products.data.length / itemsPerPage)}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                />
            </VStack>
        </Box>
    );
}

export default AdminProduct;