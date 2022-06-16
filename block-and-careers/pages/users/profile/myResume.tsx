import {
  Flex,
  Input,
  Textarea,
  Button,
  Box,
  ButtonProps,
  Image,
  Select,
} from "@chakra-ui/react";
import { Custom_Box, Input_Box } from "@components/utils/Input_Box";
import { useCallback, useEffect, useState } from "react";
import colors from "themes/foundations/colors";
import {
  profile_Education,
  profile_Certification,
  profile_Portfolio,
} from "@state/user";
import { useRecoilState } from "recoil";
import Resume_Box from "@components/users/resume/Resume_Box";
import Education_Box from "@components/users/resume/Education_Box";
import Certification_Box from "@components/users/resume/Certification_Box";
import Portfolio_Box from "@components/users/resume/portfolio_Box";
import { autoHyphen, autoHyphen_birth } from "@components/utils/regex";
import { account_state } from "@state/web3/account";
import {
  UserCertificationEntity,
  UserEducationEntity,
  UserPortfolioEntity,
  UserResumeEntity,
  User_Entity,
} from "@restapi/types/user";
import { useRouter } from "next/router";
import { v4 as uuid } from "uuid";
import { AddUserResume, UptUserProfile } from "@restapi/users/post";
import { user_profile } from "@components/utils/routing";
import CenterLayout from "@components/layouts/centerlayout";
import { useS3 } from "@hooks/S3Client";
import { GetUserResumeById } from "@restapi/users/get";
import { accountCheck } from "@restapi/account/get";
import { useUserLogin } from "@hooks/LoginCheck";

