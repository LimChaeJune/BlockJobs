import { render, screen } from "@testing-library/react";
import Profile_User from "./profile";

describe("유저 프로필 페이지 테스트", () => {
  it("renders a heading", () => {
    const { container } = render(<Profile_User />);

    expect(container).toMatchSnapshot();
  });
});
