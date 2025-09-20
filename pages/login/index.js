import { baseUrl } from "@/components/lib/api";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  HStack,
  Image,
  Input,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import useSWRMutation from "swr/mutation";

const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
});

const postRequest = (url, { arg }) => {
  return axios.post(baseUrl + url, arg);
};

const Index = () => {
  const { t } = useTranslation();

  const toast = useToast();

  const router = useRouter();

  const { register, setValue, getValues, handleSubmit } = useForm();

  const { trigger, isLoading, isMutating } = useSWRMutation(
    "user/auth",
    postRequest,
    {
      onSuccess: (data) => {
        if (data?.data?.status) {
          if (data?.data?.data?.otp_sended) {
            router.push(
              `/two_step_login/verify_code?username=${getValues("username")}`
            );
          } else {
            localStorage.setItem("token", data?.data?.data?.access_token);
            router.push('/')
          }
        } else {
          toast({
            title: "خطا",
            description: data?.data?.message,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
      },
    }
  );
  const handleLogin = (e) => {
    trigger(e);
  };

  const handleClickRegister = () => {
    router.replace("/register");
  };

  const handleForgetPasswordClick = () => {
    router.push('forget_password')
  }

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
            as={"form"}
            onSubmit={handleSubmit(handleLogin)}
            justifyContent={"center"}
            height={"100%"}
          >
            <Image
              src="/porsyab.png"
              width={{ base: "120px", md: "110px" }}
              height={{ base: "50px", md: "138px" }}
              cursor={"pointer"}
              onClick={(e) => router.push("/")}
            />
            <Text
              fontSize={{ base: "20px", md: "23px" }}
              color={"#333333"}
              textAlign={"center"}
              w={"327px"}
              mb={"20px"}
              fontFamily="morabba"
              fontWeight={'800'}
            >
              {t("religious")}
            </Text>
            <Divider w={"350px"} h={"2px"} bgColor={"#29CCCC"} />
            <Text fontSize={{ base: "20px", md: "25px" }} mt={"20px"}>
              {t("log_in_to_your_account")}
            </Text>
            <Input
              height={"46px"}
              placeholder={t("username_or_mobile_number")}
              my={"10px"}
              {...register("username")}
              sx={{
                "::placeholder": {
                  textAlign: "center", // this line is also needed to target the placeholder itself
                },
              }}
            />
            <Input
              height={"46px"}
              type="password"
              placeholder={t("password")}
              mb={"10px"}
              {...register("password")}
              sx={{
                "::placeholder": {
                  textAlign: "center", // this line is also needed to target the placeholder itself
                },
              }}
            />
            <HStack w={"100%"} justifyContent={"space-between"}>
              <HStack>
                <Checkbox></Checkbox>
                <Text fontSize={{ base: "15px", md: "18px" }}>
                  {t("remember_me")}
                </Text>
              </HStack>
              <Text color={"#29CCCC"} fontSize={{ base: "15px", md: "18px" }} cursor={'pointer'} onClick={handleForgetPasswordClick}>
                {t("forgot_password")}
              </Text>
            </HStack>
            <Button
              w={"100%"}
              bgColor={"#29CCCC"}
              height={"46px"}
              mt={"20px"}
              type="submit"
              isLoading={isMutating}
            >
              {t("log_in")}
            </Button>
            <HStack
              w={"100%"}
              alignItems={"start"}
              onClick={(e) => router.push("/register")}
            >
              <Text>{t("no_account")}</Text>
              <Text color={"blue.500"} cursor={"pointer"}>
                {t("create_account")}
              </Text>
            </HStack>
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
