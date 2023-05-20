import React, { useState } from 'react';
import {
    Progress,
    Box,
    ButtonGroup,
    Button,
    Heading,
    Flex,
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    Stack,
    Text,
    Image,
    Link,
} from '@chakra-ui/react';

import { useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { primary, primaryHex } from '../styles/theme';
import { useNavigate } from 'react-router-dom';
import { api } from '../common/service/api';


interface FormDTO {
    errors: FieldErrors<FieldValues>;
    register: UseFormRegister<FieldValues>
}

function Form1({ errors, register }: FormDTO) {
    // const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

    return (
        <>
            <Text fontSize={'2xl'} w="100%" textAlign={'center'} fontWeight="black" mb="2%">
                Crie sua conta<Text display={'inline'} color={primaryHex}>!</Text>
            </Text>
            <Stack spacing={4}>
                <FormControl isInvalid={!!errors.name}>
                    <FormLabel htmlFor='name'>Nome</FormLabel>
                    <Input
                        type={'text'}
                        id='name'
                        placeholder='Informe seu nome'
                        {...register('name', {
                            required: 'Obrigatório informar seu nome'
                        })}
                    />
                    <FormErrorMessage>
                        {errors.name && String(errors.name.message)}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.cpf}>
                    <FormLabel htmlFor='cpf'>CPF</FormLabel>
                    <Input
                        type={'text'}
                        id='cpf'
                        placeholder='Informe seu CPF'
                        {...register('cpf', {
                            required: 'Obrigatório informar CPF válido',
                            pattern: {
                                value: /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/,
                                message: 'CPF inválido'
                            }
                        })}
                    />
                    <FormErrorMessage>
                        {errors.cpf && String(errors.cpf.message)}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.password}>
                    <FormLabel htmlFor='password'>Senha</FormLabel>
                    <Input
                        type={'password'}
                        id='password'
                        placeholder='Informe a senha'
                        {...register('password', {
                            required: 'Obrigatório informar a senha',
                        })}
                    />
                    <FormErrorMessage>
                        {errors.password && String(errors.password.message)}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.creditCard}>
                    <FormLabel htmlFor='creditCard'>Cartão de Crédito</FormLabel>
                    <Input
                        type={'text'}
                        id='creditCard'
                        placeholder='Informe seu cartão para pagamento'
                        {...register('creditCard', {
                            required: 'Obrigatório informar o cartão',
                        })}
                    />
                    <FormErrorMessage>
                        {errors.creditCard && String(errors.creditCard.message)}
                    </FormErrorMessage>
                </FormControl>
            </Stack>
        </>
    );
};

function Form2({ errors, register }: FormDTO) {
    return (
        <>
            <Heading fontSize={'2xl'} w="100%" textAlign={'center'} fontWeight="black" mb="2%">
                Endereço Pessoal
            </Heading>
            <Stack spacing={4}>
                <FormControl isInvalid={!!errors.state}>
                    <FormLabel htmlFor='state'>Estado</FormLabel>
                    <Input
                        type={'state'}
                        id='state'
                        placeholder='Selecione o estado'
                        {...register('state', {
                            required: 'Obrigatório selecionar um estado',
                        })}
                    />
                    <FormErrorMessage>
                        {errors.state && String(errors.state.message)}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.city}>
                    <FormLabel htmlFor='city'>Cidade</FormLabel>
                    <Input
                        type={'text'}
                        id='city'
                        placeholder='Informe a cidade'
                        {...register('city', {
                            required: 'Obrigatório informar a cidade',
                        })}
                    />
                    <FormErrorMessage>
                        {errors.city && String(errors.city.message)}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.public_place}>
                    <FormLabel htmlFor='public_place'>Logradouro</FormLabel>
                    <Input
                        type={'text'}
                        id='public_place'
                        placeholder='Informe o logradouro'
                        {...register('public_place', {
                            required: 'Obrigatório informar o logradouro',
                        })}
                    />
                    <FormErrorMessage>
                        {errors.public_place && String(errors.public_place.message)}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.number}>
                    <FormLabel htmlFor='number'>Número</FormLabel>
                    <Input
                        type={'number'}
                        id='number'
                        placeholder='Informe o número'
                        {...register('number', {
                            // required: 'Obrigatório informar o número',
                        })}
                    />
                    <FormErrorMessage>
                        {errors.number && String(errors.number.message)}
                    </FormErrorMessage>
                </FormControl>
            </Stack>
        </>
    );
};

