import {
  Box,
  Flex,
  Input,
  Modal,
  ModalContent,
  ModalOverlay,
  Select,
} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";

interface modalInput {
  isOpen: boolean;
  onClose: () => void;
  enterprises: string[];
}

function SearchEnterModal({ isOpen, onClose, enterprises }: modalInput) {
  const [resultEnterprise, setResultEnter] = useState<string[] | undefined>(
    enterprises
  );
  const searchType = ["회사명", "사업자 번호"];

  const SearchTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setResultEnter((resultEnterprise) =>
        resultEnterprise?.filter((s) => s === e.target.value)
      );
    }
  };

  return (
    <Modal closeOnOverlayClick isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <Flex>
          <Select>
            {searchType.map((value: string, idx) => {
              return (
                <option key={idx} value={value}>
                  {value}
                </option>
              );
            })}
          </Select>
          <Input type={"text"} onChange={SearchTextChange} />
        </Flex>
        <Flex flexDirection={"column"}>
          {resultEnterprise?.map((item, idx) => {
            return <Box key={idx}>{item}</Box>;
          })}
        </Flex>
      </ModalContent>
    </Modal>
  );
}

export default SearchEnterModal;
