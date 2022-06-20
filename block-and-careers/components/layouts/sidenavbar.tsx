import React, { ReactNode } from "react";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Heading,
} from "@chakra-ui/react";
import { FiUser, FiMenu } from "react-icons/fi";
import {
  BsPencilSquare,
  BsBuilding,
  BsCoin,
  BsNewspaper,
} from "react-icons/bs";
import { IconType } from "react-icons";
import { ReactText } from "react";
import colors from "themes/foundations/colors";
import { useRouter } from "next/router";
import {
  enterprise_career,
  enterprise_profile,
  enterprise_token,
  user_Career,
  user_profile,
  user_Review,
  user_Token,
} from "@components/utils/routing";
import shadows from "themes/foundations/shadows";
import { AccountUserType } from "@restapi/types/account";

interface LinkItemProps {
  name: string;
  icon: IconType;
  path: string;
  type: AccountUserType;
}
const LinkItems: Array<LinkItemProps> = [
  {
    name: "나의 프로필",
    icon: FiUser,
    path: user_profile,
    type: AccountUserType.Customer,
  },
  {
    name: "나의 리뷰",
    icon: BsPencilSquare,
    path: user_Review,
    type: AccountUserType.Customer,
  },
  {
    name: "토큰",
    icon: BsCoin,
    path: user_Token,
    type: AccountUserType.Customer,
  },
  {
    name: "신청 경력 현황",
    icon: BsNewspaper,
    path: user_Career,
    type: AccountUserType.Customer,
  },
  // { name: "관심 공고", icon: FiStar, path: "" },
  // { name: "받은 제안", icon: FiMail, path: "" },

  {
    name: "기업 정보",
    icon: BsBuilding,
    path: enterprise_profile,
    type: AccountUserType.Enterprise,
  },
  {
    name: "토큰",
    icon: BsCoin,
    path: enterprise_token,
    type: AccountUserType.Enterprise,
  },
  {
    name: "받은 경력 현황",
    icon: BsNewspaper,
    path: enterprise_career,
    type: AccountUserType.Enterprise,
  },
];

export default function UserSideBar({
  title,
  children,
  usertype,
}: {
  title: string;
  children: ReactNode;
  usertype: AccountUserType;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100%" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
        navTitle={title}
        mt={"16px"}
        boxShadow={shadows.outline}
        usertype={usertype}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent
            onClose={onClose}
            navTitle={title}
            usertype={usertype}
          />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      <Flex
        ml={{ base: 0, md: 60 }}
        p="4"
        flexDirection={"column"}
        gap={"30px"}
      >
        {children}
      </Flex>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  navTitle: string;
  onClose: () => void;
  usertype: AccountUserType;
}

const SidebarContent = ({
  navTitle,
  onClose,
  usertype,
  ...rest
}: SidebarProps) => {
  const route = useRouter();

  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h={{ base: "flex", md: "auto" }}
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Heading fontSize={"2xl"}>{navTitle}</Heading>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.filter((e) => e.type == usertype).map((link) => (
        <NavItem
          key={link.name}
          icon={link.icon}
          href={link.path}
          isActive={route.pathname === link.path}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  isActive: boolean;
  href: string;
  children: ReactText;
}
const NavItem = ({ icon, isActive, children, href, ...rest }: NavItemProps) => {
  return (
    <Link
      href={href}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        mb={2}
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: `${colors.secondery[300]}`,
        }}
        {...(isActive
          ? { bg: `${colors.blue[100]}`, color: colors.highlight }
          : null)}
        {...rest}
      >
        {icon && <Icon mr="4" fontSize="16" as={icon} />}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        Logo
      </Text>
    </Flex>
  );
};
