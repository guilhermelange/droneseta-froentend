import { Box, Button, Flex, Heading, useColorMode, VStack } from "@chakra-ui/react";

export default function ToggleTheme() {
    const { colorMode, toggleColorMode } = useColorMode()
    

    return (
        <Flex alignItems={'center'} justifyContent={'center'} h={'100vh'}>
            <Box p={6} textAlign={'center'} background={'whiteAlpha.50'}>
                <VStack spacing={6}>
                    <Heading>Gostaria de alterar o tema?</Heading>
                    <Button onClick={toggleColorMode}>
                        Alterar para {colorMode === 'light' ? 'Dark' : 'Light'}
                    </Button>
                </VStack>
            </Box>
        </Flex>
    )
}