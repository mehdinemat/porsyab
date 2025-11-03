import { Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const LoadingDots = ({conditionStream}) => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <Text fontSize="14px" fontWeight="400" color="blue.500">
      {conditionStream}
    </Text>
  );
};

export default LoadingDots;
