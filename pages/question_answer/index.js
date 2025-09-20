import { baseUrl } from "@/components/lib/api";
import MainLayout from "@/components/mainLayout";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Spinner,
  Stack,
  Text,
  Textarea,
  useBreakpointValue,
  VStack
} from "@chakra-ui/react";
import axios from "axios";
import moment from "moment-jalaali";
import Head from "next/head";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  IoArrowDown,
  IoArrowUp,
  IoBookmark,
  IoBookmarkOutline,
  IoCheckmark,
  IoPencil,
  IoWarningOutline,
} from "react-icons/io5";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

const postRequest = (url, { arg: { id, ...data } }) => {
  return axios.post(baseUrl + url + `?id=${id}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
const patchRequest = (
  url,
  { arg: { table_id, table_type, type_param, ...data } }
) => {
  return axios.post(
    baseUrl +
    url +
    `?table_type=${table_type}&table_id=${table_id}&type_param=${type_param}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};

const Index = () => {
  const { t } = useTranslation();

  const slidesToShow = useBreakpointValue({ base: 1, md: 2, lg: 4 }); // responsive value


  const router = useRouter();
  const { query } = router;

  const {
    register: registerAnswer,
    setValue: setValueAnswer,
    getValues: getValuesAnswer,
    handleSubmit: handleSubmitAnswer,
  } = useForm();

  const {
    data: dataQuestion,
    isLoading: isLoadingQuestion,
    mutate: mutateQuestion,
  } = useSWR(query?.id && `user/question?id=${query?.id}`);
  const { data: dataQuestionAnswer, isLoading: isLoadingQuestionAnswer } =
    useSWR(query?.id && `user/question/answer?question_id=${query?.id}`);

  const { data: dataQuestionComment, isLoading: isLoadingComment } = useSWR(
    query?.id &&
    `user/action?table_id=${query?.id}&table_type=question&type_param=comment`
  );

  const { data: dataQuestionSimilar, isLoading: isLoadingSimilar } = useSWR(
    dataQuestion?.data &&
    `user/question/similar-questions?question_elastic_id=${dataQuestion?.data?.result?.[0]?.elastic_id}`
  );

  const { trigger: triggerAnswer, isLoading: isLoadingAnswer } = useSWRMutation(
    `user/question/answer`,
    postRequest
  );

  const { trigger: triggerLike, isLoading: isLoadingLike } = useSWRMutation(
    `user/action`,
    patchRequest,
    {
      onSuccess: () => {
        mutateQuestion();
      },
    }
  );

  const { data: dataSource, error: errorSource } = useSWR(
    "user/source?size=10"
  );

  const handleAddAnswer = (e) => {
    triggerAnswer({ ...e, id: query?.id, lang: "fa" });
  };

  const handleAddAction = (type, action) => {
    triggerLike({ table_id: query?.id, table_type: type, type_param: action });
  };

  const handleNewQuestionButton = () => {
    router.push("/new_question");
  };

  const handleSimilarClick = (id) => {
    router.push(`question_answer?id=${id}`);
  };

  const handleClickSource = (source) => {
    router.replace(
      `/questions?source=${dataSource?.data?.find((it) => it?.fa_source_name == source)?.id
      }`
    );
  };

  return (
    <MainLayout>
      <Head>
        <title>
          {dataQuestion?.data?.result?.[0]?.title ||
            dataQuestion?.data?.result?.[0]?.content}
        </title>
        <link rel="icon" href="/porsyab_header.png" />
      </Head>
      <Box
        marginTop={{ base: "60px", md: "100px" }}
        w="100%"
        alignItems={"center"}
        justifyContent={"center"}
        maxW="container.xl"
        mx="auto"
        p={"20px"}
      >
        <HStack w={"100%"} alignItems={"start"} gap={"20px"}>
          {slidesToShow != 1 && (
            <VStack>
              <IconButton
                icon={
                  <IoArrowUp
                    color={
                      dataQuestion?.data?.result?.[0]?.is_user_liked
                        ? "orange"
                        : "gray"
                    }
                  />
                }
                variant={"outline"}
                colorScheme={
                  dataQuestion?.data?.result?.[0]?.is_user_liked
                    ? "orange"
                    : "gray"
                }
                borderRadius={"100%"}
                size={"sm"}
                onClick={(e) => handleAddAction("question", "like")}
              />
              <IconButton
                icon={<IoArrowDown color="gray" />}
                variant={"outline"}
                colorScheme="gray"
                borderRadius={"100%"}
                size={"sm"}
              />
              <IconButton
                icon={
                  dataQuestion?.data?.result?.[0]?.is_user_saved ? (
                    <IoBookmark color="orange" />
                  ) : (
                    <IoBookmarkOutline
                      color="gray"
                      onClick={(e) =>
                        handleAddAction("question", "save_message")
                      }
                    />
                  )
                }
                size={"lg"}
              />
            </VStack>
          )}

          <VStack w={"100%"}>
            <Grid
              templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }}
              gap={"2px"}
              w={"100%"}
            >
              <GridItem colSpan={{ base: "2", md: "3" }}>
                {isLoadingQuestion ? (
                  <Spinner />
                ) : (
                  <VStack
                    w={"100%"}
                    alignItems={"start"}
                    justifyContent={"start"}
                    h={"100%"}
                  >
                    <Text>{dataQuestion?.data?.result?.[0]?.title}</Text>
                    <HStack w={"100%"}>
                      <HStack w={"100%"} justifyContent={"space-between"}>
                        <HStack
                          cursor={"pointer"}
                          onClick={(e) =>
                            handleClickSource(
                              dataQuestion?.data?.result?.[0]?.source
                            )
                          }
                        >
                          <Avatar
                            w={"28px"}
                            h={"28px"}
                            display={{ base: "none", md: "flex" }}
                          />
                          <Text
                            minW={"150px"}
                            color={"gray.400"}
                            fontSize={"16px"}
                          >
                            {dataQuestion?.data?.result?.[0]?.source}
                          </Text>
                        </HStack>
                        <HStack
                          w={"100%"}
                          justifyContent={"end"}
                          display={{ base: "none", md: "flex" }}
                        >
                          <Text fontSize={"sm"} color={"gray.400"}>
                            {moment(
                              dataQuestion?.data?.result?.[0]?.created_at
                            ).format("jYYYY/jMM/jDD")}
                          </Text>
                        </HStack>
                      </HStack>
                      <Button
                        width={{ base: "152px", md: "189px" }}
                        height={"50px"}
                        bgColor={"#F9C96D"}
                        color={"black"}
                        fontWeight={"400"}
                        fontSize={"12px"}
                        size={"sm"}
                        lineHeight={"100%"}
                        letterSpacing={0}
                        borderRadius={"10px"}
                        onClick={(e) => handleNewQuestionButton()}
                      >
                        {t("ask_your_question")}
                      </Button>
                    </HStack>
                  </VStack>
                )}
              </GridItem>
              <GridItem
                as={Stack}
                alignItems={"end"}
                display={{ base: "none" }}
              >
                <Button bgColor={"#F9C96D"} fontWeight={"normal"}>
                  {t("ask_your_question")}
                </Button>
              </GridItem>
            </Grid>
            <Divider my={"10px"} />
            <Grid
              templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
              gap={{ base: "10px", md: "20px" }}
              w={"100%"}
            >
              <GridItem
                as={Stack}
                position={"relative"}
                direction={{ base: "row", md: "column" }}
                colSpan={"2"}
                w={"100%"}
              >
                {slidesToShow == 1 && (
                  <VStack gap={0}>
                    <IconButton
                      icon={<IoArrowUp color="gray" />}
                      variant={"outline"}
                      colorScheme="gray"
                      borderRadius={"100%"}
                      size={"sm"}
                      onClick={(e) =>
                        handleAddAction("question", "save_message")
                      }
                    />
                    <IconButton
                      icon={<IoArrowDown color="gray" />}
                      variant={"outline"}
                      colorScheme="gray"
                      borderRadius={"100%"}
                      size={"sm"}
                    />
                    <IconButton
                      icon={<IoBookmarkOutline color="gray" />}
                      size={"sm"}
                      onClick={(e) =>
                        handleAddAction("question", "save_message")
                      }
                    />
                  </VStack>
                )}

                {isLoadingQuestion ? (
                  <Spinner />
                ) : (
                  <VStack w={"100%"} alignItems={"start"}>
                    <Text
                      lineHeight={"taller"}
                      textAlign={"justify"}
                      fontSize={"18px"}
                    >
                      {dataQuestion?.data?.result?.[0]?.content}
                    </Text>
                    {/* <Image
                      src="/imageskelete.png"
                      w={"100%"}
                      height={"530px"}
                      my={"10px"}
                      borderRadius={"2px"}
                    /> */}
                    <Stack
                      direction={{ base: "column", md: "row" }}
                      w={"100%"}
                      justifyContent={"space-between"}
                      my={"20px"}
                    >
                      <HStack
                        w={{ base: "100%" }}
                        justifyContent={{ base: "start" }}
                      >
                        {dataQuestion?.data?.result?.[0]?.tags?.map((tag) => (
                          <Badge
                            bgColor={"#29CCCC1A"}
                            color={"#16A6A6"}
                            padding={"5px"}
                            borderRadius={"5px"}
                            w={{ base: "min-content" }}
                            textAlign={"center"}
                          >
                            {tag?.name}
                          </Badge>
                        ))}
                      </HStack>
                      <HStack gap={0} alignItems={"center"}>
                        <Button
                          colorScheme="gray"
                          color={"gray"}
                          variant={"ghost"}
                          fontWeight={"normal"}
                          size={"sm"}
                        >
                          {t("report_inappropriate_content")}
                        </Button>
                        <IoWarningOutline color="gray" />
                      </HStack>
                    </Stack>
                    <Box
                      w={"100%"}
                      padding={"10px"}
                      px={"20px"}
                      bgColor={"#f9f9fd"}
                      borderRadius={"15px"}
                      my={{ base: "0px", md: "10px" }}
                    >
                      <HStack w={"100%"} justifyContent={"space-between"}>
                        <Text fontWeight={"bold"} fontSize={"16px"}>
                          {t("comments")}
                        </Text>
                        <HStack>
                          <Text fontSize={"sm"} color={"gray"}>
                            {t("write_your_comment")}
                          </Text>
                          <IconButton
                            icon={<IoPencil color="gray" />}
                            variant={"ghost"}
                          />
                        </HStack>
                      </HStack>
                      {dataQuestionComment?.data?.result?.map((comment) => (
                        <Stack
                          direction={{ base: "column", md: "row" }}
                          w={"100%"}
                        >
                          <HStack>
                            <Text color={"#3646B3"}>حسن الماسی</Text>
                            <Text color={"gray"} fontSize={"sm"}>
                              ۴ {t("days_ago")}
                            </Text>
                          </HStack>
                        </Stack>
                      ))}
                    </Box>
                    <Box
                      w={{ base: "fit-content", md: "100%" }}
                      padding={{ base: "none", md: "10px" }}
                      px={{ base: "none", md: "20px" }}
                      bgColor={"white"}
                      borderRadius={"15px"}
                      mb={"10px"}
                      mr={{ base: "-40px", md: "0px" }}
                      border={{ base: "none", md: "1px" }}
                      borderColor={{ base: "none", md: "gray.200" }}
                    >
                      <HStack
                        w={"100%"}
                        justifyContent={"space-between"}
                        my={"10px"}
                      >
                        <Text fontWeight={"bold"} fontSize={"18px"}>
                          {t("answers")}
                        </Text>
                      </HStack>
                      <HStack alignItems={"start"} gap={"10px"}>
                        <VStack>
                          <IconButton
                            icon={<IoArrowUp color="gray" />}
                            variant={"outline"}
                            colorScheme="gray"
                            borderRadius={"100%"}
                            size={"sm"}
                          />
                          <IconButton
                            icon={<IoArrowDown color="gray" />}
                            variant={"outline"}
                            colorScheme="gray"
                            borderRadius={"100%"}
                            size={"sm"}
                          />
                          <IconButton
                            icon={<IoCheckmark color="white" />}
                            variant={"ghost"}
                            bgColor="#29CCCC"
                            borderRadius={"100%"}
                            size={"sm"}
                          />
                          <IconButton
                            icon={
                              <IoBookmarkOutline
                                color="gray"
                                fontSize={"20px"}
                              />
                            }
                            size={"sm"}
                          />
                        </VStack>
                        <VStack w={"100%"} alignItems={"start"}>
                          <Text
                            lineHeight={"taller"}
                            w={"fit-content"}
                            textAlign={"justify"}
                            fontSize={"18px"}
                            whiteSpace="pre-wrap"
                          >
                            {dataQuestionAnswer?.data?.[0]?.content}
                          </Text>
                          <HStack
                            w={"100%"}
                            justifyContent={{
                              base: "start",
                              md: "space-between",
                            }}
                            mt={"10px"}
                          >
                            {/* <HStack order={{ base: 2 }}>
                              <Avatar
                                width={"28px"}
                                height={"28px"}
                                order={{ base: 2 }}
                              />
                              <Text
                                color={"gray"}
                                fontSize={"sm"}
                                order={{ base: 1 }}
                              >
                                اسلام کوئست
                              </Text>
                            </HStack> */}
                            <HStack order={{ base: 1 }}>
                              <Text fontSize={"sm"} color={"gray.500"}>
                                {moment(
                                  dataQuestionAnswer?.data?.[0]?.created_at
                                ).format("jYYYY/jMM/jDD")}
                              </Text>
                              <Divider
                                height={"10px"}
                                borderColor={"#EBEBEB"}
                                orientation="vertical"
                              />
                              {slidesToShow != 1 && (
                                <HStack gap={0} alignItems={"center"}>
                                  <Button
                                    colorScheme="gray"
                                    color={"gray"}
                                    variant={"ghost"}
                                    fontWeight={"normal"}
                                    size={"sm"}
                                  >
                                    {t("report_inappropriate_content")}
                                  </Button>
                                  <IoWarningOutline color="gray" />
                                </HStack>
                              )}
                            </HStack>
                          </HStack>
                          {slidesToShow == 1 && (
                            <HStack gap={0} alignItems={"center"}>
                              <Button
                                colorScheme="gray"
                                color={"gray"}
                                variant={"ghost"}
                                fontWeight={"normal"}
                                size={"sm"}
                              >
                                {t("report_inappropriate_content")}
                              </Button>
                              <IoWarningOutline color="gray" />
                            </HStack>
                          )}
                          <Box
                            w={"100%"}
                            padding={"10px"}
                            px={"20px"}
                            bgColor={"#f9f9fd"}
                            borderRadius={"15px"}
                          >
                            <HStack w={"100%"} justifyContent={"space-between"}>
                              <Text fontWeight={"bold"} fontSize={"16px"}>
                                {t("comments")}
                              </Text>
                              <HStack>
                                <Text fontSize={"sm"} color={"gray"}>
                                  {t("leave_comment")}
                                </Text>
                                <IconButton
                                  icon={<IoPencil color="gray" />}
                                  variant={"ghost"}
                                />
                              </HStack>
                            </HStack>
                            {/* <Stack
                              direction={{ base: "column", md: "row" }}
                              w={"100%"}
                            >
                              <Text
                                fontSize={"sm"}
                                color={"gray"}
                                lineHeight={"taller"}
                              >
                                لورم ایپسوم متن ساختگی با تولید سادگی از صنعت
                                چاپ، و با استفاده از طراحان گرافیک است.
                              </Text>
                              <HStack>
                                <Text color={"#3646B3"}>حسن الماسی</Text>
                                <Text color={"gray"} fontSize={"sm"}>
                                  ۴ {t("days_ago")}
                                </Text>
                              </HStack>
                            </Stack> */}
                          </Box>
                        </VStack>
                      </HStack>
                      <Divider mt={"20px"} borderColor={"gray.200"} />
                    </Box>
                    <Box
                      w={{ base: "fit-content", md: "100%" }}
                      padding={"20px"}
                      bgColor={"#3646B3"}
                      borderRadius={"15px"}
                      my={{ base: "0px", md: "0px" }}
                      mr={{ base: "-40px", md: "0px" }}
                    >
                      <HStack>
                        <VStack w={"100%"} alignItems={"start"}>
                          <Text
                            fontWeight={"bold"}
                            color={"white"}
                            fontSize={"16px"}
                            mb={"10px"}
                          >
                            {t("your_answer")}
                          </Text>
                          <Text fontSize={"xs"} color={"white"}>
                            {t("you_must_log")}
                          </Text>
                        </VStack>
                        <Button
                          onClick={e => router.push('/login')}
                          bgColor={"#29CCCC"}
                          fontWeight={"normal"}
                          p={"10px"}
                          w={{ base: "200px", md: "150px" }}
                          size={"sm"}
                        >
                          {t("log_in_to_your_account")}
                        </Button>
                      </HStack>
                    </Box>
                    <Box
                      w={{ base: "full", md: "100%" }}
                      padding={"20px"}
                      bgColor={"white"}
                      border={"1px"}
                      borderColor={"gray.200"}
                      borderRadius={"15px"}
                      my={"10px"}
                      mr={{ base: "-40px", md: "0px" }}
                      as="form"
                      onSubmit={handleSubmitAnswer(handleAddAnswer)}
                    >
                      <VStack w={"100%"} alignItems={"start"}>
                        <Text fontWeight={"bold"} fontSize={"16px"} mb={"10px"}>
                          {t("your_answer")}
                        </Text>
                        <Text fontSize={"xs"}>{t("AI-generated")}</Text>
                      </VStack>
                      <Textarea my={"20px"} {...registerAnswer("content")} />
                      <HStack w={"100%"} justifyContent={"end"}>
                        <Button
                          bgColor={"#29CCCC"}
                          fontWeight={"normal"}
                          p={"10px"}
                          size={"sm"}
                          type="submit"
                        >
                          {t("submit_answer")}
                        </Button>
                      </HStack>
                    </Box>
                  </VStack>
                )}
              </GridItem>

              <GridItem>
                <Box
                  as={VStack}
                  alignItems={"start"}
                  border={"1px"}
                  borderColor={"gray.200"}
                  h={"min-content"}
                  borderRadius={"15px"}
                  padding={"20px"}
                  w={{ base: "fit-content", md: "100%" }}
                >
                  <Text fontWeight={"bold"} fontSize={"16px"} mb={"10px"} >
                    {t("related_questions")}
                  </Text>
                  {dataQuestionSimilar?.data
                    ?.slice(0, 5)
                    ?.map((similar, index) => (
                      <HStack
                        w={"100%"}
                        py={"5px"}
                        alignItems={"start"}
                        borderBottom={index != 4 && "1px"}
                        borderBottomColor={"gray.200"}
                        cursor={"pointer"}
                        onClick={(e) => handleSimilarClick(similar?.id)}
                      >
                        <Text fontSize={"14px"}>{similar?.content}</Text>
                      </HStack>
                    ))}
                </Box>
                <Box
                  as={VStack}
                  alignItems={"start"}
                  border={"1px"}
                  borderColor={"gray.200"}
                  h={"min-content"}
                  borderRadius={"15px"}
                  padding={"20px"}
                  my={"20px"}
                >
                  <Text fontWeight={"bold"} fontSize={"16px"} mb={"10px"}>
                    {t("most_viewed_questions")}
                  </Text>
                  {dataQuestionSimilar?.data
                    ?.slice(5, 10)
                    ?.map((related, index) => (
                      <VStack
                        w={"100%"}
                        alignItems={"start"}
                        borderBottom={index != 4 && "1px"}
                        borderBottomColor={"gray.200"}
                        py={"5px"}
                        cursor={"pointer"}
                        onClick={(e) => handleSimilarClick(related?.id)}
                      >
                        <Text fontSize={"14px"}>{related?.content}</Text>
                        {/* <HStack alignItems={"center"}>
                        <Badge
                          bgColor={"#D2D2D2"}
                          color={"white"}
                          paddingY={"2px"}
                          px={"10px"}
                          borderRadius={"5px"}
                          w={"24px"}
                          h={"24px"}
                        ></Badge>
                        <Text fontSize={"xs"} color={"#29CCCC"}>
                          فقه سیاسی
                        </Text>
                      </HStack> */}
                      </VStack>
                    ))}
                </Box>
              </GridItem>
            </Grid>
          </VStack>
        </HStack>
      </Box>
    </MainLayout>
  );
};

export default Index;
