import {
  Box,
  Button,
  Flex,
  Grid,
  ListItem,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  UnorderedList,
  useColorModeValue,
} from "@chakra-ui/react";
import Image from "next/image";
import { FC } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Link from "next/link";

const Products: FC = () => {
  const Card = () => (
    <Box
      rounded={"md"}
      borderWidth="1px"
      overflow={"hidden"}
      shadow="sm"
      w="100%"
      h="fit-content"
      position={"relative"}
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

      <Box px={3} py={2}>
        <Text fontWeight="semibold" noOfLines={2}>
          Cartão de visita 4x1 - 9x5cm 1000 Unidades
        </Text>
        <UnorderedList
          fontSize={"sm"}
          mt={2}
          textDecor="none"
          color={useColorModeValue("gray.700", "gray.200")}
        >
          <ListItem>Lorem ipsum dolor sit amet</ListItem>
          <ListItem>Consectetur adipiscing elit</ListItem>
          <ListItem>Integer molestie lorem at massa</ListItem>
          <ListItem>Facilisis in pretium nisl aliquet</ListItem>
        </UnorderedList>
        <Flex justify={"space-between"} align="center" w="100%" mt={2} gap={3}>
          <Stat size={"md"} color="blue.600">
            <StatLabel>Compre por:</StatLabel>
            <StatNumber fontSize={"md"}>R$ 100,00</StatNumber>
          </Stat>

          <Link href={"/produto"} passHref>
            <a>
              <Button
                colorScheme={"blue"}
                leftIcon={<AiOutlineShoppingCart />}
                variant="outline"
              >
                Comprar
              </Button>
            </a>
          </Link>
        </Flex>
      </Box>
    </Box>
  );

  return (
    <Grid
      templateColumns={"repeat(auto-fit, minmax(240px, 240px))"}
      gap={3}
      justifyContent="center"
    >
      <Card />
      <Card />
      <Card />
      <Card />
    </Grid>
  );
};

export default Products;