function Form3({ errors, register }: FormDTO) {
    // const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

    return (
        <>
            <Heading w="100%" textAlign={'center'} fontWeight="black" fontSize={'2xl'} mb="2%">
                Endereço de Entrega
            </Heading>
            <Stack spacing={4}>
                <FormControl isInvalid={!!errors.state2}>
                    <FormLabel htmlFor='state2'>Estado</FormLabel>
                    <Input
                        type={'state2'}
                        id='state2'
                        placeholder='Selecione o estado'
                        {...register('state2', {
                            required: 'Obrigatório selecionar um estado',
                        })}
                    />
                    <FormErrorMessage>
                        {errors.state2 && String(errors.state2.message)}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.city2}>
                    <FormLabel htmlFor='city2'>Cidade</FormLabel>
                    <Input
                        type={'text'}
                        id='city2'
                        placeholder='Informe a cidade'
                        {...register('city2', {
                            required: 'Obrigatório informar a cidade',
                        })}
                    />
                    <FormErrorMessage>
                        {errors.city2 && String(errors.city2.message)}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.public_place2}>
                    <FormLabel htmlFor='public_place2'>Logradouro</FormLabel>
                    <Input
                        type={'text'}
                        id='public_place2'
                        placeholder='Informe o logradouro'
                        {...register('public_place2', {
                            required: 'Obrigatório informar o logradouro',
                        })}
                    />
                    <FormErrorMessage>
                        {errors.public_place2 && String(errors.public_place2.message)}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.number2}>
                    <FormLabel htmlFor='number2'>Número</FormLabel>
                    <Input
                        type={'number'}
                        id='number2'
                        placeholder='Informe o número'
                        {...register('number2', {
                            // required: 'Obrigatório informar o número',
                        })}
                    />
                    <FormErrorMessage>
                        {errors.number2 && String(errors.number2.message)}
                    </FormErrorMessage>
                </FormControl>
            </Stack>
        </>
    );
};

export default function Signup() {
    return (
        <CustomerSignup></CustomerSignup>
    )
}

function CustomerSignup() {
    const toast = useToast();
    const [step, setStep] = useState(1);
    const [progress, setProgress] = useState(33.33);
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const navigate = useNavigate();


    const handleSignin = (data: any) => {
        navigate('/signin')
    }

    const handleClickNewCustomer = (data) => {
        api.post("/customer", {
            name: data.name,
            password: data.password,
            cpf: data.cpf.replace(/\D/g, ""),
            creditCard: data.creditCard,
            address: {
                city: data.city,
                number: data.number,
                publicPlace: data.public_place,
                state: data.state
            },
            deliveryAddress: {
                city: data.city2,
                number: data.number2,
                publicPlace: data.public_place2,
                state: data.state2
            }
        }).then(e => {
            toast({
                title: 'Conta Criada.',
                description: "Login disponível.",
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            navigate('../signin')
        })
        .catch(e => {
            toast({
                title: 'Algo deu errado!',
                status: 'error',
                duration: 2000,
                description: e.response?.data?.message || 'Erro interno',
                isClosable: true,
              })
        })
        
    }

    return (
        <>
            <Flex
                align={'center'}
                justify={'center'}>
                <Stack spacing={8} maxW={'4lg'} minW={'550px'} py={12} px={6}>
                    <Stack align={'center'}>
                        <Flex justifyContent={'center'} alignItems={'center'} gap={2}>
                            <Image src='logo.svg' h={'2em'}></Image>
                            <Text fontSize="xl" fontWeight="bold">
                                Droneseta
                            </Text>
                            <Text fontSize={'lg'} color={'gray.600'} textAlign={'center'}>
                                Aproveite as melhores ofertas<Link color={primary}>!</Link> ✌️
                            </Text>
                        </Flex>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        boxShadow={'lg'}
                        maxWidth={500}
                        minW={450}
                        p={6}
                        m="10px auto"
                        as="form"
                        bg={'whiteAlpha.900'}>
                        <Progress
                            hasStripe
                            value={progress}
                            mb="5%"
                            mx="5%"
                            colorScheme={primary}
                            isAnimated></Progress>
                        {step === 1 ? <Form1 register={register} errors={errors} /> : step === 2 ? <Form2 register={register} errors={errors} /> : <Form3 register={register} errors={errors} />}
                        <ButtonGroup mt="5%" w="100%">
                            <Flex w="100%" justifyContent="space-between">
                                <Flex>
                                    <Button
                                        onClick={() => {
                                            setStep(step - 1);
                                            setProgress(progress - 33.33);
                                        }}
                                        isDisabled={step === 1}
                                        colorScheme={primary}
                                        variant={'outline'}
                                        w="7rem"
                                        mr="5%"
                                    >
                                        Anterior
                                    </Button>
                                    <Button
                                        w="7rem"
                                        isDisabled={step === 3}
                                        onClick={
                                            handleSubmit((data) => {
                                                console.log(data)
                                                setStep(step + 1);
                                                if (step === 3) {
                                                    setProgress(100);
                                                } else {
                                                    setProgress(progress + 33.33);
                                                }
                                            })}
                                        colorScheme={primary}
                                        color={'white'}>
                                        Continuar
                                    </Button>
                                </Flex>
                                {step === 3 ? (
                                    <Button
                                        w="7rem"
                                        colorScheme={primary}
                                        color={'white'}
                                        isLoading={isSubmitting}
                                        onClick={handleSubmit(handleClickNewCustomer)}>
                                        Concluir
                                    </Button>
                                ) : null}
                            </Flex>
                        </ButtonGroup>
                        <Text color={'gray.500'} fontSize={'12px'} mt={4}>Já possui uma conta?
                            <Link onClick={handleSignin} color={primaryHex} ml={0.5}>Entre</Link>
                        </Text>
                    </Box>
                </Stack>
            </Flex>
        </>
    );
}