import { CloseButton, Flex } from "@chakra-ui/react";
import { Input_Box } from "@components/utils/Input_Box";
import { UserPortfolioForm } from "@state/user";
import colors from "themes/foundations/colors";

interface portfolio_props {
  portfolio: UserPortfolioForm;
}

const Portfolio_Box = ({ portfolio }: portfolio_props) => {
  return (
    <Flex>
      <Input_Box title="제목">{portfolio.title}</Input_Box>
      <Input_Box boxProps={{ flex: 1 }} title="링크">
        {portfolio.link}
      </Input_Box>
      <CloseButton
        color={colors.secondery[100]}
        ml={"10px"}
        fontSize={"xl"}
      ></CloseButton>
    </Flex>
  );
};

export default Portfolio_Box;
