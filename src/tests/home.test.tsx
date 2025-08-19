import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "@jest/globals";
import React from "react";
import HomePage from "@/app/page";

describe("Home", () => {
  it("renders homepage unchanged", async () => {
    const { container } = await render(<HomePage />);
    await expect(container).toMatchSnapshot();
  });
});
