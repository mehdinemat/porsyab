import { baseUrl } from "@/components/lib/api";
import {
  Box,
  Button,
  Divider,
  HStack,
  Image,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";
const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
});

const postRequest = (url, { arg }) => {
  return axios.post(baseUrl + url, arg);
};

const Index = () => {
  const router = useRouter();

  const {
    register: registerUser,
    setValue: setValueUser,
    getValues: getValuesUser,
    handleSubmit: handleSubmitUser,
  } = useForm();

  const { trigger, isLoading, isMutating } = useSWRMutation(
    "user/auth/send-code",
    postRequest,
    {
      onSuccess: () => {
        router.push(`/verify_code?phone=${getValues("phone")}`);
      },
    }
  );

  const handleLogin = (e) => {
    trigger(e);
  };

  return (
    <Box
      backgroundImage="url('./bg.png')"
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      height="100vh"
      width="100%"
      bgColor="#F1F5F9"
    >
      <HStack height={"100%"}>
        <Box
          w={{ base: "100%", md: "40%" }}
          alignItems={"center"}
          justifyContent={"center"}
          as={HStack}
        >
          <VStack
            w={"350px"}
            mt={"20px"}
            justifyContent={"center"}
            height={"100%"}
            as={"form"}
            onSubmit={handleSubmitUser(handleLogin)}
          >
            <Image
              src="/porsyab.png"
              width={{ base: "120px", md: "110px" }}
              height={{ base: "50px", md: "138px" }}
              onClick={e => router.replace('/')}
              cursor={'pointer'}
            />{" "}
            <Text
              fontSize={{ base: "20px", md: "23px" }}
              color={"#333333"}
              textAlign={"center"}
              w={"327px"}
              mb={"20px"}
              fontWeight={'800'}
              fontFamily="morabba"
            >
              شبکه اجتماعی پرسش و پاسخ دینی
            </Text>
            <Divider w={"350px"} h={"2px"} bgColor={"#29CCCC"} />
            <Text fontSize={{ base: "20px", md: "25px" }} mt={"20px"}>
              ورود دو مرحله ای به حساب کاربری
            </Text>
            <Input
              height={"46px"}
              placeholder="شماره همراه"
              my={"10px"}
              {...registerUser("phone")}
              sx={{
                "::placeholder": {
                  textAlign: "center", // this line is also needed to target the placeholder itself
                },
              }}
            />
            <Button
              w={"100%"}
              bgColor={"#29CCCC"}
              height={"46px"}
              my={"20px"}
              type="submit"
            >
              ورود
            </Button>
            {/* <Button
              variant={"outline"}
              w={"100%"}
              rightIcon={<IoLogoGoogle />}
              height={"46px"}
            >
              ورود با حساب گوگل
            </Button> */}
          </VStack>
        </Box>
        <Box
          position="relative"
          w="60%"
          h="100%"
          display={{ base: "none", md: "flex" }}
        >
          {/* Base / background image */}
          <Image src="/porsyabhomeheader.png" objectFit="cover" w="100%" h="100%" />

          {/* Overlay / centered image */}
          <Image
            src="/porsyab_header.png"
            alt="Centered Image"
            position="absolute"
            top="50%"
            left="50%"
            width={"130px"}
            height={"158px"}
            transform="translate(-50%, -50%)"
          />
        </Box>
      </HStack>
    </Box>
  );
};

export default Index;
