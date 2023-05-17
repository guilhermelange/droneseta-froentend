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
  Image,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { primary, primaryHex } from '../styles/theme';
import setTokenApi, { api } from '../common/service/api';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Signin() {
  return (
    <CustomerSignin></CustomerSignin>
  )
}

function CustomerSignin() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const navigate = useNavigate();
  const toast = useToast()
  const { login } = useContext(AuthContext);

  const handleClick = (data: any) => {
    api.post('/auth', {
      cpf: data.cpf.replace(/\D/g, ""),
      password: data.password
    })
      .then(e => {
        toast({
          title: 'Login efetuado com sucesso!',
          status: 'success',
          duration: 2000,
          isClosable: true,
        })

        setTokenApi(e.data.token);
        login(e.data.customer);
        navigate('/')
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

  const handleSignup = (data: any) => {
    navigate('/signup')
  }

  return (
    <Flex
      align={'center'}
      justify={'center'}>
      <Stack spacing={8} maxW={'lg'} py={12} px={6}>
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
          bg={'whiteAlpha.900'}
          p={6}>
          <Text fontSize={'xl'} fontWeight={'bold'} w="100%" textAlign={'center'} fontWeight="black" mb="0.5em">
            Efetue o Login<Text display={'inline'} color={primaryHex}>!</Text>
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
            <Stack spacing={4}>
              <Button
                colorScheme={primary}
                isLoading={isSubmitting}
                color={'white'}
                onClick={handleSubmit(data => handleClick(data))}
              >
                Login
              </Button>
              <Text color={'gray.500'} fontSize={'12px'}>Ainda não possui uma conta?
                <Link onClick={handleSignup} color={primaryHex} ml={0.5}>Cadastre-se</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}