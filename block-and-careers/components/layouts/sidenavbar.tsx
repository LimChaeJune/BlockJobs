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
import { FiMail, FiUser, FiStar, FiMenu } from "react-icons/fi";
import { HiOutlineSwitchHorizontal, HiPencil } from "react-icons/hi";
import { IconType } from "react-icons";
import { ReactText } from "react";
import colors from "themes/foundations/colors";
import { useRouter } from "next/router";
import {
  user_profile,
  user_career_list,
  token_sawp,
} from "@components/utils/routing";
import shadows from "themes/foundations/shadows";
interface LinkItemProps {
  name: string;
  icon: IconType;
  path: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: "나의 프로필", icon: FiUser, path: user_profile },
  { name: "경력현황", icon: HiPencil, path: user_career_list },
  { name: "관심 공고", icon: FiStar, path: "" },
  { name: "받은 제안", icon: FiMail, path: "" },
  { name: "토큰 스왑", icon: HiOutlineSwitchHorizontal, path: token_sawp },
];

export default function UserSideBar({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
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
          <SidebarContent onClose={onClose} navTitle={title} />
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
}

const SidebarContent = ({ navTitle, onClose, ...rest }: SidebarProps) => {
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
      {LinkItems.map((link) => (
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
