import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Blog from "../components/Blog";
import userEvent from "@testing-library/user-event";

import App from "../App";
import NewBlog from "../components/NewBlog";
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

test("renders detailed content after clicking 'view' button", async () => {
  const blog = {
    title: "JavaScript",
    author: "Amir",
    url: "https://example.com",
    likes: 100,
  };

  const { container, getByText } = render(<Blog blog={blog} />);

  const user = userEvent.setup();
  const viewButton = getByText("view");
  await user.click(viewButton);
  const div = container.querySelector(".blog");
  expect(div).toHaveTextContent("JavaScript");
  expect(div).toHaveTextContent("Amir");
  expect(div).toHaveTextContent("Likes 100");
  expect(div).toHaveTextContent(blog.url);
});

