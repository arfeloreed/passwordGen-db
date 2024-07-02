import readline from "readline";
import Mode from "../src/mode.js";

jest.mock("readline", () => ({
  createInterface: jest.fn().mockReturnValue({
    question: jest.fn(),
    close: jest.fn(),
  }),
}));
const rl = readline.createInterface();

describe("Mode", () => {
  afterEach(() => {
    rl.question.mockReset();
  });

  test("should prompt the user for inputs and return the mode and data", async () => {
    rl.question
      .mockImplementationOnce((query, callback) => callback("2"))
      .mockImplementationOnce((query, callback) => callback("example.com"))
      .mockImplementationOnce((query, callback) => callback("user@example.com"))
      .mockImplementationOnce((query, callback) => callback("15"));

    const result = await Mode();
    expect(result).toEqual({
      mode: 2,
      website: "example.com",
      email: "user@example.com",
      passLen: 15,
    });
  });
});
