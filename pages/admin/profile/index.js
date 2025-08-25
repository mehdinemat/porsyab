import MainLayout from "@/components/mainLayout";
import { Badge, Box, Divider, Grid, GridItem, HStack, Image, Stack, Text, VStack } from "@chakra-ui/react";
import { BsReply } from "react-icons/bs";
import { CiFileOn } from "react-icons/ci";
import { FaQuestion } from "react-icons/fa";
import { GiGlobeRing } from "react-icons/gi";
import { IoPeopleOutline, IoPersonOutline, IoSettingsOutline } from "react-icons/io5";
import useSWR from "swr";
import RightSidebar from "../rightSidebar";


const menuList = [
  { title: 'پروفایل', icon: <IoPersonOutline /> },
  { title: 'پرسش‌ها', icon: <FaQuestion /> },
  { title: 'پاسخ‌ها', icon: <BsReply /> },
  // { title: 'نوشته‌ها', icon: <CiFileOn /> },
  { title: 'حسنات', icon: <GiGlobeRing /> },
  { title: 'دوستان', icon: <IoPeopleOutline /> },
  { title: 'حساب کاربری', icon: <IoSettingsOutline /> },
]

const Index = () => {

  const { data: dataMe, isLoading: isLoadingMe } = useSWR(`user/client/me`);

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
            <VStack w={'100%'} alignItems={'start'} border={'1px'} borderRadius={'15px'} borderColor={'gray.200'} padding={'20px'}>
              <Text fontWeight={'bold'}>درباره کاربر</Text>
              <Text>{dataMe?.data?.[0]?.bio}</Text>
            </VStack>
            <Stack direction={{ base: 'column', md: 'row' }} gap={{ base: '20px' }} w={'100%'}>
              <Box as={VStack} gap={'20px'} w={'100%'} border={'1px'} borderRadius={'15px'} borderColor={'gray.200'} padding={'20px'} py={'10px'} pb={'40px'} bgColor={'#3646B3'} color={'white'}>
                <HStack w={'100%'} justifyContent={'space-between'} color={'white'}>
                  <Text>آمار کاربر</Text>
                  <Text fontSize={'xs'}>اطلاعات بیشتر</Text>
                </HStack>
                <HStack w={'100%'} justifyContent={'space-between'} px={'20px'}>
                  <VStack>
                    <FaQuestion fontSize={'40px'} />
                    <Image src="../../dashboard/ellipse.png" w={'45px'} h={'auto'} />

                    <Text fontSize={'sm'}>۳۵ پرسش</Text>
                  </VStack>
                  <VStack>
                    <CiFileOn fontSize={'40px'} />
                    <Image src="../../dashboard/ellipse.png" w={'45px'} h={'auto'} />

                    <Text fontSize={'sm'}>۳۵ پرسش</Text>
                  </VStack>
                  <VStack>
                    <BsReply fontSize={'40px'} />
                    <Image src="../../dashboard/ellipse.png" w={'45px'} h={'auto'} />

                    <Text fontSize={'sm'}>۳۵ پرسش</Text>
                  </VStack>
                </HStack>
              </Box>
              <Box as={VStack} w={'100%'} gap={'20px'} border={'1px'} borderRadius={'15px'} borderColor={'gray.200'} padding={'20px'} py={'10px'} pb={'40px'} bgColor={'#29CCCC'} color={'white'}>
                <HStack w={'100%'} justifyContent={'space-between'}>
                  <Text>حسنات</Text>
                  <Text fontSize={'xs'}>مشاهده همه</Text>
                </HStack>
                <HStack w={'100%'} justifyContent={'space-between'} px={'20px'}>

                  <VStack>
                    <GiGlobeRing fontSize={'40px'} />
                    <Image src="../../dashboard/ellipse.png" w={'45px'} h={'auto'} />
                    <Text fontSize={'sm'}>۴ انگشتر عقیق</Text>
                  </VStack>
                  <VStack>
                    <Image src="../../dashboard/mohr.png" w={'45px'} h={'40px'} />
                    <Image src="../../dashboard/ellipse.png" w={'45px'} h={'auto'} />
                    <Text fontSize={'sm'}>۳۵ پرسش</Text>
                  </VStack>
                  <VStack>
                    <Image src="../../dashboard/tasbih.png" w={'45px'} h={'40px'} />
                    <Image src="../../dashboard/ellipse.png" w={'45px'} h={'auto'} />
                    <Text fontSize={'sm'}>۳۵ پرسش</Text>
                  </VStack>
                </HStack>
              </Box>
            </Stack>
            <VStack w={'100%'} alignItems={'start'} border={'1px'} borderRadius={'15px'} borderColor={'gray.200'} padding={'20px'}>
              <HStack w={'100%'} justifyContent={'space-between'}>
                <Text fontWeight={'bold'} mb={'10px'}>آخرین پرسش‌ها</Text>
                <Text fontSize={'xs'} color={'#29CCCC'}>مشاهده همه</Text>
              </HStack>
              <Stack direction={{ base: 'column', md: 'row' }} w={'100%'} justifyContent={'space-between'}>
                <Text>اگر نتوانیم آن را انجام دهیم، آیا می‌توان فطریه را به یک بدهکار ورشکسته داد؟</Text>
                <HStack>
                  <Text fontSize={'xs'} color={'gray'}> ۲۱ ساعت قبل</Text>
                  <Badge bgColor={'#29CCCC'} color={'white'} borderRadius={'5px'} p={'2px'}>۳ پاسخ</Badge>
                </HStack>
              </Stack>
              <Divider />
              <Stack direction={{ base: 'column', md: 'row' }} w={'100%'} justifyContent={'space-between'}>
                <Text>اگر نتوانیم آن را انجام دهیم، آیا می‌توان فطریه را به یک بدهکار ورشکسته داد؟</Text>
                <HStack>
                  <Text fontSize={'xs'} color={'gray'}> ۲۱ ساعت قبل</Text>
                  <Badge bgColor={'#29CCCC'} color={'white'} borderRadius={'5px'} p={'2px'}>۳ پاسخ</Badge>
                </HStack>
              </Stack>
              <Divider />
              <Stack direction={{ base: 'column', md: 'row' }} w={'100%'} justifyContent={'space-between'}>
                <Text>اگر نتوانیم آن را انجام دهیم، آیا می‌توان فطریه را به یک بدهکار ورشکسته داد؟</Text>
                <HStack>
                  <Text fontSize={'xs'} color={'gray'}> ۲۱ ساعت قبل</Text>
                  <Badge bgColor={'#29CCCC'} color={'white'} borderRadius={'5px'} p={'2px'}>۳ پاسخ</Badge>
                </HStack>
              </Stack>
              <Divider />
              <Stack direction={{ base: 'column', md: 'row' }} w={'100%'} justifyContent={'space-between'}>
                <Text>اگر نتوانیم آن را انجام دهیم، آیا می‌توان فطریه را به یک بدهکار ورشکسته داد؟</Text>
                <HStack>
                  <Text fontSize={'xs'} color={'gray'}> ۲۱ ساعت قبل</Text>
                  <Badge bgColor={'#29CCCC'} color={'white'} borderRadius={'5px'} p={'2px'}>۳ پاسخ</Badge>
                </HStack>
              </Stack>
              <Divider />
              <Stack direction={{ base: 'column', md: 'row' }} w={'100%'} justifyContent={'space-between'}>
                <Text>اگر نتوانیم آن را انجام دهیم، آیا می‌توان فطریه را به یک بدهکار ورشکسته داد؟</Text>
                <HStack w={'100%'} >
                  <Text fontSize={'xs'} color={'gray'}> ۲۱ ساعت قبل</Text>
                  <Badge bgColor={'#29CCCC'} color={'white'} borderRadius={'5px'} p={'2px'}>۳ پاسخ</Badge>
                </HStack>
              </Stack>
              <Divider />
            </VStack>
            <VStack w={'100%'} alignItems={'start'} border={'1px'} borderRadius={'15px'} borderColor={'gray.200'} padding={'20px'}>
              <HStack w={'100%'} justifyContent={'space-between'}>
                <Text fontWeight={'bold'} mb={'10px'}>آخرین پاسخ ها</Text>
                <Text fontSize={'xs'} color={'#29CCCC'}>مشاهده همه</Text>
              </HStack>
              <Stack direction={{ base: 'column', md: 'row' }} w={'100%'} justifyContent={'space-between'}>
                <Text>اگر نتوانیم آن را انجام دهیم، آیا می‌توان فطریه را به یک بدهکار ورشکسته داد؟</Text>
                <HStack>
                  <Text fontSize={'xs'} color={'gray'}> ۲۱ ساعت قبل</Text>
                  <Badge bgColor={'#29CCCC'} color={'white'} borderRadius={'5px'} p={'2px'}>۳ پاسخ</Badge>
                </HStack>
              </Stack>
              <Divider />
              <Stack direction={{ base: 'column', md: 'row' }} w={'100%'} justifyContent={'space-between'}>
                <Text>اگر نتوانیم آن را انجام دهیم، آیا می‌توان فطریه را به یک بدهکار ورشکسته داد؟</Text>
                <HStack>
                  <Text fontSize={'xs'} color={'gray'}> ۲۱ ساعت قبل</Text>
                  <Badge bgColor={'#29CCCC'} color={'white'} borderRadius={'5px'} p={'2px'}>۳ پاسخ</Badge>
                </HStack>
              </Stack>
              <Divider />
              <Stack direction={{ base: 'column', md: 'row' }} w={'100%'} justifyContent={'space-between'}>
                <Text>اگر نتوانیم آن را انجام دهیم، آیا می‌توان فطریه را به یک بدهکار ورشکسته داد؟</Text>
                <HStack>
                  <Text fontSize={'xs'} color={'gray'}> ۲۱ ساعت قبل</Text>
                  <Badge bgColor={'#29CCCC'} color={'white'} borderRadius={'5px'} p={'2px'}>۳ پاسخ</Badge>
                </HStack>
              </Stack>
              <Divider />
              <Stack direction={{ base: 'column', md: 'row' }} w={'100%'} justifyContent={'space-between'}>
                <Text>اگر نتوانیم آن را انجام دهیم، آیا می‌توان فطریه را به یک بدهکار ورشکسته داد؟</Text>
                <HStack>
                  <Text fontSize={'xs'} color={'gray'}> ۲۱ ساعت قبل</Text>
                  <Badge bgColor={'#29CCCC'} color={'white'} borderRadius={'5px'} p={'2px'}>۳ پاسخ</Badge>
                </HStack>
              </Stack>
              <Divider />
              <Stack direction={{ base: 'column', md: 'row' }} w={'100%'} justifyContent={'space-between'}>
                <Text>اگر نتوانیم آن را انجام دهیم، آیا می‌توان فطریه را به یک بدهکار ورشکسته داد؟</Text>
                <HStack>
                  <Text fontSize={'xs'} color={'gray'}> ۲۱ ساعت قبل</Text>
                  <Badge bgColor={'#29CCCC'} color={'white'} borderRadius={'5px'} p={'2px'}>۳ پاسخ</Badge>
                </HStack>
              </Stack>
              <Divider />
            </VStack>
          </GridItem>
        </Grid>

      </Box>
    </MainLayout>
  )
}

export default Index
