// TODOS
// 1. Require bcrypt
// 2. Get a password from the user
// 3. Hash the password and store result in a local variable
// 4. Get another password from the user
// 5. If the second password matches the first one, print a success message
// 6. If the second password does not match the first one, print 'access denied'
const readlineSync = require('readline-sync');
const bcrypt = require('bcrypt');

// Initial setup for bcrypt
const saltRounds = 10;

// Wait for user's response.
let userName = readlineSync.question('May I have your name? ');
console.log('Hi ' + userName + '!');
getMatchedPasswords();

function getMatchedPasswords() {
  let password1 = readlineSync.question('Set a password: ', {
    hideEchoBack: true,
  });
  let hashedPassword1 = bcrypt.hashSync(password1, saltRounds);
  let password2 = readlineSync.question('Retype password: ', {
    hideEchoBack: true,
  });
  if (bcrypt.compareSync(password2, hashedPassword1)) {
    console.log('Passwords match');
  } else {
    console.log('Passwords do not match');
    getMatchedPasswords();
  }
}
