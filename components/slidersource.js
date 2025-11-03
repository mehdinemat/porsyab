import {
  Avatar,
  Box,
  Flex,
  HStack,
  Text,
  useBreakpointValue,
  VStack
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const SliderSource = ({ items, height, borderRadius, width = "auto", title }) => {
  const slidesToShow = useBreakpointValue({ base: 1, md: 2, lg: 4 }); // responsive value

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow == 1 ? 1 : 5, // or 1 or 2
    slidesToScroll: 2,
    rtl: false, // for RTL support

  };

  const handlePublicFiqure = (item) => {
    window.open(`http://www.${item?.link}`, '_blank')
    // router.push(`/questions/public_fiqure/${item?.id}/${item?.title}`);
  };

  const router = useRouter();
  const { t } = useTranslation();

  return (
    <HStack
      w={"100%"}
      borderRadius={"30px"}
      px={"40px"}
      alignItems={"center"}
      height={height}
      my={"20px"}
      position={'relative'}
      bgColor={'#F7F7F7'}
    >
      <HStack w={"100%"} justifyContent={"space-between"} >
        <Text fontWeight={"700"} fontSize={"22px"} fontFamily={'morabba'} color={'#006A71'} >
          {title}
        </Text>
        {/* <Text
              fontWeight={"700"}
              fontSize={"16px"}
              color="blue.400"
              cursor={"pointer"}
              onClick={(e) => router.push("/references")}
            >
              {t("show_all")}
            </Text> */}
      </HStack>
      <Box w="calc( 100% - 60px )" alignItems={"center"} justifyContent={"center"} mx="auto" mr={'20px'} sx={{

        ".slick-prev::before, .slick-next::before": {
          color: "#29cccc77",
          fontSize: "20px",
          opacity: 1,
        },
      }}>

        <Slider {...sliderSettings}>
          {console.log(items)}
          {items.map((item, index) => (
            <Flex
              cursor={"pointer"}
              textAlign={"center"}
              h="100%"
              key={index}
              p={"10px"}
              direction="row"
              justifyContent="space-between"
              alignItems="center"

              padding={'6px'}
              mx={'6px'}
              w={'50px'}
            >
              <HStack height={'100%'} bgColor={'white'} borderRadius={'10px'} padding={'4px'} boxShadow={`
      0px 0px 1px 0px #0000000D,
      0px 2px 2px 0px #0000000A,
      0px 4px 3px 0px #00000008,
      0px 8px 3px 0px #00000003,
      0px 12px 3px 0px #00000000
    `}>

                <VStack w={'100%'} alignItems={'end'}>
                  {item.title && (
                    <Text fontWeight="500" fontSize={'18px'} textAlign={'end'} onClick={(e) => handlePublicFiqure(item)}>
                      {item.title?.substring(0, 12)}
                    </Text>
                  )}
                  <Text fontWeight="300" fontSize={'15px'} color={'#999999'} >
                    {item.count}پرسش
                  </Text>
                </VStack>
                <Avatar
                  w="52px"
                  h="52px"
                  borderRadius={borderRadius}
                  src={item?.image}
                />
              </HStack>
            </Flex>
          ))}
        </Slider>
      </Box>
    </HStack>
  );
};

export default SliderSource;
