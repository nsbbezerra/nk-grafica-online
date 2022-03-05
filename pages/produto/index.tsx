import { NextPage } from "next";
import { Fragment } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Container,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Text,
  useColorModeValue,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  InputGroup,
  Input,
  InputRightAddon,
  Stat,
  StatLabel,
  StatNumber,
  Button,
  Link as ChakraLink,
  Switch,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  UnorderedList,
  ListItem,
  Divider,
  Center,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineShoppingCart } from "react-icons/ai";

const Produtos: NextPage = () => {
  return (
    <Fragment>
      <Header title="NK Gráfica Online | Cartões de visita, panfletos, flyers, adesivos, lonas, blocos, sacolas e etc..." />
      <Container maxW={"5xl"} mt={10}>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" as={Link}>
              Início
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" as={Link} isCurrentPage>
              Cartão de visita 4x1 - 9x5cm 1000 Unidades
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <Grid
          mt={10}
          templateColumns={[
            "repeat(1, 1fr)",
            "repeat(2, 1fr)",
            "repeat(2, 1fr)",
            "repeat(2, 1fr)",
            "repeat(2, 1fr)",
          ]}
          gap={10}
        >
          <Box
            w="100%"
            rounded="md"
            overflow={"hidden"}
            shadow="sm"
            h="fit-content"
          >
            <Image
              src={
                "https://img.freepik.com/vetores-gratis/modelo-de-cartao-de-visita-preto_23-2147497818.jpg"
              }
              alt="NK Gráfica Online - Cartões de Visita"
              width={300}
              height={250}
              layout="responsive"
              objectFit="cover"
            />
          </Box>

          <Box w="100%">
            <Heading
              color={useColorModeValue("blue.500", "blue.200")}
              fontSize="3xl"
            >
              Cartão de visita 4x1 - 9x5cm 1000 Unidades
            </Heading>

            <FormControl mt={5} isRequired>
              <FormLabel>Nome do Item</FormLabel>
              <Input />
            </FormControl>
            <Grid templateColumns={"1fr 1fr"} gap={5} mt={2}>
              <FormControl>
                <FormLabel>Quantidade</FormLabel>
                <NumberInput value={1}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl>
                <FormLabel>Acabamentos</FormLabel>
                <Select>
                  <option>Corte reto + 8 furos retos</option>
                </Select>
              </FormControl>
            </Grid>
            <Grid templateColumns={"1fr 1fr"} gap={5} mt={2}>
              <FormControl>
                <FormLabel>Largura</FormLabel>
                <Select>
                  <option>Corte reto + 8 furos retos</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Altura</FormLabel>
                <InputGroup>
                  <Input />
                  <InputRightAddon>cm</InputRightAddon>
                </InputGroup>
              </FormControl>
            </Grid>
            <Switch mt={3}>Contratar a arte: R$ 25,00</Switch>
            <Switch mt={1}>
              Concordo com os{" "}
              <ChakraLink color={useColorModeValue("cyan.500", "cyan.200")}>
                termos de serviço
              </ChakraLink>
            </Switch>
            <Grid mt={5} templateColumns="1fr 2fr" gap={5} alignItems="center">
              <Stat>
                <StatLabel>Total a pagar:</StatLabel>
                <StatNumber>R$ 300,00</StatNumber>
              </Stat>
              <Button
                leftIcon={<AiOutlineShoppingCart />}
                colorScheme={"blue"}
                size="lg"
              >
                Adicionar ao Carrinho
              </Button>
            </Grid>
          </Box>
        </Grid>

        <Tabs variant={"enclosed"} mt={10}>
          <TabList>
            <Tab>Informações do Produto</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <UnorderedList fontSize={"lg"} mt={5}>
                <ListItem>Lorem ipsum dolor sit amet</ListItem>
                <ListItem>Consectetur adipiscing elit</ListItem>
                <ListItem>Integer molestie lorem at massa</ListItem>
                <ListItem>Facilisis in pretium nisl aliquet</ListItem>
              </UnorderedList>
            </TabPanel>
          </TabPanels>
        </Tabs>

        <Divider mt={10} mb={10} />
        <Center>
          <Heading
            fontSize={"2xl"}
            color={useColorModeValue("blue.500", "blue.200")}
          >
            Produtos Relacionados
          </Heading>
        </Center>

        <Grid
          templateColumns={[
            "repeat(2, 1fr)",
            "repeat(3, 1fr)",
            "repeat(4, 1fr)",
            "repeat(5, 1fr)",
            "repeat(5, 1fr)",
          ]}
          mt={5}
          gap={2}
          justifyContent="center"
        >
          <Box
            rounded={"md"}
            shadow="sm"
            borderWidth={"1px"}
            overflow="hidden"
            h="fit-content"
          >
            <Box w="100%">
              <Image
                src={
                  "https://img.freepik.com/vetores-gratis/modelo-de-cartao-de-visita-preto_23-2147497818.jpg"
                }
                alt="NK Gráfica Online - Cartões de Visita"
                width={300}
                height={250}
                layout="responsive"
                objectFit="cover"
              />
            </Box>

            <LinkBox p={2}>
              <LinkOverlay>
                <Text fontSize="sm">
                  Cartão de visita 4x1 - 9x5cm 1000 Unidades
                </Text>

                <Stat
                  size={"md"}
                  mt={2}
                  color={useColorModeValue("blue.500", "blue.200")}
                >
                  <StatLabel>A partir de:</StatLabel>
                  <StatNumber>R$ 30,00</StatNumber>
                </Stat>
              </LinkOverlay>
            </LinkBox>
          </Box>
        </Grid>
      </Container>
      <Footer />
    </Fragment>
  );
};

export default Produtos;
