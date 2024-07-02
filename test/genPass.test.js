import { genPass } from "../src/genPass.js";

test("password length is 15", () => {
  const length = 15;
  const password = genPass(length);
  expect(password).toHaveLength(length);
});

test("password contains only alphanumeric characters", () => {
  const len = 15;
  const password = genPass(len);
  expect(password).toMatch(/^[a-zA-Z0-9]+$/);
});
