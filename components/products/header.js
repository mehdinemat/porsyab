import { Box, HStack, Stack, VStack } from "@chakra-ui/react";
import { Geist, Geist_Mono } from "next/font/google";
import { useRouter } from "next/router";
import { FaHeadphonesAlt } from "react-icons/fa";
import { IoDocuments } from "react-icons/io5";
import { MdKeyboardVoice } from "react-icons/md";
import HeaderSlider from "./headerslider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const menuList = [
  {
    title: "صفحه اصلی",
    icon: <MdKeyboardVoice fontSize={"18px"} />,
    link: "audio",
  },
  { title: "تصویر به متن", icon: <IoDocuments fontSize={"18px"} /> },
  { title: "صوت به متن", icon: <FaHeadphonesAlt fontSize={"18px"} /> },
  // { title: 'ارتباط دادن نماز جمعه و حاکمیت', icon: <FaPrayingHands fontSize={'18px'} /> },
  // { title: 'صفحه مسئولین', icon: <BsFillPersonFill fontSize={'18px'} /> },
  // { title: 'بانک اطلاعات مسائل مربوط نماز جمعه', icon: <IoFileTrayStacked fontSize={'18px'} /> },
  // { title: 'توصیف خطبه', icon: <FaFile fontSize={'18px'} /> },
];

const siteData = [
  {
    title: "سوال",
    number: "234",
  },
  {
    title: "برچسب",
    number: "52353",
  },
  {
    title: "مرجع",
    number: "43",
  },
  {
    title: "منبع",
    number: "2",
  },
  {
    title: "زبان",
    number: "3",
  },
];

const Header = ({ children, t }) => {
  const router = useRouter();

  return (
    <Box
      marginTop={{ base: '60px', md: "100px" }}
      as={Stack}
      justifyContent={"center"}
      alignItems={"center"}
      width="100%"
      height={"700px"}
      bg={"#3646B3"}
      p={2}
      px={4}
      bgImage={"/porsyabhomeheader.png"}
      bgSize="cover" // 👈 this makes it cover the container
      bgRepeat="no-repeat"
      bgPosition="center"
    >
      <HStack
        height={"700px"}
        w={"100%"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <VStack
          w={"100%"}
          alignItems={"center"}
          justifyContent={"center"}
          height={"100%"}
        >
          <Stack
            maxW={{ base: '100%', md: "80%" }}
            mx="auto"
            py={4}
            top={'0px'}
          // position={"absolute"}
          >
            <HeaderSlider t={t} />
          </Stack>
        </VStack>
      </HStack>
    </Box>
  );
};

export default Header;
