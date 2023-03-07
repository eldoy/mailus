# Mailus

Utility for mass sending of emails.

### Install

To install the mailus terminal command, do this:

```
npm i -g mailus
```

### Usage

As an example, we will create a campaign called `hello`.

Create a directory called `campaigns/hello` and add two files in it:

```
campaigns/hello/list.json
campaigns/hello/email.md
```

The `list.json` file will contain a list of data for your email. The `email.md` file is the email that you are going to send.

#### Add your list data

The `list.json` file has to be an array of items containing a field named `to` and can have any other data your want to use in your email:

```json
[
  {
    "name": "Vidar",
    "to": "Vidar Eldøy <vidar@eldoy.com>"
  }
]
```

#### Add your email

The email is written in markdown, but also supports HTML and Mustache with front matter data:

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
  "test": "vidar@eldoy.com"
}
```

The `test` field is the address of where you will receive your test emails.

### Test your email

To test your email write this in terminal:

```
mailus test hello
```

It will send an email to the test address in your config file so you can see how it looks.


### Send your emails

To start sending mails to all of your recipients, write this in terminal:

```
mailus send hello
```

### License

ISC Licensed. Enjoy!
