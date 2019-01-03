# What is BCrypt?

[BCrypt](https://en.wikipedia.org/wiki/Bcrypt) is a password hashing function. This is a process where you take sensitive data and scramble it with an algorithm. We don't need to know the implementation of this algorithm. BCrypt has been used since 1999, and has implementations in many languages, so we know it's trustworthy at this point!

## Directions

* Grab a computer
* Grab a buddy - this is a partner exercise!
* Read through the lab and answer the questions together
* Do the code exercise at the end of this lab together

### Encryption vs Hashing

Encryption and hashing are commonly confused terms. They mean similar things, but have a very important difference!

<details>
  <summary>Question: What is the opposite of encryption?</summary>
  Decryption. Encryption is a process that can be reversed! This is often done with public-private key pairs.
</details>

<details>
  <summary>Question: What is the opposite of hashing?</summary>
  There isn't one. Hashing is a process that cannot be reversed!
</details>

### Real Life Examples

* 1. Each person should come up with an example of how encryption is used in real life. There are many to choose from!

<br><br>

<details>
  <summary>Question: What are some examples of encryption?</summary>
  <br>There's a bunch!<br>
  <ul>
      <li>Credit card numbers stored in a company's database</li>
      <li>Your Github SSH keys</li>
      <li>Form data from a form using POST method (this is why we use body-parser!)</li>
      <li>To protect military, government, or diplomatic data. (Famously, the enigma machines during WW2 created ciphered messages)</li>
  </ul>
</details>

<br><br>

* 2. Each person should come up with an example of how hashing is used in real life. 

<details>
  <summary>Question: What are some examples of hashing?</summary>
  <br>Why would you want something irreversible? Well, actually, there's plenty of reasons!<br>
  <ul>
      <li>Authentication. Employees at companies you have logins with should not be able to determine/decrypt your password for any reason</li>
      <li>Hash functions to compute memory locations. In this case, a reverse lookup is never needed.</li>
      <li>Hash tables are used for searching. This is how we can have constant time (i.e., predictably fast) searches. This has a wide variety of applications in computer science.</li>
  </ul>
</details>
