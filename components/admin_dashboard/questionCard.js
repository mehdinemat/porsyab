import {
  Avatar,
  Badge,
  Button,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  Tooltip,
  useDisclosure,
  useToast,
  VStack
} from "@chakra-ui/react";
import axios from "axios";
import moment from "moment-jalaali";
import { useRouter } from "next/router";
import { useState } from "react";
import { BiMessageAdd } from "react-icons/bi"; // new reply icon
import { FiMoreVertical } from "react-icons/fi";
import { GiBigDiamondRing } from "react-icons/gi";
import { IoCheckmark, IoEyeOutline } from "react-icons/io5";
import useSWRMutation from "swr/mutation";
import { baseUrl } from "../lib/api";

const postRequest = (url, { arg: { id, ...data } }) => {
  return axios.post(baseUrl + url + `?question_id=${id}`, data)
}

const QuestionCard = ({ data, t, type = "question" }) => {

  const toast = useToast()

  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [answerText, setAnswerText] = useState("");

  const { trigger: triggerAnswer, isLoading } = useSWRMutation(`user/question/answer`, postRequest, {
    onSuccess: () => {
      toast({
        title: 'موفق',
        description: "جواب با موفقیت ثبت شد.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    }
  })

  const handleQuestionRouter = (id, openInNewTab = false) => {
    const url = `/question_answer/${id}`;
    if (openInNewTab) {
      window.open(url, "_blank");
    } else {
      router.push(url);
    }
  };

  const handleClickTags = (item) => {
    router.push(`/questions/tag/${item?.id}/${item?.name}`);
  };

  const handleSubmitAnswer = () => {
    // TODO: Replace with your API call
    triggerAnswer({ lang: 'fa', content: answerText, id: data?.id })
    console.log("Submitting answer:", answerText, "for question:", data?.id);
    setAnswerText("");
    onClose();
  };

  return (
    <HStack
      w={"100%"}
      alignItems={"start"}
      borderBottom={"1px solid #E2E8F0"}
      mb={"10px"}
      pb={"20px"}
      gap={"20px"}
      position="relative"
      cursor={"pointer"}
      zIndex={9}
    >
      {/* Left stats */}
      <VStack
        w={"150px"}
        height={"100%"}
        alignItems={"start"}
        onClick={() =>
          handleQuestionRouter(
            type === "question" ? data?.id : data?.question_id,
            false
          )
        }
      >
        <HStack color={"gray.600"}>
          <GiBigDiamondRing fontSize={"20px"} />
          <Text fontSize={"16px"}>
            {data?.like_count} {t("like")}
          </Text>
        </HStack>
        <HStack color={"gray.600"}>
          <IoCheckmark fontSize={"20px"} />
          <Text fontSize={"16px"}>
            {data?.answer_count} {t("answer")}
          </Text>
        </HStack>
        <HStack color={"gray.600"}>
          <IoEyeOutline fontSize={"20px"} />
          <Text fontSize={"16px"}>
            {data?.view_count} {t("view")}
          </Text>
        </HStack>
      </VStack>

      {/* Content section */}
      <VStack
        w={"100%"}
        alignItems={"start"}
        gap={"20px"}
        position="relative"
        onClick={() =>
          handleQuestionRouter(
            type === "question" ? data?.id : data?.question_id,
            false
          )
        }
      >
        <HStack w="full" justifyContent="space-between" alignItems={"start"}>
          <Text
            fontSize={"18px"}
            w="full"
            whiteSpace="normal"
            lineHeight={"taller"}
            textAlign={"justify"}
            cursor={"pointer"}
          >
            {data?.content}
          </Text>
        </HStack>

        {/* Tags */}
        <HStack>
          {data?.tags?.map((item, index) => (
            <Badge
              key={index}
              onClick={() => handleClickTags(item)}
              _hover={{ bgColor: "#29cccc38", color: "#1a7c7c" }}
              transition={".3s"}
              color="#16A6A6"
              bgColor="#29CCCC1A"
              height="26px"
              fontSize={"14px"}
              fontWeight={"100"}
              px="8px"
              cursor="pointer"
            >
              {item?.name}
            </Badge>
          ))}
        </HStack>

        {/* Author + time */}
        <HStack w={"100%"} justifyContent={"space-between"}>
          {data?.source && (
            <HStack>
              <Avatar size={"sm"} />
              <Text color={"gray.700"}>{data?.source}</Text>
            </HStack>
          )}
          <Text color={"gray.400"}>
            {moment(data?.created_at).format("hh:mm:ss jYYYY/jMM/jDD")}
          </Text>
        </HStack>
      </VStack>

      {/* Right side action buttons */}
      <HStack>
        {/* Reply button -> open modal */}
        <Tooltip label='افزودن جواب'>
          <IconButton
            aria-label="Add Answer"
            icon={<BiMessageAdd />}
            size="sm"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation(); // prevent navigation
              onOpen();
            }}
          />
        </Tooltip>

        {/* More options */}
        <Menu>
          <MenuButton
            zIndex={9999}
            as={IconButton}
            icon={<FiMoreVertical />}
            size="sm"
            variant="ghost"
            aria-label="More options"
          />
          <MenuList>
            <MenuItem
              onClick={() =>
                handleQuestionRouter(
                  type === "question" ? data?.id : data?.question_id,
                  false
                )
              }
            >
              {t("open_in_same_page")}
            </MenuItem>
            <MenuItem
              onClick={() =>
                handleQuestionRouter(
                  type === "question" ? data?.id : data?.question_id,
                  true
                )
              }
            >
              {t("open_in_new_tab")}
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>

      {/* Answer Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="4xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>افزودن جواب</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              placeholder={'متن جواب...'}
              value={answerText}
              onChange={(e) => setAnswerText(e.target.value)}
              rows={6}
            />
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              بستن
            </Button>
            <Button colorScheme="teal" variant={'outline'} onClick={handleSubmitAnswer}>
              ارسال
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </HStack>
  );
};

export default QuestionCard;
