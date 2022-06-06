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
  Divider,
} from "@chakra-ui/react";
import { Input_Box, TextArea_Box } from "@components/utils/Input_Box";
import { useCallback, useState } from "react";
import colors from "themes/foundations/colors";
import { profile_career } from "@state/user";
import { useRecoilState } from "recoil";
import { EnterPrise_Entity } from "@restapi/types/enterprise";
import { getEnterSelector } from "@state/enterprise";
import DateInput from "@components/utils/date_Input";
import { numberonly } from "@components/utils/regex";
import { UserCareerEntity } from "@restapi/types/user";

interface Career_Box_props {
  career: UserCareerEntity;
}

const Career_Box = ({ career }: Career_Box_props) => {
  const [careerState, setCareer] =
    useRecoilState<UserCareerEntity[]>(profile_career);

  function UptItem<T>(setItem: T, name: string) {
    setCareer(
      careerState.map((item: UserCareerEntity) => {
        return item.id === career.id ? { ...item, [name]: setItem } : item;
      })
    );
  }

  const companySelect = useCallback(
    (company: EnterPrise_Entity) => {
      setCareer(
        careerState.map((item: UserCareerEntity) => {
          return item.id === career.id
            ? { ...item, company: company.account.accountAddress }
            : item;
        })
      );
    },
    [career]
  );

  const Close_Btn_Cllick = useCallback(() => {
    if (careerState.length === 1) {
      return;
    }

    setCareer(careerState.filter((e) => e.id !== career.id));
  }, [careerState]);

  return (
    <>
      <Divider />
      <Flex width={"100%"} p={"15px 0px 15px 15px"}>
        <Box mr={"10px"}>
          <Checkbox
            isChecked={career.currentRunning}
            onChange={(e) =>
              UptItem<boolean>(e.target.checked, "currentRunning")
            }
          >
            재직중
          </Checkbox>
          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            mb={"10px"}
          >
            <span>
              <DateInput
                value={career.startYear}
                width={"50px"}
                placeholder="YYYY"
                maxLength={4}
                onChange={(e) =>
                  UptItem<number>(parseInt(e.target.value), "startYear")
                }
              />
              .
              <DateInput
                value={career.startMonth}
                width={"35px"}
                placeholder="MM"
                maxLength={2}
                onChange={(e) =>
                  UptItem<number>(parseInt(e.target.value), "startMonth")
                }
              />
            </span>
            -
            <span>
              <DateInput
                value={career.endYear}
                placeholder="YYYY"
                width={"50px"}
                maxLength={4}
                onChange={(e) =>
                  UptItem<number>(parseInt(e.target.value), "endYear")
                }
              />
              .
              <DateInput
                value={career.endMonth}
                width={"35px"}
                placeholder="MM"
                maxLength={2}
                onChange={(e) =>
                  UptItem<number>(parseInt(e.target.value), "endMonth")
                }
              />
            </span>
          </Flex>

          <Flex gap={"5px"} flexDir={"column"}>
            <CompanyAutoComplete CompanyClick={companySelect} />
            <Input_Box
              value={career.roles}
              title="직무 (,로 구분)"
              placeholder="(예: 프론트 엔드, 백엔드)"
              onChange={(e) => UptItem<string>(e.target.value, "roles")}
              _placeholder={{ fontSize: "14px" }}
            />
          </Flex>
        </Box>
        <TextArea_Box
          title="근무 내용 및 성과"
          height={"100%"}
          value={career.description}
          onChange={(e) => UptItem<string>(e.target.value, "description")}
          placeholder="(예: OO 웹사이트 화면 개발)"
        />
        <CloseButton
          color={colors.secondery[100]}
          ml={"10px"}
          fontSize={"xl"}
          onClick={Close_Btn_Cllick}
        ></CloseButton>
      </Flex>
    </>
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
