# What is BCrypt?

[BCrypt](https://en.wikipedia.org/wiki/Bcrypt) is a password hashing function. This is a process where you take sensitive data and scramble it with an algorithm. We don't need to know the implementation of this algorithm. BCrypt has been used since 1999, and has implementations in many languages, so we know it's trustworthy at this point!

## Directions

* Grab a computer
* Grab a buddy - this can be a partner exercise! (still turn in separately if you do, though!)
* Fork and clone this repository
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

Okay. Sooooooo... 
