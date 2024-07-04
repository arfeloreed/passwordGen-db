import { db } from "../config/dbConfig.js";

let message = "success";

async function storePass(website, email, password) {
  try {
    const str = "INSERT INTO passwords(website, email, password) VALUES($1, $2, $3)";
    await db.query(str, [website, email, password]);
    return { message };
  } catch (err) {
    console.error("Error storing password: ", err.message);
    return { message: "error" };
  }
}

async function searchAccnt(website) {
  try {
    const str = "SELECT email, password FROM passwords WHERE website=$1";
    const res = await db.query(str, [website]);
    const data = res.rows;
    if (data.length === 0) return { message: "error", data: [] };
    return { message, data };
  } catch (err) {
    console.error("Error searching for account: ", err.message);
    return { message: "error", data: [] };
  }
}

async function deleteAccnt(website, email) {
  try {
    const str = "DELETE FROM passwords WHERE website=$1 AND email=$2 RETURNING email";
    const res = await db.query(str, [website, email]);
    if (res.rows.length === 0) return { message: "error" };
    return { message };
  } catch (err) {
    console.error("Error deleting account: ", err.message);
    return { message: "error" };
  }
}

async function updatePass(password, website, email) {
  try {
    let str = "SELECT password FROM passwords WHERE website=$1 AND email=$2";
    let res = await db.query(str, [website, email]);
    const { password: prevPass } = res.rows[0];
    str =
      "UPDATE passwords SET password=$1 WHERE website=$2 AND email=$3 RETURNING password_id";
    res = await db.query(str, [password, website, email]);
    if (res.rows.length === 0) return { message: "error" };

    const { password_id } = res.rows[0];
    try {
      const prevStr = "INSERT INTO prev_passwords(password_id, password) VALUES($1, $2)";
      await db.query(prevStr, [password_id, prevPass]);
    } catch (err) {
      console.error("Error storing previous password: ", err.message);
      return { message: "error" };
    }
    return { message };
  } catch (err) {
    console.error("Error updating password: ", err.message);
    return { message: "error" };
  }
}

export { storePass, searchAccnt, deleteAccnt, updatePass };
