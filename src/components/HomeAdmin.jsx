import { Box, Text } from "@chakra-ui/react";

export default function HomeAdmin() {
    const currentTimestamp = new Date();
    return (
        <Box>
            <Text fontSize="1xl" fontWeight="bold">
                Seja bem vindo! {currentTimestamp.toLocaleString("pt-BR")}
            </Text>
        </Box>
    )
}