import {
  Flex,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Table,
  Thead,
  Td,
  Tr,
} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { EnterPrise_Entity } from "restapi/enterprise/get";
import colors from "themes/foundations/colors";

interface modalInput {
  isOpen: boolean;
  onClose: () => void;
  enterprises: EnterPrise_Entity[];
  setCompany: (e: EnterPrise_Entity) => void;
}

function SearchEnterModal({
  isOpen,
  onClose,
  enterprises,
  setCompany,
}: modalInput) {
  const [resultEnterprise, setResultEnter] = useState<
    EnterPrise_Entity[] | undefined
  >(enterprises);
  const searchType = ["회사명", "사업자 번호"];

  const SearchTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setResultEnter((resultEnterprise) =>
        resultEnterprise?.filter((s) => s.title === e.target.value)
      );
    }
  };

  const TrItemClicked = (e: EnterPrise_Entity) => {
    setCompany(e);
  };

  return (
    <Modal closeOnOverlayClick isOpen={isOpen} onClose={onClose} size={"2xl"}>
      <ModalOverlay />
      <ModalContent p={"30px"}>
        <ModalHeader>회사 검색</ModalHeader>
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
        <Table variant="simple" mt={"30px"}>
          <Thead>
            <Tr>
              <Td>회사명</Td>
              <Td>이메일</Td>
              <Td>주소</Td>
              <Td>사업자번호</Td>
            </Tr>
            {resultEnterprise?.map((item: EnterPrise_Entity, idx) => {
              return (
                <Tr
                  key={idx}
                  _hover={{ background: `${colors.blue[100]}` }}
                  onClick={() => TrItemClicked(item)}
                >
                  <Td>{item.title}</Td>
                  <Td>{item.email}</Td>
                  <Td>{item.address}</Td>
                  <Td>{item.businessNumber}</Td>
                </Tr>
              );
            })}
          </Thead>
        </Table>
      </ModalContent>
    </Modal>
  );
}

export default SearchEnterModal;