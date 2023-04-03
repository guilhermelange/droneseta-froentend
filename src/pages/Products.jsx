import { Box, SimpleGrid, Image, Text, Container, useBreakpointValue, useDisclosure, Collapse } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { api } from '../common/service/api'
import { formatToBRL } from "../common/format"
import useSWR from 'swr'

export default function Products({name}) {
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/product/${id}`);
  }

  let endpoint = "/product"
  if (name) {
    endpoint += "?name="+name
  }
  const { data: products, error, isLoading } = useSWR(endpoint, api);

  const columns = useBreakpointValue({ base: 1, sm: 2, md: 3, lg: 4, xl: 5 });

  if (error) return <div></div>
  if (isLoading) return <div></div>

  return (
    <Container maxW="container.xl" py={8}>
      <SimpleGrid columns={columns} spacing={6}>
        {products.data && products.data.map((product) => (
          <Box key={product.id} 
               borderWidth="1px" 
               borderColor={"blackAlpha.200"} 
               borderRadius="lg" 
               overflow="hidden" 
               cursor={'pointer'}
               backgroundColor={"whiteAlpha.500"}
               onClick={() => {handleClick(product.id)}}>
            <Image src={'/static/' + product.img} alt={product.name} h={'150px'} w={'full'} />
            <Box p="6">
              <Box d="flex" alignItems="baseline">
                <Text fontWeight="semibold" fontSize="sm" letterSpacing="wide">
                  {product.name}
                </Text>
                <Text fontSize="sm" color="blackAlpha.700">
                  {formatToBRL(product.price)}
                </Text>
              </Box>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
}