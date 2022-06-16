import { useRecoilState } from "recoil";
import { AccountUserType, Account_Model } from "@restapi/types/account";
import { CareerStatus, Career_Item } from "@restapi/types/career";
import { account_state } from "@state/web3/account";
import { useBlockJobs } from "@hooks/BlockJobsContract";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  Profile_Box,
  Profile_Info,
} from "@components/users/profile/Profile_Box";
import ProfileLayout from "@components/layouts/profilelayout";
import { GetUserByAccount } from "@restapi/users/get";
import { User_Entity } from "@restapi/types/user";
import colors from "themes/foundations/colors";
import CenterLayout from "@components/layouts/centerlayout";
import LoadingModal from "@components/utils/loadingModal";
import { useContractModal } from "@hooks/ContractModalHook";

const CareerList = () => {
  // Contract Hooks
  const { getCareerByCompany, approveCareer, contractState } = useBlockJobs();

  // 지갑 상태
  const [accountstate] = useRecoilState<Account_Model | null>(account_state);
  // 컨트랙트로 등록된 경력
  const [contractCareer, setCareer] = useState<Career_Item[]>([]);

  const {
    isReject,
    isSignWait,
    receiptLink,
    description,
    isOpen,
    SignOpen,
    RejectOpen,
    SuccessOpen,
    onClose,
  } = useContractModal();

  // 컨트랙트로 등록된 경력 조회
  const getContractCareer = async () => {
    const value: Career_Item[] = await getCareerByCompany(
      accountstate?.accountAddress
    );
    setCareer(value);
  };

  // approve Callback 함수
  const Btn_Click_Career = async ({
    careerid,
    from,
    status,
  }: {
    careerid: number;
    from: string;
    status: CareerStatus;
  }) => {
    await SignOpen(`${from}이 신청한 경력을 '${CareerStatus[status]}' 검증`);

    await approveCareer({ careerId: careerid, status: status })
      .then(async (receipt) => {
        await SuccessOpen(receipt.transactionHash);
      })
      .catch(async (error) => {
        await RejectOpen(error);
      });
  };

  useEffect(() => {
    // DB에 등록된 경력
    getContractCareer();
  }, [accountstate?.accountAddress, contractState]);

  return (
    <CenterLayout>
      <ProfileLayout
        title="경력 현황"
        usertype={AccountUserType.Enterprise}
        navbartitle={`${accountstate?.enterprise?.title}님`}
      >
        <Profile_Box boxTitle="검증을 신청받은 경력">
          <Flex gap={5} direction={"column"}>
            {contractCareer?.length > 0 ? (
              contractCareer
                ?.slice()
                .sort((x) => x.id)
                .map((item, idx) => {
                  return (
                    <Contract_Career_Card
                      Career_Approve={Btn_Click_Career}
                      key={idx}
                      career={item}
                    />
                  );
                })
            ) : (
              <Heading textAlign={"center"} fontSize={"xl"}>
                신청 받은 경력이 없습니다.
              </Heading>
            )}
          </Flex>
        </Profile_Box>
        <LoadingModal
          isOpen={isOpen}
          onClose={onClose}
          reciptLink={receiptLink}
          description={description}
          isReject={isReject}
          isSignWait={isSignWait}
        />
      </ProfileLayout>
    </CenterLayout>
  );
};

interface contract_career_props {
  career: Career_Item;
  Career_Approve: ({
    careerid,
    from,
    status,
  }: {
    careerid: number;
    from: string;
    status: CareerStatus;
  }) => void;
}

const Contract_Career_Card = ({
  career,
  Career_Approve,
}: contract_career_props) => {
  const [user, setUser] = useState<User_Entity>();

  const getuserAccount = async () => {
    await GetUserByAccount(career.worker).then((res) => {
      setUser(res.data);
    });
  };

  const Btn_Click_Career = async ({ status }: { status: CareerStatus }) => {
    Career_Approve({
      careerid: career.id,
      from: career.worker,
      status: status,
    });
  };

  useEffect(() => {
    getuserAccount();
  }, []);

  return (
    <Box
      border={"1px solid gray"}
      boxShadow={"xl"}
      borderRadius={"md"}
      padding={5}
    >
      <Profile_Info title="처리 상태">
        <Text
          color={
            parseInt(career.status.toString()) === 1
              ? "blue.300"
              : parseInt(career.status.toString()) === 2
              ? "red.400"
              : "black"
          }
        >
          {CareerStatus[parseInt(career.status.toString())]}
        </Text>
      </Profile_Info>
      <Flex>
        <Profile_Info title="직무">{career.roles.join(", ")}</Profile_Info>
        <Profile_Info title="근무 기간">{`${new Date(
          career.stDt.toNumber()
        ).toLocaleDateString()} ~ ${new Date(
          career.fnsDt.toNumber()
        ).toLocaleDateString()}`}</Profile_Info>
      </Flex>
      <Profile_Info title="근무내용">{`${career.description}`}</Profile_Info>
      <Profile_Info title="신청자">{`${career.worker} (${
        user?.name ?? "회원등록 되지 않은 유저입니다."
      })`}</Profile_Info>
      {parseInt(career.status.toString()) === 0 ? (
        <Flex gap={5}>
          <Button
            bg={colors.blue[300]}
            _hover={{
              bg: colors.blue[400],
            }}
            color={"white"}
            onClick={() => Btn_Click_Career({ status: CareerStatus.승인 })}
          >
            승인
          </Button>
          <Button
            bg={"red.300"}
            _hover={{
              bg: "red.400",
            }}
            color={"white"}
            onClick={() => Btn_Click_Career({ status: CareerStatus.거절 })}
          >
            거절
          </Button>
        </Flex>
      ) : null}
    </Box>
  );
};

export default CareerList;
