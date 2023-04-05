import React, { useState } from 'react';
import {
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    Text,
    useToast,
} from '@chakra-ui/react';
import { api } from '../common/service/api'
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { primary } from '../styles/theme';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';


function Customer() {
    const toast = useToast()
    const { user } = useContext(AuthContext);
    const idPath = user.id;
    const [customer, setCustomer] = useState({
        id: idPath,
        name: '',
        cpf: '',
        creditCard: '',
        address: {
            id: 0,
            publicPlace: "",
            city: "",
            state: "",
            number: 0
        },
        deliveryAddress: {
            id: 0,
            publicPlace: "",
            city: "",
            state: "",
            number: 0
        }
    })
    const navigate = useNavigate();

    useEffect(() => {
        if (idPath > 0) {
            api.get(`/customer/${idPath}`).then(item => {
                const customerData = item.data;
                setCustomer(customerData)
            })
        }
    }, [])

    const handleUpdate = async () => {
        api.put(`/customer/${idPath}`, customer)
            .then(e => {
                toast({
                    title: 'Dados atualizados com sucesso!',
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                })
                navigate('/customer')
            })
            .catch(e => {
                toast({
                    title: 'Algo deu errado!',
                    status: 'error',
                    duration: 2000,
                    description: e.response?.data?.message || 'Erro interno',
                    isClosable: true,
                })
            });
    }

    const handleReturn = () => {
        navigate('/')
    }

    return (
        <Container maxW="container.sm" my={8} py={6} px={6} rounded={'lg'}
        boxShadow={'lg'}
        bg={'whiteAlpha.900'}>
            <Heading size="lg" mb={4} display={'flex'}>
                <Text>Atualizar Dados Cadastrais</Text>
            </Heading>
            <Box d="flex" flexDirection={{ base: 'column', md: 'row' }}>
                <Box flex="1" mr={{ md: 4 }}>
                    <FormControl mb={4}>
                        <FormLabel htmlFor="name">Nome</FormLabel>
                        <Input id="name" name="name" placeholder="Nome" value={customer?.name}
                            onChange={e => { setCustomer({ ...customer, name: e.target.value }) }} />
                    </FormControl>
                    <FormControl mb={4}>
                        <FormLabel htmlFor="cpf">CPF</FormLabel>
                        <Input id="cpf" name="cpf" placeholder="CPF" value={customer?.cpf}
                            onChange={e => { setCustomer({ ...customer, cpf: e.target.value }) }} />
                    </FormControl>
                    <FormControl mb={8}>
                        <FormLabel htmlFor="creditCard">Cartão</FormLabel>
                        <Input id="creditCard" name="creditCard" placeholder="Cartão" value={customer?.creditCard}
                            onChange={e => { setCustomer({ ...customer, creditCard: e.target.value }) }} />
                    </FormControl>
                    <FormControl mb={8}>
                        <FormLabel htmlFor="creditCard">Endereço:</FormLabel>
                        <Box paddingLeft={4}>
                            <FormControl mb={4}>
                                <FormLabel htmlFor="publicPlace">Logradouro</FormLabel>
                                <Input id="publicPlace" name="publicPlace" placeholder="Logradouro" value={customer?.address?.publicPlace}
                                    onChange={e => { setCustomer({...customer, address: {...customer.address, publicPlace: e.target.value}}) }} />
                            </FormControl>
                            <FormControl mb={4}>
                                <FormLabel htmlFor="city">Cidade</FormLabel>
                                <Input id="city" name="city" placeholder="Cidade" value={customer?.address?.city}
                                    onChange={e => { setCustomer({...customer, address: {...customer.address, city: e.target.value}}) }} />
                            </FormControl>
                            <FormControl mb={4}>
                                <FormLabel htmlFor="state">Estado</FormLabel>
                                <Input id="state" name="state" placeholder="Estado" value={customer?.address?.state}
                                    onChange={e => { setCustomer({...customer, address: {...customer.address, state: e.target.value}}) }} />
                            </FormControl>
                            <FormControl mb={4}>
                                <FormLabel htmlFor="number">Número</FormLabel>
                                <Input id="number" name="number" placeholder="Número" value={customer?.address?.number}
                                    onChange={e => { setCustomer({...customer, address: {...customer.address, number: +e.target.value}}) }} />
                            </FormControl>
                        </Box>
                    </FormControl>
                    <FormControl mb={8}>
                        <FormLabel htmlFor="creditCard2">Endereço de Entrega:</FormLabel>
                        <Box paddingLeft={4}>
                            <FormControl mb={4}>
                                <FormLabel htmlFor="publicPlace2">Logradouro</FormLabel>
                                <Input id="publicPlace2" name="publicPlace2" placeholder="Logradouro" value={customer?.deliveryAddress?.publicPlace}
                                    onChange={e => { setCustomer({...customer, deliveryAddress: {...customer.deliveryAddress, publicPlace: e.target.value}}) }} />
                            </FormControl>
                            <FormControl mb={4}>
                                <FormLabel htmlFor="city2">Cidade</FormLabel>
                                <Input id="city2" name="city2" placeholder="Cidade" value={customer?.deliveryAddress?.city}
                                    onChange={e => { setCustomer({...customer, deliveryAddress: {...customer.deliveryAddress, city: e.target.value}}) }} />
                            </FormControl>
                            <FormControl mb={4}>
                                <FormLabel htmlFor="state2">Estado</FormLabel>
                                <Input id="state2" name="state2" placeholder="Estado" value={customer?.deliveryAddress?.state}
                                    onChange={e => { setCustomer({...customer, deliveryAddress: {...customer.deliveryAddress, state: e.target.value}}) }} />
                            </FormControl>
                            <FormControl mb={4}>
                                <FormLabel htmlFor="number2">Número</FormLabel>
                                <Input id="number2" name="number2" placeholder="Número" value={customer?.deliveryAddress?.number}
                                    onChange={e => { setCustomer({...customer, deliveryAddress: {...customer.deliveryAddress, number: +e.target.value}}) }} />
                            </FormControl>
                        </Box>
                    </FormControl>
                    <FormControl mb={4}>
                        <Stack direction={'row'}>
                            <Button colorScheme={primary} onClick={handleUpdate}>Confirmar</Button>
                            <Button colorScheme={primary} variant={'outline'} onClick={handleReturn}>Voltar</Button>
                        </Stack>
                    </FormControl>
                </Box>
            </Box>
        </Container>
    );
}

export default Customer;