import { Box, Heading } from "@chakra-ui/react";
import UserSideBar from "./sidenavbar";

interface Props {
  navbartitle: string;
  title: string;
  children: JSX.Element[] | JSX.Element;
}

const ProfileLayout = ({
  navbartitle,
  title,
  children,
}: Props): JSX.Element => {
  return (
    <Box width={"100%"}>
      <Heading>{title}</Heading>
      <UserSideBar title={navbartitle}>{children}</UserSideBar>
    </Box>
  );
};

export default ProfileLayout;
