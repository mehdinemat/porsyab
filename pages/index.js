import Header from "@/components/home/header";
import MainLayout from "@/components/mainLayout";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  Box,
  Button,
  Grid,
  GridItem,
  HStack,
  Spinner,
  Stack,
  Text,
  useBreakpointValue,
  VStack
} from "@chakra-ui/react";
import { Geist, Geist_Mono } from "next/font/google";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import LeftSidebar from "@/components/home/leftsidebar";
import QuestionMCard from "@/components/home/mobile/questionMCard";
import Pagination from "@/components/pagination";
import QuestionCard from "@/components/questionCars";
import SliderCom from "@/components/slider";
import { useRouter } from "next/router";

import Head from "next/head";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import useSWR from "swr";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const items = [
  {
    image: "/img1.jpg",
    title: "آیت الله محمدتقی بهجت فومنی",
    button: "اطلاعات بیشتر",
  },
  {
    image: "/img2.jpg",
    title: "آیت الله جعفر سبحانی خیابانی تبریزی",
    button: "اطلاعات بیشتر",
  },
  {
    image: "/img3.jpg",
    title: "آیت الله سید عبدالکریم موسوی اردبیلی",
    button: "اطلاعات بیشتر",
  },
];
const items2 = [
  {
    image: "/img1.jpg",
  },
  {
    image: "/img2.jpg",
  },
  {
    image: "/img3.jpg",
  },
];

