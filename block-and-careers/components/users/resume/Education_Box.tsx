import { Box, Flex, Input, Checkbox, CloseButton } from "@chakra-ui/react";
import { Input_Box, TextArea_Box } from "@components/utils/Input_Box";
import { useCallback, useState } from "react";
import colors from "themes/foundations/colors";
import { profile_Education } from "@state/user";
import { useRecoilState } from "recoil";
import DateInput from "@components/utils/date_Input";
import { UserEducationEntity } from "@restapi/types/user";

interface Education_Box_props {
  education: UserEducationEntity;
}

const Education_Box = ({ education }: Education_Box_props) => {
  const [educationState, setEducation] =
    useRecoilState<UserEducationEntity[]>(profile_Education);

  function UptItem<T>(setItem: T, name: string) {
    console.log(setItem);
    setEducation(
      educationState.map((item: UserEducationEntity) => {
        return item.id === education.id ? { ...item, [name]: setItem } : item;
      })
    );
  }

  const Close_Btn_Cllick = useCallback(() => {
    if (educationState.length === 1) {
      return;
    }

    setEducation(educationState.filter((e) => e.id !== education.id));
  }, [educationState]);

  return (
    <Flex
      width={"100%"}
      borderTop={`1px solid ${colors.secondery[300]}`}
      p={"15px 0px 15px 15px"}
    >
      <Box mr={"10px"}>
        <Checkbox>재학중</Checkbox>
        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          mb={"10px"}
        >
          <span>
            <DateInput
              value={education.startYear}
              placeholder="YYYY"
              width={"50px"}
              maxLength={4}
              onChange={(e) =>
                UptItem<number>(parseInt(e.target.value), "startYear")
              }
            />
            .
            <DateInput
              value={education.startMonth}
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
              value={education.endYear}
              placeholder="YYYY"
              width={"50px"}
              maxLength={4}
              onChange={(e) =>
                UptItem<number>(parseInt(e.target.value), "endYear")
              }
            />
            .
            <DateInput
              value={education.endMonth}
              width={"35px"}
              maxLength={2}
              placeholder="MM"
              onChange={(e) =>
                UptItem<number>(parseInt(e.target.value), "endMonth")
              }
            />
          </span>
        </Flex>

        <Flex gap={"5px"} flexDir={"column"}>
          <Input_Box
            title="학교명"
            placeholder="학교명"
            value={education.name}
            onChange={(e) => UptItem<string>(e.target.value, "name")}
          />
          <Input_Box
            title="전공"
            placeholder="(예: 컴퓨터 공학과 석사)"
            value={education.major}
            onChange={(e) => UptItem<string>(e.target.value, "major")}
          />
        </Flex>
      </Box>
      <TextArea_Box
        title="경험"
        height={"100%"}
        value={education.expreience}
        placeholder="(예: DAO에 관한 SCI 논문작성 등)"
        onChange={(e) => UptItem<string>(e.target.value, "expreience")}
      />
      <CloseButton
        color={colors.secondery[100]}
        ml={"10px"}
        fontSize={"xl"}
        onClick={Close_Btn_Cllick}
      ></CloseButton>
    </Flex>
  );
};

export default Education_Box;
