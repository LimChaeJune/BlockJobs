/**
 * @jest-environment jsdom
 */

import { fireEvent, render } from "@testing-library/react";
import TokenSwap from "@components/utils/tokenSwap";

describe("TokenSwap Component", () => {
  it("render input", () => {
    const container = render(<TokenSwap />);
    const fromInput = container.getByLabelText("from-input");
    const toInput = container.getByLabelText("to-input");

    fireEvent.change(fromInput, { target: { value: "0.00001" } });
    expect(toInput.nodeValue).toBe(true);
  });
});
