# Viblo Browser Extension

## Supported Browsers
- Google Chrome
- Firefox

## Developing
- Install neccessary `npm` packages
```
yarn install
```
- Build javascript codes
```
// for development
npm run dev

// watching files
npm run watch

// for production
npm run production
```
- Check coding convention
```
eslint src/js
```
- Environment configurations: 
To configure the environment variables which will be used in the extension codebase, *we need to copy the `.env.example` file in the root directory to a new file called `.env`. Here, we can modify the value of variables to match the current working environment*, and Webpack will take care of the process of replacing the environment variables in the codebase.
- Front-end: http://bulma.io/
- Build tool: https://www.npmjs.com/package/laravel-mix

## Change Logs
View all change logs [here](./changelogs.md)

## Contribution
View contribution guidelines [here](./CONTRIBUTING.md)
