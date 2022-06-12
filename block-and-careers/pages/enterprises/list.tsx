import { Box, Stack, Text, Image, Heading, Badge } from "@chakra-ui/react";
import CenterLayout from "@components/layouts/centerlayout";
import { link_companyDetail } from "@components/utils/routing";
import { GetAllEnterPrise } from "@restapi/enterprise/get";
import { EnterPrise_Entity } from "@restapi/types/enterprise";
import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import { useState } from "react";
import colors from "themes/foundations/colors";

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
        {companies?.map((item, idx) => {
          return <Company_Card company={item} key={idx} />;
        })}
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
    >
      <Stack
        width={{ xl: "25%", md: "50%", sm: "50%" }}
        border={`1px solid ${colors.secondery[400]}`}
        borderRadius={"xl"}
        cursor={"pointer"}
      >
        <Image src={company.thumbnail ?? ""} objectFit={"cover"} />
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
    </Link>
  );
};

export default Companies;
