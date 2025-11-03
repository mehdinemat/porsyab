import {
  Box,
  Text,
  useBreakpointValue,
  VStack
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";


const items = ['جامعه اسلامی', 'قرآن', 'جمهوری اسلامی', 'احادیث معتبر', 'روایات', 'جامعه اسلامی',]


const TextSlider = ({ height, borderRadius, width = "auto", source, setFilters, filters }) => {
  const slidesToShow = useBreakpointValue({ base: 1, md: 2, lg: 4 }); // responsive value

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow == 1 ? 3 : 4, // or 1 or 2
    slidesToScroll: 2,
    rtl: false, // for RTL support
    arrows: false
  };

  const router = useRouter();
  const { t } = useTranslation();

  return (
    <VStack
      maxWidth={"600px"}
      alignItems={"center"}
      justifyContent={'center'}
      height={'60px'}
      overflow={'hidden'}
    >
      <Box w="100%" alignItems={"center"} justifyContent={"center"} mx="auto">
        <Slider {...sliderSettings}>
          {source.map((item, index) => (
            <Box
              onClick={() => {
                const currentSources = filters.source || [];
                const clicked = item?.en_source_name;

                // ✅ Toggle logic: add if not included, remove if already included
                const newSources = currentSources.includes(clicked)
                  ? currentSources.filter((src) => src !== clicked)
                  : [...currentSources, clicked];

                setFilters({ ...filters, source: newSources });
              }}
              key={index}
              boxSizing="border-box"
              height={'41px'}
              px={'3px'}
            >
              <Box
                cursor={"pointer"}
                textAlign={"center"}
                h="100%"
                w={'100%'}
                key={index}
                direction="column"
                justifyContent="center"
                alignItems="center"
                bgColor={
                  filters.source?.includes(item?.en_source_name)
                    ? '#006A71'
                    : '#FFFFFF80'}
                display={'flex'}
                borderRadius={'10px'}
              >
                {item && (
                  <Text whiteSpace={'nowrap'} fontWeight="400" color={
                    filters.source?.includes(item?.en_source_name) ? 'white' :
                      '#006A71'
                  } fontSize={'17px'} align={'justify'} dir="rtl" lineHeight={'188%'} letterSpacing={'-0.5px'} textAlign={'center'} alignItems={'center'}>
                    {item?.fa_source_name?.length > 20 ? `${item?.fa_source_name?.slice(0, 16)}...` : item?.fa_source_name?.slice(0, 16)}
                  </Text>
                )}
              </Box>
            </Box>

          ))}
        </Slider>
      </Box>
    </VStack>
  );
};

export default TextSlider;
