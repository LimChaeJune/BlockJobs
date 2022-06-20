import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { account_state } from "@state/web3/account";
import colors from "themes/foundations/colors";
import { Account_Model } from "@restapi/types/account";
import Resume_Box from "@components/users/resume/Resume_Box";
import { useS3 } from "@hooks/S3Client";
import { useEffect, useState } from "react";
import { UpdateEnterPriseDto } from "@restapi/types/enterprise";
import { v4 as uuid } from "uuid";
import { UpdateEnterprise } from "@restapi/enterprise/post";
import CenterLayout from "@components/layouts/centerlayout";
import { useUserLogin } from "@hooks/LoginCheck";

const Recruit_Enterprise = () => {
  let inputRef: HTMLInputElement | null;

  const [accountstate] = useRecoilState<Account_Model | null>(account_state);
  const [updateEnterState, setUpdateEnter] = useState<UpdateEnterPriseDto>({
    enterpriseId: accountstate?.enterprise.id,
    ...accountstate?.enterprise,
  });
  const { handleFileInput, fileBaseUrl } = useS3();
  const [imageUrl, setImageUrl] = useState<string | undefined>(
    updateEnterState?.thumbnail
  );

  function UptEnterItem<T>(setItem: T, name: string) {
    if (updateEnterState) {
      setUpdateEnter({
        ...updateEnterState,
        [name]: setItem,
      });
    }
  }

  const ChangeImageUrl = (fileid: string) => {
    setImageUrl(fileBaseUrl + `${fileid}.png`);
    setUpdateEnter({
      ...updateEnterState,
      thumbnail: fileBaseUrl + `${fileid}.png`,
    });
  };

  // 저장
  const Btn_Save_Enterprise = async () => {
    await UpdateEnterprise(updateEnterState);
  };

  const { IsEnterprise } = useUserLogin();
  // 로그인 확인
  useEffect(() => {
    IsEnterprise();
  }, []);

  return (
    <CenterLayout>
      <Flex flexDirection={"column"} paddingBottom={"150px"} gap={5}>
        <Heading>{accountstate?.enterprise?.title}</Heading>
        <Flex>
          <Input
            ref={(refParam) => (inputRef = refParam)}
            type={"file"}
            hidden={true}
            onChange={(e) =>
              handleFileInput({
                id: `enterprise/${uuid()}`,
                e: e,
                uploadComplete: ChangeImageUrl,
              })
            }
          />
          <Box width={"300px"} height={"270px"} m={3} pos={"relative"}>
            <Image
              src={imageUrl ? imageUrl : `https://via.placeholder.com/300x270`}
              width={"300px"}
              height={"270px"}
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
              대표 사진 변경
            </Button>
          </Box>
        </Flex>

        <Resume_Box title="사업자 번호">
          <Input
            disabled={true}
            value={accountstate?.enterprise?.businessNumber}
          />
        </Resume_Box>

        <Resume_Box title="기업 소개">
          <Textarea
            resize={"none"}
            minHeight={"250px"}
            value={updateEnterState.description}
            onChange={(e) => {
              UptEnterItem<string>(e.target.value, "description");
            }}
          />
        </Resume_Box>

        <Resume_Box title="대표 이메일">
          <Input
            value={updateEnterState.email}
            onChange={(e) => {
              UptEnterItem<string>(e.target.value, "email");
            }}
          />
        </Resume_Box>
        <Resume_Box title="대표 주소">
          <Input
            value={updateEnterState.address}
            onChange={(e) => {
              UptEnterItem<string>(e.target.value, "address");
            }}
          />
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
          기업소개는 지원자가 보는 기업의 인상입니다! 정성껏 작성해주세요! 😊
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
          onClick={Btn_Save_Enterprise}
        >
          기업정보 저장
        </Button>
      </Flex>
    </CenterLayout>
  );
};

export default Recruit_Enterprise;
