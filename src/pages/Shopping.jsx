import React from 'react';
import {
    Box,
    Container,
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
import Template from './Template'
import useSWR from 'swr'
import { api } from '../common/service/api'
import { formatToBRL } from '../common/format';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function ShoppingTable() {
    const { user } = useContext(AuthContext);
    
    const { data: orders, error, isLoading } = useSWR("/order/customer", () =>
        api.get(`/order/customer/${user.id}`).then(response => response.data)
    );

    if (error) return <div></div>
    if (isLoading) return <div></div>
    
    return (
        <Container maxW="container.xl">
            <Box textAlign="center" fontSize="xl">
                <Heading size="lg" mb="6" pt={12}>
                    Acompanhamento de Compras
                </Heading>
                <VStack spacing={8}>
                    <TableContainer w={'full'}>
                        <Table variant="striped" size='sm' colorScheme={'blackAlpha'}>
                            <Thead>
                                <Tr>
                                    <Th>Status do Pedido</Th>
                                    <Th>Valor</Th>
                                    <Th>Itens Selecionados</Th>
                                    <Th>Prazo para Entrega</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {orders.map((order) => (
                                    <Tr key={order.id}>
                                        <Td>{order.status}</Td>
                                        <Td>{formatToBRL(order.price)}</Td>
                                        <Td>{order.items.map((item) => {return item.product.name}).join(', ')}</Td>
                                        <Td>{order.delivery ? new Date(order.delivery).toLocaleString() : ''}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </VStack>
            </Box>
        </Container>
    );
}


export default function Shopping() {
    return (
        <ShoppingTable></ShoppingTable>
    );
}