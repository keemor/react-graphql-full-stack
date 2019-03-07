const faker = require('faker');
const puppeteer = require('puppeteer');

const person = {
    email: faker.internet.email(),
    password: faker.random.word()
};
const appUrlBase = 'http://localhost:3000';
const routes = {
    public: {
        register: `${appUrlBase}/register`,
        login: `${appUrlBase}/#/login`,
        noMatch: `${appUrlBase}/ineedaview`
    },
    private: {
        home: `${appUrlBase}/home`,
        account: `${appUrlBase}/account`
    }
};

//create global variables to be used in the beforeAll function
let browser;
let page;

beforeAll(async () => {
    // launch browser
    browser = await puppeteer.launch({
        headless: false, // headless mode set to false so browser opens up with visual feedback
        slowMo: 250 // how slow actions should be
    });
    // creates a new page in the opened browser
    page = await browser.newPage();
});

describe('Login', () => {
    test('users can login', async () => {
        await page.goto(routes.public.login);
        await page.waitForSelector('form');

        await page.click('input[name=name]');
        await page.type('input[name=name]', 'keemor');
        await page.click('input[name=password]');
        await page.type('input[name=password]', 'keemor');
        await page.click('button[type=submit]');
        //await page.waitForSelector('[data-testid="homepage"]');

        await page.waitForSelector('.badge-dark');

        const html = await page.$eval('.badge-dark', e => e.innerHTML);
        expect(html).toBe('keemor');
    }, 1600000);
});

// describe('Logout', () => {
//     test('users can logout', async () => {
//       await page.waitForSelector('.nav-link');

//       await page.click('[data-testid="signoutBtn"]')
//       await page.waitForSelector('.signin-form')
//     }, 9000000);
//   });

// This function occurs after the result of each tests, it closes the browser
afterAll(() => {
    browser.close();
});
