# Amigo Invisible

A website for the Spanish tradition “Amigo Invisible”.
In "Amigo Invisible", participants are randomly assigned a person to whom they will purchase a gif.

## Features

- Assign participants a person to whom they will purchase a gift and notify them by email
- Dark mode
- Supervisor feature to see all assignments

## Assigments

In order to generate the assignments, we use the [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle) algorithm.

## Sending emails and Server-Sent Events (SSE)

We use [Nodemailer](https://nodemailer.com/about/) to send emails and [Server-Sent Events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events) to retrieve the status of the email sending process in real-time in the client.

## Requirements

- [Node.js](https://nodejs.org/en/)

## Run locally

```bash
npm run dev
```

## Linter

We use [Next lint](https://nextjs.org/docs/basic-features/eslint) and [Oxlint](https://oxc.rs/docs/guide/usage/linter) to lint the code.

```bash
npm run lint # Next lint
npx oxlint # Oxlint
```

## Format

We use [Prettier](https://prettier.io/) to format the code.

```bash
npm run format
```

### Check format

```bash
npm run check-format
```
