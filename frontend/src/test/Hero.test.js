import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import Hero from "../landing_page/home/Hero";
import Team from "../landing_page/about/Team";

describe("Hero Component", () => {
  test("renders Hero image", () => {
    render(<Hero />);
    const heroImage = screen.getByAltText("Hero Image");
    expect(heroImage).toBeInTheDocument(); // ensure the image is rendered
    expect(heroImage).toHaveAttribute("src", "/media/images/homeHero.png");
  });
});

describe("Team Component", () => {
test("renders Team component", () => {
    render(<Team />);
    const Image = screen.getByAltText("Nithin Kamath, CEO");
    expect(Image).toBeInTheDocument(); // ensure the image is rendered
    expect(Image).toHaveAttribute("src", "media/images/nithinKamath.jpg");
  });
}); 
