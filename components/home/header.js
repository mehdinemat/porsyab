import {
  Avatar,
  Box,
  Button,
  Center,
  chakra,
  Container,
  Flex,
  HStack,
  Icon,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Stack,
  Text,
  Textarea,
  Tooltip,
  useBreakpoint,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import { IoIosArrowDown } from "react-icons/io";
import { IoMic, IoSearch } from "react-icons/io5";
import { TfiClose } from "react-icons/tfi";
import Recorder from "recorder-js";
import useSWRMutation from "swr/mutation";
import { baseUrl } from "../lib/api";

const siteData = [
  {
    title: "سوال",
    number: "234",
    t_title: "question",
  },
  {
    title: "برچسب",
    number: "52353",
    t_title: "tag",
  },
  {
    title: "مرجع",
    number: "43",
    t_title: "reference",
  },
  {
    title: "منبع",
    number: "2",
    size: "base",
    t_title: "source",
  },
];

const dataTranslate = {
  سوال: "question_count",
  برچسب: "tag_count",
  منبع: "source_count",
  مرجع: "public_figure_count",
};

const MotionMenuList = chakra(motion(MenuList));

const MotionBox = motion(Box);
const MotionBox1 = motion.div;


const sendAudio = async (url, { arg }) => {
  const formData = new FormData();
  formData.append("file", arg, "voice.wav");

  const res = await fetch(baseUrl + url, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Failed to upload audio");
  return res.json();
};

const postRequest = (url, { arg }) => {
  return axios.post(baseUrl + url, arg);
};

const Header = ({
  data,
  t,
  register,
  handleClickSearch,
  handleClickSemanticSearch,
  watchSearch,
  resetSearch,
  handleVoiceSearch,
  hadith,
  handleClickAiSearch,
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const currentSize = useBreakpointValue({ base: "base", md: "md", lg: "lg" });

  const { locale, asPath } = router;

  const inputRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  const breakpoint = useBreakpoint();

  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [voiceText, setVoiceText] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [recordingActive, setRecordingActive] = useState(false);
  const [isUserLogin, setIsUserLogin] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [loadingRecording, setLoadingRecording] = useState(false);

  const audioContextRef = useRef(null);
  const streamRef = useRef(null);
  const recorderRef = useRef(null);

  const { trigger: uploadAudio, isMutating } = useSWRMutation(
    "user/general/speech-to-text",
    sendAudio,
    {
      onSuccess: (data) => {
        handleVoiceSearch(data?.data?.text);
      },
    }
  );

  // const handleMicClick = async () => {
  //   try {
  //     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  //     mediaRecorderRef.current = new MediaRecorder(stream);
  //     mediaRecorderRef.current.start();
  //     setIsRecording(true);

  //     mediaRecorderRef.current.ondataavailable = (e) => {
  //       const audioBlob = new Blob([e.data], { type: "audio/wav" });
  //       const audioUrl = URL.createObjectURL(audioBlob);
  //     };
  //   } catch (error) {
  //     console.error("Microphone access denied:", error);
  //   }
  // };

  const handleCancelRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  const handleMicClick = async () => {
    setRecordingActive(true);

    if (isRecording) return;

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const recorder = new Recorder(audioContext);

    await recorder.init(stream);
    recorder.start();

    audioContextRef.current = audioContext;
    streamRef.current = stream;
    recorderRef.current = recorder;

    setIsRecording(true);
  };

  const handleStopRecording = async () => {
    if (!recorderRef.current || !isRecording) return;

    setLoadingRecording(true);

    const { blob } = await recorderRef.current.stop();
    setRecordedBlob(blob);

    streamRef.current.getTracks().forEach((track) => track.stop());
    setIsRecording(false);

    try {
      const response = await uploadAudio(blob); // this sends it
      console.log("Upload response:", response); // use this data in UI
    } catch (err) {
      setLoadingRecording(false);
      console.error("Upload failed:", err);
    }

    setLoadingRecording(false);
    // Optionally clear the blob
    setRecordedBlob(null);
  };

  const handleDownload = () => {
    if (recordedBlob) {
      const url = URL.createObjectURL(recordedBlob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "recording.wav";
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleUpload = async () => {
    if (recordedBlob) {
      await uploadAudio(recordedBlob);
      setRecordedBlob(null); // Reset
    }
  };

  useEffect(() => {
    setIsUserLogin(!!localStorage.getItem("token"));
  }, []);

  const handleAiResponse = () => {
    handleClickAiSearch();
  };

  const handleProfileLink = (link) => {
    router.push(link);
  };

  const handleExit = () => {
    localStorage.removeItem("token");
    router.replace("/");
  };
  return (
    <Box
      // marginTop={{ base: "60px", md: "100px" }}
      as={Stack}
      justifyContent={"center"}
      alignItems={"center"}
      width="100%"
      height={"100vh"}
      scrollSnapAlign="start"
      scrollSnapStop="always"
      bg={"#3646B3"}
      p={2}
      px={4}
      borderBottom={"1px"}
      borderBottomColor={"gray.200"}
      bgImage={"/bgporsyab.jpg"}
      bgSize="cover" // 👈 this makes it cover the container
      bgRepeat="no-repeat"
      bgPosition="center"
      position={"relative"}
    >
      <HStack
        maxW="container.xl"
        height={'40px'}
        justifyContent="space-between"
        w="100%"
        mt={{ base: "0px", md: "10px" }}
        alignItems="center" // make sure children align properly
      >
        <HStack>
          {/* <Image
            src="./headerquestionlogo.png"
            width={{ base: "16px", md: "29px" }}
            height={{ base: "23px", md: "42px" }}
            ml={{ base: "0px", md: "5px" }}
            onClick={(e) => router.push("/")}
            cursor={"pointer"}
          /> */}
          <Image
            src="./logoheader.png"
            width={{ base: "56px", md: "144px" }}
            height={{ base: "23px", md: "40px" }}
            onClick={(e) => router.push("/")}
            cursor={"pointer"}
          />

          <Menu marginRight={{ base: "5px", md: "20px" }}>
            <MenuButton
              px={4}
              py={2}
              transition="all 0.2s"
              _hover={{
                backdropFilter: "blur(12.8px)",
                boxShadow: `
      0px 3px 7px 0px #0000000D,
      0px 12px 12px 0px #0000000A,
      0px 28px 17px 0px #00000008,
      0px 50px 20px 0px #00000003,
      0px 77px 22px 0px #00000000
    `,
              }}
              borderRadius={"15px"}
            >
              <HStack color="white">
                <Text fontSize="20px">
                  {locale == "en"
                    ? t("header_english")
                    : locale == "fa"
                      ? t("header_persian")
                      : locale == "ar" && t("header_arabic")}
                </Text>
                <IoIosArrowDown width="12px" fontSize="12px" />
              </HStack>
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => router.push("/", "/", { locale: "en" })}>
                {t("header_english")}
              </MenuItem>
              <MenuItem onClick={() => router.push("/", "/", { locale: "ar" })}>
                {t("header_arabic")}
              </MenuItem>
              <MenuItem onClick={() => router.push("/", "/", { locale: "fa" })}>
                {t("header_persian")}
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>

        <HStack align="center">
          {!isUserLogin ? (
            <HStack
              height={"60px"}
              width={"fit-content"}
              cursor="pointer"
              onClick={() => router.push("/login")}
              role="group" // 👈 important: allows child hover detection
              alignItems={"center"}
              justifyContent={"center"}
              transition="all 0.3s ease" // smooth hover
              _hover={{
                backdropFilter: "blur(12.8px)",
                boxShadow: `
      0px 3px 7px 0px #0000000D,
      0px 12px 12px 0px #0000000A,
      0px 28px 17px 0px #00000008,
      0px 50px 20px 0px #00000003,
      0px 77px 22px 0px #00000000
    `,
              }}
              borderRadius={"15px"}
            >
              <Text
                fontFamily="iransans"
                fontWeight="500"
                fontSize={{ base: "10px", md: "20px" }}
                color="white"
              >
                {t("log_sub")}
              </Text>

              <Image
                src="/adduserheader.png"
                height={{ base: "15px", md: "29px" }}
                width={{ base: "15px", md: "28px" }}
              />
            </HStack>
          ) : (
            <Avatar fontSize={"46px"} src="/avatar.png" />
          )}
          <Menu
            isOpen={isOpen}
            onOpen={() => setIsOpen(true)}
            onClose={() => setIsOpen(false)}
            placement="bottom-end"
          >
            <MenuButton as={Button} _hover={{
              backdropFilter: "blur(12.8px)",
              boxShadow: `
      0px 3px 7px 0px #0000000D,
      0px 12px 12px 0px #0000000A,
      0px 28px 17px 0px #00000008,
      0px 50px 20px 0px #00000003,
      0px 77px 22px 0px #00000000
    `,
            }}
              borderRadius={"10px"}>
              <AnimatePresence mode="wait" initial={false}>
                <MotionBox1
                  key={isOpen ? "close" : "menu"}
                  initial={{ rotate: 0, opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.25 }}
                >
                  {isOpen ? <IconButton icon={<TfiClose size={'20px'} />} bgColor={'#3646B31A'} /> : <Image
                    src="/menuheader.png"
                    height={{ base: "17px", md: "29px" }}
                    width={{ base: "17px", md: "28px" }}
                  />}
                </MotionBox1>
              </AnimatePresence>
              {/* <Image
                src="/menuheader.png"
                height={{ base: "17px", md: "29px" }}
                width={{ base: "17px", md: "28px" }}
                mr={{ base: "5px", md: "20px" }}
              /> */}
            </MenuButton>

            <AnimatePresence>
              {isOpen && (
                <MotionMenuList
                  // 👇 animation
                  initial={{ opacity: 0, height: "0px" }}
                  animate={{ opacity: 1, height: "fit-content" }}
                  exit={{ opacity: 0, height: "0px" }}
                  transition={{ duration: 1.6, ease: "easeInOut" }}
                  // 👇 your original Chakra UI props
                  bgColor={"#EBEDF8E5"}
                  padding={"12px"}
                  w={"237px"}
                  h={"289px"}
                  backdropFilter="blur(27.6px)"
                  boxShadow={`
              0px 14px 30px 0px #0000001A,
              0px 54px 54px 0px #00000017,
              0px 122px 73px 0px #0000000D,
              0px 216px 86px 0px #00000003,
              0px 338px 95px 0px #00000000
            `}
                  borderRadius={"30px"}
                >
                  <MenuItem
                    _hover={{ bgColor: "#3646B333" }}
                    borderRadius="15px"
                    bgColor="#3646B30D"
                    my="5px"
                    h="35px"
                    onClick={() => handleProfileLink(isUserLogin ? '/dashboard/profile' : '/login')}
                  >
                    {isUserLogin ? "پروفایل" : "ورود/ثبت‌نام"}
                  </MenuItem>
                  <MenuItem
                    _hover={{ bgColor: "#3646B333" }}
                    borderRadius="15px"
                    bgColor="#3646B30D"
                    my="5px"
                    h="35px"
                  >
                    منابع و مراجع
                  </MenuItem>
                  <MenuItem
                    _hover={{ bgColor: "#3646B333" }}
                    borderRadius="15px"
                    bgColor="#3646B30D"
                    my="5px"
                    h="35px"
                  >
                    اخبار
                  </MenuItem>
                  <MenuItem
                    _hover={{ bgColor: "#3646B333" }}
                    borderRadius="15px"
                    bgColor="#3646B30D"
                    my="5px"
                    h="35px"
                  >
                    کاربران
                  </MenuItem>
                  <MenuItem
                    _hover={{ bgColor: "#3646B333" }}
                    borderRadius="15px"
                    bgColor="#3646B30D"
                    my="5px"
                    h="35px"
                  >
                    پشتیبانی و راه ارتباطی
                  </MenuItem>
                  {isUserLogin && (
                    <MenuItem
                      _hover={{ bgColor: "#3646B333" }}
                      borderRadius="15px"
                      bgColor="#3646B30D"
                      my="5px"
                      h="35px"
                      onClick={() => handleExit()}
                    >
                      خروج از حساب کاربری
                    </MenuItem>
                  )}
                </MotionMenuList>
              )}
            </AnimatePresence>
          </Menu>
        </HStack>
      </HStack>
      <VStack
        height={"100vh"}
        as={Container}
        maxW="5xl"
        w={"100%"}
        alignItems={"center"}
        justifyContent={"space-between"}
        mt={{ base: '0px', md: '60px' }}
      >
        <VStack
          w={"100%"}
          alignItems={"center"}
          justifyContent={"center"}
          height={"100%"}
          mt={{ base: "-80px", md: "-50px" }}
        >
          <Text
            fontFamily="morabba"
            fontSize={{ base: "39px", md: "50px" }}
            color="white"
            textAlign="center"
            fontWeight="700"
            mb={{ base: "20px" }}
            sx={{
              "@media (min-width: 120em)": {
                marginBottom: "40px",
              },
            }}
            textShadow={`
    0px -5px 13.4px #FFFFFF9E,
    0px 5px 11px #0000007D,
    0px 20px 20px #0000006E,
    0px 45px 27px #00000040,
    0px 81px 32px #00000012,
    0px 126px 35px #00000003
  `}
          >
            {t("home_parsa_header_title")}
          </Text>

          <Box
            display={{ base: 'flex', md: 'none' }}
            w={{ base: "380px", md: "545px" }}
            h={{ base: "101px", md: "127px" }}
            flexDir={'column'}
            borderRadius="13px"
            position="relative"
            bg="#FFFFFF12"
            backdropFilter="blur(5px)"
            padding={"15px"}
            mb={'20px'}
          // sx={{
          //   overflow: "hidden", // ensures rounded corners
          //   _before: {
          //     content: '""',
          //     position: "absolute",
          //     inset: 0,
          //     borderRadius: "13px",
          //     padding: "0.7px", // border thickness
          //     background:
          //       "linear-gradient(180deg, rgba(255, 255, 255, 0.55) 0%, rgba(255, 255, 255, 0) 36.54%, rgba(255, 255, 255, 0) 72.12%, rgba(255, 255, 255, 0.33) 100%)",
          //     WebkitMask:
          //       "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          //     WebkitMaskComposite: "xor",
          //     maskComposite: "exclude",
          //     pointerEvents: "none",
          //   },
          // }}
          >
            <Text
              color={"#76FFFF"}
              wordBreak="break-word"
              align={"justify"}
              mb={"5px"}
              fontSize={{ base: "6px", md: "10px" }}
              fontFamily={'doran'}
            >
              {hadith?.Masoum?.MasoumTitle}:
            </Text>
            <Text
              color={"#76FFFF"}
              wordBreak="break-word"
              align={"justify"}
              mb={"15px"}
              fontWeight={"700"}
              fontSize={{ base: "9px", md: "14px" }}
              fontFamily={'doran'}
            >
              {hadith?.Texts?.[0]?.HadithSimpleText}
            </Text>
            <Text
              color={"#76FFFF"}
              wordBreak="break-word"
              align={"justify"}
              fontWeight={"400"}
              fontSize={{ base: "7px", md: "12px" }}
              fontFamily={'doran'}
            >
              {hadith?.Texts?.[1]?.HadithSimpleText}
            </Text>
          </Box>

          <VStack
            mb={{ base: "20px", md: "45px" }}
            gap={0}
            alignItems={"center"}
            position="relative"
            borderRadius={{ base: '9px', md: "30px" }}
            p={{ base: "5px", md: "12px" }}
            bgColor={"#FFFFFF"}
            height={{ base: "111px", md: "163px" }}
            width={{ base: "380px", md: "874px" }}
            boxShadow={`
        0px 18px 40px 0px #00000040,
        0px 73px 73px 0px #00000036,
        0px 164px 99px 0px #00000021,
        0px 292px 117px 0px #0000000A,
        0px 457px 128px 0px #00000000
      `}

            sx={{
              "@media (min-width: 120em)": {
                marginBottom: "80px",
              },
              backdropFilter: "blur(23.3px)",
              WebkitBackdropFilter: "blur(23.3px)",
              overflow: "hidden", // for rounded corners
              _before: {
                content: '""',
                position: "absolute",
                inset: 0,
                borderRadius: "20px",
                padding: "1.5px", // thickness of border
                background:
                  "linear-gradient(360deg, rgba(255, 255, 255, 0.55) -32.14%, rgba(255, 255, 255, 0) 19.32%, rgba(255, 255, 255, 0) 53.62%, rgba(255, 255, 255, 0.33) 100%)",
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
                pointerEvents: "none",
              },
            }}
          >
            <Textarea
              borderRadius={{ base: '5px', md: "20px" }}
              ref={inputRef}
              fontSize={{ base: "14px", md: "20px" }}
              fontWeight={"500"}
              width={{ base: "370px", md: "850px" }}
              bgColor="#EBEDF8"
              backdropFilter="blur(9px)"
              minHeight={{ base: "57px", md: "89px" }}
              height={{ base: "57px", md: "89px" }}
              textIndent="5px"
              placeholder={isRecording ? t("listening") : t("search_among")}
              color="black"
              border="none" // removes the border completely
              _placeholder={{ color: "#000000" }}
              {...register("search")}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAiResponse();
                }
              }}
            />
            <HStack
              w={"100%"}
              justifyContent={"space-between"}
              alignItems={"center"}
              mt={{ base: "3px", md: "5px" }}
            >
              <Flex align="center" gap="2">
                <>
                  {!isRecording ? (
                    isMutating ? (
                      <Spinner color="black" />
                    ) : (
                      <Icon
                        as={IoMic}
                        fontSize={{ base: "16px", md: "25px" }}
                        color="#006A71"
                        cursor="pointer"
                        mr="10px"
                        onClick={handleMicClick}
                      />
                    )
                  ) : (
                    <HStack gap={0}>
                      <svg
                        cursor={"pointer"}
                        width="38"
                        height="38"
                        viewBox="0 0 38 38"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={async () => {
                          handleStopRecording();
                          // setTimeout(handleUpload, 500);
                        }}
                      >
                        <g filter="url(#filter0_d_832_10734)">
                          <rect
                            x="11.5"
                            y="11.5"
                            width="15"
                            height="15"
                            rx="2"
                            fill="#FF0000"
                          />
                        </g>
                        <defs>
                          <filter
                            id="filter0_d_832_10734"
                            x="0.7"
                            y="0.7"
                            width="36.6"
                            height="36.6"
                            filterUnits="userSpaceOnUse"
                            color-interpolation-filters="sRGB"
                          >
                            <feFlood
                              flood-opacity="0"
                              result="BackgroundImageFix"
                            />
                            <feColorMatrix
                              in="SourceAlpha"
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                              result="hardAlpha"
                            />
                            <feOffset />
                            <feGaussianBlur stdDeviation="5.4" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix
                              type="matrix"
                              values="0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
                            />
                            <feBlend
                              mode="normal"
                              in2="BackgroundImageFix"
                              result="effect1_dropShadow_832_10734"
                            />
                            <feBlend
                              mode="normal"
                              in="SourceGraphic"
                              in2="effect1_dropShadow_832_10734"
                              result="shape"
                            />
                          </filter>
                        </defs>
                      </svg>
                      <Image src="/Device.png" height={"40px"} />
                    </HStack>
                  )}
                </>

                {/* } */}
              </Flex>
              <HStack height={"100%"} alignItems={"center"} justifyContent={'end'} paddingY={'5px'}>
                {searchActive && (
                  <Box
                    height={"fit-content"}
                    display={"flex"}
                    flexDir={"row"}
                    alignItems={"center"}
                    gap={"5px"}
                    bgColor={"#FFFFFF0D"}
                    borderRadius={"20px"}
                    padding={"5px"}
                  >
                    <Button
                      leftIcon={<IoSearch fontSize={{ base: '1px', md: "20px" }} size={currentSize == "base" ? '14px' : '22px'} color="#006A71" />}
                      bgColor={"#0098751A"}
                      color={"#006A71"}
                      border={'1px'}
                      borderColor={'#006A71'}
                      borderRadius={'15px'}
                      onClick={(e) => handleClickSearch()}
                      fontSize={{ base: "6px", md: "14px" }}
                      height={{ base: "22px", md: "30px" }}
                      width={{ base: "50px", md: "auto" }}
                    >
                      معمولی
                    </Button>
                    <Button
                      height={{ base: "22px", md: "30px" }}
                      fontSize={{ base: "6px", md: "14px" }}
                      border={'1px'}
                      borderColor={'#006A71'}
                      borderRadius={'15px'}
                      onClick={(e) => handleClickSemanticSearch()}
                      leftIcon={
                        <svg
                          width={currentSize == 'base' ? '13' : "17"}
                          height={currentSize == 'base' ? '13' : "18"}
                          viewBox="0 0 17 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M15.5129 16.6387L12.0137 13.2129L15.5129 16.6387Z"
                            fill="black"
                          />
                          <path
                            d="M15.5129 16.6387L12.0137 13.2129"
                            stroke="#006A71"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M13.9003 8.745C13.9003 12.2326 11.0124 15.0598 7.45013 15.0598C3.88782 15.0598 1 12.2326 1 8.745C1 5.25742 3.88782 2.43018 7.45013 2.43018"
                            stroke="#006A71"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M11.1696 0.232422L11.61 2.01061C11.9087 3.21516 12.8889 4.15473 14.1454 4.44107L16.0003 4.86329L14.1454 5.28552C12.8889 5.57185 11.9087 6.51142 11.61 7.71597L11.1696 9.49416L10.7292 7.71597C10.4305 6.51142 9.45034 5.57185 8.1938 5.28552L6.33887 4.86329L8.1938 4.44107C9.45034 4.15473 10.4305 3.21516 10.7292 2.01061L11.1696 0.232422Z"
                            fill="#006A71"
                          />
                        </svg>
                      }
                      bgColor={"#0098751A"}
                      color={"#006A71"}
                      width={{ base: "50px", md: "auto" }}
                    >
                      معنایی
                    </Button>
                  </Box>
                )}
                {!searchActive && (
                  <Box
                    height={"fit-content"}
                    display={"flex"}
                    flexDir={"row"}
                    alignItems={"center"}
                    gap={"5px"}
                    bgColor={"#FFFFFF0D"}
                    borderRadius={"10px"}
                  >
                    <Button
                      w={{ base: "87px", md: "109px" }}
                      height={{ base: "32px", md: "40px" }}
                      color={"#006A71"}
                      borderRadius={{ base: "8px", md: "20px" }}
                      rightIcon={
                        <IoSearch fontSize={{ base: "10px", md: "25px" }} size={currentSize == 'base' ? '18px' : '25px'} />
                      }
                      fontSize={{ base: "12px", md: "14px" }}
                      onClick={(e) => setSearchActive(true)}
                      variant={"outline"}

                    >
                      جستجو
                    </Button>
                  </Box>
                )}
                <Tooltip
                  label="پاسخ معنایی با استفاده از هوش مصنوعی"
                  bgColor={"#D9D9D9"}
                  color={"#333333"}
                  sx={{
                    boxShadow: `
          0px 20px 45px 0px #00000033,
          0px 82px 82px 0px #0000002B,
          0px 184px 111px 0px #0000001A,
          0px 328px 131px 0px #00000008,
          0px 512px 143px 0px #00000000
        `,
                  }}
                  hasArrow
                >
                  <Button
                    bgColor={"#004F55"}
                    w={{ base: "80px", md: "179px" }}
                    height={{ base: "32px", md: "40px" }}
                    width={{ base: '150px' }}
                    fontSize={{ base: "12px", md: "14px" }}
                    fontWeight={"700"}
                    color={"white"}
                    borderRadius={{ base: '10px', md: "20px" }}
                    leftIcon={
                      currentSize != "base" ? (
                        <svg
                          width="13"
                          height="14"
                          viewBox="0 0 13 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.5 0L7.09264 2.68791C7.49455 4.5087 8.81335 5.92895 10.5041 6.36177L13 7L10.5041 7.63823C8.81335 8.07105 7.49455 9.4913 7.09264 11.3121L6.5 14L5.90736 11.3121C5.50545 9.4913 4.18665 8.07105 2.49591 7.63823L0 7L2.49591 6.36177C4.18665 5.92895 5.50545 4.5087 5.90736 2.68791L6.5 0Z"
                            fill="#29CCCC"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="12"
                          height="11"
                          viewBox="0 0 6 7"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2.89814 0.694336L3.15614 1.86452C3.33111 2.6572 3.90526 3.2755 4.64132 3.46393L5.72791 3.74179L4.64132 4.01964C3.90526 4.20807 3.33111 4.82638 3.15614 5.61906L2.89814 6.78924L2.64013 5.61906C2.46516 4.82638 1.89102 4.20807 1.15496 4.01964L0.0683594 3.74179L1.15496 3.46393C1.89102 3.2755 2.46516 2.6572 2.64013 1.86452L2.89814 0.694336Z"
                            fill="#29CCCC"
                          />
                        </svg>
                      )
                    }
                    rightIcon={
                      currentSize != "base" ? (
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M0.720694 7.78459L16.2645 0.12078C17.0776 -0.28007 18 0.365831 18 1.33614V5.32419C18 6.16725 17.4516 6.89296 16.6905 7.05663L11.0017 8.28076C10.2766 8.43656 10.2766 9.56335 11.0017 9.71937L16.6905 10.9435C17.4516 11.1072 18 11.8327 18 12.676L18 16.6638C18 17.6341 17.0776 18.2802 16.2645 17.8791L0.720694 10.2155C-0.240232 9.74163 -0.240232 8.25828 0.720694 7.78459Z"
                            fill="white"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 9 9"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M0.950104 4.21324L7.71712 0.8768C8.07107 0.70229 8.47266 0.983484 8.47266 1.40591V3.14211C8.47266 3.50913 8.2339 3.82507 7.90256 3.89633L5.42594 4.42925C5.11027 4.49708 5.11027 4.98763 5.42594 5.05555L7.90256 5.58848C8.2339 5.65973 8.47266 5.97557 8.47266 6.3427V8.0788C8.47266 8.50122 8.07107 8.78251 7.71712 8.60791L0.950104 5.27156C0.531765 5.06524 0.531765 4.41947 0.950104 4.21324"
                            fill="white"
                          />
                        </svg>
                      )
                    }
                    onClick={(e) => handleAiResponse()}
                  >
                    پاسخ هوش‌مصنوعی
                  </Button>
                </Tooltip>
              </HStack>
            </HStack>
          </VStack>

          {/* <Box
            display={{ base: 'none', md: 'flex' }}
            flexDir={'column'}
            w={{ base: "380px", md: "545px" }}
            h={{ base: "101px", md: "127px" }}
            borderRadius="13px"
            position="relative"
            bg="#FFFFFF12"
            backdropFilter="blur(5px)"
            padding={"15px"}
     
          >
            <Text
              color={"#76FFFF"}
              wordBreak="break-word"
              align={"justify"}
              mb={"5px"}
              fontSize={{ base: "6px", md: "10px" }}
              fontFamily={'doran'}
            >
              {hadith?.Masoum?.MasoumTitle}:
            </Text>
            <Text
              color={"#76FFFF"}
              wordBreak="break-word"
              align={"justify"}
              mb={"15px"}
              fontWeight={"700"}
              fontSize={{ base: "9px", md: "14px" }}
              fontFamily={'doran'}
            >
              {hadith?.Texts?.[0]?.HadithSimpleText}
            </Text>
            <Text
              color={"#76FFFF"}
              wordBreak="break-word"
              align={"justify"}
              fontWeight={"400"}
              fontSize={{ base: "7px", md: "12px" }}
              fontFamily={'doran'}
            >
              {hadith?.Texts?.[1]?.HadithSimpleText}
            </Text>
          </Box> */}
          <HStack
            as={Center}
            justifyContent="center"
            w="fit-content"
            mt={"20px"}
          >
            {siteData?.map((item, index) => (
              <React.Fragment key={index}>
                <VStack
                  position="relative"
                  bgColor="#82E5BE1A"
                  borderRadius={{ base: "9px", md: "24px" }}
                  spacing={0}
                  w={{ base: "88px", md: "132px" }}
                  h={{ base: "48px", md: "65px" }}
                  textAlign="center"
                  display={item?.size != breakpoint ? "flex" : "none"}
                  justifyContent="center"
                  p="5px"
                  backdropFilter="blur(4px)"
                  overflow="hidden"
                // _before={{
                //   content: '""',
                //   position: "absolute",
                //   inset: 0,
                //   borderRadius: "6px",
                //   padding: "0.7px", // stroke thickness
                //   background:
                //     "linear-gradient(180deg, rgba(255, 255, 255, 0.55) 0%, rgba(255, 255, 255, 0) 36.54%, rgba(255, 255, 255, 0) 72.12%, rgba(255, 255, 255, 0.33) 100%)",
                //   WebkitMask:
                //     "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                //   WebkitMaskComposite: "xor",
                //   maskComposite: "exclude",
                //   pointerEvents: "none",
                // }}
                >
                  <CountUp
                    start={0}
                    end={data?.[dataTranslate?.[item?.title]]}
                    duration={2.75}
                    decimals={0}
                    onEnd={() => console.log("Ended! 👏")}
                    onStart={() => console.log("Started! 💨")}
                  >
                    {({ countUpRef, start }) => {
                      // Automatically start count on mount
                      useEffect(() => {
                        start();
                      }, [start]);

                      return (
                        <Stack>
                          <Text
                            color="white"
                            fontWeight="300"
                            ref={countUpRef}
                            fontSize={{ base: "14px", md: "20px" }}
                          >
                            {item?.number}
                          </Text>
                        </Stack>
                      );
                    }}
                  </CountUp>
                  <Text
                    color="white"
                    fontWeight="200"
                    fontSize={{ base: "9px", md: "14px" }}
                  >
                    {t(item?.t_title)}
                  </Text>
                </VStack>

                {/* Only add divider if it's not the last item */}
              </React.Fragment>
            ))}
          </HStack>
        </VStack>
        <Box
          as={VStack}
          alignItems="center"
          role="group"
          cursor="pointer"
          position={"relative"}
          mb={"30px"}
          width={'100px'}
          bottom={"0px"}
          onClick={() => {
            const el = document.querySelector(".questions");
            if (el) {
              el.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          <Image
            src="./navigate2.png"
            transition="all 0.3s ease"
            height="7px"
            w={"2px"}
            _groupHover={{ height: "40px" }}
            position={"absolute"}
            bottom={"12px"}
          />
          <Image src="./navigate.png" w={"36px"} />
        </Box>
      </VStack>
    </Box>
  );
};

export default Header;
