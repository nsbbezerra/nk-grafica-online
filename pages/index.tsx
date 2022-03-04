import {
  Box,
  Center,
  Container,
  Grid,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Text,
  useColorModeValue,
  Button,
  Icon,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { Fragment, useState } from "react";
import { AiOutlineTags } from "react-icons/ai";
import AccordionApp from "../components/Accordion";
import Header from "../components/Header";
import Products from "../components/Products";

const Home: NextPage = () => {
  const [drawer, setDrawer] = useState<boolean>(false);

  return (
    <Fragment>
      <Header title="NK Gráfica Online | Cartões de visita, panfletos, flyers, adesivos, lonas, blocos, sacolas e etc.." />

      <Container maxW={"7xl"} mt={10}>
        <Center>
          <Text fontSize={"3xl"} textAlign="center" fontWeight={"semibold"}>
            Nossos Produtos
          </Text>
        </Center>

        <Grid
          templateColumns={[
            "1fr",
            "230px 1fr",
            "230px 1fr",
            "230px 1fr",
            "230px 1fr",
          ]}
          gap={5}
          mt={5}
        >
          <Button
            leftIcon={<AiOutlineTags />}
            colorScheme="cyan"
            variant="outline"
            size="lg"
            display={["flex", "none", "none", "none", "none"]}
            onClick={() => setDrawer(true)}
          >
            Categorias
          </Button>
          <Box
            h="min-content"
            borderWidth={"1px"}
            rounded="md"
            shadow={"sm"}
            p={2}
            display={["none", "block", "block", "block", "block"]}
          >
            <Text
              fontSize={"xl"}
              color={useColorModeValue("blue.500", "blue.200")}
            >
              <Icon as={AiOutlineTags} /> Categorias
            </Text>

            <AccordionApp />
          </Box>
          <Box>
            <Products />
          </Box>
        </Grid>
      </Container>

      <Drawer isOpen={drawer} placement="left" onClose={() => setDrawer(false)}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton color={useColorModeValue("white", "blue.800")} />
          <DrawerHeader
            bg={useColorModeValue("blue.500", "blue.200")}
            color={useColorModeValue("white", "blue.800")}
          >
            <Icon as={AiOutlineTags} mr={3} />
            Categorias
          </DrawerHeader>

          <DrawerBody p={1}>
            <AccordionApp />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Fragment>
  );
};

export default Home;
