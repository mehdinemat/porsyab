import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";



const SliderCom = ({ items, height, borderRadius, width = "auto", title }) => {

  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <IconButton
        aria-label="Next Slide"
        icon={<FaArrowAltCircleRight />}
        onClick={onClick}
        position="absolute"
        right="10px"
        top="50%"
        transform="translateY(-50%)"
        zIndex={2}
        variant="ghost"
        size="xl"
        color={'blue.200'}
        fontSize={'20px'}
      />
    );
  };

  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <IconButton
        aria-label="Previous Slide"
        icon={<FaArrowAltCircleLeft />}
        color={'blue.200'}
        onClick={onClick}
        position="absolute"
        left="10px"
        top="50%"
        transform="translateY(-50%)"
        zIndex={2}
        variant="ghost"
        size="xl"
        fontSize={'20px'}
      />
    );
  };


  const slidesToShow = useBreakpointValue({ base: 1, md: 2, lg: 4 }); // responsive value

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow == 1 ? 2 : 5, // or 1 or 2
    slidesToScroll: 1,
    rtl: false, // for RTL support
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const handlePublicFiqure = (item) => {
    window.open(`${item?.website}`, '_blank');
  };

  const router = useRouter();
  const { t } = useTranslation();

  return (
    <VStack
      w={"100%"}
      border={"1px"}
      borderColor={"gray.200"}
      borderRadius={"16px"}
      p={"40px"}
      alignItems={"start"}
      height={height}
      my={"20px"}
    >
      <HStack w={"100%"} justifyContent={"space-between"}>
        <Text fontWeight={"700"} fontSize={"22px"} fontFamily="morabba">
          {title}
        </Text>
        <Text
          fontWeight={"700"}
          fontSize={"16px"}
          color="blue.400"
          cursor={"pointer"}
          onClick={(e) => router.push("/references")}
        >
          {t("show_all")}
        </Text>
      </HStack>
      <Box w="100%" alignItems={"center"} justifyContent={"center"} mx="auto">
        <Slider {...sliderSettings}>
          {items.map((item, index) => (
            <Flex
              cursor={"pointer"}
              textAlign={"center"}
              w="100%"
              h="100%"
              key={index}
              p={"10px"}
              direction="column"
              justifyContent="space-between"
              alignItems="center"
              onClick={(e) => handlePublicFiqure(item)}
            >
              <Avatar
                w="128px"
                h="128px"
                borderRadius={borderRadius}
                src={item?.image}
              />
              {item.title && (
                <Text fontWeight="bold" my={"20px"}>
                  {item.title}
                </Text>
              )}
              {item.button && (
                <Button bgColor={"#29CCCC"}>{item.button}</Button>
              )}
            </Flex>
          ))}
        </Slider>
      </Box>
    </VStack>
  );
};

export default SliderCom;
