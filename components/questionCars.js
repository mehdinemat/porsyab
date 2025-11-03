import { Badge, Divider, HStack, Text, VStack, Wrap } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { IoEyeOutline } from "react-icons/io5";

const QuestionCard = ({ data, t, type = "question", bgColor }) => {
  const router = useRouter();

  const handleQuestionRouter = (id) => {
    router.push(`/question_answer/${id}`);
  };

  const handleClickTags = (item) => {
    router.replace(`/questions/tag/${item?.id}/${item?.name}`);
  };

  return (
    <HStack
      as={Link}
      href={
        type === "question"
          ? `/question_answer/${data?.id}`
          : `/question_answer/${data?.question_id}`
      }
      w="100%"
      _hover={{
        border: "1px",
        boxShadow: `
      0px 8px 17px 0px #0000001A,
      0px 32px 32px 0px #00000017,
      0px 71px 43px 0px #0000000D,
      0px 126px 50px 0px #00000003,
      0px 197px 55px 0px #00000000
    `,
        borderColor: "#29CCCC",
      }}
      alignItems="start"
      mb="30px"
      pb="20px"
      gap="20px"
      cursor="pointer"
      bgColor={"white"}
      boxShadow={`
    0px 3px 6px 0px #0000000D,
    0px 11px 11px 0px #0000000A,
    0px 25px 15px 0px #00000008,
    0px 44px 18px 0px #00000003,
    0px 69px 19px 0px #00000000
  `}
      borderRadius="30px"
      padding="10px"
    >
      {/* <Image src="/minquestion.png" w={'23px'} height={'32px'} mt={'10px'} mr={'10px'} /> */}
      <VStack w={"100%"} alignItems={"start"} gap={"15px"} >
        <Text
          bgColor={'#F5F5F5'}
          fontSize={"18px"}
          w="full"
          whiteSpace="normal"
          lineHeight={"taller"}
          textAlign={"justify"}
          borderRadius={'15px'}
          px={'10px'}
          py={'5px'}
        >
          {data?.content}
        </Text>

        <Divider borderColor={'#00000017'} />
        <HStack w={"100%"} justifyContent={'space-between'}>

          <HStack w={'100%'} justifyContent={'center'}>

          <Wrap spacing="8px" w={"100%"}>
              {data?.tags?.map((item, index) => (
                <Badge
                  // onClick={(e) => handleClickTags(item)}
                  _hover={{ bgColor: "#29cccc38", color: "#1a7c7c" }}
                  transition={".3s"}
                  key={index}
                  color="#009875"
                  bgColor="#E6F1F1"
                  height="26px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontSize={"14px"}
                  fontWeight={"100"}
                  borderRadius={'15px'}
                  fontStyle={'light'}
                  px="8px" // optional: add some horizontal padding
                >
                  {item?.name}
                </Badge>
              ))}
            </Wrap>

            <HStack ml={'40px'}>
              {data?.source && (
                <HStack>
                  {/* <Avatar size={"sm"} /> */}
                  <Text color={"#999999"} w={"fit-content"} whiteSpace={'nowrap'}>
                    {data?.source}
                  </Text>
                </HStack>
              )}
            </HStack>    

          </HStack>


          <HStack justifyContent={"end"} w={"100%"} gap={'15px'}>
            <HStack color={'#999999'}>
              <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.8124 11.6209C17.1874 14.7459 14.8312 17.6884 11.5249 18.3459C9.9124 18.667 8.23968 18.4712 6.74492 17.7864C5.25016 17.1016 4.00956 15.9626 3.19978 14.5316C2.39 13.1007 2.05231 11.4508 2.2348 9.81675C2.41729 8.18273 3.11065 6.64794 4.21616 5.43091C6.48366 2.93341 10.3124 2.24591 13.4374 3.49591" stroke="#999999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M7.1875 10.3711L10.3125 13.4961L17.8125 5.37109" stroke="#999999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>

              <Text fontSize={"12px"} w={"max-content"}>
                {data?.like_count}
                {t("like")}
              </Text>
            </HStack>

            <HStack color={'#999999'}>
              <IoEyeOutline fontSize={"20px"} />
              <Text fontSize={"12px"} w={"max-content"}>
                {data?.view_count} {t("view")}
              </Text>
            </HStack>
            <HStack color={'#999999'}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 5.98359C1 5.13559 1 4.52859 1.04 4.05359C1.078 3.58459 1.15 3.28759 1.272 3.04859L0.382 2.59459C0.176 2.99759 0.0859998 3.44159 0.0419998 3.97259C-1.82539e-07 4.49759 0 5.15259 0 5.98359H1ZM1 7.18359V5.98359H0V7.18359H1ZM0 7.18359V12.1836H1V7.18359H0ZM0 12.1836V14.0976H1V12.1836H0ZM0 14.0976C0 14.9436 1.023 15.3676 1.622 14.7686L0.915 14.0616C0.923604 14.0558 0.93305 14.0515 0.943 14.0486L0.969 14.0506C0.977301 14.0553 0.984354 14.062 0.989572 14.07C0.99479 14.078 0.998022 14.0871 0.999 14.0966L0 14.0976ZM1.622 14.7686L3.561 12.8296L2.854 12.1226L0.914 14.0626L1.622 14.7686ZM10.7 11.6836H3.914V12.6836H10.7V11.6836ZM13.635 11.4116C13.396 11.5336 13.099 11.6056 12.63 11.6446C12.154 11.6836 11.548 11.6836 10.7 11.6836V12.6836C11.532 12.6836 12.186 12.6836 12.711 12.6406C13.242 12.5976 13.686 12.5076 14.089 12.3026L13.635 11.4116ZM14.727 10.3186C14.4874 10.7887 14.1051 11.172 13.635 11.4116L14.089 12.3026C14.7478 11.967 15.2834 11.4314 15.619 10.7726L14.727 10.3186ZM15 7.38359C15 8.23159 15 8.83859 14.96 9.31359C14.922 9.78259 14.85 10.0796 14.727 10.3186L15.619 10.7726C15.824 10.3696 15.914 9.92559 15.957 9.39459C16 8.86959 16 8.21459 16 7.38359H15ZM15 5.98359V7.38359H16V5.98359H15ZM14.727 3.04859C14.849 3.28759 14.922 3.58459 14.961 4.05359C15 4.52859 15 5.13559 15 5.98359H16C16 5.15159 16 4.49759 15.957 3.97259C15.914 3.44159 15.824 2.99759 15.619 2.59459L14.727 3.04859ZM13.635 1.95559C14.1053 2.19549 14.4875 2.5781 14.727 3.04859L15.619 2.59459C15.2834 1.93579 14.7478 1.40019 14.089 1.06459L13.635 1.95559ZM10.7 1.68359C11.548 1.68359 12.154 1.68359 12.63 1.72359C13.099 1.76159 13.396 1.83359 13.635 1.95559L14.089 1.06459C13.686 0.858594 13.242 0.769594 12.711 0.725594C12.186 0.683594 11.531 0.683594 10.7 0.683594V1.68359ZM5.3 1.68359H10.7V0.683594H5.3V1.68359ZM2.365 1.95559C2.604 1.83459 2.901 1.76159 3.37 1.72259C3.845 1.68359 4.452 1.68359 5.3 1.68359V0.683594C4.468 0.683594 3.814 0.683594 3.289 0.726594C2.758 0.769594 2.314 0.859594 1.911 1.06459L2.365 1.95559ZM1.272 3.04859C1.51172 2.57795 1.89435 2.19532 2.365 1.95559L1.911 1.06459C1.25235 1.39993 0.717767 1.93617 0.382 2.59459L1.272 3.04859ZM3.561 12.8296C3.65471 12.7361 3.78165 12.6836 3.914 12.6836V11.6836C3.51631 11.6839 3.13503 11.8422 2.854 12.1236L3.561 12.8296Z" fill="#999999" />
                <path d="M4.5 5.18359H11.5M4.5 8.18359H9.5" stroke="#999999" stroke-linecap="round" stroke-linejoin="round" />
              </svg>

              <Text fontSize={"12px"} w={"max-content"}>
                {data?.answer_count} {t("answer")}
              </Text>
            </HStack>
          </HStack>



          {/* <HStack w={"100%"} justifyContent={"end"}>
            <Text w={"150px"} color={"gray.400"}>
              {moment(data?.created_at).format("hh:mm:ss jYYYY/jMM/jDD")}
            </Text>
          </HStack> */}
        </HStack>
      </VStack>
    </HStack>
  );
};

export default QuestionCard;
