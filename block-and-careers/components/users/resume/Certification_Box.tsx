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
import {
  profile_Certification,
  UserCareerForm,
  UserCertificationForm,
} from "@state/user";
import { useRecoilState } from "recoil";
import { EnterPrise_Entity } from "@restapi/types/enterprise";
import { getEnterSelector } from "@state/enterprise";
import DateInput from "@components/utils/date_Input";

interface Certification_Box_props {
  cert: UserCertificationForm;
}

const Certification_Box = ({ cert }: Certification_Box_props) => {
  const [certState, setCert] = useState<UserCertificationForm>(cert);

  return (
    <Flex
      width={"100%"}
      borderTop={`1px solid ${colors.secondery[300]}`}
      p={"15px 0px 15px 15px"}
    >
      <span style={{ marginRight: "10px" }}>
        <DateInput
          value={certState.getYear}
          type={"number"}
          placeholder="YYYY"
          width={"50px"}
          onChange={(e) =>
            setCert({
              ...certState,
              getYear: parseInt(e.target.value),
            })
          }
        />
        .
        <DateInput
          value={certState.getMonth}
          type={"number"}
          width={"35px"}
          placeholder="MM"
          ml={1}
          onChange={(e) =>
            setCert({
              ...certState,
              getMonth: parseInt(e.target.value),
            })
          }
        />
      </span>
      <Flex flex={1} gap={3} justifyContent={"space-between"}>
        <Input_Box
          boxProps={{ flex: 1 }}
          title="수상 및 자격증"
          placeholder="(예: 정보처리기사)"
          fontSize={"xl"}
        ></Input_Box>
        <Input_Box
          title="발급처"
          placeholder="(예: 한국산업인력공단)"
          fontSize={"sm"}
        ></Input_Box>
      </Flex>
      <CloseButton
        color={colors.secondery[100]}
        ml={"10px"}
        fontSize={"xl"}
      ></CloseButton>
    </Flex>
  );
};

export default Certification_Box;
