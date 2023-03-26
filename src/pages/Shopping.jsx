import React from 'react';
import {
    Box,
    ChakraProvider,
    extendTheme,
    Heading,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    VStack,
} from '@chakra-ui/react';
import Template from './Template'

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

function OrderTrackingTable({ orders }) {
    return (
        <Table variant="simple">
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
                        <Td>R$ {order.value.toFixed(2)}</Td>
                        <Td>{order.items.join(', ')}</Td>
                        <Td>{order.deliveryTime}</Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
}

function App() {
    return (
        <Box textAlign="center" fontSize="xl">
            <Heading as="h1" size="2xl" mb="6" pt={12}>
                Acompanhamento de Compras
            </Heading>
            <VStack spacing={8}>
                <OrderTrackingTable orders={orders} />
            </VStack>
        </Box>
    );
}


export default function Shopping() {
    return (
        <Template>
            <App></App>
        </Template>
    );
}