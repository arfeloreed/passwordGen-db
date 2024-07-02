import Mode from "../src/mode.js";
import { genPass } from "../src/genPass.js";
import { storePass, searchAccnt, deleteAccnt, updatePass } from "../src/dbService.js";
import { connectDB, disconnectDB } from "../config/dbConfig.js";

(async function main() {
  await connectDB();
  console.log("Welcome to the pasword generator!\n");
  const { mode, website, email, passLen } = await Mode();

  console.clear();
  if (mode === 1) {
    // search for account of site name
    const { message, data } = await searchAccnt(website);
    // notify user of result of search
    if (message === "success") {
      console.log(`Account/s for ${email}:`);
      for (const account of data) {
        console.log(`Email: ${account.email}\t Password: ${account.password}`);
      }
    } else {
      console.log("No record exists.");
    }
  } else if (mode === 2) {
    // generate a password using passLen
    const password = genPass(passLen);
    // store the password to database
    const { message } = await storePass(website, email, password);
    // tell user if password is stored successfully or not
    if (message === "success") {
      console.log("Your password has been stored successfully.");
    } else {
      console.log("Can't store password.");
    }
  } else if (mode === 3) {
    // get new password
    const password = genPass(passLen);
    // update password
    const { message } = await updatePass(password, website, email);
    // notify user upon successful operation
    if (message === "success") {
      console.log(`Password edited for ${website} with email/username ${email}`);
    } else {
      console.log("Can't update password.");
    }
  } else if (mode === 4) {
    // delete account with website and email given
    const { message } = await deleteAccnt(website, email);
    // notify user if successful or not
    if (message === "success") {
      console.log("Account successfully deleted.");
    } else {
      console.log("Error deleting account or No record found.");
    }
  }

  await disconnectDB();
  process.exit(0);
})();
