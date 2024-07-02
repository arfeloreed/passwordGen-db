import { storePass, searchAccnt, deleteAccnt, updatePass } from "../src/dbService";
import { db } from "../config/dbConfig";

jest.mock("../config/dbConfig", () => {
  const mockClient = {
    connect: jest.fn(),
    end: jest.fn(),
    query: jest.fn(),
  };
  return { db: mockClient };
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe("dbService", () => {
  test("should store a password", async () => {
    db.query.mockResolvedValueOnce({});

    const result = await storePass("example.com", "user@example.com", "password123");
    expect(result.message).toBe("success");
    expect(db.query).toHaveBeenCalledWith(
      "INSERT INTO passwords(website, email, password) VALUES($1, $2, $3)",
      ["example.com", "user@example.com", "password123"]
    );
  });

  test("should search for an account", async () => {
    const mockData = { rows: [{ email: "user@example.com", password: "password123" }] };
    db.query.mockResolvedValueOnce(mockData);

    const result = await searchAccnt("example.com");
    expect(result.message).toBe("success");
    expect(result.data).toEqual(mockData.rows);
    expect(db.query).toHaveBeenCalledWith(
      "SELECT email, password FROM passwords WHERE website=$1",
      ["example.com"]
    );
  });

  test("should update a password", async () => {
    const mockData = { rows: [{ email: "user@example.com", password: "password321" }] };
    db.query.mockResolvedValueOnce(mockData);

    const result = await updatePass("password321", "example.com", "user@example.com");
    expect(result.message).toBe("success");
    expect(db.query).toHaveBeenCalledWith(
      "UPDATE passwords SET password=$1 WHERE website=$2 AND email=$3 RETURNING email, password",
      ["password321", "example.com", "user@example.com"]
    );
  });

  test("should delete an account", async () => {
    const mockData = { rows: [{ email: "user@example.com" }] };
    db.query.mockResolvedValueOnce(mockData);

    const result = await deleteAccnt("example.com", "user@example.com");
    expect(result.message).toBe("success");
    expect(db.query).toHaveBeenCalledWith(
      "DELETE FROM passwords WHERE website=$1 AND email=$2 RETURNING email",
      ["example.com", "user@example.com"]
    );
  });
});
