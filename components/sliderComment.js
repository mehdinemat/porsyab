import {
  Avatar,
  Box,
  Divider,
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


const items = [
]

const SliderCommnet = ({ height, borderRadius, width = "auto" }) => {
  const slidesToShow = useBreakpointValue({ base: 1, md: 2, lg: 4 }); // responsive value

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow == 1 ? 2 : 2, // or 1 or 2
    slidesToScroll: 1,
    rtl: false, // for RTL support
  };

  const router = useRouter();
  const { t } = useTranslation();

  return (
    <VStack
      w={"100%"}
      alignItems={"start"}
    >
      <HStack w={"100%"} justifyContent={"space-between"}>

      </HStack>
      <Box w="100%" alignItems={"center"} justifyContent={"center"} mx="auto">
        <Slider {...sliderSettings}>
          {items.map((item, index) => (
            <Box
              key={index}
              px="25px" // Half of 20px gap on each side = 10px
              pb={'25px'}
              boxSizing="border-box"
            >
              <Box
                boxShadow="0px 10px 18.3px 0px #0000001C"
                borderRadius={'15px'}
                cursor={"pointer"}
                textAlign={"center"}
                w="327px"
                h="100%"
                key={index}
                p={"14px"}
                direction="column"
                justifyContent="space-between"
                alignItems="center"
                bgColor={'white'}

              >
                {item && (
                  <Text fontWeight="bold" fontSize={'13px'} align={'justify'} dir="rtl" lineHeight={'188%'} letterSpacing={'-0.5px'}>
                    {item}
                  </Text>
                )}
                <Divider my={'10px'} />
                <HStack dir="rtl" w={'100%'} justifyContent={'space-between'}>
                  <HStack>
                    <Avatar h={'33px'} w={'33px'} />
                    <Text fontWeight={'bold'} fontSize={'15px'} >محمد محمدی</Text>
                  </HStack>
                  <Text>1404/01/27</Text>
                </HStack>
              </Box>
            </Box>

          ))}
        </Slider>
      </Box>
    </VStack>
  );
};

export default SliderCommnet;
