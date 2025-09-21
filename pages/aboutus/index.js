import AboutUsCard from "@/components/aboutus/aboutUsCard";
import Header from "@/components/aboutus/header";
import MainLayout from "@/components/mainLayout";
import {
  Box,
  Grid,
  HStack,
  Image,
  Stack,
  Text,
  VStack
} from "@chakra-ui/react";

const items = [
  {
    image: "/img1.jpg",
    title: "آیت الله محمدتقی بهجت فومنی",
    button: "اطلاعات بیشتر",
  },
  {
    image: "/img2.jpg",
    title: "آیت الله جعفر سبحانی خیابانی تبریزی",
    button: "اطلاعات بیشتر",
  },
  {
    image: "/img3.jpg",
    title: "آیت الله سید عبدالکریم موسوی اردبیلی",
    button: "اطلاعات بیشتر",
  },
];

const Index = () => {
  return (
    <MainLayout>
      <Header />
      <Box
        w="100%"
        alignItems={"center"}
        justifyContent={"center"}
        maxW="container.xl"
        mx="auto"
        pt={{ base: '20px', md: "60px" }}
        my={"20px"}
      >
        <HStack dir="rtl" w={"100%"} justifyContent={"space-between"}>
          <Stack w={"100%"} display={{ base: 'none', md: 'flex' }}>
            <Image src="../../aboutusicon.png" w={"519px"} h={"713px"} />
          </Stack>
          <VStack w={"100%"} alignItems={{ base: 'center', md: "start" }}>
            {/* <Image src="/parsaxl.png" w={{ base: '250px', md: '350px' }} h={{ base: '90px', md: '143px' }} /> */}

            <Text w={"400px"} fontSize={"16px"} textAlign={"start"}>
              {/* بسیاری از مردم جامعه، در زندگی روزمره خود با مسائل دینی مختلفی مواجه می‌شوند که دریافت پاسخ این پرسشها گاها برای آنها ناممکن و یا زمان بر است. از این رو در سالهای گذشته، سامانه‌های برخط متعددی آماده شده است که از طرفی روند پرسش سوال را بصورت الکترونیکی در اختیار مردم قرارداده و از طرف دیگر، امکان پاسخگویی متمرکز را برای دفاتر مراجع و مراکز پاسخ گویی، فراهم نموده است. اما این سامانه‌ها با مشکلات متعددی دست و پنجه نرم می‌کنند که تاثیر بسیار بدی در خدمات آنها گذاشته است. نبود موتور جستجوی معنایی پرسش و پاسخ سیستم هوشمند پاسخگویی به سوالات چالش سوالات تکراری چالش تگ‌گذاری انبوه سوالات چالش غلط های نگارشی و املایی کاربران و حتی افراد خبره پاسخ گو سوالات نامناسب و مناسب حال کاربران ... */}
            </Text>
          </VStack>

        </HStack>
        <VStack w={'100%'} alignItems={'center'} my={'40px'}>
          <Text fontWeight={'bold'} fontSize={'20px'}>ویژگی‌های پرس‌یاب</Text>
          <Text>گروه پرس‌یاب در اين زمينه تلاش هايی به عمل آورده است که از جمله آن به موارد زیر  می‌توان اشاره نمود.</Text>
        </VStack>
        <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(4, 1fr)" }} gap={"20px"} w={"100%"}>
          <VStack>
            <Box w={'100px'} h={'100px'}>
              <svg class="w-36 mx-auto" viewBox="0 0 159 149" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="88.6592" y="115.549" width="53.2068" height="53.2068" rx="12.0315" transform="rotate(-45 88.6592 115.549)" fill="#3646B3"></rect><rect y="0.697266" width="34.2705" height="34.2705" rx="17.1353" fill="#29CCCC"></rect><path d="M22.5 93.7362C22.5 89.4636 25.9672 86 30.2442 86H117.756C122.033 86 125.5 89.4636 125.5 93.7362V115.264C125.5 119.536 122.033 123 117.756 123H30.2442C25.9672 123 22.5 119.536 22.5 115.264V93.7362Z" stroke="#29CCCC" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path><path d="M88.6592 97.9922L34.2705 97.9922" stroke="#29CCCC" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path><path d="M88.6592 110.109L47.5602 110.109" stroke="#29CCCC" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path><ellipse cx="105.668" cy="115.13" rx="1.93901" ry="1.93701" fill="#29CCCC"></ellipse><path d="M98.8807 102.471V98.8609C98.8807 95.9552 101.239 93.5996 104.147 93.5996H110.078C113.442 93.5996 116.168 96.3232 116.168 99.6828C116.168 103.042 113.442 105.766 110.078 105.766H107.737C106.574 105.766 105.63 106.708 105.63 107.871V110.11" stroke="#29CCCC" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path><path d="M22.5 46.7362C22.5 42.4636 25.9672 39 30.2442 39H117.756C122.033 39 125.5 42.4636 125.5 46.7362V68.2638C125.5 72.5364 122.033 76 117.756 76H30.2442C25.9672 76 22.5 72.5364 22.5 68.2638V46.7362Z" stroke="#29CCCC" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path><path d="M88.6592 50.9922L34.2705 50.9922" stroke="#29CCCC" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path><path d="M88.6592 63.1094L47.5602 63.1094" stroke="#29CCCC" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path><ellipse cx="105.668" cy="68.1304" rx="1.93901" ry="1.93701" fill="#29CCCC"></ellipse><path d="M98.8807 55.4709V51.8609C98.8807 48.9552 101.239 46.5996 104.147 46.5996H110.078C113.442 46.5996 116.168 49.3232 116.168 52.6828C116.168 56.0425 113.442 58.766 110.078 58.766H107.737C106.574 58.766 105.63 59.7083 105.63 60.8706V63.1097" stroke="#29CCCC" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            </Box>
            <Text>یافتن سوالات مشابه، مرتبط و تکراری</Text>
          </VStack>
          <VStack>
            <Box w={'100px'} h={'100px'}>
              <svg class="w-36 mx-auto" viewBox="0 0 124 129" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="-4.31738" y="95.9922" width="53.2068" height="53.2068" rx="12.0315" transform="rotate(-45 -4.31738 95.9922)" fill="#3646B3"></rect><rect x="88.6077" y="0.402344" width="34.2705" height="34.2705" rx="17.1353" fill="#29CCCC"></rect><path d="M122.102 96.3536H33.3057M87.4284 119.469V107.912H67.9795V119.469M92.4387 119.469H62.4825M39.1011 107.912H116.307C119.508 107.912 122.102 105.317 122.102 102.116V51.7613C122.102 48.5605 119.508 45.9658 116.307 45.9658H39.1011C35.9004 45.9658 33.3057 48.5605 33.3057 51.7613V102.116C33.3057 105.317 35.9004 107.912 39.1011 107.912Z" stroke="#29CCCC" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path><path d="M92.2414 45.1031C94.5394 47.4012 96.1798 50.108 97.1623 52.9895C99.6124 60.1752 97.9721 68.4474 92.2414 74.1781C84.2125 82.2069 71.1952 82.2069 63.1664 74.1781C57.4356 68.4474 55.7953 60.1752 58.2455 52.9895C59.228 50.108 60.8683 47.4012 63.1664 45.1031C71.1952 37.0743 84.2125 37.0743 92.2414 45.1031Z" fill="white"></path><path d="M92.8659 74.8029L108.341 90.2775M92.2414 45.1031C84.2125 37.0743 71.1952 37.0743 63.1664 45.1031C60.8683 47.4012 59.228 50.108 58.2455 52.9895C55.7953 60.1752 57.4356 68.4474 63.1664 74.1781C71.1952 82.2069 84.2125 82.2069 92.2414 74.1781C97.9721 68.4474 99.6124 60.1752 97.1623 52.9895C96.1798 50.108 94.5394 47.4012 92.2414 45.1031Z" stroke="#29CCCC" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            </Box>
            <Text>موتور جستجوی سوالات از تمامی پایگاه‌های پرسش و پاسخ اسلامی</Text>
          </VStack>
          <VStack>
            <Box w={'100px'} h={'100px'}>
              <svg class="w-36 mx-auto" viewBox="0 0 135 107" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="-4.40283" y="33.4482" width="53.2068" height="53.2068" rx="12.0315" transform="rotate(-45 -4.40283 33.4482)" fill="#3646B3"></rect><rect x="100.724" y="66.7178" width="34.2705" height="34.2705" rx="17.1353" fill="#29CCCC"></rect><path fill-rule="evenodd" clip-rule="evenodd" d="M97.7504 63.0591L59.2082 101.6C55.2432 105.565 48.8148 105.564 44.8499 101.6L17.7554 74.5049C13.7904 70.5399 13.7905 64.1113 17.7556 60.1464L56.2572 21.6464C58.2007 19.703 60.849 18.6306 63.5971 18.6741L90.2732 19.0967C95.7492 19.1835 100.169 23.5976 100.264 29.0734L100.723 55.7048C100.77 58.4579 99.6975 61.1122 97.7504 63.0591ZM81.9695 44.5598C86.1167 44.5598 89.4788 41.1978 89.4788 37.0505C89.4788 32.9032 86.1167 29.5412 81.9695 29.5412C77.8222 29.5412 74.4602 32.9032 74.4602 37.0505C74.4602 41.1978 77.8222 44.5598 81.9695 44.5598Z" stroke="#29CCCC" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            </Box>
            <Text>تگ‌گذاری خودکار سوالات</Text>
          </VStack>
          <VStack>
            <Box w={'100px'} h={'100px'}>
              <svg class="w-36 mx-auto" viewBox="0 0 134 103" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="63.5332" y="69.8535" width="53.2068" height="53.2068" rx="12.0315" transform="rotate(-45 63.5332 69.8535)" fill="#3646B3"></rect><rect x="0.61084" y="2.23828" width="34.2705" height="34.2705" rx="17.1353" fill="#29CCCC"></rect><path d="M46.5354 20.7216V13.261C46.5354 7.25585 51.4086 2.3877 57.4199 2.3877H69.6771C76.6275 2.3877 82.2619 8.01631 82.2619 14.9595C82.2619 21.9028 76.6275 27.5314 69.6771 27.5314H64.8382C62.4336 27.5314 60.4844 29.4787 60.4844 31.8807V36.5083" stroke="#29CCCC" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path><path d="M52.284 66.9755L69.3776 73.4769C72.621 74.7069 76.1274 73.0376 77.3546 69.8747C78.4942 66.7119 76.9163 63.1976 73.8482 61.9676L44.6576 50.5461C40.6252 48.9647 36.1546 49.2283 32.2976 51.249L17.7461 58.9804L30.1061 80.4176L33.0865 78.7483C35.3657 77.4305 38.0831 77.2548 40.5376 78.2212L61.8389 86.3919C65.9589 87.9734 70.6048 87.6219 74.4618 85.4255L101.286 69.9626C103.915 68.469 104.792 65.0426 103.214 62.4069C101.724 59.9469 98.5682 59.0683 96.0261 60.3862L77.0916 70.4019" stroke="#29CCCC" stroke-width="3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path><path d="M25.6352 87.2704L29.8429 84.8104C30.9824 84.1075 31.4207 82.6139 30.7195 81.4718L17.1322 57.8382C16.4309 56.696 14.9407 56.2567 13.8011 56.9596L9.68115 59.3317C8.45391 60.0346 8.10327 61.5281 8.71689 62.7581L22.2165 86.4797C22.9177 87.5339 24.408 87.9733 25.6352 87.2704Z" stroke="#29CCCC" stroke-width="3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            </Box>
            <Text>سیستم‌های توصیه‌گر سوال</Text>
          </VStack>
          <VStack>
            <Box w={'100px'} h={'100px'}>
              <svg class="w-36 mx-auto" version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 270 224"><title>image</title><defs><image width="270" height="223" id="img1" href="data:image/png;base64,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"></image></defs><style></style><use id="Background" href="#img1" x="0" y="1"></use></svg>
            </Box>
            <Text>ساده سازی متن</Text>
          </VStack>
          <VStack>
            <Box w={'100px'} h={'100px'}>
              <svg class="w-36 mx-auto" viewBox="0 0 124 118" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="-2.85205" y="54.9854" width="53.2068" height="53.2068" rx="12.0315" transform="rotate(-45 -2.85205 54.9854)" fill="#3646B3"></rect><rect x="89.3008" y="0.227539" width="34.2705" height="34.2705" rx="17.1353" fill="#29CCCC"></rect><path d="M76.9785 115.959L1.57203 115.959M90.0544 115.959L117.608 115.959M73.9029 96.854L102.662 68.0951C107.246 63.5113 107.246 56.0796 102.662 51.4958L78.6448 27.4788C74.061 22.8951 66.6293 22.8951 62.0455 27.4788L33.2866 56.2377M73.9029 96.854L54.798 115.959M73.9029 96.854L33.2866 56.2377M38.1987 115.959L14.1817 91.9419C9.59796 87.3581 9.59796 79.9264 14.1817 75.3426L33.2866 56.2377" stroke="#29CCCC" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            </Box>
            <Text>تصحیح غلط های املایی در سوالات، پاسخ‌ها و متن مورد جستجو</Text>
          </VStack>
          <VStack>
            <Box w={'100px'} h={'100px'}>
              <svg class="w-36 mx-auto" viewBox="0 0 124 118" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="-2.85205" y="54.9854" width="53.2068" height="53.2068" rx="12.0315" transform="rotate(-45 -2.85205 54.9854)" fill="#3646B3"></rect><rect x="89.3008" y="0.227539" width="34.2705" height="34.2705" rx="17.1353" fill="#29CCCC"></rect><path d="M76.9785 115.959L1.57203 115.959M90.0544 115.959L117.608 115.959M73.9029 96.854L102.662 68.0951C107.246 63.5113 107.246 56.0796 102.662 51.4958L78.6448 27.4788C74.061 22.8951 66.6293 22.8951 62.0455 27.4788L33.2866 56.2377M73.9029 96.854L54.798 115.959M73.9029 96.854L33.2866 56.2377M38.1987 115.959L14.1817 91.9419C9.59796 87.3581 9.59796 79.9264 14.1817 75.3426L33.2866 56.2377" stroke="#29CCCC" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            </Box>
            <Text>یافتن پاسخ سوال از متن خام کتابهای اسلامی</Text>
          </VStack>
          <VStack>
            <Box w={'100px'} h={'100px'}>
              <svg class="w-44 mx-auto" viewBox="0 0 161 95" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="-4.84106" y="32.6328" width="53.2068" height="53.2068" rx="12.0315" transform="rotate(-45 -4.84106 32.6328)" fill="#3646B3"></rect><rect x="126.643" y="35.9854" width="34.2705" height="34.2705" rx="17.1353" fill="#29CCCC"></rect><path d="M118.724 43.2342C118.724 43.2342 116.599 49.9339 118.724 56.333L82.5022 93.1384M118.724 16.779L72.2562 2.99308C69.2377 2.0912 65.9641 2.95013 63.7534 5.22631L28.2539 41.3016M118.724 16.779L82.5022 53.5844M118.724 16.779C118.724 16.779 116.599 23.4787 118.724 29.8778L82.5022 66.6831M82.5022 53.5844L34.7161 39.4119C30.7197 38.2524 26.7234 41.2586 26.7234 45.4674C26.7234 48.259 28.5515 50.7069 31.1874 51.5229L82.5022 66.7261C80.3765 60.2411 82.5022 53.5844 82.5022 53.5844ZM118.724 29.9637C118.724 29.9637 116.599 36.6633 118.724 43.0624L82.5022 79.8678M34.6736 52.6395C30.7197 51.437 26.7234 54.4863 26.7234 58.6521C26.7234 61.4436 28.5515 63.8916 31.1874 64.7076L82.5022 79.9107C80.3765 73.4687 82.5022 66.812 82.5022 66.812M34.6736 65.8672C30.7197 64.7076 26.7234 67.7139 26.7234 71.9226C26.7234 74.7142 28.5515 77.1622 31.1874 77.9781L82.5022 93.1813C80.3765 86.7393 82.5022 80.0825 82.5022 80.0825L34.6736 65.8672Z" stroke="#29CCCC" stroke-width="3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            </Box>
            <Text>سامانه لیبل گذاری دیتا و تولید دیتاست</Text>
          </VStack>
        </Grid>
        <HStack w={'100%'} justifyContent={'center'} my={'40px'} position={'relative'}>
          <Box width={{ base: '300px', md: '750px' }} height={{ base: '150px', md: '300px' }} />
          <VStack position={'absolute'}>
            <Text fontWeight={'bold'} fontSize={'20px'}>تیم پرس‌یاب</Text>
            <Text color={'gray'}>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ</Text>
          </VStack>
        </HStack>

        <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(4, 1fr)" }} gap={"20px"} w={"100%"}>
          <AboutUsCard />
          <AboutUsCard />
          <AboutUsCard />
          <AboutUsCard />
          <AboutUsCard />
          <AboutUsCard />
          <AboutUsCard />
          <AboutUsCard />
          <AboutUsCard />
          <AboutUsCard />
        </Grid>
      </Box>

    </MainLayout>
  );
};

export default Index;
