import {
  Box,
  Flex,
  Heading,
  Input,
  Text,
  Checkbox,
  List,
  ListItem,
  CloseButton,
} from "@chakra-ui/react";
import { Input_Box, TextArea_Box } from "@components/utils/Input_Box";
import { useCallback, useState } from "react";
import colors from "themes/foundations/colors";
import { profile_Certification } from "@state/user";
import { useRecoilState } from "recoil";
import { EnterPrise_Entity } from "@restapi/types/enterprise";
import { getEnterSelector } from "@state/enterprise";
import DateInput from "@components/utils/date_Input";
import { UserCertificationEntity } from "@restapi/types/user";

interface Certification_Box_props {
  cert: UserCertificationEntity;
}

const Certification_Box = ({ cert }: Certification_Box_props) => {
  const [certState, setCert] = useRecoilState<UserCertificationEntity[]>(
    profile_Certification
  );

  function UptItem<T>(setItem: T, name: string) {
    setCert(
      certState.map((item: UserCertificationEntity) => {
        return item.id === cert.id ? { ...item, [name]: setItem } : item;
      })
    );
  }

  const Close_Btn_Cllick = useCallback(() => {
    if (certState.length === 1) {
      return;
    }

    setCert(certState.filter((e) => e.id !== cert.id));
  }, [certState]);

  return (
    <Flex
      width={"100%"}
      borderTop={`1px solid ${colors.secondery[300]}`}
      p={"15px 0px 15px 15px"}
    >
      <span style={{ marginRight: "10px" }}>
        <DateInput
          placeholder="YYYY"
          width={"50px"}
          maxLength={4}
          value={cert.getYear}
          onChange={(e) => UptItem<number>(parseInt(e.target.value), "getYear")}
        />
        .
        <DateInput
          width={"35px"}
          placeholder="MM"
          maxLength={2}
          value={cert.getMonth}
          onChange={(e) =>
            UptItem<number>(parseInt(e.target.value), "getMonth")
          }
        />
      </span>
      <Flex flex={1} gap={3} justifyContent={"space-between"}>
        <Input_Box
          boxProps={{ flex: 1 }}
          title="수상 및 자격증"
          placeholder="(예: 정보처리기사)"
          fontSize={"xl"}
          value={cert.title}
          onChange={(e) => UptItem<string>(e.target.value, "title")}
        ></Input_Box>
        <Input_Box
          title="발급처"
          placeholder="(예: 한국산업인력공단)"
          fontSize={"sm"}
          value={cert.from}
          onChange={(e) => UptItem<string>(e.target.value, "from")}
        ></Input_Box>
      </Flex>
      <CloseButton
        color={colors.secondery[100]}
        ml={"10px"}
        fontSize={"xl"}
        onClick={Close_Btn_Cllick}
      ></CloseButton>
    </Flex>
  );
};

export default Certification_Box;