export default function Home({ children }) {
  const router = useRouter();
  const { locale } = useRouter();
  const slidesToShow = useBreakpointValue({ base: 1, md: 2, lg: 4 }); // responsive value

  const [treeData, setTreeData] = useState([]);
  const [page, setPage] = useState(1);
  const [categoryId, setCategoryId] = useState("");
  const [searchType, setSearchType] = useState("search");

  const { t } = useTranslation();

  const {
    register: registerSearch,
    getValues: getValuesSearch,
    setValue: setValueSearch,
    handleSubmit: handleSubmitSearch,
    watch: watchSearch,
    reset: resetSearch,
  } = useForm();

  const {
    data: dataQuestion,
    error: errorQuestion,
    isLoading: isLoadingQuestion,
  } = useSWR(
    `user/question?lang=${locale}&page=${page}${categoryId && `&categories__id=${categoryId}`
    }`
  );
  // const {
  //   data: dataQuestionSearch,
  //   error: errorQuestionSearch,
  //   isLoading: isLoadingQuestionSearch,
  // } = useSWR(
  //   watchSearch("selected_search") &&
  //   `user/question/search?page=${page}&search_type=${searchType}&content=${watchSearch(
  //     "selected_search"
  //   )}${categoryId && `&categories__id=${categoryId}`}`
  // );

  const { data: dataGeneral, error: errorGeneral } = useSWR("user/general");
  const { data: dataHadith, error: errorHadith } = useSWR("user/general/hadis");
  const { data: dataSource, error: errorSource } = useSWR(
    "user/source?size=10"
  );
  const { data: dataReferences, error: errorReferences } =
    useSWR("user/public-figure");

  const { data: dataCategory, isLoading: isLoadingCategory } = useSWR(
    `user/category?type=question`,
    {
      onSuccess: (res) => { },
    }
  );

  // Helper function to update treeData immutably
  const updateTreeData = (list, key, children) =>
    list.map((node) => {
      if (node.key === key) {
        return { ...node, children };
      } else if (node.children) {
        return {
          ...node,
          children: updateTreeData(node.children, key, children),
        };
      }
      return node;
    });

  const handleNewQuestionButton = () => {
    router.push("/new_question");
  };

  const handleClickSearch = () => {
    router.push(
      `/result_search?search=${watchSearch("search")}&search_type=search`
    );
  };
  const handleClickSemanticSearch = () => {
    router.push(
      `/result_search?search=${watchSearch(
        "search"
      )}&search_type=semantic_search`
    );
  };
  const handleVoiceSearch = (text) => {
    router.push(`/result_search?search=${text}&search_type=semantic_search`);
  };

  const handleCategoryLink = ({ title, id }) => {
    router.push(`/questions/category/${id}/${title}`);
  };

  return (
    <MainLayout>
      <Head>
        <title>{t("parsa")} | {t("main_page")}</title>
        <link rel="icon" href="/porsyab_header.png" />
      </Head>
      <Header
        data={dataGeneral?.data}
        t={t}
        register={registerSearch}
        watchSearch={watchSearch}
        resetSearch={resetSearch}
        handleClickSearch={handleClickSearch}
        handleClickSemanticSearch={handleClickSemanticSearch}
        handleVoiceSearch={handleVoiceSearch}
      />
      <Box
        w="100%"
        alignItems={"center"}
        justifyContent={"center"}
        maxW="container.xl"
        mx="auto"
        p={"20px"}
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

          <GridItem colSpan={1}>
            <Box
              w="100%"
              maxW={{ base: "calc(100vw - 50px)", md: "100vw" }}
              overflow="hidden"
              wordBreak="break-word"
              order={{ base: 2, md: 1 }}
              zIndex={100}
              border="1px"
              borderColor="#EBEBEB"
              borderRadius="15px"
              p="10px"
              height="min-content"
              dir="rtl" // ✅ RTL direction
            >
              <Text fontWeight="800" fontSize="16px" mb={4} fontFamily="morabba">
                {t("topics")}
              </Text>
              {dataCategory?.data?.map((item, index) => (
                <Accordion
                  key={item.id}
                  onClick={() =>
                    handleCategoryLink({ title: item?.name, id: item?.id })
                  }
                  allowToggle
                >
                  <AccordionItem
                    borderTop={index === 0 ? "none" : "1px solid"}
                    borderBottom={
                      index === dataCategory.data.length - 1
                        ? "none"
                        : "1px solid"
                    }
                    borderColor="gray.200"
                  >
                    <h2>
                      <AccordionButton>
                        <Box as="span" flex="1" textAlign="right">
                          {item?.name}
                        </Box>
                      </AccordionButton>
                    </h2>
                  </AccordionItem>
                </Accordion>
              ))}
            </Box>
            <Box
              my={"20px"}
              order={3}
              as={GridItem}
              colSpan={"1"}
              w="100%"
              maxW={{ base: "calc( 100vw - 50px )", md: "100vw" }}
              whiteSpace="normal"
              overflowWrap="break-word"
            >
              <Box
                w="100%"
                maxW="100%"
                p="4"
                border="1px"
                borderColor="#EBEBEB"
                borderRadius="15px"
                bgColor="#CFF186"
                height="min-content"
                mb="20px"
                overflow="hidden"
              >
                <Text fontWeight="800" fontSize="16px" fontFamily="morabba">
                  {t("hadith_of_the_day")}
                </Text>
                <Text mt="10px" whiteSpace="pre-wrap" wordBreak="break-word">
                  {dataHadith?.data}
                </Text>
              </Box>

              <Box
                w={"100%"}
                p="4"
                border={"1px"}
                borderColor={"#EBEBEB"}
                borderRadius={"15px"}
                height={"min-content"}
              >
                <Text fontWeight={"800"} fontSize={"16px"} fontFamily="morabba" >
                  {t("question_sources")}
                </Text>
                <VStack mt={"20px"} w={"100%"} alignItems={"start"}>
                  {dataSource?.data?.slice(0, 14)?.map((item, index) => (
                    <LeftSidebar
                      key={index}
                      data={item}
                      t={t}
                      last={index == 13}
                    />
                  ))}
                </VStack>
              </Box>
            </Box>
          </GridItem>

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
            area={{ base: "main", md: "auto" }}
          >
            <HStack
              w="100%"
              whiteSpace="normal"
              justifyContent={"space-between"}
              mb={{ base: "20px", md: "10px" }}
              alignItems={{ base: "center", md: "start" }}
            >
              <Text fontWeight={"800"} fontSize={"22px"} letterSpacing={0} fontFamily="morabba">
                {t("suggested_questions")}
              </Text>

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
                {t("ask_your_question")}
              </Button>
            </HStack>

            {isLoadingQuestion ? (
              <HStack
                w={"100%"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Spinner />
              </HStack>
            ) : (
              <VStack display={{ base: "none", md: "flex" }}>
                {dataQuestion?.data?.result?.map((item, index) => (
                  <QuestionCard key={index} data={item} t={t} />
                ))}
                <Stack
                  w={"100%"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Pagination
                    totalPages={dataQuestion?.data?.total_count}
                    currentPage={page}
                    onPageChange={setPage}
                    t={t}
                  />
                </Stack>
              </VStack>
            )}

            <VStack display={{ base: "flex", md: "none" }}>
              {dataQuestion?.data?.result?.map((item, index) => (
                <QuestionMCard key={index} data={item} t={t} />
              ))}
              <Stack w={"100%"} justifyContent={"center"} alignItems={"center"}>
                <Pagination
                  totalPages={dataQuestion?.data?.total_count}
                  currentPage={page}
                  onPageChange={setPage}
                  t={t}
                />
              </Stack>
            </VStack>
          </Box>

          {/* Left Sidebar */}

          <GridItem
            order={4}
            colSpan={{ md: 4 }}
            w={"100%"}
            maxW={{ base: "calc( 100vw - 50px )", md: "100vw" }}
            whiteSpace="normal"
            overflowWrap="break-word"
          >
            {dataReferences?.data && (
              <SliderCom
                items={dataReferences?.data?.result?.map((val) => ({
                  title: val?.full_name,
                  image: val?.image_url,
                  id: val?.id,
                  buttoh: "اطلاعات بیشتر",
                }))}
                height={"380px"}
                borderRadius={"100%"}
                title={t("sources")}
              />
            )}
            {/* <SliderCom
              items={items2}
              height={"270px"}
              width="350px"
              borderRadius={"0px"}
              title={t("parsa_supporters")}
            /> */}
          </GridItem>
        </Grid>
      </Box>
    </MainLayout>
  );
}
