import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Text,
  useColorModeValue,
  Image,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Template from '../pages/Template'
import { primary } from '../styles/theme';

export default function Signin() {
  return (
    <Template>
      <CustomerSignin></CustomerSignin>
    </Template>
  )
}

function CustomerSignin() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const navigate = useNavigate();

  const handleClick = (data: any) => {
    navigate('/admin')
  }

  return (
    <Flex
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
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
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={6}>
          <Text fontSize={'xl'} fontWeight={'bold'} w="100%" textAlign={'center'} fontWeight="normal" mb="0.5em">
            Efetue o Login<Text display={'inline'} color={primary}>!</Text>
          </Text>
          <Stack spacing={4}>
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
            <Stack spacing={10}>
              <Button
                colorScheme={primary}
                isLoading={isSubmitting}
                color={'white'}
                onClick={handleSubmit(data => handleClick(data))}
              >
                Login
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}