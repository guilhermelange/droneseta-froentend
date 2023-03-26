import React from 'react';
import {
  Box,
  Button,
  Heading,
  HStack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';

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

function PaymentTable({ onApprovePayment }) {
  return (
    <Table variant="striped" size={'sm'}>
      <Thead>
        <Tr>
          <Th>Nome da Pessoa</Th>
          <Th>Número do Cartão de Crédito</Th>
          <Th>Valor da Compra</Th>
          <Th>Ação</Th>
        </Tr>
      </Thead>
      <Tbody>
        {payments.map((payment) => (
          <Tr key={payment.id}>
            <Td>{payment.name}</Td>
            <Td>{payment.creditCard}</Td>
            <Td>R$ {payment.amount.toFixed(2)}</Td>
            <Td>
              <Button colorScheme="green" onClick={() => onApprovePayment(payment.id)}>
                Confirmar Pagamento
              </Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

function App() {
  const onApprovePayment = (paymentId) => {
    console.log(`Pagamento aprovado: ${paymentId}`);
    // Implementar a lógica para aprovar o pagamento aqui
  };

  const generateReport = () => {
    console.log('Gerando relatório...');
    // Implementar a lógica para gerar o relatório aqui
  };

  return (
    <Box textAlign="center" fontSize="xl">
        <Heading as="h1" size="xl" m="6">
          Aprovação Manual de Pagamentos
        </Heading>
        <VStack spacing={8}>
          <PaymentTable onApprovePayment={onApprovePayment} />
          <HStack>
            <Button colorScheme="blue" onClick={generateReport}>
              Gerar Relatório
            </Button>
          </HStack>
        </VStack>
      </Box>
  )
}

export default App;