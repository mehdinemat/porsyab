import PhoneInput from "@/components/base/PhoneInput";
import { baseUrl } from "@/components/lib/api";
import {
  Box,
  Button,
  Divider,
  HStack,
  Image,
  Text,
  useToast,
  VStack
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import useSWRMutation from "swr/mutation";
import * as Yup from "yup";

const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
});

const postRequest = (url, { arg: { number, ...data } }) => {
  return axios.post(
    baseUrl + url + `?phone_number=${encodeURIComponent(number)}`
  );
};

const Index = () => {
  const [phone, setPhone] = useState("");
  const [fullNumber, setFullNumber] = useState("");

  const { t } = useTranslation();

  const router = useRouter();
  const toast = useToast();

  const validationSchema = Yup.object({
    username: Yup.string()
      .required("نام کاربری را وارد کنید")
      .min(3, "نام کاربری باید حداقل 3 کاراکتر باشد"),
    email: Yup.string().email("ایمیل اشتباست"),
    password: Yup.string()
      .required("رمز عبور را وارد کنید")
      .min(6, "رمز عبور حداقل باید 6 کاراکتر باشد"),

    re_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "تکرار رمز عبور اشتباست")
      .required("لطفا تکرار رمز عبور را وارد کنید"),
  });

  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { trigger, isLoading, isMutating } = useSWRMutation(
    "user/auth/send-verify-code",
    postRequest,
    {
      onSuccess: (data) => {
        toast({
          title: "موفق",
          description: "کد تایید ارسال شد",
          status: "success",
          duration: 6000,
          isClosable: true,
        });
        if (data?.data?.status) {
          router.push(
            `/two_step_login/verify_code?phone=${encodeURIComponent(
              fullNumber
            )}`
          );
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
  const handleRegisterUser = (e) => {
    trigger({ number: fullNumber });
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
            <Text
              fontSize={{ base: "20px", md: "25px" }}
              mt={"20px"}
              mb={"10px"}
            >
              {t("forgot_password")}
            </Text>
            <PhoneInput setFullNumber={setFullNumber} fullNumber={fullNumber} />
            <Button
              w={"100%"}
              bgColor={"#29CCCC"}
              height={"46px"}
              mt={"20px"}
              type="submit"
              onClick={handleRegisterUser}
              isLoading={isMutating}
            >
              {t("continue")}
            </Button>
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
