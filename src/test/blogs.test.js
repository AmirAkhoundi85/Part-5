import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Blog from "../components/Blog";

test("renders content", () => {
  const blog = {
    title: "JavaScript",
    author: "Amir",
    url: "",
    likes: 100,
  };

  const { container } = render(<Blog blog={blog} />);

  const div = container.querySelector(".blog");
  expect(div).toHaveTextContent("JavaScript");
  expect(div).not.toHaveTextContent("Likes");
  expect(div).not.toHaveTextContent(blog.url);
});
