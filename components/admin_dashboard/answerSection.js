import { Box, Button, Collapse, IconButton, useToast, VStack } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useState } from "react";
import { FiEdit2 } from "react-icons/fi";

// Dynamically import ReactQuill with ssr:false
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const AnswerSection = ({ t }) => {
  const [answer, setAnswer] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const toast = useToast();

  const handleSave = () => {
    if (!answer || answer === "<p><br></p>") {
      toast({
        title: t("answer_cannot_be_empty") || "Answer cannot be empty",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    toast({
      title: t("answer_saved") || "Answer saved",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    setAnswer("");
    setIsOpen(false);
  };

  return (
    <VStack align="start" w="100%">
      <IconButton
        aria-label="Add Answer"
        icon={<FiEdit2 />}
        onClick={() => setIsOpen(!isOpen)}
        size="sm"
        variant="ghost"
        colorScheme="teal"
      />
      <Collapse in={isOpen} animateOpacity w="100%">
        <Box w="100%" mt={2}>
          <ReactQuill value={answer} onChange={setAnswer} />
          <Button mt={2} w="full" colorScheme="teal" onClick={handleSave}>
            {t("save_answer") || "Save Answer"}
          </Button>
        </Box>
      </Collapse>
    </VStack>
  );
};

export default AnswerSection;
