import {
    Box,
    Flex,
    Text,
    Button,
    Stack,
    useColorModeValue,
    Image,
    Input,
    InputGroup,
    InputRightElement,
    Icon
} from '@chakra-ui/react';
import Footer from '../pages/Footer'
import { headerBg } from '../styles/theme'
import { SearchIcon } from "@chakra-ui/icons";
import { FiShoppingCart } from "react-icons/fi"
import { useNavigate } from 'react-router-dom';
import { useQuery } from "../hook/UseQuery";
import { useState } from 'react';
import { useEffect } from 'react';

interface TemplateDTO {
    children: any
}

export default function Template({ children }: TemplateDTO) {
    const linkColor = useColorModeValue('white', 'white');
    const linkHoverColor = useColorModeValue('white', 'white');
    const navigate = useNavigate();
    const query = useQuery();
    const [search, setSearch] = useState('');
    
    useEffect(() => {
        setSearch(query.get('q') || '');
    }, [])

    const handleClickLogin = (data: any) => {
        navigate('/signin')
    }

    const handleClickCart = (data: any) => {
        navigate('/cart')
    }

    const handleClickLogo = (data: any) => {
        navigate('/')
    }

    const handleSearch = (data: any) => {
        console.log(search)
        navigate(`/search?q=${search}`)
    }

    return (
        <Box>
            <Flex
                bg={useColorModeValue(headerBg, headerBg)}
                minH={'60px'}
                py={{ base: 2 }}
                px={{ base: 4 }}
                borderBottom={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.900')}
                align={'center'}>
                <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }} gap={4}>
                    <Flex justifyContent={'center'} alignItems={'center'} gap={3} onClick={handleClickLogo} cursor={'pointer'}>
                        <Image src='logo.svg' h={'2em'} ></Image>
                        <Text fontSize="xl" fontWeight="bold" color={useColorModeValue('white', 'white')}>
                            Droneseta
                        </Text>
                    </Flex>
                    <InputGroup maxW={'720px'} >
                        <Input
                            type="text"
                            placeholder="Digite para pesquisar"
                            _focus={{
                                backgroundColor: "var(--chakra-colors-gray-100)"
                            }}
                            onChange={(e) => (setSearch(e.target.value))}
                            value={search}
                        />
                        <InputRightElement cursor={'pointer'} onClick={handleSearch}>
                            <Icon as={SearchIcon} color="blackAlpha.900" />
                        </InputRightElement>
                    </InputGroup>
                </Flex>

                <Stack
                    flex={{ base: 1, md: 0 }}
                    justify={'flex-end'}
                    direction={'row'}
                    spacing={8}>
                    <Box cursor={'pointer'} onClick={handleClickCart}>
                        <FiShoppingCart color='white'/>
                    </Box>
                    <Button
                        as={'a'}
                        fontSize={'sm'}
                        fontWeight={400}
                        variant={'link'}
                        href={'#'}
                        color={linkColor}
                        _hover={{
                            textDecoration: 'none',
                            color: linkHoverColor,
                        }}
                        onClick={handleClickLogin}>
                        Login
                    </Button>
                </Stack>
            </Flex>
            <Box minH={'calc(100vh - 124px)'} bg={useColorModeValue('gray.50', 'gray.800')}>
                {children}
            </Box>
            <Footer></Footer>
        </Box>
    );
}