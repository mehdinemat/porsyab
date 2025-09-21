// components/PhoneInput.tsx
import {
  HStack,
  Input,
  Select
} from "@chakra-ui/react";
import { t } from "i18next";
import { useState } from "react";

const countries = [
  { code: "IR", dialCode: "+98", label: "Iran" },
];

export default function PhoneInput({ fullNumber, setFullNumber }) {
  const [country, setCountry] = useState(countries[0]);
  const [number, setNumber] = useState("");

  const handleCountryChange = (e) => {
    const selected = countries.find((c) => c.code === e.target.value);
    if (selected) {
      setCountry(selected);

      // Recompute full number when country changes
      const normalized = number.startsWith("0") ? number.slice(1) : number;
      setFullNumber(selected.dialCode + normalized);
    }
  };

  const handleNumberChange = (e) => {
    const rawNumber = e.target.value;
    setNumber(rawNumber);

    const normalized = rawNumber.startsWith("0") ? rawNumber.slice(1) : rawNumber;
    setFullNumber(country.dialCode + normalized);
  };

  return (
    <HStack spacing={2} w="100%" height="46px">
      <Input
        width="100%"
        dir="ltr"
        height="46px"
        value={number}
        type="tel"
        onChange={handleNumberChange}
        placeholder={t("phone_number")}
        _placeholder={{ textAlign: 'right' }}
      />

      <Select
        w="150px"
        value={country.code}
        onChange={handleCountryChange}
        fontSize="sm"
        bg="transparent"
        height="46px"
        pl={0}
        _hover={{ border: "none" }}
        _focusVisible={{ border: "none" }}
        isDisabled
      >
        {countries.map((c) => (
          <option key={c.code} value={c.code}>
            {c.label} ({c.dialCode})
          </option>
        ))}
      </Select>
    </HStack>
  );
}
