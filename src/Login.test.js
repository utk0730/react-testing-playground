import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Login from "./Login";

jest.mock("axios", () => ({
  __esModule: true,

  default: {
    get: () => ({
      data: { id: 1, name: "abc" },
    }),
  },
}));

describe("Inital render, Login Form", () => {
  test("Login Button should have text as 'Login'", () => {
    render(<Login />);
    const btnElement = screen.getByRole("button", { name: /login/i });
    expect(btnElement).toBeInTheDocument();
  });
  test("Login Button should be disabled'", () => {
    render(<Login />);
    const btnElement = screen.getByRole("button", { name: /login/i });
    expect(btnElement).toBeDisabled();
  });
  test("Password checklist items length should be 4", () => {
    render(<Login />);
    const passwordCheckListItems = screen.getAllByRole("listitem");
    expect(passwordCheckListItems.length).toEqual(4);
    expect(passwordCheckListItems).toHaveLength(4);
  });

  test("Username input should be rendered with empty value", () => {
    render(<Login />);
    const usernameElement = screen.getByPlaceholderText(/username/i);
    expect(usernameElement).toBeInTheDocument();
    expect(usernameElement).toHaveValue("");
  });

  test("Password input should be rendered with empty value", () => {
    render(<Login />);
    const passwordElement = screen.getByPlaceholderText(/password/i);
    expect(passwordElement).toBeInTheDocument();
    expect(passwordElement).toHaveValue("");
  });

  test("Error should not be visible", () => {
    render(<Login />);
    const errorElement = screen.getByTestId("login-error");
    expect(errorElement).not.toBeVisible();
  });
});

describe("Login form functionality", () => {
  test("username should change", () => {
    render(<Login />);
    const usernameIp = screen.getByPlaceholderText(/username/i);
    const testValue = "utk";
    fireEvent.change(usernameIp, { target: { value: testValue } });
    expect(usernameIp.value).toBe(testValue);
  });
  test("password should change", () => {
    render(<Login />);
    const passwordIp = screen.getByPlaceholderText(/password/i);
    const testValue = "utk";
    fireEvent.change(passwordIp, { target: { value: testValue } });
    expect(passwordIp.value).toBe(testValue);
  });

  test("Login should not be disabled when input values exist", () => {
    render(<Login />);
    const loginBtn = screen.getByRole("button", { name: /login/i });
    const usernameIp = screen.getByPlaceholderText(/username/i);
    const passwordIp = screen.getByPlaceholderText(/password/i);
    const testValueUsername = "Utkarsh";
    const testValuePassword = "password";
    fireEvent.change(usernameIp, { target: { value: testValueUsername } });
    fireEvent.change(passwordIp, { target: { value: testValuePassword } });
    expect(loginBtn).not.toBeDisabled();
  });

  test("loading should be rendered when click", async () => {
    render(<Login />);
    const loginBtn = screen.getByRole("button", { name: /login/i });
    const usernameIp = screen.getByPlaceholderText(/username/i);
    const passwordIp = screen.getByPlaceholderText(/password/i);
    const testValueUsername = "Utkarsh";
    const testValuePassword = "password";
    fireEvent.change(usernameIp, { target: { value: testValueUsername } });
    fireEvent.change(passwordIp, { target: { value: testValuePassword } });
    fireEvent.click(loginBtn);
    await waitFor(() => {
      expect(loginBtn).not.toHaveTextContent(/please wait/i);
    });
  });

  test("loading should not be rendered after fetching success", async () => {
    render(<Login />);
    const loginBtn = screen.getByRole("button", { name: /login/i });
    const usernameIp = screen.getByPlaceholderText(/username/i);
    const passwordIp = screen.getByPlaceholderText(/password/i);
    const testValueUsername = "Utkarsh";
    const testValuePassword = "password";
    fireEvent.change(usernameIp, { target: { value: testValueUsername } });
    fireEvent.change(passwordIp, { target: { value: testValuePassword } });
    fireEvent.click(loginBtn);

    await waitFor(() => {
      expect(loginBtn).not.toHaveTextContent(/please wait/i);
    });
  });

  test("user should be rendered after fetching", async () => {
    render(<Login />);

    const loginBtn = screen.getByRole("button", { name: /login/i });
    const usernameInputEl = screen.getByPlaceholderText(/username/i);
    const passwordInputEl = screen.getByPlaceholderText(/password/i);

    const testValue = "test";

    fireEvent.change(usernameInputEl, { target: { value: testValue } });
    fireEvent.change(passwordInputEl, { target: { value: testValue } });
    expect(loginBtn).toHaveTextContent(/login/i);
    fireEvent.click(loginBtn);
    expect(loginBtn).toHaveTextContent(/please wait/i);
    const userItem = await screen.findByText("abc");
    expect(userItem).toBeInTheDocument();
    expect(loginBtn).not.toHaveTextContent(/please wait/i);
  });
});
