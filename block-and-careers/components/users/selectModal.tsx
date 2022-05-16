import {
  Box,
  Flex,
  Modal,
  ModalBody,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { selectList, SelectTypes } from "@state/datas/usertype";
import { useCallback } from "react";
import { FaRegBuilding, FaRegUser } from "react-icons/fa";

interface ModalProps {
  onTypeClick: (value: string) => void;
}

const TypeSelectModal = ({ onTypeClick }: ModalProps): JSX.Element => {
  const { isOpen, onClose } = useDisclosure();

  const modalClick = useCallback((value: string) => {
    onTypeClick(value);
    onclose;
  }, []);

  const selects: SelectTypes[] = selectList();

  return (
    <Modal closeOnOverlayClick isOpen={isOpen} onClose={onClose}>
      <ModalBody>
        <Flex>
          {selects.map((item: SelectTypes, idx) => {
            return (
              <Box key={idx} onClick={() => modalClick(item.value)}>
                {item.title === "기업 회원" ? <FaRegBuilding /> : <FaRegUser />}
                <Text fontSize={"xl"}>{item.title}</Text>
              </Box>
            );
          })}
        </Flex>
      </ModalBody>
    </Modal>
  );
};

export default TypeSelectModal;
