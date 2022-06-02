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
import { profile_career, UserCareerForm } from "@state/user";
import { useRecoilState } from "recoil";
import { EnterPrise_Entity } from "@restapi/types/enterprise";
import { getEnterSelector } from "@state/enterprise";
import DateInput from "@components/utils/date_Input";

interface Career_Box_props {
  career: UserCareerForm;
}

const Career_Box = ({ career }: Career_Box_props) => {
  const [educationState, setcareer] = useState<UserCareerForm>(career);
  const [careerState, setCareer] =
    useRecoilState<UserCareerForm[]>(profile_career);

  const companySelect = useCallback(
    (company: EnterPrise_Entity) => {},
    [career]
  );

  return (
    <Flex
      width={"100%"}
      borderTop={`1px solid ${colors.secondery[300]}`}
      p={"15px 0px 15px 15px"}
    >
      <Box mr={"10px"}>
        <Checkbox>재직중</Checkbox>
        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          mb={"10px"}
        >
          <span>
            <DateInput
              value={educationState.startYear}
              type={"number"}
              width={"50px"}
              placeholder="YYYY"
              onChange={(e) =>
                setcareer({
                  ...educationState,
                  startYear: parseInt(e.target.value),
                })
              }
            />
            .
            <DateInput
              value={educationState.startMonth}
              type={"number"}
              width={"35px"}
              placeholder="MM"
              ml={1}
              onChange={(e) =>
                setcareer({
                  ...educationState,
                  endMonth: parseInt(e.target.value),
                })
              }
            />
          </span>
          -
          <span>
            <DateInput
              value={educationState.endYear}
              type={"number"}
              placeholder="YYYY"
              width={"50px"}
              onChange={(e) =>
                setcareer({
                  ...educationState,
                  endYear: parseInt(e.target.value),
                })
              }
            />
            .
            <DateInput
              value={educationState.endMonth}
              type={"number"}
              width={"35px"}
              placeholder="MM"
              onChange={(e) =>
                setcareer({
                  ...educationState,
                  endMonth: parseInt(e.target.value),
                })
              }
            />
          </span>
        </Flex>

        <Flex gap={"5px"} flexDir={"column"}>
          <CompanyAutoComplete CompanyClick={companySelect} />
          <Input_Box
            title="직무"
            placeholder="(예: 프론트 엔드, 백엔드, 디자인)"
          />
        </Flex>
      </Box>
      <TextArea_Box
        title="근무 내용 및 성과"
        height={"100%"}
        value={educationState.description}
        placeholder="(예: OO 웹사이트 화면 개발)"
      />
      <CloseButton
        color={colors.secondery[100]}
        ml={"10px"}
        fontSize={"xl"}
      ></CloseButton>
    </Flex>
  );
};

interface companyAutoComplete {
  CompanyClick: (company: EnterPrise_Entity) => void;
}

const CompanyAutoComplete = ({ CompanyClick }: companyAutoComplete) => {
  const [currValue, setInput] = useState("");
  const [IsAutoComplete, setAutoComplete] = useState<boolean>(false);
  const [enterprises] = useRecoilState<EnterPrise_Entity[]>(getEnterSelector);
  const [findEnterprise, setfindEnterprise] =
    useState<EnterPrise_Entity[]>(enterprises);

  const InputChanged = (value: string) => {
    setInput(value);
    if (value.trim() === "") {
      setfindEnterprise(enterprises);
    } else {
      setfindEnterprise(enterprises?.filter((e) => e.title.includes(value)));
    }
  };

  const findEnter_Click = (selectValue: EnterPrise_Entity) => {
    setAutoComplete(false);
    setInput(selectValue.title);
    CompanyClick(selectValue);
  };

  return (
    <Box position={"relative"}>
      <Input
        value={currValue}
        onFocus={() => setAutoComplete(true)}
        onChange={(e) => InputChanged(e.target.value)}
        onBlur={() => {
          setTimeout(() => {
            setAutoComplete(false);
          }, 200);
        }}
      />
      {IsAutoComplete ? (
        <Box
          position={"absolute"}
          bg={"white"}
          w={"100%"}
          border={`1px solid ${colors.secondery[300]}`}
          height={"180px"}
          zIndex={20}
        >
          <List>
            <ListItem>
              <Box
                height={"40px"}
                bg={colors.secondery[200]}
                padding={"5px"}
                cursor={"pointer"}
              >
                {`' ${currValue} ' 직접 입력하기`}
              </Box>
            </ListItem>
            {findEnterprise?.map((enter) => {
              return (
                <ListItem>
                  <Box
                    padding={"5px"}
                    width={"100%"}
                    cursor={"pointer"}
                    _hover={{ bg: colors.secondery[300] }}
                    onClick={() => findEnter_Click(enter)}
                  >
                    <Heading fontSize={"sm"}>{enter.title}</Heading>
                    <Text>{`${enter.employees}`}</Text>
                  </Box>
                </ListItem>
              );
            })}
          </List>
        </Box>
      ) : null}
    </Box>
  );
};

export default Career_Box;
