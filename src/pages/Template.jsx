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
    Icon,
    Avatar,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider
} from '@chakra-ui/react';
import Footer from '../pages/Footer'
import { headerBg } from '../styles/theme'
import { SearchIcon } from "@chakra-ui/icons";
import { FiShoppingCart } from "react-icons/fi"
import { useNavigate } from 'react-router-dom';
import { useQuery } from "../hook/UseQuery";
import { useState } from 'react';
import { useEffect } from 'react';
import { SearchContext } from "../context/SearchContext"
import { useContext } from 'react';
import { useRef } from 'react';

interface TemplateDTO {
    children: any
}

export default function Template({ children }: TemplateDTO) {
    const linkColor = useColorModeValue('white', 'white');
    const linkHoverColor = useColorModeValue('white', 'white');
    const navigate = useNavigate();
    const query = useQuery();

    const {searchState: [, setSearch] } = useContext(SearchContext);
    const searchRef = useRef("");

    useEffect(() => {
        const queryValue = query.get('q') || '';
        searchRef.current.value = queryValue;
        setSearch(queryValue);
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

    const handleSearch = async (data: any) => {
        await setSearch(searchRef.current.value);
        navigate(`/search?q=${searchRef.current.value}`)
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
                        <Image src='/logo.svg' h={'2em'} ></Image>
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
                            ref={searchRef}
                            // onChange={(e) => (setSearch(e.target.value))}
                            // value={search}
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
                    spacing={8}
                    alignItems={'center'}
                    justifyContent={'center'}>
                    <Box cursor={'pointer'} onClick={handleClickCart} >
                        <FiShoppingCart color='white' />
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
                    <Menu>
                        <MenuButton py={2}
                            transition="all 0.3s"
                            _focus={{ boxShadow: 'none' }}>
                            <Avatar size={'sm'} />
                        </MenuButton>
                        <MenuList bg={useColorModeValue(headerBg, headerBg)}
                            borderColor={useColorModeValue('gray.200', 'gray.700')}>
                            <MenuItem color={'white'} bg={useColorModeValue(headerBg, headerBg)} _hover={{bg: 'whiteAlpha.200',}} onClick={() => {navigate('/shopping')}}>Compras</MenuItem>
                            <MenuItem color={'white'} bg={useColorModeValue(headerBg, headerBg)} _hover={{bg: 'whiteAlpha.200',}} onClick={() => {navigate('/')}}>Sair</MenuItem>
                        </MenuList>
                    </Menu>

                </Stack>
            </Flex>
            <Box minH={'calc(100vh - 124px)'} >
                {children}
            </Box>
            <Footer></Footer>
        </Box>
    );
}