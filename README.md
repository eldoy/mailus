# Mailus

Utility for mass sending of emails.

### Install

To install the mailus terminal command, do this:

```
npm i -g mailus
```

### Usage

As an example, we will create a campaign called `hello`.

Create a directory called `campaigns/hello` and add three files in it:

```
campaigns/hello/contacts.json
campaigns/hello/email.json
campaigns/hello/message.md
```

- The `contacts.json` file contains the contacts your will send your email to.
- The `email.json` file contains from and subject fields.
- The `message.md` file is the content of the email that you are going to send.

#### Add your contacts

The `contacts.json` file has to be an array of items containing a field named `email` and can have any other data your want to use in your email:

```json
[
  {
    "name": "Vidar",
    "email": "Vidar Eldøy <vidar@eldoy.com>"
  }
]
```

### Desribe your email

In the `email.json` file add from and subject:
```json
{
  "from": "Vidar Eldøy <vidar@eldoy.com>",
  "subject": "Hey, what's going on?"
}
```

#### Write your message

The message in `message.md` is written in markdown, but also supports HTML and Mustache with front matter data:

```md
# Hello {{name}}

You have been selected to join our program, are you ready?

Best regards
\- Vidar
```

### Config

In your root directory, add a file called `mailus.json`. It is your configuration file for mailus.

```json
{
  "from": "Vidar Eldøy <vidar@eldoy.com>",
  "server": {
    "host": "smtp.ethereal.email",
    "port": 587,
    "auth": {
      "user": "nicola.breitenberg58@ethereal.email",
      "pass": "eUpHSnV96EM8uRbJ9S"
    }
  }
}
```

### Test your email

To add a test configuration, create a file called `mailus.test.json`. It will be loaded instead of the normal config file if you run the `test` command.

Also add a test contacts file in `campaigns/hello/contacts.test.json`:

```json
[
  {
    "name": "Vidar",
    "email": "Vidar Eldøy <vidar@eldoy.com>"
  }
]
```

To test your email write this in terminal:

```
mailus test hello
```

It will send an email to your test contacts using the config from your test config file.


### Send your emails

To start sending mails to all of your contacts, write this in terminal:

```
mailus send hello
```

### License

ISC Licensed. Enjoy!
