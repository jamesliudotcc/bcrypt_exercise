# What is BCrypt?

[BCrypt](https://en.wikipedia.org/wiki/Bcrypt) is a password hashing function. This is a process where you take sensitive data and scramble it with an algorithm. We don't need to know the implementation of this algorithm. BCrypt has been used since 1999, and has implementations in many languages, so we know it's trustworthy at this point!

## Directions

* Grab a computer
* Grab a buddy - this can be a partner exercise! (still turn in separately if you do, though!)
* Fork and clone this repository
* Run `npm install`
* Read through the lab and answer the questions
* Do the code exercise at the end of this lab

### Encryption vs Hashing

Encryption and hashing are commonly confused terms. They mean similar things, but have a very important difference!

<details>
  <summary>Question: What is the opposite of encryption?</summary>
  <br>Decryption. Encryption is a process that can be reversed! This is often done with public-private key pairs.
</details>

<details>
  <summary>Question: What is the opposite of hashing?</summary>
  <br>There isn't one. Hashing is a process that cannot be reversed!
</details>

### Real Life Examples

#### 1. Each person should come up with an example of how encryption is used in real life. There are many to choose from!

<details>
  <summary>Question: What are some examples of encryption?</summary>
  <br>
  <strong>There's a bunch!</strong> Here's a few...
  <br>
  <ul>
      <li>Credit card numbers stored in a company's database</li>
      <li>Your Github SSH keys</li>
      <li>Form data from a form using POST method (this is why we use body-parser!)</li>
      <li>To protect military, government, or diplomatic data. (Famously, the enigma machines during WW2 created ciphered messages)</li>
  </ul>
  <br><br>
  The thing to notice here is that the data will be deciphered and used again in some way. That credit card number is run again next time you make an order. Your server needs access to your form data. Your military needs to receive your orders.
</details>

#### 2. Each person should come up with an example of how hashing is used in real life. 

<details>
  <summary>Question: What are some examples of hashing?</summary>
  <br>
  <strong>Why would you want something irreversible?</strong> Well, actually, there's plenty of reasons!
  <br>
  <ul>
      <li>Authentication. Employees at companies you have logins with should not be able to determine/decrypt your password for any reason</li>
      <li>Hash functions to compute memory locations. In this case, a reverse lookup is never needed.</li>
      <li>Hash tables are used for searching. This is how we can have constant time (i.e., predictably fast) searches. This has a wide variety of applications in computer science.</li>
  </ul>
</details>

### Summary

So, encryption and hashing are both things we use all the time. Encryption is a way of scrambling data that can be reversed so that data can be used again. Hashing is a way of scrambling data that can't be undone. Cool.

But wait....

#### If I sign up for a login / password on a website and my password gets hashed, how can I login when I come back next time? 

This is a good question! The answer is that the company stores the hashed password. Here's a postico snippet of what a hashed password is normally stored as. 

<img src="https://res.cloudinary.com/briezh/image/upload/v1546559658/Screen_Shot_2019-01-03_at_3.52.10_PM_zkqmhm.png">

So basically, they store the **hash** of the password, not the password itself.

### I still don't see how this helps?

Let's do a short exercise that hashes our names to demonstrate how a hashing function works.

#### 1. Write down your name. 

If you're working with a partner, have your partner do this with their name too.

#### 2. For each letter in your name, write down the order it appears in the alphabet. (e.g., for A write 1, for B write 2, etc.)

For example, `Brandi` would change to `2-18-1-14-4-9`.

#### 3. Take each number and mod it by 8. (divide by 8, but take the remainder instead of the quotient)

For example, `2-18-1-14-4-9` becomes `2-2-1-6-4-1`. 

#### 4. Change any instance of 6, 7, or 8 to the letter 'f'

For example, `2-2-1-6-4-1` becomes `2-2-1-f-4-1`

#### 5. Any time there are consecutive numbers (2 of the same number in a row), change it to a capital 'A' followed by an exclamation point.

For example, `2-2-1-f-4-1` becomes `A!-1-f-4-1`

#### 6. Concatenate all the characters together

For example `A!-1-f-4-1` becomes `A!1f41`. So, according to our hash function, `Brandi` becomes `A!1f41`. What's your hashed name?

#### 7. Take your answer and write it in the `answers.txt` file.

You can find answers.txt in this repository. If you haven't done so already, please fork and clone this repo.

#### 8. Repeat steps 1 through 7 with your name again. Record your new answer in answers.txt

<details>
  <summary>Question: Can I recompute a hash?</summary>
  <br>Yep! That's how this all works. For hash tables we can depend on the hash function to compute the same memory location each time, and for passwords we can rely on the hashed password to be the same each time.
</details>


### Another Problem

Okay. Sooooooo... what if I compute the hash for a common password, let's say the word `password`, and then look in my database and match anyone with that hash?

This is totally a thing. It's called a [Rainbow Table](https://www.wordfence.com/learn/how-passwords-work-and-cracking-passwords/) which sounds way more pleasant than it actually is! It's effective against hashes that don't have any additional security beyond the basic hash function!

### Extra Security?! Oh boy...

Don't worry! The creators of BCrypt have thought of this too. The additional security is already baked in. 

#### Let's get salty!

Every password hash generated by BCrypt includes something called a salt. This is a little bit of randomly generated text that is added to the original password. Each password has its own salt and this salt is stored as part of the hash itself. Thus, a BCrypt hash is actually contains a hash and a salt put together. The salt text is added (concatenated) to the original password in some way. Let's say my original password is `password` and my salt is `A!1f41`. Bcrypt will take `passwordA!1f41` and hash that instead of just `password` alone. 

#### Why does this help?

Let's say there is another person called `Bobby Bobbington` who uses the password `password` as well. He is a different person than me, so he gets a different, randomly generated salt. Maybe he gets the salt `fA!21f2`, so his whole password that gets hashed is `passwordfA!21f2`. So once that's all hashed, Bobby's `password` and my `password` are totally different hashes because of the salt.

#### But the hacker knows the salt?!

Yes, they do. But at this point, this isn't really any better than brute-force guessing what the password is as the hacker would have to compute a separate rainbow table for each and every password. 

The moral of the story is not to use `password` as your password exactly because these kinds of passwords can be guessed in a brute force manner!

## Code Activity

Now that we know a little something about hashing, let's actually dig into BCrypt and take it for a spin. Our goal is to make a program that runs on the command line, asks a user for a name and password, hashes the password, then asks the user to retype the password. It should then compare the hashes and tell you whether you got it correct.

### Sample Outputs

Wrong password:

```
Hi, what is your name? <user types: Brandi>
Hi Brandi. What is your password? <user types: password>
Can you tell me your password again? <user types: wrongpassword>
No, I'm sorry that wasn't a match with the first password you gave me.
```

Correct password:

```
Hi, what is your name? <user types: Brandi>
Hi Brandi. What is your password? <user types: password>
Can you tell me your password again? <user types: password>
Great! Your passwords matched!
```

### Directions

First things first, we need to be able to accept user input directly from the terminal. Let's use the [readline-sync](https://www.npmjs.com/package/readline-sync) module for that. Here's a basic use-case where the prompt asks you for your name and then says hi to you. Copy this code into `app.js` and try running it with the command `node app.js`. 

```javascript
var readlineSync = require('readline-sync');
 
// Wait for user's response.
var userName = readlineSync.question('May I have your name? ');
console.log('Hi ' + userName + '!');
```

> HINT: If you get an error message saying you "can't find module readline-sync", make sure you remembered to run `npm install` first 

#### Fancy Passwords!

This module has the ability to hide typed in text with *** like a password. Simply pass the option `hideEchoBack` and set to true.
 
```javascript
var readlineSync = require('readline-sync');

// Handle the secret text (e.g. password).
var favFood = readlineSync.question('What is your favorite food? ', {
  hideEchoBack: true // The typed text on screen is hidden by `*` (default).
});
console.log('Oh, you love ' + favFood + '!');
```

Make sure this code runs too!

#### Getting into BCrypt

Check out [bcrypt on npmjs.com](https://www.npmjs.com/package/bcrypt). There are several uses shown here. The main decision to make is whether to use synchronous or asynchronous versions of the methods. Asynchronous is typically recommended for servers because hashing is CPU-intensive, but for our purposes, the synchronous methods will do just fine.

> NOTE: In the example below, normally this is the point where you'd save the hashed password to your database, but in this case we'll just store it in a local variable called `hashedPassword` instead.

```javascript
var bcrypt = require('bcrypt');
var saltRounds = 10;
var myPlaintextPassword = 'password';
var someOtherPlaintextPassword = 'not_password';

// Generate the hashed password
var hashedPassword = bcrypt.hashSync(myPlaintextPassword, saltRounds);

// Print it out
console.log('Hashed password is', hashedPassword);
```

Go ahead and copy this over into `app.js` and run this program a few times. You can comment/delete the stuff we had in there earlier. Notice that since the salt is randomly generated, your hashed password is different each time even though you're using the same password.

#### Comparing hashed passwords with plain text passwords

For comparing a hashed password to a newly typed in plain text password, we can use bcrypt's compareSync function. This takes the hashed password (so it has the salt) and the plain text password as arguments. What it's doing is hashing the plain text password with the same salt as the hashed password and then seeing if they match. It returns a boolean.

Correct Password Example:

```javascript
// Result will be true. Passwords match.
var result = bcrypt.compareSync(myPlaintextPassword, hashedPassword); 
```

Incorrect Password Example: 

```javascript
// Result will be false. No match.
var result = bcrypt.compareSync(someOtherPlaintextPassword, hashedPassword); 
```

#### Put it all together

Now that you have the tools to read text from the command line with readline-sync and to hash and compare hashed passwords with bcrypt, put the two together. Write code in `app.js` to perform the following:

* Ask the user for a name
* Print "hi" + user's name
* Ask the user for a password
* Hash the password the user gives and store it in a local variable
* Ask the user to type in their password again
* Compare the hashed password to the retyped in password. 
* Depending on whether the user typed in the same password or a different one, print out an appropriate message.

## Resources

* [Understanding Hashes](https://www.wordfence.com/learn/how-passwords-work-and-cracking-passwords/)
* [Bcrypt Salts](https://stackoverflow.com/questions/6832445/how-can-bcrypt-have-built-in-salts)
* [Readline-Sync](https://www.npmjs.com/package/readline-sync)
* [Interactive Node Programs](https://flaviocopes.com/node-input-from-cli/)
