import { Box, Flex, Heading, Icon, Select } from "@chakra-ui/react";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { balance, account_state } from "@state/web3/account";
import { Account_Model } from "@restapi/types/account";
import colors from "themes/foundations/colors";
import shadows from "themes/foundations/shadows";
import ProfileLayout from "@components/layouts/profilelayout";
import { BiPencil } from "react-icons/bi";
import Link from "next/link";
import { user_resume } from "@components/utils/routing";
import { useRouter } from "next/router";
import { UserResumeEntity } from "@restapi/types/user";
import { resumeState } from "@state/user";
import { GetUserResumes } from "@restapi/users/get";

const Profile_User = () => {
  const [accountstate] = useRecoilState<Account_Model | null>(account_state);
  const [balanceState] = useRecoilState<string | undefined>(balance);
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
        setCurrResume(resumes[0] ?? null);
      });
    };
    action();
  }, []);

  return (
    <ProfileLayout title="프로필" navbartitle={`${accountstate?.user.name}님`}>
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
            <Profile_Info title="학교">
              {resumes[0].educations?.[0].name}
            </Profile_Info>
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

      <Profile_Box boxTitle="지갑정보">
        <Profile_Info title="지갑 주소">{`${accountstate?.accountAddress}`}</Profile_Info>
        <Profile_Info title="토큰 보유량">{`${balanceState} JJC`}</Profile_Info>
      </Profile_Box>

      <Profile_Box boxTitle="전문분야">
        <Link href={user_resume} passHref>
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
        </Link>
        <Profile_Info title="직군">{`${
          accountstate?.user.job.find((e) => e.level == 0)?.title
        }`}</Profile_Info>
      </Profile_Box>
    </ProfileLayout>
  );
};

interface Box_Props {
  boxTitle: string;
  children: ReactNode;
}
export const Profile_Box = ({ boxTitle, children }: Box_Props) => {
  return (
    <Box
      w={"100%"}
      boxShadow={shadows.outline}
      padding={"3em 2em 2em 2em"}
      borderRadius={"2px"}
      background={"white"}
      position={"relative"}
      role="group"
    >
      <Heading fontSize={"lg"} mb={"1em"}>
        {boxTitle}
      </Heading>
      {children}
    </Box>
  );
};

interface Info_Props {
  title: string;
  children: ReactNode;
}

export const Profile_Info = ({ title, children }: Info_Props) => {
  return (
    <Flex w={"100%"} mb={"1em"} gap={"5px"} flexDirection={"column"}>
      <Heading fontSize={"md"} color={`${colors.secondery[500]}`}>
        {title}
      </Heading>
      {children}
    </Flex>
  );
};

export default Profile_User;
