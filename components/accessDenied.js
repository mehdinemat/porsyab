import { Box, Button, Flex, Icon, Text } from "@chakra-ui/react";
import Link from "next/link";
import { FiLock } from "react-icons/fi";

export default function AccessDenied() {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minH="60vh"
      textAlign="center"
      px={6}
    >
      <Box
        bg="red.50"
        p={6}
        rounded="2xl"
        shadow="md"
        maxW="lg"
        border="1px solid"
        borderColor="red.100"
      >
        <Flex justify="center" mb={4}>
          <Icon as={FiLock} boxSize={12} color="red.500" />
        </Flex>
        <Text fontSize="2xl" fontWeight="bold" color="red.600" mb={2}>
          دسترسی غیرمجاز
        </Text>
        <Text fontSize="md" color="gray.600" mb={6}>
          شما اجازه دسترسی به این صفحه را ندارید.
          در صورت نیاز لطفاً با مدیر سیستم تماس بگیرید.
        </Text>

        <Link href="/" passHref>
          <Button colorScheme="red" size="md" rounded="lg">
            بازگشت به صفحه اصلی
          </Button>
        </Link>
      </Box>
    </Flex>
  );
}
