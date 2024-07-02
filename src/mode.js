import readline from "readline";

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askUser(query) {
  return new Promise((resolve) => {
    rl.question(query, (answer) => resolve(answer));
  });
}

async function Mode() {
  let mode;
  let website = "";
  let email = "";
  let passLen = 15;
  mode = await askUser(
    `Choose mode:
	1. Search for password for an existing account.
	2. Generate new password for a new account.
	3. Edit password for an existing account.
	4. Delete account.
	5. Exit
	Enter mode: `
  );
  if (/[a-z]/i.test(mode) || parseInt(mode) < 1 || parseInt(mode) > 5) {
    console.clear();
    console.log("Invalid mode\n");
    rl.close();
    process.exit(1);
  }
  mode = parseInt(mode);

  console.clear();
  if (mode !== 5)
    website = await askUser("Enter site name of account with suffix(eg .com): ");

  if (mode === 2 || mode === 3 || mode === 4)
    email = await askUser("Enter email or username: ");

  if (mode === 2 || mode === 3) {
    passLen = await askUser(
      "Passwords should be atleast 15 characters long\
      \nEnter new password length: "
    );
    if (/[a-z]/i.test(passLen) || parseInt(passLen) < 15) {
      console.clear();
      console.log("Invalid password length");
      rl.close();
      process.exit(1);
    }
    passLen = parseInt(passLen);
  }
  if (mode === 5) console.log("Exiting...\nSee ya later!");

  rl.close();
  return { mode, website, email, passLen };
}

export default Mode;
