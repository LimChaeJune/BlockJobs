import {
  Box,
  Stack,
  Text,
  Image,
  Heading,
  Badge,
  Flex,
} from "@chakra-ui/react";
import CenterLayout from "@components/layouts/centerlayout";
import { link_companyDetail } from "@components/utils/routing";
import { GetAllEnterPrise } from "@restapi/enterprise/get";
import { EnterPrise_Entity } from "@restapi/types/enterprise";
import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import colors from "themes/foundations/colors";
import NextImage from "next/image";
import noimage from "../../public/images/noimage.png";

export async function getStaticProps() {
  const res_industry = await GetAllEnterPrise();
  const All_company = res_industry.data;

  return {
    props: {
      companies: All_company,
    },
  };
}

function Companies({
  companies,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <CenterLayout>
      <Heading mb={"50px"}>기업 목록</Heading>
      <Box>
        <Flex flexWrap={"wrap"}>
          {companies?.map((item, idx) => {
            return <Company_Card company={item} key={idx} />;
          })}
        </Flex>
      </Box>
    </CenterLayout>
  );
}

interface companyCard_props {
  company: EnterPrise_Entity;
}

const Company_Card = ({ company }: companyCard_props) => {
  return (
    <Link
      href={{
        pathname: link_companyDetail,
        query: { enterpriseId: company.id },
      }}
      passHref
    >
      <Box
        width={{ xl: "25%", md: "50%", sm: "50%" }}
        padding={"10px"}
        minH={{ xl: "320px" }}
      >
        <Stack
          height={"100%"}
          border={`1px solid ${colors.secondery[400]}`}
          borderRadius={"xl"}
          cursor={"pointer"}
        >
          <Box position={"relative"} height={"45%"} width={"100%"}>
            {company.thumbnail ? (
              <Image
                borderRadius={"10px 10px 0 0"}
                width={"100%"}
                height={"100%"}
                src={company.thumbnail ?? ""}
                objectFit={"cover"}
                alt={"company"}
              />
            ) : (
              <NextImage
                style={{ borderRadius: "10px 10px 0 0" }}
                layout="fill"
                objectFit={"cover"}
                src={noimage}
              />
            )}
          </Box>

          <Box p={5}>
            <Badge
              borderRadius="full"
              px="2"
              background={colors.blue[400]}
              color={colors.white}
              fontSize={"sm"}
            >
              {company.employees}
            </Badge>
            <Heading mt={"5px"} mb={"5px"} fontSize={"md"}>
              {company.title}
            </Heading>
            <Box>
              <Text noOfLines={2}>{company.description}</Text>
            </Box>
          </Box>
        </Stack>
      </Box>
    </Link>
  );
};

export default Companies;
