import MainLayout from "@/components/mainLayout";
import { Avatar, Box, Grid, GridItem, HStack, Stack, Text, VStack } from "@chakra-ui/react";
import { GoPencil } from "react-icons/go";
import { IoCameraOutline } from "react-icons/io5";
import RightSidebar from "../rightSidebar";

const Index = () => {
  return (
    <MainLayout>
      <Box
        w="100%"
        alignItems={"center"}
        justifyContent={"center"}
        maxW="container.xl"
        mx="auto"
        p={{ base: '20px', md: "60px" }}
        my={"20px"}
        mt={'60px'}
      >
        <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(4, 1fr)" }} gap={'32px'} w={'100%'}>
          <GridItem colSpan={1} display={{ base: 'none', md: 'flex' }}>
            <RightSidebar />
          </GridItem>
          <GridItem as={Stack} gap={'20px'} colSpan={3} >
            <VStack padding={'20px'} >
              <Avatar width={'200px'} height={'200px'} />
              <HStack my={'20px'}>
                <IoCameraOutline color="#29CCCC" fontSize={'20px'} />
                <Text fontSize={'sm'}>تغییر تصویر پروفایل</Text>
              </HStack>
              <Box as={VStack} border={'1px'} borderColor={'gray.200'} borderRadius={'15px'} w={'100%'} padding={'20px'}>
                <HStack alignItems={'start'} w={'100%'} justifyContent={'space-between'}>
                  <Text fontWeight={'bold'}>درباره من</Text>
                  <GoPencil color="#29CCCC" />
                </HStack>
                <Text color={'gray'}>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی</Text>
              </Box>
              <Box as={VStack} border={'1px'} borderColor={'gray.200'} borderRadius={'15px'} w={'100%'} padding={'20px'} gap={'20px'}>
                <HStack alignItems={'start'} w={'100%'} justifyContent={'space-between'}>
                  <Text fontWeight={'bold'}>اطلاعات شخصی</Text>
                  <GoPencil color="#29CCCC" />
                </HStack>
                <HStack w={'100%'} justifyContent={'space-between'} alignItems={'start'} >
                  <VStack alignItems={'start'} w={'100%'}>
                    <Text color={'gray'} fontSize={'sm'}>نام</Text>
                    <Text>حسن</Text>
                  </VStack>
                  <VStack alignItems={'start'} w={'100%'}>
                    <Text color={'gray'} fontSize={'sm'}>نام خانوادگی</Text>
                    <Text>الماسی</Text>
                  </VStack>
                </HStack>
                <HStack w={'100%'} justifyContent={'space-between'} alignItems={'start'} >
                  <VStack alignItems={'start'} w={'100%'}>
                    <Text color={'gray'} fontSize={'sm'}>تاریخ تولد</Text>
                    <Text>۱۳۹۹/۴/۶</Text>
                  </VStack>
                  <VStack alignItems={'start'} w={'100%'}>
                    <Text color={'gray'} fontSize={'sm'}>زبان</Text>
                    <Text>فارسی</Text>
                  </VStack>
                </HStack>
                <HStack w={'100%'} justifyContent={'space-between'} alignItems={'start'} >
                  <VStack alignItems={'start'} w={'100%'}>
                    <Text color={'gray'} fontSize={'sm'}>جنسیت</Text>
                    <Text>مرد</Text>
                  </VStack>
                  <VStack alignItems={'start'} w={'100%'}>
                    <Text color={'gray'} fontSize={'sm'}>کشور</Text>
                    <Text>ایران</Text>
                  </VStack>
                </HStack>
              </Box>
              <Box as={VStack} border={'1px'} borderColor={'gray.200'} borderRadius={'15px'} w={'100%'} padding={'20px'} gap={'20px'}>
                <HStack alignItems={'start'} w={'100%'} justifyContent={'space-between'}>
                  <Text fontWeight={'bold'}>اطلاعات تماس</Text>
                  <GoPencil color="#29CCCC" />
                </HStack>
                <HStack w={'100%'} justifyContent={'space-between'} alignItems={'start'} >
                  <VStack alignItems={'start'} w={'100%'}>
                    <Text color={'gray'} fontSize={'sm'}>ایمیل</Text>
                    <Text>hasanalmasi@gmail.com</Text>
                  </VStack>
                  <VStack alignItems={'start'} w={'100%'}>
                    <Text color={'gray'} fontSize={'sm'}>موبایل</Text>
                    <Text>۰۹۱۲۷۵۸۲۷۰۴</Text>
                  </VStack>
                </HStack>
                <HStack w={'100%'} justifyContent={'space-between'} alignItems={'start'} >
                  <VStack alignItems={'start'} w={'100%'}>
                    <Text color={'gray'} fontSize={'sm'}>تلفن</Text>
                    <Text>۰۲۵۳۲۴۵۶۷۸</Text>
                  </VStack>
                  <VStack alignItems={'start'} w={'100%'}>
                    <Text color={'gray'} fontSize={'sm'}>وبسایت</Text>
                    <Text>hasanalmasi.ir</Text>
                  </VStack>
                </HStack>
              </Box>
            </VStack>
          </GridItem>
        </Grid>
      </Box>
    </MainLayout>
  )
}

export default Index
