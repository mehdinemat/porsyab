import Header from "@/components/home/header";
import MainLayout from "@/components/mainLayout";
import {
  Box,
  Button,
  Grid,
  GridItem,
  HStack,
  Spinner,
  Stack,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import QuestionMCard from "@/components/home/mobile/questionMCard";
import QuestionCard from "@/components/questionCars";
import { useRouter } from "next/router";

import SliderCom from "@/components/slider";
import SliderSource from "@/components/slidersource";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import {
  ArrayParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "use-query-params";
import ResultSearch from "./result_search";

export default function Home({ children }) {
  const [hoveredIndex, setHoveredIndex] = useState({ selected: "", val: "" });
  const [isUserLogin, setIsUserLogin] = useState("");

  const [chatType, setChatType] = useState(1)

  const [showMore, setShowMore] = useState(false);

  const [filters, setFilters] = useQueryParams({
    category_id: withDefault(StringParam, "28"),
    search: withDefault(StringParam, ""),
    search_type: withDefault(StringParam, ""),
    type: withDefault(StringParam, ""),
    order_by: withDefault(StringParam, ""),
    model: withDefault(StringParam, "e5"),
    source: withDefault(ArrayParam, []),
    category_id: withDefault(StringParam, "28"),
  });

  const router = useRouter();
  const { locale } = useRouter();
  const slidesToShow = useBreakpointValue({ base: 1, md: 2, lg: 4 }); // responsive value

  const [categoryId, setCategoryId] = useState("");

  const panelsRef = useRef(null);

  const { t } = useTranslation();

  const [showMenu, setShowMenu] = useState(false);
  const questionsRef = useRef(null);

  const {
    register: registerSearch,
    getValues: getValuesSearch,
    setValue: setValueSearch,
    handleSubmit: handleSubmitSearch,
    watch: watchSearch,
    reset: resetSearch,
  } = useForm();

  const getKey = (pageIndex, previousPageData) => {
    // stop if no more data
    console.log(previousPageData);
    if (previousPageData && !previousPageData?.data?.result.length) return null;

    return `user/question?lang=${locale}&page=${pageIndex + 1}${categoryId ? `&categories__id=${categoryId}` : ""
      }`;
  };

  const { data, size, setSize, error, isLoading, isValidating } =
    useSWRInfinite(getKey);

  const questions = data ? data?.flatMap((page) => page?.data?.result) : [];

  const { data: dataGeneral, error: errorGeneral } = useSWR("user/general");

  const { data: dataHadith, error: errorHadith } = useSWR("user/general/hadis");
  const { data: dataSource, error: errorSource } = useSWR("user/source");
  const { data: dataReferences, error: errorReferences } =
    useSWR("user/public-figure");

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

  const moveToQuestionBox = () => {
    setTimeout(() => {
      const el = document.querySelector(".questions");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, [500]);
  };

  const handleClickSearch = () => {
    setFilters({
      search_type: "search",
      search: watchSearch("search"),
      type: undefined,
    });
    moveToQuestionBox();
    // router.push(
    //   `/result_search?search=${watchSearch("search")}&search_type=search`
    // );
  };
  const handleClickSemanticSearch = () => {
    setFilters({
      search_type: "semantic_search",
      search: watchSearch("search"),
      type: undefined,
    });
    moveToQuestionBox();
  };
  const handleClickAiSearch = (type = 1, search = '') => {
    setChatType(type)
    setFilters({
      search_type: "semantic_search",
      search: search || watchSearch("search"),
      type: "ai",
    });
    moveToQuestionBox();
  };

  const handleVoiceSearch = (text) => {
    setValueSearch("search", text)
    // router.push(`/result_search?search=${text}&search_type=semantic_search`);
  };

  useEffect(() => {
    setIsUserLogin(!!localStorage.getItem("token"));
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (panelsRef.current && !panelsRef.current.contains(e.target)) {
        setHoveredIndex({ selected: "", val: "" }); // reset on outside click
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setHoveredIndex]);

  return (
    <MainLayout
      questionsRef={questionsRef}
      register={registerSearch}
      watchSearch={watchSearch}
    >
      <Head>
        <title>
          {t("parsa")} | {t("main_page")}
        </title>
        <link rel="icon" href="/porsyab_header.png" />
      </Head>
      <Header
        data={dataGeneral?.data}
        hadith={dataHadith?.data}
        t={t}
        register={registerSearch}
        watchSearch={watchSearch}
        resetSearch={resetSearch}
        handleClickSearch={handleClickSearch}
        handleClickSemanticSearch={handleClickSemanticSearch}
        handleClickAiSearch={handleClickAiSearch}
        handleVoiceSearch={handleVoiceSearch}
      />
      <Box
        scrollSnapAlign="start"
        w="100%"
        alignItems={"center"}
        justifyContent={"center"}
        maxW="container.xl"
        mx="auto"
        p={{ base: "0px", md: '20px' }}
        className="questions"
        ref={questionsRef}
      >
        {/* {isUserLogin && <ChatBot />} */}
        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(4, 1fr)" }}
          templateAreas={{
            base: `"main" "right" "left" "slider"`,
          }}
          gap={"0px"}
          w={"100%"}
        >
          <GridItem
            p={{ base: 0, md: "0" }}
            order={{ base: 1, md: 2 }}
            as={GridItem}
            colSpan={{ md: 4 }}
            w="100%"
            overflowWrap="break-word"
            wordBreak="break-word"
            maxW="100vw"
            whiteSpace="normal"
            pr={{ base: 0, md: "21px" }}
            area={{ base: "main", md: "auto" }}
          >
            {!filters?.search ? (
              isValidating ? (
                <HStack
                  w={"100%"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Spinner />
                </HStack>
              ) : (
                <VStack display={{ base: "none", md: "flex" }} mt={"70px"}>
                  {questions?.map((item, index) => (
                    <QuestionCard key={index} data={item} t={t} />
                  ))}
                  <Stack
                    w={"100%"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    mt={"45px"}
                  >
                    {isValidating && <Text>درحال بارگذاری...</Text>}
                    <HStack>
                      <Button
                        height={"32px"}
                        width={"178px"}
                        bgColor={"#00464B"}
                        borderRadius={"15px"}
                        fontSize={"16px"}
                        onClick={() => setSize(size + 1)}
                      >
                        مشاهده بیشتر
                      </Button>
                      <Button
                        height={"32px"}
                        width={"178px"}
                        bgColor={"#006A711A"}
                        color={"#006A71"}
                        variant={"outline"}
                        borderRadius={"15px"}
                        fontSize={"16px"}
                        onClick={(e) => router.push("/new_question")}
                        isDisabled={isValidating}
                      >
                        سوال خود را بپرسید
                      </Button>
                    </HStack>
                  </Stack>
                </VStack>
              )
            ) : (
              <ResultSearch
                filters={filters}
                setFilters={setFilters}
                source={dataSource?.data}
                register={registerSearch}
                handleClickAiSearch={handleClickAiSearch}
                handleClickSearch={handleClickSearch}
                handleClickSemanticSearch={handleClickSemanticSearch}
                isUserLogin={isUserLogin}
                chatType={chatType}
              />
            )}

            <VStack display={{ base: "flex", md: "none" }} mt={"50px"}>
              {questions?.map((item, index) => (
                <QuestionMCard key={index} data={item} t={t} />
              ))}

              <Stack
                w={"100%"}
                justifyContent={"center"}
                alignItems={"center"}
              ></Stack>
            </VStack>
          </GridItem>

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
                  link: val?.website,
                  buttoh: "اطلاعات بیشتر",
                }))}
                height={"fit-content"}
                borderRadius={"5px"}
                title={t("sources")}
              />
            )}

            <Box w={"100%"} height={"min-content"}>
              <VStack mt={"20px"} w={"100%"} alignItems={"start"}>
                {dataSource?.data && (
                  <SliderSource
                    items={dataSource?.data?.map((val) => ({
                      title: val?.fa_source_name,
                      image: val?.logo_link,
                      id: val?.id,
                      count: val?.question_count,
                      link: val?.source_link,
                      buttoh: "اطلاعات بیشتر",
                    }))}
                    height={"133px"}
                    borderRadius={"5px"}
                    title={"منابع"}
                  />
                )}
              </VStack>
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </MainLayout>
  );
}
