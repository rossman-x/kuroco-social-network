# Kuroco Social Network Web Application

This web application was developed using **Kuroco** technology, it's main purpose is to demonstrate the effiency of **Kuroco** in a web application.

## Technologies

### Back-End stacks

- Kuroco contents
- Kuroco api
- Kuroco files
- Kuroco activities
- Kuroco member
- Kuroco operations

### Front-End stacks

- Node js
- Remix js - _ontop of React_
- TypeScript
- Tailwind css
- Cypress
- Jest

### DevOps stacks

- Cloudflare workers
- Github CI

## Project building process

In order to recreate this project and run it on your local machine, please follow these steps and make sure to have npm installed on your pc.

1.  Install the dependencies
    `npm install`
    > Before moving to the next step, make sure you have configured your cloudflare account and you logged in from the cli.
2.  Open the project's folder and execute this command:
    `npm run start-server`

3.  _Congratulation_, you just launched your first Remix application.
    > Your project will be hosted locally at _http://localhost:8787_.

## Project testing process

This project contains Unit tests and E2E tests that are also executed in the CI workflow.

> We use React testing library alongside with Jest testing tool for Units tests.

- To run your unit tests, please execute this command:
  `npm run test`

> For E2E tests, we use cypress, you can install cypress on your local machine to watch the testing process live.

- To run E2E tests, please execute this command:
  `npm run e2e`

## Project Structure

The main directory of this project is `<rootDir>/app`, if you want to add routes, components or services, you should add them in this directory.
