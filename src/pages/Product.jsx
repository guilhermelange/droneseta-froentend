import {
    Box,
    Container,
    Stack,
    Text,
    Image,
    Flex,
    VStack,
    Button,
    Heading,
    SimpleGrid,
    StackDivider,
    List,
    ListItem,
} from '@chakra-ui/react';
import { MdLocalShipping } from 'react-icons/md';
import Template from './Template'
import { primary, primaryHex } from '../styles/theme';
import useSWR from 'swr'
import { api, resources } from '../common/service/api'
import { useNavigate, useParams } from 'react-router-dom';
import { formatToBRL } from '../common/format';
import { useContext } from 'react';
import { SessionContext } from '../context/SessionContext';

function Product() {
    const { id } = useParams();
    const { data, error, isLoading } = useSWR(`product/${id}`, api);
    const { cartState: [cartItems, setCartItems] } = useContext(SessionContext);
    const navigate = useNavigate();

    if (error) return <div></div>
    if (isLoading) return <div></div>

    const product = data.data;
    const productIsOnCart = cartItems ? cartItems.find(item => item.id === product.id) : false;

    const handleAddToCart = (product) => {
        let cart = cartItems;

        if (!cart) {
            cart = [];
        }
        const itemOnCart = cart.find(item => item.id === product.id);
        
        if (!itemOnCart) {
            setCartItems([...cart, {
                id: product.id,
                name: product.name,
                image: product.img,
                price: product.price,
                quantity: 1,
            }])
        }
    }

    const handleRedirectToCart = () => {
        navigate('/cart')
    }

    return (
        <Container maxW={'7xl'}>
            <SimpleGrid
                columns={{ base: 1, lg: 2 }}
                spacing={{ base: 8, md: 10 }}
                py={{ base: 14, md: 20 }}>
                <Flex>
                    <Image
                        rounded={'md'}
                        alt={product.name}
                        src={resources + product.img}
                        fit={'cover'}
                        align={'center'}
                        w={'100%'}
                        h={{ base: '100%', sm: '400px', lg: '500px' }}
                    />
                </Flex>
                <Stack spacing={{ base: 6, md: 10 }}>
                    <Box as={'header'}>
                        <Heading
                            lineHeight={1.1}
                            fontWeight={600}
                            fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
                            {product.name}
                        </Heading>
                        <Text
                            color={'gray.900'}
                            fontWeight={300}
                            fontSize={'2xl'}>
                            {formatToBRL(product.price)}
                        </Text>
                    </Box>

                    <Stack
                        spacing={{ base: 4, sm: 6 }}
                        direction={'column'}
                        divider={
                            <StackDivider
                                borderColor={'gray.200'}
                            />
                        }>
                        <VStack spacing={{ base: 4, sm: 6 }}>
                            <Text fontSize={'lg'} w={'full'}>
                                {product.description}
                            </Text>
                        </VStack>
                        <Box>
                            <Text
                                fontSize={{ base: '16px', lg: '18px' }}
                                color={primaryHex}
                                fontWeight={'500'}
                                textTransform={'uppercase'}
                                mb={'4'}>
                                Detalhes
                            </Text>

                            <List spacing={2}>
                                <ListItem>
                                    <Text as={'span'} fontWeight={'bold'}>
                                        Tamanho:
                                    </Text>{' '}
                                    {product.size}
                                </ListItem>
                                <ListItem>
                                    <Text as={'span'} fontWeight={'bold'}>
                                        Estoque:
                                    </Text>{' '}
                                    {product.stock}
                                </ListItem>
                            </List>
                        </Box>
                    </Stack>

                    {!productIsOnCart &&  <Button
                        w={'full'}
                        mt={8}
                        size={'lg'}
                        colorScheme={primary}
                        onClick={() => { handleAddToCart(product) }}>
                        Adicionar ao carrinho
                    </Button>}

                    {productIsOnCart &&  <Button
                        w={'full'}
                        mt={8}
                        size={'lg'}
                        colorScheme={primary}
                        onClick={() => { handleRedirectToCart()}}>
                        Visualizar Carrinho
                    </Button>}                    

                    <Stack direction="row" alignItems="center" justifyContent={'center'}>
                        <MdLocalShipping />
                        <Text>Prossiga para calculo do prazo!</Text>
                    </Stack>
                </Stack>
            </SimpleGrid>
        </Container>
    );
}

export default function ProductDetails() {
    return (
        <Product></Product>
    )
}
