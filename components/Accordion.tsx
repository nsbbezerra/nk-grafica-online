import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
} from "@chakra-ui/react";
import { FaPaintBrush } from "react-icons/fa";

const AccordionApp = () => {
  return (
    <Accordion mt={3}>
      <AccordionItem>
        <h2>
          <AccordionButton _focus={{ outline: "none" }}>
            <Box flex="1" textAlign="left">
              Cartões de Visita
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel px={0} py={2}>
          <Button
            leftIcon={<FaPaintBrush />}
            size="sm"
            colorScheme={"cyan"}
            variant="ghost"
            isFullWidth
            justifyContent={"start"}
          >
            Cartões Simples
          </Button>
          <Button
            leftIcon={<FaPaintBrush />}
            size="sm"
            colorScheme={"cyan"}
            variant="ghost"
            isFullWidth
            justifyContent={"start"}
          >
            Cartões Duplos
          </Button>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <h2>
          <AccordionButton _focus={{ outline: "none" }}>
            <Box flex="1" textAlign="left">
              Cartões de Visita
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel px={0} py={2}>
          <Button
            leftIcon={<FaPaintBrush />}
            size="sm"
            colorScheme={"cyan"}
            variant="ghost"
            isFullWidth
            justifyContent={"start"}
          >
            Cartões Simples
          </Button>
          <Button
            leftIcon={<FaPaintBrush />}
            size="sm"
            colorScheme={"cyan"}
            variant="ghost"
            isFullWidth
            justifyContent={"start"}
          >
            Cartões Duplos
          </Button>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <h2>
          <AccordionButton _focus={{ outline: "none" }}>
            <Box flex="1" textAlign="left">
              Cartões de Visita
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel px={0} py={2}>
          <Button
            leftIcon={<FaPaintBrush />}
            size="sm"
            colorScheme={"cyan"}
            variant="ghost"
            isFullWidth
            justifyContent={"start"}
          >
            Cartões Simples
          </Button>
          <Button
            leftIcon={<FaPaintBrush />}
            size="sm"
            colorScheme={"cyan"}
            variant="ghost"
            isFullWidth
            justifyContent={"start"}
          >
            Cartões Duplos
          </Button>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default AccordionApp;
