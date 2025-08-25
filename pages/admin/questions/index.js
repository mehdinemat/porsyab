import AccessDenied from "@/components/accessDenied";
import QuestionCard from "@/components/admin_dashboard/questionCard";
import QuestionMCard from "@/components/home/mobile/questionMCard";
import { baseUrl } from "@/components/lib/api";
import MainLayout from "@/components/mainLayout";
import Pagination from "@/components/pagination";
import {
  Box,
  Button,
  Center,
  Grid,
  GridItem,
  HStack,
  Spinner,
  Stack,
  Text,
  VStack
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { BiSortAlt2 } from "react-icons/bi";
import useSWR from "swr";
import RightSidebar from "../rightSidebar";

const fetcher = async (url) => {
  try {
    const res = await axios.get(baseUrl + url);
    return res.data;
  } catch (err) {
    console.log(err?.status)
    if (err?.status === 401) {
      window.location.href = "/login";
    } else if (err?.status == 403) {

    }
    throw err;
  }
}

const Index = () => {

  const [page, setPage] = useState(1)

  const { data: dataQuestions, isLoading, error } = useSWR(`admin/question?lang=fa&page=${page}`, fetcher);

  const { t } = useTranslation();

  if (error) return <AccessDenied />;


  return (
    <MainLayout>
      <Box
        w="100%"
        alignItems={"center"}
        justifyContent={"center"}
        maxW="container.xl"
        mx="auto"
        p={{ base: "20px", md: "60px" }}
        my={"20px"}
        mt={{ base: "40px", md: "60px" }}
      >
        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(4, 1fr)" }}
          gap={"32px"}
          w={"100%"}
        >
          <GridItem colSpan={1} display={{ base: "none", md: "flex" }}>
            <RightSidebar />
          </GridItem>
          {!isLoading ? <GridItem as={Stack} gap={"20px"} colSpan={3}>
            <Box p="6" colSpan={"2"}>
              <HStack
                w={"100%"}
                justifyContent={"space-between"}
                mb={"10px"}
                alignItems={"center"}
              >
                <Text fontWeight={"bold"} fontSize={"16px"}>
                  سوال ها
                </Text>
                {/* <Button
                  width={"189px"}
                  height={"50px"}
                  bgColor={"#F9C96D"}
                  color={"black"}
                  fontWeight={"normal"}
                >
                  سوال خود را بپرسید
                </Button> */}
              </HStack>
              <HStack
                w={"100%"}
                justifyContent={"space-between"}
                mb={"10px"}
                alignItems={"center"}
              >
                <Text fontSize={"14px"}>۲۵۸ سؤال</Text>
                <HStack>
                  <HStack justifyContent={{ base: "start" }}>
                    <BiSortAlt2 color="gray" />
                    <Button
                      variant={"ghost"}
                      fontSize={"sm"}
                      padding={{ base: "0px" }}
                      display={{ base: "none", md: "flex" }}
                    >
                      مرتب سازی براساس:
                    </Button>
                    <Button
                      variant={"ghost"}
                      fontSize={"sm"}
                      padding={{ base: "0px" }}
                      display={{ base: "flex", md: "none" }}
                    >
                      جدیدترین ها
                    </Button>
                  </HStack>
                  <HStack display={{ base: "none", md: "flex" }}>
                    <Button
                      colorScheme="gray"
                      variant={"ghost"}
                      _hover={{ bgColor: "none" }}
                      fontWeight={"normal"}
                    >
                      جدیدترین‌ها
                    </Button>
                    <Button
                      colorScheme="gray"
                      variant={"ghost"}
                      _hover={{ bgColor: "none" }}
                      fontWeight={"normal"}
                    >
                      پربازدیدترین‌ها
                    </Button>
                    <Button
                      colorScheme="gray"
                      variant={"ghost"}
                      _hover={{ bgColor: "none" }}
                      fontWeight={"normal"}
                    >
                      محبوبترین‌ها
                    </Button>
                  </HStack>
                </HStack>
              </HStack>

              <VStack display={{ base: "none", md: "flex" }}>
                {dataQuestions?.data?.result?.map((item) => (
                  <QuestionCard t={t} data={item} />
                ))}
              </VStack>
              <VStack display={{ base: "flex", md: "none" }}>
                {dataQuestions?.data?.result?.map((item) => (
                  <QuestionMCard t={t} data={item} />
                ))}
              </VStack>
              <Stack w={"100%"} justifyContent={"center"} alignItems={"center"}>
                <Pagination
                  totalPages={dataQuestions?.data?.total_count}
                  currentPage={page}
                  onPageChange={setPage}
                  t={t}
                />
              </Stack>
            </Box>
          </GridItem> : <Center as={GridItem} colSpan={3} w={'100%'}><Spinner /></Center>}
        </Grid>
      </Box>
    </MainLayout>
  );
};

export default Index;
