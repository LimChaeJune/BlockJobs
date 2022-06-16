import { Flex, Icon } from "@chakra-ui/react";
import { useCallback, useEffect } from "react";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
import { BiPencil } from "react-icons/bi";
import { account_state } from "@state/web3/account";
import colors from "themes/foundations/colors";
import ProfileLayout from "@components/layouts/profilelayout";
import { enterprise_profileUpt } from "@components/utils/routing";
import { AccountUserType, Account_Model } from "@restapi/types/account";
import {
  Profile_Box,
  Profile_Info,
} from "@components/users/profile/Profile_Box";
import CenterLayout from "@components/layouts/centerlayout";
import { useUserLogin } from "@hooks/LoginCheck";

const Profile_Enterprise = () => {
  const [accountstate] = useRecoilState<Account_Model | null>(account_state);
  const router = useRouter();

  const UptEnter_Click = useCallback(() => {
    router.push({
      pathname: enterprise_profileUpt,
    });
  }, []);

  const { IsEnterprise } = useUserLogin();
  // 로그인 확인
  useEffect(() => {
    IsEnterprise();
  }, []);

  return (
    <CenterLayout>
      <ProfileLayout
        usertype={AccountUserType.Enterprise}
        title="프로필"
        navbartitle={`${accountstate?.enterprise?.title}님`}
      >
        <Profile_Box boxTitle="정보">
          <Profile_Info title="소재지">
            <Flex position={"relative"}>
              {accountstate?.enterprise.address}
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
                onClick={() => UptEnter_Click()}
              ></Icon>
            </Flex>
          </Profile_Info>
          <Profile_Info title="사업자 번호">
            {accountstate?.enterprise.businessNumber}
          </Profile_Info>
          <Profile_Info title="산업군">
            {accountstate?.enterprise.industry?.title}
          </Profile_Info>
        </Profile_Box>
      </ProfileLayout>
    </CenterLayout>
  );
};

export default Profile_Enterprise;
