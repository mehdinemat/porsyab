import {
  Box,
  Divider,
  HStack,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";
import _ from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaQuestion } from "react-icons/fa";
import useSWR from "swr";

const menuList = [
  // { title: "پروفایل", icon: <IoPersonOutline />, link: "profile" },
  { title: "پرسش‌ها", icon: <FaQuestion />, link: "questions" },
  // { title: "پاسخ‌ها", icon: <BsReply />, link: "answers" },
  // { title: "نوشته‌ها", icon: <CiFileOn />, link: "writting" },
  // { title: "حسنات", icon: <GiGlobeRing />, link: "goods" },
  // { title: "دوستان", icon: <IoPeopleOutline />, link: "friends" },
  // { title: "حساب کاربری", icon: <IoSettingsOutline />, link: "account" },
];

const RightSidebar = () => {
  const { data: dataMe, isLoading: isLoadingMe } = useSWR(`user/client/me`);

  const [activePage, setActivePage] = useState("");

  const router = useRouter();

  useEffect(() => {
    setActivePage(router.asPath);
  }, [router]);

  const getLastPathSegment = (path) => {
    const segments = path.split("/").filter(Boolean);
    return _.last(segments);
  };
  const handleClickLink = (link) => {
    router.push(link);
  };

  return (
    <VStack
      w={"100%"}
      alignItems={"center"}
      border={"1px"}
      borderRadius={"15px"}
      borderColor={"gray.200"}
      padding={"20px"}
      pt={"80px"}
    >
      <Text fontWeight={"bold"} fontSize={"20px"}>
        {dataMe?.data?.[0]?.first_name || ""} {dataMe?.data?.[0]?.last_name || ""}
      </Text>
      <Text fontSize={"md"} color={"gray.500"}>
        {dataMe?.data?.[0]?.username}
      </Text>
      <Divider my={"20px"} />
      <VStack w={"100%"} alignItems={"start"} padding={"0px"}>
        {menuList?.map((item, index) => (
          <HStack
            position={"relative"}
            cursor={"pointer"}
            onClick={(e) => handleClickLink(item?.link)}
          >
            {
              <Box
                w={"2px"}
                height={"40px"}
                bgColor={
                  getLastPathSegment(activePage) == item?.link ? "#29CCCC" : ""
                }
                right={"-21px"}
                position={"absolute"}
              ></Box>
            }
            <IconButton
              icon={item?.icon}
              color={
                getLastPathSegment(activePage) == item?.link ? "#29CCCC" : ""
              }
              fontSize={"20px"}
            />
            <Text
              color={
                getLastPathSegment(activePage) == item?.link ? "#29CCCC" : ""
              }
            >
              {item?.title}
            </Text>
          </HStack>
        ))}
      </VStack>
    </VStack>
  );
};

export default RightSidebar;
