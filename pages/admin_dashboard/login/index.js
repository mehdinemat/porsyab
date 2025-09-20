import {
  Box,
  Button,
  Checkbox,
  Divider,
  HStack,
  Image,
  Input,
  Text,
  VStack
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { IoLogoGoogle } from "react-icons/io5";
import useSWRMutation from "swr/mutation";
const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
});

const Index = () => {
  const { register, setValue, getValues, handleSubmit } = useForm();

  const { trigger, isLoading, isMutating } = useSWRMutation(
    "llm_tree/users/login"
  );
  const handleSendSubmit = (e) => {
    trigger();
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
          w={{ base: '100%', md: "40%" }}
          alignItems={"center"}
          justifyContent={"center"}
          as={HStack}
        >
          <VStack
            w={"350px"}
            mt={"20px"}
            as={VStack}
            justifyContent={"center"}
            height={"100%"}
          >
            <Image
              src="/porsyab.png"
              width={{ base: "120px", md: "110px" }}
              height={{ base: "50px", md: "138px" }}
            />
            <Text fontSize={{ base: '20px', md: "23px" }} color={"#333333"} w={"327px"} mb={"20px"} >
              شبکه اجتماعی پرسش و پاسخ دینی
            </Text>
            <Divider w={"350px"} h={"2px"} bgColor={"#29CCCC"} />
            <Text fontSize={{ base: '20px', md: "25px" }} mt={"20px"}>
              ورود به حساب کاربری ادمین
            </Text>
            <Input
              height={"46px"}
              placeholder="نام کاربری یا شماره همراه"
              my={"10px"}
              sx={{
                "::placeholder": {
                  textAlign: "center", // this line is also needed to target the placeholder itself
                },
              }}
            />
            <Input
              height={"46px"}
              placeholder="کلمه عبور"
              mb={"10px"}
              sx={{
                "::placeholder": {
                  textAlign: "center", // this line is also needed to target the placeholder itself
                },
              }}
            />
            <HStack w={"100%"} justifyContent={"space-between"}>
              <HStack>
                <Checkbox></Checkbox>
                <Text fontSize={{ base: '15px', md: "18px" }}>مرا به خاطر بسپار</Text>
              </HStack>
              <Text color={"#29CCCC"} fontSize={{ base: '15px', md: "18px" }}>
                فراموشی رمز عبور
              </Text>
            </HStack>
            <Button w={"100%"} bgColor={"#29CCCC"} height={"46px"} my={"20px"}>
              ورود
            </Button>
            <Button
              variant={"outline"}
              w={"100%"}
              rightIcon={<IoLogoGoogle />}
              height={"46px"}
            >
              ورود با حساب گوگل
            </Button>
          </VStack>
        </Box>
        <Box position="relative" w="60%" h="100%" display={{ base: 'none', md: 'flex' }}>
          {/* Base / background image */}
          <Image src="../../loginbg.png" objectFit="cover" w="100%" h="100%" />

          {/* Overlay / centered image */}
          <Image
            src="../../loginlogoqu.png"
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
