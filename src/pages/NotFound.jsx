import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { primary } from "../styles/theme";

export default function NotFound() {
    return (
        <Flex alignItems={'center'} justifyContent={'center'} py={28}>
            <Box p={6} textAlign={'center'} background={'whiteAlpha.50'}>
                <VStack spacing={6}>
                    <Heading>Não localizado<Text display={'inline'} color={primary}>!</Text> </Heading>
                    <Text>Desculpe, não há nada aqui!</Text>
                </VStack>
            </Box>
        </Flex>
    )
}