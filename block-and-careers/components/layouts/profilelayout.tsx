import { Box, Heading } from "@chakra-ui/react";
import { AccountUserType } from "@restapi/types/account";
import UserSideBar from "./sidenavbar";

interface Props {
  navbartitle: string;
  title: string;
  usertype: AccountUserType;
  children: JSX.Element[] | JSX.Element;
}

const ProfileLayout = ({
  navbartitle,
  title,
  children,
  usertype,
}: Props): JSX.Element => {
  return (
    <Box width={"100%"}>
      <Heading>{title}</Heading>
      <UserSideBar usertype={usertype} title={navbartitle}>
        {children}
      </UserSideBar>
    </Box>
  );
};

export default ProfileLayout;
