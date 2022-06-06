import { CloseButton, Divider, Flex } from "@chakra-ui/react";
import { Input_Box } from "@components/utils/Input_Box";
import { UserPortfolioEntity } from "@restapi/types/user";
import { profile_Portfolio } from "@state/user";
import { useCallback } from "react";
import { useRecoilState } from "recoil";
import colors from "themes/foundations/colors";

interface portfolio_props {
  portfolio: UserPortfolioEntity;
}

const Portfolio_Box = ({ portfolio }: portfolio_props) => {
  const [portfolioState, setPortfolio] =
    useRecoilState<UserPortfolioEntity[]>(profile_Portfolio);

  function UptItem<T>(setItem: T, name: string) {
    setPortfolio(
      portfolioState.map((item: UserPortfolioEntity) => {
        return item.id === portfolio.id ? { ...item, [name]: setItem } : item;
      })
    );
  }

  const Close_Btn_Cllick = useCallback(() => {
    if (portfolioState.length === 1) {
      return;
    }

    setPortfolio(portfolioState.filter((e) => e.id !== portfolio.id));
  }, [portfolioState]);

  return (
    <>
      <Divider />
      <Flex gap={3}>
        <Input_Box
          value={portfolio.title}
          title="제목"
          onChange={(e) => UptItem<string>(e.target.value, "title")}
        />
        <Input_Box
          value={portfolio.link}
          boxProps={{ flex: 1 }}
          title="링크"
          onChange={(e) => UptItem<string>(e.target.value, "link")}
        />
        <CloseButton
          color={colors.secondery[100]}
          ml={"10px"}
          fontSize={"xl"}
          onClick={Close_Btn_Cllick}
        ></CloseButton>
      </Flex>
    </>
  );
};

export default Portfolio_Box;