const ResumeEdit = () => {
  let inputRef: HTMLInputElement | null;

  const router = useRouter();
  const [loginAccount, setAccountState] = useRecoilState(account_state);
  const [user, SetUser] = useState<User_Entity | undefined>(loginAccount?.user);
  const [userResume, SetResume] = useState<UserResumeEntity | null>();

  const [educationState, setEducation] =
    useRecoilState<UserEducationEntity[]>(profile_Education);
  const [certState, setCert] = useRecoilState<UserCertificationEntity[]>(
    profile_Certification
  );
  const [portState, setPortfolio] =
    useRecoilState<UserPortfolioEntity[]>(profile_Portfolio);
  const [imageUrl, setImageUrl] = useState<string | undefined>(
    loginAccount?.user.profilePicture
  );

  const { handleFileInput, fileBaseUrl } = useS3();

  const { IsCustomer } = useUserLogin();
  // 로그인 확인
  useEffect(() => {
    IsCustomer();
  }, []);

  // 이력서 User 변경
  function UptUserItem<T>(setItem: T, name: string) {
    if (user) {
      SetUser({
        ...user,
        [name]: setItem,
      });
    }
  }

  // 이력서 State 변경
  function UptResumeItem<T>(setItem: T, name: string) {
    if (userResume) {
      console.log(userResume.description);
      SetResume({
        ...userResume,
        [name]: setItem,
      });
    }
  }

  const ChangeImageUrl = (fileid: string) => {
    setImageUrl(fileBaseUrl + `${fileid}.png`);
    if (user) {
      SetUser({
        ...user,
        profilePicture: fileBaseUrl + `${fileid}.png`,
      });
    }
  };

  // 학력 박스 추가
  const addEducationBox = useCallback(() => {
    const neweducation: UserEducationEntity = {
      id: uuid(),
      currentRunning: false,
    };
    setEducation([...educationState, neweducation]);
  }, [educationState]);

  // 자격증 박스 추가
  const addCertBox = useCallback(() => {
    const newcert: UserCertificationEntity = {
      id: uuid(),
    };
    setCert([...certState, newcert]);
  }, [certState]);

  // 포트폴리오 박스 추가
  const addPortfolio = useCallback(() => {
    const newPort: UserPortfolioEntity = {
      id: uuid(),
    };
    setPortfolio([...portState, newPort]);
  }, [portState]);

  // 이력서 저장
  const SaveResume = async () => {
    // user 정보 변경
    if (user) {
      await UptUserProfile(user);
      await accountCheck(loginAccount?.accountAddress ?? "").then(
        async (res) => {
          console.log(res.data);
          if (res.data) {
            await setAccountState(res.data);
          }
        }
      );
    }

    // resume 정보 변경
    if (userResume) {
      const registerResume: UserResumeEntity = {
        ...userResume,
        title: userResume.title,
        description: userResume.description,
        portfolioes: portState,
        certifications: certState,
        educations: educationState,
      };
      await AddUserResume(registerResume);
    }

    router.push(user_profile);
  };

  useEffect(() => {
    const routeId = router.query.resumeId;

    const setting = async () => {
      if (router.query.resumeId === "newid") {
        const newResume: UserResumeEntity = {
          resumeId: uuid(),
          userId: user?.id,
          title: user?.name,
        };
        SetResume(newResume);
        addPortfolio();
        addCertBox();
        addEducationBox();
      } else {
        const uptResume = await GetUserResumeById(routeId?.toString() ?? "");
        SetResume(uptResume.data);
        setEducation(uptResume?.data?.educations ?? []);
        setCert(uptResume?.data.certifications ?? []);
        setPortfolio(uptResume?.data.portfolioes ?? []);
      }
    };
    setting();
  }, []);

  return (
    <CenterLayout>
      <Box>
        <Flex flexDirection={"column"} paddingBottom={"150px"} gap={5}>
          <Input
            value={userResume?.title}
            onChange={(e) => {
              UptResumeItem<string>(e.target.value, "title");
            }}
            bg={"white"}
            fontSize={"2xl"}
            height={"70px"}
          ></Input>

          <Resume_Box title="인적사항">
            <Flex gap={3}>
              <Box flex={1}>
                <Flex gap={3} margin={3}>
                  <Input_Box
                    value={user?.name}
                    onChange={(e) => {
                      UptUserItem<string>(e.target.value, "name");
                    }}
                    boxProps={{ flex: 1 }}
                    title="이름"
                    type={"text"}
                  />
                  <Input_Box
                    value={user?.phone}
                    onChange={(e) => {
                      UptUserItem<string>(e.target.value, "phone");
                    }}
                    boxProps={{ flex: 1 }}
                    title="휴대폰번호"
                    type={"text"}
                    onInput={autoHyphen}
                    maxLength={13}
                  />
                  <Input_Box
                    boxProps={{ flex: 1 }}
                    value={user?.email}
                    onChange={(e) => {
                      UptUserItem<string>(e.target.value, "email");
                    }}
                    title="이메일"
                    type={"email"}
                  />
                </Flex>
                <Flex gap={3} margin={3}>
                  <Input_Box
                    title="생년월일"
                    type={"text"}
                    value={user?.birthday?.substring(0, 10)}
                    onChange={(e) => {
                      UptUserItem<string>(e.target.value, "birthday");
                    }}
                    onInput={autoHyphen_birth}
                    maxLength={10}
                  />
                  <Custom_Box title="성별" IsFocus={false}>
                    <Select
                      border={"none"}
                      _focus={{ border: "none" }}
                      onChange={(e) => {
                        UptUserItem<string>(e.target.value, "male");
                      }}
                      value={user?.male}
                    >
                      <option value={"남"}>{"남"}</option>
                      <option value={"여"}>{"여"}</option>
                    </Select>
                  </Custom_Box>
                  <Input_Box
                    boxProps={{ flex: 3 }}
                    title="주소"
                    type={"text"}
                    value={user?.address}
                    onChange={(e) => {
                      UptUserItem<string>(e.target.value, "address");
                    }}
                  />
                </Flex>
              </Box>
              <Box width={"130px"} height={"130%"} m={3} pos={"relative"}>
                {/* <CloseButton
                position={"absolute"}
                right={0}
                top={0}
                bg={colors.secondery[400]}
              /> */}
                <Image
                  alt="placeholder"
                  src={imageUrl ?? "https://via.placeholder.com/130x150"}
                  width={"130px"}
                  height={"150px"}
                />
                <Input
                  ref={(refParam) => (inputRef = refParam)}
                  type={"file"}
                  hidden={true}
                  onChange={(e) =>
                    handleFileInput({
                      id: `user/${uuid()}`,
                      e: e,
                      uploadComplete: ChangeImageUrl,
                    })
                  }
                />
                <Button
                  w={"100%"}
                  position="absolute"
                  bottom={"0"}
                  height={"25px"}
                  fontSize={"md"}
                  background={"transparent"}
                  onClick={() => inputRef?.click()}
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
            <Textarea
              height={"150px"}
              resize={"none"}
              onChange={(e) => {
                UptResumeItem<string>(e.target.value, "description");
              }}
              value={userResume?.description}
            />
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
        <Flex
          position={"fixed"}
          alignItems={"center"}
          bottom={"0"}
          left={"0"}
          height={"70px"}
          width={"100%"}
          zIndex={3}
          background={"white"}
          borderTop={`1px solid ${colors.secondery[300]}`}
          justifyContent={"center"}
          gap={"30px"}
        >
          <Box fontSize={"sm"} fontWeight={"bold"}>
            이곳에서 작성한 이력서 내용으로 기업에서 블록체인으로 검증이
            가능하니 정확히 작성해주세요! 😊
          </Box>
          <Button
            background={colors.blue[500]}
            color={"white"}
            fontSize={"sm"}
            borderRadius={"3xl"}
            pl={"30px"}
            pr={"30px"}
            _hover={{
              bg: `${colors.blue[600]}`,
            }}
            onClick={() => SaveResume()}
          >
            이력서 저장
          </Button>
        </Flex>
      </Box>
    </CenterLayout>
  );
};

const AddButton = ({ ...rest }: ButtonProps) => {
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
