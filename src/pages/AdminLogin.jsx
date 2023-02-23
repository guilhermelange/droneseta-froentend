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

import { primary } from '../styles/theme';

export default function AdminLogin() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const navigate = useNavigate();

  const handleClick = (data: any) => {
    navigate('/admin')
  }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Flex justifyContent={'center'} alignItems={'center'} gap={3}>
            <Image src='logo.svg' h={'4em'}></Image>
            <Text fontSize="6xl" fontWeight="bold">
              Droneseta
            </Text>
          </Flex>
          <Text fontSize={'lg'} color={'gray.600'}>
            Acesso Adminstrador<Link color={primary}>!</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
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