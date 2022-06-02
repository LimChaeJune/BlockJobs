import {
  Flex,
  Input,
  Textarea,
  Button,
  Box,
  CloseButton,
  ButtonProps,
} from "@chakra-ui/react";
import { Input_Box } from "@components/utils/Input_Box";
import { useCallback, useEffect } from "react";
import colors from "themes/foundations/colors";
import {
  profile_Education,
  profile_career,
  UserEducationForm,
  UserCareerForm,
  UserCertificationForm,
  profile_Certification,
  UserPortfolioForm,
  profile_Portfolio,
} from "@state/user";
import { useRecoilState } from "recoil";
import Resume_Box from "@components/users/resume/Resume_Box";
import Education_Box from "@components/users/resume/Education_Box";
import Career_Box from "@components/users/resume/Career_Box";
import Certification_Box from "@components/users/resume/Certification_Box";
import Portfolio_Box from "@components/users/resume/portfolio_Box";

const ResumeEdit = () => {
  const [educationState, setEducation] =
    useRecoilState<UserEducationForm[]>(profile_Education);
  const [careerState, setCareer] =
    useRecoilState<UserCareerForm[]>(profile_career);
  const [certState, setCert] = useRecoilState<UserCertificationForm[]>(
    profile_Certification
  );
  const [portState, setPortfolio] =
    useRecoilState<UserPortfolioForm[]>(profile_Portfolio);

  const addEducationBox = useCallback(() => {
    const neweducation: UserEducationForm = {
      id: -1,
      name: undefined,
      major: undefined,
      expreience: undefined,
      currentRunning: false,
      startYear: undefined,
      startMonth: undefined,
      endYear: undefined,
      endMonth: undefined,
    };
    setEducation([...educationState, neweducation]);
  }, [educationState]);

  const addCareerBox = useCallback(() => {
    const newcareer: UserCareerForm = {
      id: -1,
      company: undefined,
      roles: [],
      description: undefined,
      currentRunning: false,
      startYear: undefined,
      startMonth: undefined,
      endYear: undefined,
      endMonth: undefined,
    };
    setCareer([...careerState, newcareer]);
  }, [careerState]);

  const addCertBox = useCallback(() => {
    const newcert: UserCertificationForm = {
      id: -1,
      title: "",
      getYear: undefined,
      getMonth: undefined,
      from: "",
    };
    setCert([...certState, newcert]);
  }, [certState]);

  const addPortfolio = useCallback(() => {
    const newPort: UserPortfolioForm = {
      id: 0,
      title: "",
      link: "",
    };
    setPortfolio([...portState, newPort]);
  }, [portState]);

  useEffect(() => {}, []);

  return (
    <Flex flexDirection={"column"} gap={5}>
      <Input bg={"white"} fontSize={"2xl"} height={"70px"}></Input>

      <Resume_Box title="인적사항">
        <Flex gap={3}>
          <Box flex={1}>
            <Flex gap={3} margin={3}>
              <Input_Box boxProps={{ flex: 1 }} title="이름" type={"text"} />
              <Input_Box
                boxProps={{ flex: 1 }}
                title="휴대폰번호"
                type={"text"}
              />
              <Input_Box boxProps={{ flex: 1 }} title="이메일" type={"email"} />
            </Flex>
            <Flex gap={3} margin={3}>
              <Input_Box title="생년월일" type={"text"} />
              <Input_Box title="성별" type={"email"} />
              <Input_Box boxProps={{ flex: 1 }} title="주소" type={"text"} />
            </Flex>
          </Box>
          <Box width={"130px"} height={"100%"} m={3} pos={"relative"}>
            <CloseButton
              position={"absolute"}
              right={0}
              top={0}
              bg={colors.secondery[400]}
            />
            <Button
              w={"100%"}
              height={"25px"}
              fontSize={"md"}
              background={"transparent"}
            >
              사진 변경
            </Button>
          </Box>
        </Flex>
      </Resume_Box>

      <Resume_Box
        title="자기 소개"
        comment="간단한 자기소개 글과 자신을 어필할 수 있는 스킬을 작성해주세요."
      >
        <Textarea height={"150px"} resize={"none"} />
      </Resume_Box>

      <Resume_Box title="학력" comment="최신순으로 작성해주세요">
        <AddButton onClick={() => addEducationBox()}></AddButton>
        <Flex
          gap={3}
          margin={3}
          direction={"column"}
          justifyContent={"between"}
        >
          {educationState.map((education, idx) => {
            return <Education_Box key={idx} education={education} />;
          })}
        </Flex>
      </Resume_Box>

      <Resume_Box title="경력" comment="최신순으로 작성해주세요">
        <AddButton onClick={() => addCareerBox()}></AddButton>
        <Flex
          gap={3}
          margin={3}
          direction={"column"}
          justifyContent={"between"}
        >
          {careerState.map((career, idx) => {
            return <Career_Box key={idx} career={career} />;
          })}
        </Flex>
      </Resume_Box>

      <Resume_Box
        title="수상 및 자격증"
        comment={"수상내역 및 취득 자격증을 최신순으로 작성해주세요"}
      >
        <Button
          color={colors.highlight}
          background={"transparent"}
          _hover={{ bg: "transparent" }}
          _active={{ bg: "transparent" }}
          _focus={{ outline: "none", border: "none" }}
          onClick={() => addCertBox()}
        >
          추가 +
        </Button>
        <Flex
          gap={3}
          margin={3}
          direction={"column"}
          justifyContent={"between"}
        >
          {certState.map((cert, idx) => {
            return <Certification_Box key={idx} cert={cert} />;
          })}
        </Flex>
      </Resume_Box>

      <Resume_Box
        title="포트폴리오"
        comment={"링크 및 파일 등을 업로드 해주세요"}
      >
        <AddButton onClick={() => addPortfolio()} />
        <Flex
          gap={3}
          margin={3}
          direction={"column"}
          justifyContent={"between"}
        >
          {portState.map((portfolio, idx) => {
            return <Portfolio_Box key={idx} portfolio={portfolio} />;
          })}
        </Flex>
      </Resume_Box>
    </Flex>
  );
};

interface addBtn_props extends ButtonProps {}

const AddButton = ({ ...rest }: addBtn_props) => {
  return (
    <Button
      color={colors.highlight}
      background={"transparent"}
      _hover={{ bg: "transparent" }}
      _active={{ bg: "transparent" }}
      _focus={{ outline: "none", border: "none" }}
      {...rest}
    >
      추가 +
    </Button>
  );
};

export default ResumeEdit;
