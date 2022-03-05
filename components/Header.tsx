import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Link as ChakraLink,
  MenuDivider,
  useColorModeValue,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Icon,
  Stack,
  Grid,
  Text,
  Stat,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import { FC, Fragment, useState } from "react";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillLinkedin,
  AiFillTwitterSquare,
  AiOutlineDelete,
  AiOutlineFileAdd,
  AiOutlineFileText,
  AiOutlineHome,
  AiOutlineInfoCircle,
  AiOutlineLogin,
  AiOutlineLogout,
  AiOutlineMail,
  AiOutlineMenu,
  AiOutlinePhone,
  AiOutlineSave,
  AiOutlineSearch,
  AiOutlineShopping,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineWhatsApp,
} from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
import Link from "next/link";

type Props = {
  title: string;
};

const Header: FC<Props> = ({ title }) => {
  const [cart, setCart] = useState<boolean>(false);

  return (
    <Fragment>
      <Head>
        <title>{title}</title>
      </Head>
      <Box w="100%">
        <Box
          w="100%"
          bg={useColorModeValue("gray.50", "whiteAlpha.100")}
          py={3}
        >
          <Container maxW={"7xl"}>
            <Flex
              align={"center"}
              justify={[
                "end",
                "space-between",
                "space-between",
                "space-between",
                "space-between",
              ]}
            >
              <HStack
                spacing={5}
                display={["none", "flex", "flex", "flex", "flex"]}
              >
                <Button
                  variant="link"
                  colorScheme={"blue"}
                  size="sm"
                  leftIcon={<AiOutlineWhatsApp />}
                >
                  (63) 99971-1716
                </Button>
                <Button
                  variant="link"
                  colorScheme={"blue"}
                  size="sm"
                  leftIcon={<AiOutlineMail />}
                >
                  contato.nk.info@gmail.com
                </Button>
              </HStack>
              <HStack spacing={-2}>
                <IconButton
                  aria-label="instagram"
                  icon={<AiFillInstagram />}
                  variant="link"
                  colorScheme={"blue"}
                  size="lg"
                />
                <IconButton
                  aria-label="instagram"
                  icon={<AiFillTwitterSquare />}
                  variant="link"
                  size="lg"
                  colorScheme={"blue"}
                />
                <IconButton
                  aria-label="instagram"
                  icon={<AiFillFacebook />}
                  variant="link"
                  size="lg"
                  colorScheme={"blue"}
                />
                <IconButton
                  aria-label="instagram"
                  icon={<AiFillLinkedin />}
                  variant="link"
                  size="lg"
                  colorScheme={"blue"}
                />
              </HStack>
            </Flex>
          </Container>
        </Box>
        <Box py={3}>
          <Container maxW={"7xl"}>
            <Flex align={"center"} justify="space-between">
              <HStack>
                <Box w={["fit-content", "sm", "sm", "sm", "sm"]}>
                  <Image
                    src="/img/logo.svg"
                    alt={title}
                    width={200}
                    height={70}
                    objectFit="contain"
                    draggable={false}
                  />
                </Box>

                <InputGroup
                  size={"lg"}
                  display={["none", "none", "flex", "flex", "flex"]}
                >
                  <Input placeholder="Buscar produtos" />
                  <InputRightElement>
                    <AiOutlineSearch />
                  </InputRightElement>
                </InputGroup>
              </HStack>

              <HStack spacing={[1, 1, 5, 5, 5]} ml={10}>
                <Menu placement="bottom-end">
                  <MenuButton
                    display={["none", "none", "flex", "flex", "flex"]}
                    as={Button}
                    leftIcon={<AiOutlineUser />}
                    colorScheme="blue"
                    variant={"link"}
                    rightIcon={<MdKeyboardArrowDown />}
                  >
                    Área do Cliente
                  </MenuButton>
                  <MenuList>
                    <MenuItem icon={<AiOutlineLogin />}>Login</MenuItem>
                    <MenuItem icon={<AiOutlineSave />}>Cadastre-se</MenuItem>
                    <MenuDivider />
                    <MenuItem icon={<AiOutlineLogout />}>Sair</MenuItem>
                  </MenuList>
                </Menu>
                <Menu placement="bottom-end">
                  <MenuButton
                    display={["flex", "flex", "none", "none", "none"]}
                    as={IconButton}
                    icon={<AiOutlineUser />}
                    colorScheme="blue"
                    variant={"link"}
                    fontSize="3xl"
                  >
                    Área do Cliente
                  </MenuButton>
                  <MenuList>
                    <MenuItem icon={<AiOutlineLogin />}>Login</MenuItem>
                    <MenuItem icon={<AiOutlineSave />}>Cadastre-se</MenuItem>
                    <MenuDivider />
                    <MenuItem icon={<AiOutlineLogout />}>Sair</MenuItem>
                  </MenuList>
                </Menu>
                <HStack spacing={0}>
                  <IconButton
                    aria-label="chart"
                    icon={<AiOutlineShoppingCart />}
                    colorScheme="blue"
                    variant={"link"}
                    size="lg"
                    fontSize={"3xl"}
                    onClick={() => setCart(true)}
                  />
                  <Badge colorScheme={"cyan"}>1</Badge>
                </HStack>
              </HStack>
            </Flex>
          </Container>
        </Box>

        <Box w="100%" bg={useColorModeValue("blue.500", "blue.200")} py={3}>
          <Container maxW={"7xl"}>
            <HStack
              spacing={10}
              display={["none", "flex", "flex", "flex", "flex"]}
            >
              <Link href={"/"} passHref>
                <ChakraLink
                  display={"flex"}
                  alignItems="center"
                  gap={2}
                  color={useColorModeValue("white", "blue.800")}
                  _focus={{ outline: "none" }}
                >
                  <AiOutlineHome />
                  Início
                </ChakraLink>
              </Link>
              <ChakraLink
                display={"flex"}
                alignItems="center"
                gap={2}
                color={useColorModeValue("white", "blue.800")}
              >
                <AiOutlineFileText />
                Instruções
              </ChakraLink>
              <ChakraLink
                display={"flex"}
                alignItems="center"
                gap={2}
                color={useColorModeValue("white", "blue.800")}
              >
                <AiOutlineInfoCircle />
                Institucional
              </ChakraLink>
              <ChakraLink
                display={"flex"}
                alignItems="center"
                gap={2}
                color={useColorModeValue("white", "blue.800")}
              >
                <AiOutlineFileAdd />
                Orçamentos
              </ChakraLink>
              <ChakraLink
                display={"flex"}
                alignItems="center"
                gap={2}
                color={useColorModeValue("white", "blue.800")}
              >
                <AiOutlinePhone />
                Fale Conosco
              </ChakraLink>
            </HStack>
            <HStack
              spacing={10}
              display={["flex", "none", "none", "none", "none"]}
            >
              <Flex
                alignItems="center"
                gap={2}
                color={useColorModeValue("white", "blue.800")}
                fontWeight="bold"
              >
                <AiOutlineMenu />
                MENU
              </Flex>
            </HStack>
          </Container>
        </Box>
      </Box>

      <Drawer
        isOpen={cart}
        placement="right"
        onClose={() => setCart(false)}
        size="sm"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton color={useColorModeValue("white", "blue.800")} />
          <DrawerHeader
            bg={useColorModeValue("blue.500", "blue.200")}
            color={useColorModeValue("white", "blue.800")}
          >
            <Icon as={AiOutlineShoppingCart} mr={3} />
            Carrinho
          </DrawerHeader>

          <DrawerBody py={4}>
            <Stack spacing={5}>
              <Grid templateColumns={"100px 1fr"} gap={5}>
                <Box w="100%" h="fit-content" rounded="md" overflow={"hidden"}>
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
                <Box>
                  <Text>Cartão de visita 4x1 - 9x5cm 1000 Unidades</Text>

                  <Flex justify={"space-between"}>
                    <HStack color={"blue.500"}>
                      <Text>1x</Text>
                      <Text fontWeight={"bold"}>R$ 30,00</Text>
                    </HStack>

                    <Button
                      leftIcon={<AiOutlineDelete />}
                      colorScheme="red"
                      size="xs"
                      variant="outline"
                    >
                      Remover
                    </Button>
                  </Flex>
                </Box>
              </Grid>
            </Stack>
          </DrawerBody>

          <DrawerFooter>
            <Button
              leftIcon={<AiOutlineShopping />}
              isFullWidth
              colorScheme={"blue"}
              size="lg"
            >
              Finalizar Compra
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Fragment>
  );
};

export default Header;
