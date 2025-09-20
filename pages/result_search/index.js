import MainLayout from "@/components/mainLayout";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Center,
  Checkbox,
  Grid,
  GridItem,
  HStack,
  Spinner,
  Stack,
  Text,
  VStack
} from "@chakra-ui/react";
import { Geist, Geist_Mono } from "next/font/google";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import QuestionMCard from "@/components/home/mobile/questionMCard";
import Pagination from "@/components/pagination";
import QuestionCard from "@/components/questionCars";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { TbArrowsSort } from "react-icons/tb";
import useSWR from "swr";
import { StringParam, useQueryParams, withDefault } from "use-query-params";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const Index = ({ children }) => {
  const { t } = useTranslation();

  const router = useRouter();

  const { locale } = useRouter();

  const [page, setPage] = useState(1);

  const [filters, setFilters] = useQueryParams({
    search: withDefault(StringParam, ""),
    search_type: withDefault(StringParam, ""),
    order_by: withDefault(StringParam, ""),
    model: withDefault(StringParam, "e5"),
    source: withDefault(StringParam, ""),
  });

  const { data: dataResource, isLoading: isLoadingResource } =
    useSWR(`user/source`);

  const {
    data: dataQuestionSearch,
    error: errorQuestionSearch,
    isLoading: isLoadingQuestionSearch,
  } = useSWR(
    `user/question/search?page=${(page - 1) * 10}&search_type=${filters?.search_type
    }&content=${filters?.search}&lang=${locale}${filters?.order_by && `&order_by=${filters?.order_by}`
    }&model_name=${filters?.model}&source_name=${filters?.source}`
  );
  const {
    data: dataCurrection,
    error: errorCurrection,
    isLoading: isLoadingCurrection,
  } = useSWR(`user/question/spell-correction?content=${filters?.search}`);

  const handleNewQuestionButton = () => {
    router.push("/new_question");
  };
  const handleCurrectClick = (currect) => {
    router.push(
      `/ result_search?search=${currect}&search_type=${filters?.search_type}`
    );
  };

  useEffect(() => {
    setPage(1);
  }, [filters?.search]);

  const handleChangeModel = () => {
    setPage(1);
    setFilters({ model: "bge" });
  };

  return (
    <MainLayout>
      <Head>
        <title>
          {t("parsa")} :{" "}
          {t(
            filters?.search_type != "search"
              ? "semantic_search_results_for"
              : "literal_search_results_for"
          )}{" "}
          :{filters?.search}
        </title>
        <link rel="icon" href="/porsyab_header.png" />
      </Head>
      <Box
        w="100%"
        alignItems={"center"}
        justifyContent={"center"}
        maxW="container.xl"
        mx="auto"
        p={"20px"}
        mt={{ base: "60px", md: "100px" }}
      >
        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(4, 1fr)" }}
          templateAreas={{
            base: `"main" "right" "left" "slider"`,
          }}
          gap={"20px"}
          w={"100%"}
        >
          {/* Right Sidebar */}
          <Box
            w="100%"
            maxW={{ base: "calc( 100vw - 50px )", md: "100vw" }}
            overflow="hidden"
            wordBreak="break-word"
            order={{ base: 2, md: 1 }}
            zIndex={100}
            border={"1px"}
            borderColor={"#EBEBEB"}
            borderRadius={"15px"}
            padding={"10px"}
            height={"min-content"}
          >
            <Text fontWeight={"800"} fontFamily="morabba" fontSize={"16px"}>
              فیلترها
            </Text>
            <Accordion dir="rtl" mt={"20px"} w="100%" allowMultiple>
              {isLoadingResource ? (
                <Center>
                  <Spinner />
                </Center>
              ) : (
                <AccordionItem>
                  <h2>
                    <AccordionButton flexDirection="row-reverse">
                      <AccordionIcon ml={2} />
                      <Box as="span" flex="1" textAlign="right">
                        منابع
                      </Box>
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <VStack gap={"20px"}>
                      {/* <InputGroup>
                      <Input placeholder="جستجوی عبارت" />
                      <InputRightElement>
                        <IoSearch />
                      </InputRightElement>
                    </InputGroup> */}
                      {dataResource?.data?.map((source) => (
                        <HStack
                          w={"100%"}
                          alignItems={"center"}
                          justifyContent={"start"}
                        >
                          <Checkbox
                            colorScheme="blue"
                            isChecked={
                              source?.en_source_name == filters?.source
                            }
                            size={"lg"}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFilters({ source: source?.en_source_name });
                              } else if (
                                filters?.source == source?.en_source_name
                              ) {
                                setFilters({ source: undefined });
                              }
                            }}
                          ></Checkbox>
                          <Text>{source?.fa_source_name}</Text>
                        </HStack>
                      ))}
                    </VStack>
                  </AccordionPanel>
                </AccordionItem>
              )}
            </Accordion>
          </Box>

          {/* Main Content */}
          <Box
            p={{ base: 0, md: "6" }}
            order={{ base: 1, md: 2 }}
            as={GridItem}
            colSpan={{ md: 3 }}
            w="100%"
            overflowWrap="break-word"
            wordBreak="break-word"
            maxW="100vw"
            whiteSpace="normal"
            pr={{ base: 0, md: "21px" }}
          >
            <HStack
              w="100%"
              whiteSpace="normal"
              justifyContent={"space-between"}
              mb={{ base: "30px", md: "20px" }}
              alignItems={{ base: "center", md: "start" }}
            >
              <VStack alignItems={"start"}>
                <HStack>
                  <Text
                    fontWeight={"700"}
                    fontSize={"22px"}
                    color={"gray"}
                    letterSpacing={0}
                  >
                    نتایج جستجو{" "}
                    {filters?.search_type == "search" ? "لفظی" : "معنایی "}{" "}
                    برای:
                  </Text>
                  <Text fontWeight={"bold"} fontSize={"16px"}>
                    {filters?.search}
                  </Text>
                  <Text
                    color={"blue.400"}
                    cursor={"pointer"}
                    onClick={(e) => handleChangeModel()}
                  >
                    جستجو بر اساس مدل دوم
                  </Text>
                </HStack>
                {filters?.search !=
                  dataCurrection?.data?.data?.spell_correction_text &&
                  dataCurrection?.data?.data?.spell_correction_text && (
                    <HStack>
                      <Text fontSize={"16px"}>
                        آیا منظور شما{" "}
                        <Text
                          as={"span"}
                          color={"blue.500"}
                          cursor={"pointer"}
                          onClick={(e) =>
                            handleCurrectClick(
                              dataCurrection?.data?.data?.spell_correction_text
                            )
                          }
                        >
                          {dataCurrection?.data?.data?.spell_correction_text}
                        </Text>{" "}
                        بود؟
                      </Text>
                    </HStack>
                  )}
              </VStack>
              <Button
                width={{ base: "152px", md: "189px" }}
                height={"50px"}
                bgColor={"#F9C96D"}
                color={"black"}
                fontWeight={"400"}
                fontSize={"16px"}
                lineHeight={"100%"}
                letterSpacing={0}
                borderRadius={"10px"}
                onClick={(e) => handleNewQuestionButton()}
              >
                سوال خود را بپرسید
              </Button>
            </HStack>
            <HStack w={"100%"} justifyContent={"space-between"} mb={"20px"}>
              <Text w={"full"}>
                {dataQuestionSearch?.data?.total_count} نتیجه (۲/۴۶ ثانیه)
              </Text>
              <HStack>
                <TbArrowsSort color="gray" fontSize={"16px"} />
                <Text fontSize={"sm"} w={"max-content"}>
                  مرتب سازی :
                </Text>
                <Button
                  colorScheme="gray"
                  variant={"ghost"}
                  _hover={{ bgColor: "none" }}
                  fontSize={"sm"}
                  fontWeight={filters?.order_by == "view" ? "bold" : "normal"}
                  onClick={(e) => setFilters({ order_by: "view" })}
                >
                  پربازدیدترین‌ها
                </Button>
                <Button
                  colorScheme="gray"
                  variant={"ghost"}
                  _hover={{ bgColor: "none" }}
                  fontWeight={filters?.order_by == "vote" ? "bold" : "normal"}
                  fontSize={"sm"}
                  onClick={(e) => setFilters({ order_by: "vote" })}
                >
                  محبوبترین‌ها
                </Button>
              </HStack>
            </HStack>
            {isLoadingQuestionSearch ? (
              <HStack
                w={"100%"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Spinner />
              </HStack>
            ) : (
              <VStack display={{ base: "none", md: "flex" }}>
                {dataQuestionSearch?.data?.result?.map((item, index) => (
                  <QuestionCard key={index} data={item} t={t} />
                ))}
                <Stack
                  w={"100%"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Pagination
                    totalPages={Math?.ceil(
                      dataQuestionSearch?.data?.total_count / 10
                    )}
                    currentPage={page}
                    onPageChange={setPage}
                    t={t}
                  />
                </Stack>
              </VStack>
            )}

            <VStack display={{ base: "flex", md: "none" }}>
              {dataQuestionSearch?.data?.result?.map((item, index) => (
                <QuestionMCard key={index} data={item} t={t} />
              ))}
            </VStack>
          </Box>

          {/* Left Sidebar */}
          {/* <Box
            order={3}
            as={GridItem}
            colSpan={"1"}
            w="100%"
            maxW={{ base: "calc( 100vw - 50px )", md: "100vw" }}
            whiteSpace="normal"
            overflowWrap="break-word"
          >
            <Box
              w={"100%"}
              p="4"
              border={"1px"}
              borderColor={"#EBEBEB"}
              borderRadius={"15px"}
              height={"min-content"}
              mb={"30px"}
            >
              <Text fontWeight={"bold"} fontSize={"16px"}>
                مستحبات
              </Text>
              <VStack mt={"20px"} w={"100%"} alignItems={"start"}>
                <Image src="./tasbihimage.png" />
                <Text lineHeight={"tall"} fontSize={"16px"} color={"#666666"}>
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
                  با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و
                  مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی
                  تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای
                  کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و
                  آینده، شناخت فراوان جامعه و متخصصان را خلاقی
                </Text>
                <HStack w={"100%"} justifyContent={"end"}>
                  <Button color={"#29CCCC"} fontWeight={"normal"}>
                    اطلاعات بیشتر
                  </Button>
                </HStack>
              </VStack>
            </Box>
          </Box> */}
        </Grid>
      </Box>
    </MainLayout>
  );
};

export default Index;
