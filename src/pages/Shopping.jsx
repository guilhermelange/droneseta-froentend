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

const orders = [
    {
        id: 1,
        status: 'Entregue',
        value: 123.45,
        items: ['Item 1', 'Item 2'],
        deliveryTime: '3 dias',
    },
    {
        id: 2,
        status: 'Em trânsito',
        value: 67.89,
        items: ['Item 3', 'Item 4'],
        deliveryTime: '5 dias',
    },
    {
        id: 3,
        status: 'Aguardando pagamento',
        value: 98.76,
        items: ['Item 5', 'Item 6'],
        deliveryTime: '7 dias',
    },
];

function ShoppingTable() {
    const { data: orders, error, isLoading } = useSWR("/order/customer", () =>
        api.get("/order/customer/1517").then(response => response.data)
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
                                        <Td>{(order?.items ? order.items : []).join(', ')}</Td>
                                        <Td>{order.deliveryTime}</Td>
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