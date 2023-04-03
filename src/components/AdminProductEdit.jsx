import React, { useState } from 'react';
import {
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    Heading,
    Icon,
    Image,
    Input,
    Select,
    Stack,
    Text,
    Textarea,
    useToast,
} from '@chakra-ui/react';
import { api } from '../common/service/api'
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { primary } from '../styles/theme';


function AdminProduct() {
    const toast = useToast()
    let { id: idPath } = useParams();
    const [product, setProduct] = useState({
        id: idPath,
        name: '',
        description: '',
        size: '',
        price: 0.0,
        stock: 0,
        img: 'default.png'
    })
    const navigate = useNavigate();
    const isUpdate = idPath > 0;

    useEffect(() => {
        if (idPath > 0) {
            api.get(`/product/${idPath}`).then(item => {
                const productData = item.data;
                setProduct(productData)
            })
        }
    }, [])

    const handleUpdate = async () => {
        api.put(`/product/${idPath}`, product)
            .then(e => {
                toast({
                    title: 'Produto atualizado com sucesso!',
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                })
                handleReturn();
            })
            .catch(e => {
                toast({
                    title: 'Algo deu errado!',
                    status: 'error',
                    duration: 2000,
                    description: e.response?.data?.message || 'Erro interno' ,
                    isClosable: true,
                })
            });
    }

    const handleCreate = async () => {       
        api.post('/product', product)
            .then(e => {
                const newProduct = e.data;             
                toast({
                    title: 'Produto inserido com sucesso!',
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                })

                handleReturn();
            })
            .catch(e => {
                console.log()
                toast({
                    title: 'Algo deu errado! ',
                    description: e.response.data.message,
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                })
            });
    }

    const handleReturn = () => {
        navigate('/admin/product')
    }

    return (
        <Container maxW="container.lg" py={8}>
            <Heading size="lg" mb={4} display={'flex'}>
                {!isUpdate && <Text>Cadastro de Produto</Text>}
                {isUpdate && <Text>Editar Produto</Text>}
            </Heading>
            <Box d="flex" flexDirection={{ base: 'column', md: 'row' }}>
                <Box flex="1" mr={{ md: 4 }}>
                    {isUpdate && product.img && <Image mb={2} src={'/static/' + product.img} h={'200px'}></Image>}
                    {isUpdate && <FormControl mb={4}>
                        <FormLabel htmlFor="id">ID</FormLabel>
                        <Input id="id" name="id" placeholder="ID" isReadOnly value={idPath} />
                    </FormControl>}
                    <FormControl mb={4}>
                        <FormLabel htmlFor="name">Nome</FormLabel>
                        <Input colorScheme={'blackAlpha'} id="name" name="name" placeholder="Nome" value={product?.name}
                            onChange={e => { setProduct({ ...product, name: e.target.value }) }} />
                    </FormControl>
                    <FormControl mb={4}>
                        <FormLabel htmlFor="description">Descrição</FormLabel>
                        <Textarea
                            id="description"
                            name="description"
                            placeholder="Descrição"
                            value={product?.description}
                            onChange={e => { setProduct({ ...product, description: e.target.value }) }}
                        />
                    </FormControl>
                    <FormControl mb={4}>
                        <FormLabel htmlFor="size">Tamanho</FormLabel>
                        <Select id="size" name="size" placeholder="Selecione um tamanho" value={product?.size}
                            onChange={e => { setProduct({ ...product, size: e.target.value }) }}>
                            <option value="P">P</option>
                            <option value="M">M</option>
                            <option value="G">G</option>
                            <option value="GG">GG</option>
                            <option value="XG">XG</option>
                            <option value="XGG">XGG</option>
                        </Select>
                    </FormControl>
                    <FormControl mb={4}>
                        <FormLabel htmlFor="price">Preço</FormLabel>
                        <Input step={'any'} type='number' id="price" name="price" placeholder="Preço" value={product?.price}
                            onChange={e => { setProduct({ ...product, price: +e.target.value }) }} />
                    </FormControl>
                    <FormControl mb={4}>
                        <FormLabel htmlFor="stock">Estoque</FormLabel>
                        <Input step={1} type='number' id="stock" name="stock" placeholder="Estoque" value={product?.stock}
                            onChange={e => { setProduct({ ...product, stock: +e.target.value }) }} />
                    </FormControl>
                    <FormControl mb={4}>
                        <FormLabel htmlFor="img">Imagem</FormLabel>
                        <Input p={1} type='file' id="img" name="img" placeholder="Imagem"/>
                    </FormControl>
                    <FormControl mb={4}>
                        <Stack direction={'row'}>
                            <Button colorScheme={primary} onClick={() => {
                                if (isUpdate) {
                                    handleUpdate()
                                } else {
                                    handleCreate();
                                }
                            }}>Confirmar</Button>
                            <Button colorScheme={primary} variant={'outline'} onClick={handleReturn}>Voltar</Button>
                        </Stack>
                    </FormControl>
                </Box>
            </Box>
        </Container>
    );
}

export default AdminProduct;