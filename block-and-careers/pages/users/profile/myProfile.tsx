import { Box, Flex, Icon, Select } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
import { BiPencil } from "react-icons/bi";
import { account_state } from "@state/web3/account";
import { resumeState } from "@state/user";
import colors from "themes/foundations/colors";
import ProfileLayout from "@components/layouts/profilelayout";
import { user_resume } from "@components/utils/routing";
import { AccountUserType, Account_Model } from "@restapi/types/account";
import { UserResumeEntity } from "@restapi/types/user";
import { GetUserResumes } from "@restapi/users/get";
import {
  Profile_Box,
  Profile_Info,
} from "@components/users/profile/Profile_Box";

const Profile_User = () => {
  const [accountstate] = useRecoilState<Account_Model | null>(account_state);
  const [resumes, setResumes] = useRecoilState<UserResumeEntity[]>(resumeState);
  const [curr_resume, setCurrResume] = useState<UserResumeEntity | null>();
  const router = useRouter();

  const UptResume_Click = useCallback((id: string | null = null) => {
    router.push({ pathname: user_resume, query: { resumeId: id ?? "newid" } });
  }, []);

  const CurrResume_Changed = (resumeId: string) => {
    setCurrResume(resumes.find((e) => e.resumeId === resumeId));
  };

  useEffect(() => {
    const action = async () => {
      await GetUserResumes(accountstate?.user.id ?? "").then((res) => {
        console.log(res);
        setResumes(res.data);
        setCurrResume(res.data[0] ?? null);
      });
    };
    action();
  }, []);

  return (
    <ProfileLayout
      title="프로필"
      usertype={AccountUserType.Customer}
      navbartitle={`${accountstate?.user?.name}님`}
    >
      <Profile_Box boxTitle="정보">
        {resumes.length > 0 ? (
          <>
            <Profile_Info title="기본 이력서">
              <Flex position={"relative"}>
                <Select
                  width={"50%"}
                  onChange={(e) => CurrResume_Changed(e.target.value)}
                >
                  {resumes.map((resume, idx) => {
                    return (
                      <option key={idx} value={resume.resumeId}>
                        {resume.title}
                      </option>
                    );
                  })}
                </Select>
                <Icon
                  position={"absolute"}
                  top={0}
                  right={3}
                  color={colors.blue[500]}
                  fontSize={"2xl"}
                  display={"none"}
                  as={BiPencil}
                  cursor="pointer"
                  _groupHover={{ display: "block" }}
                  onClick={() => UptResume_Click(curr_resume?.resumeId)}
                ></Icon>
              </Flex>
            </Profile_Info>
            {curr_resume?.educations ? (
              <Profile_Info title="학교">
                {`${curr_resume?.educations?.[0].name} (${curr_resume?.educations?.[0].major})` ??
                  "최종 학력을 입력해주세요"}
              </Profile_Info>
            ) : null}
          </>
        ) : (
          <Box
            onClick={() => UptResume_Click()}
            color={colors.highlight}
            fontSize={"lg"}
            _hover={{ cursor: "pointer" }}
          >
            + 새 이력서 작성하기
          </Box>
        )}
      </Profile_Box>

      <Profile_Box boxTitle="전문분야">
        <Icon
          position={"absolute"}
          top={30}
          right={30}
          fontSize={"2xl"}
          display={"none"}
          as={BiPencil}
          cursor="pointer"
          _groupHover={{ display: "block" }}
        ></Icon>
        <Profile_Info title="직군">{`${
          accountstate?.user?.job?.find((e) => e.level == 0)?.title
        }`}</Profile_Info>
      </Profile_Box>
    </ProfileLayout>
  );
};

export default Profile_User;
