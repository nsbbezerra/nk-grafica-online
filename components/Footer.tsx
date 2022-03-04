import {
  Box,
  Link as ChakraLink,
  Container,
  Grid,
  Heading,
  Text,
  useColorModeValue,
  Icon,
  HStack,
  IconButton,
  Stack,
} from "@chakra-ui/react";
import { Fragment } from "react";
import {
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineLink,
  AiOutlineLinkedin,
  AiOutlineMail,
  AiOutlineTwitter,
  AiOutlineWhatsApp,
} from "react-icons/ai";

export default function Footer() {
  return (
    <Fragment>
      <Box
        py={10}
        bg={useColorModeValue("blackAlpha.200", "whiteAlpha.200")}
        mt={20}
      >
        <Container maxW={"7xl"}>
          <Grid
            templateColumns={"repeat(auto-fit, minmax(260px, 260px))"}
            gap={10}
            justifyContent="center"
          >
            <Box>
              <Heading fontSize={"3xl"} mb={5}>
                Links Úteis
              </Heading>

              <Stack>
                <ChakraLink display={"flex"} alignItems="center">
                  <Icon as={AiOutlineLink} mr={2} />
                  Instruções
                </ChakraLink>
                <ChakraLink display={"flex"} alignItems="center">
                  <Icon as={AiOutlineLink} mr={2} />
                  Institucional
                </ChakraLink>
                <ChakraLink display={"flex"} alignItems="center">
                  <Icon as={AiOutlineLink} mr={2} />
                  Orçamentos
                </ChakraLink>
                <ChakraLink display={"flex"} alignItems="center">
                  <Icon as={AiOutlineLink} mr={2} />
                  Fale Conosco
                </ChakraLink>
              </Stack>
            </Box>
            <Box>
              <Heading fontSize={"3xl"} mb={5}>
                Atendimento
              </Heading>

              <Text>
                De Segunda a Sexta das 08:00 às 12:00 e das 14:00 as 17:00
              </Text>
            </Box>
            <Box>
              <Heading fontSize={"3xl"} mb={5}>
                Endereço
              </Heading>

              <Text>
                Rua 34, Qd 15 Lt 14, S/N, Setor Canavieiras, Pedro Afonso - TO
              </Text>
              <Text>CEP: 77710-000</Text>
              <Text>CNPJ: 40.526.622/0001-72</Text>
            </Box>
            <Box>
              <Heading fontSize={"3xl"} mb={5}>
                Contato
              </Heading>

              <ChakraLink display={"flex"} alignItems="center">
                <Icon as={AiOutlineWhatsApp} mr={2} />
                (63) 99971-1716
              </ChakraLink>
              <ChakraLink display={"flex"} alignItems="center">
                <Icon as={AiOutlineMail} mr={2} />
                contato.nk.info@gmail.com
              </ChakraLink>

              <HStack mt={5}>
                <IconButton
                  icon={<AiOutlineInstagram />}
                  aria-label="Instagram"
                  colorScheme={"blue"}
                  variant="outline"
                  size="sm"
                />
                <IconButton
                  icon={<AiOutlineFacebook />}
                  aria-label="Instagram"
                  colorScheme={"blue"}
                  variant="outline"
                  size="sm"
                />
                <IconButton
                  icon={<AiOutlineTwitter />}
                  aria-label="Instagram"
                  colorScheme={"blue"}
                  variant="outline"
                  size="sm"
                />
                <IconButton
                  icon={<AiOutlineLinkedin />}
                  aria-label="Instagram"
                  colorScheme={"blue"}
                  variant="outline"
                  size="sm"
                />
              </HStack>
            </Box>
          </Grid>
        </Container>
      </Box>
      <Box
        bg={useColorModeValue("blue.500", "blue.200")}
        w="100%"
        py={3}
        color={useColorModeValue("white", "blue.800")}
        textAlign="center"
        px={10}
      >
        © 2023 por Natanael Bezerra - NK Gráfica Online
      </Box>
    </Fragment>
  );
}
