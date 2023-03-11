# Mailus

Utility for mass sending of emails.

### Install

To install the mailus terminal command, do this:

```
npm i -g mailus
```

### Usage

As an example, we will create a campaign called `hello`.

Create a directory structure like this:

```
mailus
├── campaigns
│   └── hello.json
├── lists
│   └── test.json
├── messages
│   └── hello.md
└── servers
    └── test.json
```

### Construct your email

In the `campaigns/hello.json` file add from, subject and message reference:
```json
{
  "from": "Vidar Eldøy <vidar@eldoy.com>",
  "subject": "Hey, what's going on?",
  "message": "hello"
}
```

The message reference should be the same name as one of the messages in the `messages` directory, here it is referencing `messages/hello.md`.

#### Add list of contacts

The `lists/test.json` file has to be an array of contacts containing a field named `email`, and can have any other data your want to use in your email:

```json
[
  {
    "name": "Vidar",
    "email": "Vidar Eldøy <vidar@eldoy.com>"
  }
]
```

#### Compose your message

The message in `messages/hello.md` is written in markdown, but also supports HTML and Mustache with front matter data:

```md
# Hello {{name}}

You have been selected to join our program, are you ready?

Best regards
\- Vidar
```

### Add a server to send through

In `servers/test.json` add server info like this:

```json
{    
  "host": "smtp.ethereal.email",
  "port": 587,
  "auth": {
    "user": "nicola.breitenberg58@ethereal.email",
    "pass": "eUpHSnV96EM8uRbJ9S"
  }  
}
```

The server info can be any outgoing SMTP server. Here we use a test server that doesn't actually send any emails.

### Send your emails

To start sending mails to all of your contacts in your list, write this in terminal:

```
mailus hello test test
```

This means "send the hello campaign to the test list through the test server":

```
mailus <campaign> <list> <server>
```

### License

ISC Licensed. Enjoy!
