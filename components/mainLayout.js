import {
  Avatar,
  Box,
  Button,
  Collapse,
  Container,
  Divider,
  Fade,
  Flex,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  ListItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Stack,
  Text,
  UnorderedList,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import _ from "lodash";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaTelegram } from "react-icons/fa";
import { GiDiamondRing } from "react-icons/gi";
import {
  IoIosArrowDown,
  IoIosNotificationsOutline,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoLogoTwitter,
  IoLogoYoutube,
} from "react-icons/io";
import { IoCall, IoExitOutline, IoLocation, IoSearch } from "react-icons/io5";
import { PiDiamondThin } from "react-icons/pi";
import useSWR from "swr";
import { StringParam, useQueryParams, withDefault } from "use-query-params";
import AdminMenuBar from "./admin_dashboard/adminMenuBar";
import UserMenuBar from "./mobile/dashboard/userMenuBar";
import MenuBar from "./mobile/menuBar";

const menuList = [
  // {
  //   title: "برچسب ها",
  //   t_title: "header_tags",
  // },
  {
    title: "کاربران",
    link: "users",
    t_title: "header_users",
  },
  {
    title: "محصولات",
    link: "products",
    t_title: "header_products",
  },
];

const MainLayout = ({ children }) => {
  const { t } = useTranslation();

  const router = useRouter();
  const { locale, asPath } = router;

  const [filters, setFilters] = useQueryParams({
    search: withDefault(StringParam, ""),
  });

  const [search, setSearch] = useState("");

  const [hideHeaderButton, setHideHeaderButton] = useState(false);
  const scrollContainerRef = useRef(null);

  const [activePath, setActivePath] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showInput, setShowInput] = useState(false);
  const [isUserLogin, setIsUserLogin] = useState(false);
  const inputRef = useRef(null);

  const { data: dataMe, isLoading: isLoadingMe } = useSWR(
    isUserLogin && `user/client/me`
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const sidebar = document.getElementById("rightSidebar");
    const sidebarOffsetTop = sidebar?.offsetTop;

    if (scrollTop >= sidebarOffsetTop) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  const handleClickSearch = () => {
    router.push(`/result_search?search=${search}&search_type=search`);
  };
  const handleClickSemanticSearch = () => {
    router.push(`/result_search?search=${search}&search_type=semantic_search`);
  };

  const handleToggle = () => {
    setShowInput((prev) => !prev);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 300); // Give time for animation
  };

  const handleClickMenuLink = (link) => {
    router.push(`/${link}`);
  };

  const handleClickHome = () => {
    router.push("/");
  };

  useEffect(() => {
    setActivePath(
      _.includes(router.asPath.toLowerCase(), "admin_dashboard")
        ? 2
        : _.includes(router.asPath.toLowerCase(), "dashboard")
          ? 1
          : 0
    );
  }, [router]);

  useEffect(() => {
    setIsUserLogin(!!localStorage.getItem("token"));
  }, []);

  const handleLoginButton = () => {
    router.push("/login");
  };

  const handleFooterLink = (link) => {
    router.push(link);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollY = container.scrollTop;
      setHideHeaderButton(scrollY >= 350); // you can use scrollY >= 500 to toggle button
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const handleExit = () => {
    localStorage.removeItem("token");
    window.open("/", "_self");
  };

  useEffect(() => {
    setSearch(filters?.search);
  }, [filters?.search]);

  const handleProfileLink = () => {
    router.push('/admin/questions')
  };

  return (
    <VStack minHeight="100vh" w={"100%"} alignItems={"start"} gap={0}>
      {/* header */}
      <Box
        as={Stack}
        position="fixed" // 👈 Make it fixed
        top={0}
        left={0}
        zIndex={999} // 👈 Ensure it stays on top
        width="100%"
        height={{ base: "60px", md: "100px" }}
        alignItems={"center"}
        justifyContent={"center"}
        bg="white"
        p={2}
        px={{ base: 0, mode: 4 }}
        borderBottom="1px"
        borderBottomColor="gray.200"
      >
        <HStack
          as={Container}
          maxW="container.xl"
          w={"100%"}
          alignItems={"center"}
          pr={{ base: 0, md: "14px" }}
          justifyContent={"space-between"}
        >
          <HStack
            w={"100%"}
            alignItems={"center"}
            height={"100%"}
            justifyContent={"space-between"}
          >
            <HStack ml={"20px"} w={"100%"}>
              {activePath == 0 ? (
                <MenuBar />
              ) : activePath == 1 ? (
                <UserMenuBar />
              ) : (
                <AdminMenuBar />
              )}
              <Image
                src="/porsyab_header.png"
                width={{ base: "42px", md: "40px" }}
                height={{ base: "23px", md: "36px" }}
                onClick={handleClickHome}
                cursor={"pointer"}
              />
              <Image
                src="/porsyab_footer.png"
                width={{ base: "50px", md: "40px" }}
                height={{ base: "35px", md: "36px" }}
                onClick={handleClickHome}
                cursor={"pointer"}
              />
              {(hideHeaderButton || !(asPath == "/")) && (
                <InputGroup
                  width={"327px"}
                  display={{ base: "none", md: "block" }}
                >
                  <Input
                    height={"46px"}
                    value={search}
                    placeholder={t("search")}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleClickSearch();
                      }
                    }}
                  />
                  <InputRightElement h="100%" ml="20px">
                    <Flex align="center" gap="2">
                      <IoSearch
                        fontSize="20px"
                        style={{ marginTop: "2px" }}
                        color="#29CCCC"
                        onClick={handleClickSearch}
                        cursor={"pointer"}
                      />
                      <PiDiamondThin
                        fontSize="20px"
                        style={{ marginTop: "2px" }}
                        color="#29CCCC"
                        onClick={handleClickSemanticSearch}
                        cursor={"pointer"}
                      />
                    </Flex>
                  </InputRightElement>
                </InputGroup>
              )}
            </HStack>
            <HStack
              w={"100%"}
              justifyContent={"end"}
              alignItems={"end"}
              display={{ base: "flex", md: "none" }}
            >
              <Fade in={!showInput}>
                {!showInput && (
                  <IconButton
                    icon={<IoSearch color="#29CCCC" />}
                    aria-label="Search"
                    fontSize="20px"
                    variant="ghost"
                    onClick={handleToggle}
                    transition="all 0.3s ease"
                  />
                )}
              </Fade>

              <Collapse in={showInput} animateOpacity style={{ marginLeft: 8 }}>
                <InputGroup size="md" w="150px">
                  <Input
                    ref={inputRef}
                    placeholder={t("search")}
                    variant="filled"
                    bg="white"
                    borderRadius="md"
                    onBlur={() => setShowInput(false)} // Optional: hide on blur
                  />
                  <InputRightElement>
                    <IoSearch color="gray.500" />
                  </InputRightElement>
                </InputGroup>
              </Collapse>
              <IconButton
                icon={<IoExitOutline color="#29CCCC" />}
                aria-label="Search"
                fontSize="20px"
                variant="ghost"
              />
            </HStack>
          </HStack>
          <HStack spacing={4} display={{ base: "none", md: "flex" }}>
            {menuList?.map((item) => (
              <Text
                _hover={{ bgColor: "gray.100" }}
                borderRadius={"5px"}
                padding={"5px"}
                textAlign={"center"}
                fontSize={"sm"}
                w={"70px"}
                onClick={(e) => handleClickMenuLink(item?.link)}
                cursor={"pointer"}
              >
                {t(item?.t_title)}
              </Text>
            ))}
            <Menu>
              <MenuButton px={4} py={2} transition="all 0.2s">
                <HStack>
                  <Text fontSize={"sm"}>
                    {locale == "en"
                      ? t("header_english")
                      : locale == "fa"
                        ? t("header_persian")
                        : locale == "ar" && t("header_arabic")}
                  </Text>
                  <IoIosArrowDown />
                </HStack>
              </MenuButton>
              <MenuList>
                <MenuItem
                  value={"en"}
                  onClick={(e) => router.push("/", "/", { locale: "en" })}
                >
                  {t("header_english")}
                </MenuItem>
                <MenuItem
                  value={"ar"}
                  onClick={(e) => router.push("/", "/", { locale: "ar" })}
                >
                  {t("header_arabic")}
                </MenuItem>
                <MenuItem
                  value={"fa"}
                  onClick={(e) => router.push("/", "/", { locale: "fa" })}
                >
                  {t("header_persian")}
                </MenuItem>
              </MenuList>
            </Menu>
            {!isUserLogin && (
              <Button
                w={"180px"}
                bgColor={"#29CCCC"}
                fontWeight={"normal"}
                onClick={handleLoginButton}
              >
                {t("log_sub")}
              </Button>
            )}
            {isUserLogin && (
              <HStack>
                <IoIosNotificationsOutline fontSize={"20px"} color="#29CCCC" />
                <GiDiamondRing fontSize={"20px"} color="#29CCCC" />

                <Menu>
                  <MenuButton px={4} py={2} transition="all 0.2s">
                    <HStack>
                      <Avatar size={"sm"} />
                    </HStack>
                  </MenuButton>
                  <MenuList>
                    <MenuItem
                      fontWeight={"bold"}
                      cursor={"pointer"}
                      onClick={(e) => handleProfileLink()}
                    >
                      {" "}
                      پنل ادمین
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={(e) => handleExit()}>خروج</MenuItem>
                  </MenuList>
                </Menu>
              </HStack>
            )}
          </HStack>
        </HStack>
      </Box>
      {/* header */}
      <HStack
        height={"calc( 100vh )"}
        w={"100%"}
        gap={0}
        alignItems={"start"}
        overflowY={"scroll"}
        ref={scrollContainerRef}
      >
        {/* Main content area */}
        <VStack height={"calc( 100vh - 76px )"} w={"100%"} gap={0}>
          {children}
          <Stack w={"100%"} bg="#F7F7F7" alignItems={"center"}>
            <Box
              maxW="container.xl"
              as="footer"
              textAlign="center"
              bg="#F7F7F7"
              w="100%"
              alignItems={"center"}
              justifyContent={"center"}
              mx="auto"
              p={"20px"}
            >
              <Stack
                direction={{ base: "column", md: "row" }}
                height={"100%"}
                alignItems={"start"}
                justifyContent={"space-between"}
                gap={"40px"}
              >
                <VStack
                  alignItems={"center"}
                  gap={"10px"}
                  height={"100%"}
                  w={"100%"}
                >
                  <Image
                    src="/porsyab_header.png"
                    width={"51px"}
                    height={"52px"}
                  />
                  <Image
                    src="/porsyab_footer.png"
                    width={"70px"}
                    height={"50px"}
                  />
                  <Text w={"326px"} fontSize={"16px"} textAlign={"justify"}>
                    {t("footer_parsa_info")}
                  </Text>
                </VStack>
                <VStack
                  alignItems={"start"}
                  gap={"20px"}
                  height={"100%"}
                  w={"100%"}
                >
                  <Text color={"#3646B3"} fontSize={"20px"} fontWeight={"bold"}>
                    {t("parsa")}
                  </Text>
                  <UnorderedList
                    textAlign={"start"}
                    spacing={"10px"}
                    sx={{
                      li: {
                        color: "black", // text color
                        "::marker": {
                          color: "#29CCCC", // 🔵 your custom bullet color
                        },
                      },
                    }}
                  >
                    <ListItem onClick={e => router.push('/')} cursor={'pointer'}>{t("home")}</ListItem>
                    {/* <ListItem>{t("questions")}</ListItem>
                    <ListItem>{t("tags")}</ListItem> */}
                    {/* <ListItem>{t("users")}</ListItem> */}
                    <ListItem
                      cursor={"pointer"}
                      onClick={(e) => handleFooterLink("/aboutus")}
                    >
                      {t("about_us")}
                    </ListItem>
                    {/* <ListItem>{t("terms_of_use")}</ListItem> */}
                  </UnorderedList>
                </VStack>
                <VStack
                  w={"100%"}
                  alignItems={"start"}
                  gap={"20px"}
                  height={"100%"}
                >
                  <Text color={"#3646B3"} fontSize={"20px"} fontWeight={"bold"}>
                    {t("products")}
                  </Text>
                  <UnorderedList
                    textAlign={"start"}
                    spacing={"10px"}
                    sx={{
                      li: {
                        color: "black", // text color
                        "::marker": {
                          color: "#29CCCC", // 🔵 your custom bullet color
                        },
                      },
                    }}
                  >
                    <ListItem>{t("intelligent_question")}</ListItem>
                    <ListItem>{t("similar_question")}</ListItem>
                    <ListItem>{t("spelling_correction")}</ListItem>
                    <ListItem>{t("question_recommendation")}</ListItem>
                    <ListItem>{t("keyword_extraction")}</ListItem>
                    <ListItem>{t("question_text_summarization")}</ListItem>
                    <ListItem>{t("question_text_classification")}</ListItem>
                    <ListItem>{t("open_domain_question")}</ListItem>
                  </UnorderedList>
                </VStack>
                <VStack
                  alignItems={"start"}
                  gap={"20px"}
                  height={"100%"}
                  w={"100%"}
                >
                  <Text color={"#3646B3"} fontSize={"20px"} fontWeight={"bold"}>
                    {t("contact_us")}
                  </Text>
                  <HStack w={"100%"} alignItems={"start"} textAlign={"start"}>
                    <IconButton
                      icon={<IoLocation color="#29CCCC" fontSize={"20px"} />}
                    />
                    <Text width={"auto"}>{t("address")}</Text>
                  </HStack>
                  <HStack>
                    <IconButton
                      icon={<IoCall color="#29CCCC" fontSize={"20px"} />}
                    />
                    <Text>09127468103</Text>
                  </HStack>
                  <VStack alignItems={"start"}>
                    <Text
                      color={"#3646B3"}
                      fontSize={"20px"}
                      fontWeight={"bold"}
                    >
                      {t("social_media")}
                    </Text>
                    <HStack>
                      <IconButton
                        icon={
                          <IoLogoTwitter color="#29CCCC" fontSize={"20px"} />
                        }
                      />
                      <IconButton
                        icon={
                          <IoLogoInstagram color="#29CCCC" fontSize={"20px"} />
                        }
                      />
                      <IconButton
                        icon={<FaTelegram color="#29CCCC" fontSize={"20px"} />}
                      />
                      <IconButton
                        icon={
                          <IoLogoYoutube color="#29CCCC" fontSize={"20px"} />
                        }
                      />
                      <IconButton
                        icon={
                          <IoLogoLinkedin color="#29CCCC" fontSize={"20px"} />
                        }
                      />
                    </HStack>
                  </VStack>
                </VStack>
              </Stack>
            </Box>
          </Stack>

          <Box
            as="footer"
            bg="gray.200"
            color={"white"}
            p={4}
            textAlign="center"
            w={"100%"}
            bgColor={"#006b74"}
          >
            تمامی حقوق این وبسایت متعلق به موسسه هوش مصنوعی و تمدن اسلامی (همتا)
            است.
          </Box>
        </VStack>
      </HStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Grid templateColumns="repeat(2, 1fr)" gap={"2px"} w={"100%"}>
              <GridItem>
                <VStack>
                  <Text>جستجوی پیشرفته</Text>
                  <Text>نتایج دقیق‌تر و مرتبط‌تر با جستجوی پیشرفته</Text>
                </VStack>
              </GridItem>
              <GridItem></GridItem>
            </Grid>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default MainLayout;
