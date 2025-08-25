import GoodsCard from "@/components/dashboard/goods/goodsCard"
import MainLayout from "@/components/mainLayout"
import { Box, Button, Divider, Grid, GridItem, HStack, Stack, Text, VStack } from "@chakra-ui/react"
import { BiSortAlt2 } from "react-icons/bi"
import RightSidebar from "../rightSidebar"

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
        mt={{ base: '40px', md: '60px' }}
      >
        <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(4, 1fr)" }} gap={'32px'} w={'100%'}>
          <GridItem colSpan={1} display={{ base: 'none', md: 'flex' }}>
            <RightSidebar />
          </GridItem>
          <GridItem as={Stack} gap={'20px'} colSpan={3} >
            <Box p="6" colSpan={'2'}>
              <HStack w={"100%"}
                justifyContent={"space-between"}
                mb={"10px"}
                alignItems={'center'}>
                <Text fontSize={"14px"}>
                  ۲۵۸ سؤال
                </Text>
                <HStack>
                  <HStack justifyContent={{ base: 'start' }}>
                    <BiSortAlt2 color="gray" />
                    <Button variant={'ghost'} fontSize={'sm'} padding={{ base: '0px' }} display={{ base: 'none', md: 'flex' }}>مرتب سازی براساس:</Button>
                    <Button variant={'ghost'} fontSize={'sm'} padding={{ base: '0px' }} display={{ base: 'flex', md: 'none' }}>جدیدترین ها</Button>

                  </HStack>
                  <HStack display={{ base: 'none', md: 'flex' }}>
                    <Button colorScheme="gray" variant={'ghost'} _hover={{ bgColor: 'none' }} fontWeight={'normal'}>جدیدترین‌ها</Button>
                    <Button colorScheme="gray" variant={'ghost'} _hover={{ bgColor: 'none' }} fontWeight={'normal'}>پربازدیدترین‌ها</Button>
                    <Button colorScheme="gray" variant={'ghost'} _hover={{ bgColor: 'none' }} fontWeight={'normal'}>محبوبترین‌ها</Button>
                  </HStack>
                </HStack>
              </HStack>
              <Divider my={'20px'} />
              <VStack>
                <GoodsCard />
                <Divider />

                <GoodsCard />
                <Divider />

                <GoodsCard />
                <Divider />

                <GoodsCard />
                <Divider />

              </VStack>

            </Box>
          </GridItem>
        </Grid>
      </Box>
    </MainLayout>
  )
}

export default Index
