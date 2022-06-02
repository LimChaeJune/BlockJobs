import { Box, Flex, Input, Checkbox, CloseButton } from "@chakra-ui/react";
import { Input_Box, TextArea_Box } from "@components/utils/Input_Box";
import { useState } from "react";
import colors from "themes/foundations/colors";
import { UserEducationForm } from "@state/user";
import { useRecoilState } from "recoil";
import DateInput from "@components/utils/date_Input";

interface Education_Box_props {
  education: UserEducationForm;
}

const Education_Box = ({ education }: Education_Box_props) => {
  const [educationState, setEducation] = useState<UserEducationForm>(education);

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
              value={educationState.startYear}
              type={"number"}
              placeholder="YYYY"
              width={"50px"}
              onChange={(e) =>
                setEducation({
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
                setEducation({
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
                setEducation({
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
              ml={1}
              onChange={(e) =>
                setEducation({
                  ...educationState,
                  endMonth: parseInt(e.target.value),
                })
              }
            />
          </span>
        </Flex>

        <Flex gap={"5px"} flexDir={"column"}>
          <Input_Box
            title="학교명"
            placeholder="학교명"
            value={educationState.name}
            onChange={(e) =>
              setEducation({
                ...educationState,
                name: e.target.value,
              })
            }
          />
          <Input_Box
            title="전공"
            placeholder="(예: 컴퓨터 공학과 석사)"
            value={educationState.major}
            onChange={(e) =>
              setEducation({
                ...educationState,
                major: e.target.value,
              })
            }
          />
        </Flex>
      </Box>
      <TextArea_Box
        title="경험"
        height={"100%"}
        value={educationState.expreience}
        placeholder="(예: 블록체인의 대한 논문작성 등)"
        onChange={(e) =>
          setEducation({
            ...educationState,
            expreience: e.target.value,
          })
        }
      />
      <CloseButton
        color={colors.secondery[100]}
        ml={"10px"}
        fontSize={"xl"}
      ></CloseButton>
    </Flex>
  );
};

export default Education_Box;
