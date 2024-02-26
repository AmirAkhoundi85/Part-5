import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Blog from "../components/Blog";
import userEvent from "@testing-library/user-event";

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

test("renders detailed content after clicking 'View' button", async () => {
  const blog = {
    title: "JavaScript",
    author: "Amir",
    url: "https://example.com",
    likes: 100,
  };

  const { container, getByText } = render(<Blog blog={blog} />);

  const viewButton = getByText("view");
  await userEvent.click(viewButton);
  const div = container.querySelector(".blog");
  expect(div).toHaveTextContent("JavaScript");
  expect(div).toHaveTextContent("Amir");
  expect(div).toHaveTextContent("Likes 100");
  expect(div).toHaveTextContent(blog.url);
});

test("like button click calls event handler twice", async () => {
  const blog = {
    title: "JavaScript",
    author: "Amir",
    url: "",
    likes: 100,
  };

  // Mocking the event handler function
  const mockLikeHandler = jest.fn();

  const { getByText } = render(<Blog blog={blog} onLike={mockLikeHandler} />);

  // Find the view button and click it
  const viewButton = getByText("view");
  await userEvent.click(viewButton);

  // Find the like button in the rendered component
  const likeButton = screen.getByText("Like");

  // Click the like button twice using userEvent
  await userEvent.click(likeButton);
  await userEvent.click(likeButton);

  // Expect the event handler to be called twice
  expect(mockLikeHandler.mock.calls).toHaveLength(2);
});
