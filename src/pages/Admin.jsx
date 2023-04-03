/* eslint-disable react/jsx-no-undef */
import React, { useState } from 'react';
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Image,
} from '@chakra-ui/react';
import {
  FiHome,
  FiTrendingUp,
  FiMenu,
  FiChevronDown,
  FiUser,
  FiShoppingBag,
  FiWind
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import { ReactText } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeAdmin from '../components/HomeAdmin'
import AdminCustomer from '../components/AdminCustomer'
import AdminProductSales from '../components/AdminProductSales'
import AdminShopping from '../components/AdminShopping'
import { headerBg } from '../styles/theme'
import AdminTravel from '../components/AdminTravel';
import AdminProduct from '../components/AdminProduct'

interface LinkItemProps {
  name: string;
  icon: IconType;
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Clientes', icon: FiUser, menu: 1, link: "/admin/customer"},
  { name: 'Produtos', icon: FiShoppingBag, menu: 2, link: "/admin/product"},
  { name: 'Pagamentos', icon: FiTrendingUp, menu: 3, link: "/admin/shopping"},
  { name: 'Viagens', icon: FiWind, menu: 4, link: "/admin/travel" },
  { name: 'Mais Vendidos', icon: FiShoppingBag, menu: 5, link: "/admin/productsales"}
];


export default function Admin({children}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [menu, setMenu] = useState(0);

  return (
    <Box minH="100vh">
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
        menu={menu}
        setMenu={setMenu}
        bg={useColorModeValue(headerBg, headerBg)}
        color={'white'}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {/* {menu === 0 && <HomeAdmin></HomeAdmin>}
        {menu === 1 && <AdminCustomer></AdminCustomer>}
        {menu === 2 && <AdminProduct></AdminProduct>}
        {menu === 3 && <AdminShopping></AdminShopping>}
        {menu === 4 && <AdminTravel></AdminTravel>}
        {menu === 5 && <AdminProductSales></AdminProductSales>} */}
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
  menu: any;
  setMenu: any;
}

const SidebarContent = ({ onClose, menu, setMenu, ...rest }: SidebarProps) => {
  const navigate = useNavigate();
  return (
    <Box
      borderRight="1px"
      borderRightColor={'whiteAlpha.300'}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      bg={useColorModeValue(headerBg, headerBg)}
      color={'white'}
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Flex justifyContent={'center'} alignItems={'center'} gap={3}>
          <Image src='logo.svg' h={'35px'}></Image>
          <Text fontSize="2xl" fontWeight="bold">
            Droneseta
          </Text>
        </Flex>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} onClick={() => {
          navigate(link.link);
        }}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
}
const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Link href="#" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'whiteAlpha.200',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const navigate = useNavigate();
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
      bg={useColorModeValue(headerBg, headerBg)}
      color={'white'}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <HStack spacing={{ base: '0', md: '6' }}>
        
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar
                  size={'sm'}
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                  <Text fontSize="sm">Administrador</Text>
                  <Text fontSize="xs" color="gray.600">
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue(headerBg, headerBg)}
              borderColor={useColorModeValue('gray.200', 'gray.700')}
              >
              {/* <MenuDivider /> */}
              <MenuItem bg={useColorModeValue(headerBg, headerBg)} _hover={{bg: 'whiteAlpha.200',}} onClick={() => {navigate('../admin-login')}}>Sair</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};