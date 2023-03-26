import {
    Box,
    Flex,
    Text,
    Button,
    Stack,
    Collapse,
    Link,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    useDisclosure,
    Image,
    Input,
    InputGroup,
    InputRightElement,
    Icon
} from '@chakra-ui/react';
import Footer from '../pages/Footer'
import { headerBg, primary } from '../styles/theme'
import { SearchIcon } from "@chakra-ui/icons";
import { FiShoppingCart } from "react-icons/fi"
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
interface TemplateDTO {
    children: any
}

export default function WithSubnavigation({ children }: TemplateDTO) {
    const { isOpen, onToggle } = useDisclosure();
    const linkColor = useColorModeValue('white', 'white');
    const linkHoverColor = useColorModeValue('white', 'white');
    const navigate = useNavigate();
    const search = useRef('');

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
        console.log(data)
        navigate(`/search?${search.current.value}`)
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
                            ref={search}
                        />
                        <InputRightElement cursor={'pointer'} onClick={handleSearch}>
                            <Icon as={SearchIcon} color="blackAlpha.900" />
                        </InputRightElement>
                    </InputGroup>

                    {/* <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
                        <DesktopNav />
                    </Flex> */}
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

            <Collapse in={isOpen} animateOpacity>
                <MobileNav />
            </Collapse>
        </Box>
    );
}

const DesktopNav = () => {
    const linkColor = useColorModeValue('white', 'white');
    const linkHoverColor = useColorModeValue('white', 'white');
    const popoverContentBgColor = useColorModeValue('white', 'gray.800');

    return (
        <Stack direction={'row'} spacing={4}>
            {NAV_ITEMS.map((navItem) => (
                <Box key={navItem.label}>
                    <Popover trigger={'hover'} placement={'bottom-start'}>
                        <PopoverTrigger>
                            <Link
                                p={2}
                                href={navItem.href ?? '#'}
                                fontSize={'sm'}
                                fontWeight={500}
                                color={linkColor}
                                _hover={{
                                    textDecoration: 'none',
                                    color: linkHoverColor,
                                }}
                            >
                                {navItem.label}
                            </Link>
                        </PopoverTrigger>

                        {navItem.children && (
                            <PopoverContent
                                border={0}
                                boxShadow={'xl'}
                                bg={popoverContentBgColor}
                                p={4}
                                rounded={'xl'}
                                minW={'sm'}>
                                <Stack>
                                    {navItem.children.map((child) => (
                                        <DesktopSubNav key={child.label} {...child} />
                                    ))}
                                </Stack>
                            </PopoverContent>
                        )}
                    </Popover>
                </Box>
            ))}
        </Stack>
    );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
    return (
        <Link
            href={href}
            role={'group'}
            display={'block'}
            p={2}
            rounded={'md'}
            _hover={{ bg: '#AB7DF0' }}>
            <Stack direction={'row'} align={'center'}>
                <Box>
                    <Text
                        transition={'all .3s ease'}
                        _groupHover={{ color: 'white' }}
                        fontWeight={500}
                        color={'black'}>
                        {label}
                    </Text>
                    <Text fontSize={'sm'} >{subLabel}</Text>
                </Box>
                <Flex
                    transition={'all .3s ease'}
                    transform={'translateX(-10px)'}
                    opacity={0}
                    _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
                    justify={'flex-end'}
                    align={'center'}
                    flex={1}>
                </Flex>
            </Stack>
        </Link>
    );
};

const MobileNav = () => {
    return (
        <Stack
            bg={useColorModeValue('white', 'white')}
            p={4}
            display={{ md: 'none' }}>
            {NAV_ITEMS.map((navItem) => (
                <MobileNavItem key={navItem.label} {...navItem} />
            ))}
        </Stack>
    );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Stack spacing={4} onClick={children && onToggle}>
            <Flex
                py={2}
                as={Link}
                href={href ?? '#'}
                justify={'space-between'}
                align={'center'}
                _hover={{
                    textDecoration: 'none',
                }}>
                <Text
                    fontWeight={600}
                    color={useColorModeValue('white', 'white')}>
                    {label}
                </Text>

            </Flex>

            <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
                <Stack
                    mt={2}
                    pl={4}
                    borderLeft={1}
                    borderStyle={'solid'}
                    borderColor={useColorModeValue('white', 'white')}
                    align={'start'}>
                    {children &&
                        children.map((child) => (
                            <Link key={child.label} py={2} href={child.href}>
                                {child.label}
                            </Link>
                        ))}
                </Stack>
            </Collapse>
        </Stack>
    );
};

interface NavItem {
    label: string;
    subLabel?: string;
    children?: Array<NavItem>;
    href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
    {
        label: 'Categorias',
        children: [
            {
                label: 'Casual',
                href: '#',
            },
            {
                label: 'Confortável',
                href: '#',
            },
            {
                label: 'Refrescante',
                href: '#',
            },
            {
                label: 'Descolado',
                href: '#',
            },
        ],
    },
    {
        label: 'Ofertas do dia'
    }
];