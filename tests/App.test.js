//https://blog.logrocket.com/end-to-end-testing-react-apps-with-puppeteer-and-jest-ce2f414b4fd7

const faker = require('faker');
const puppeteer = require('puppeteer');

const person = {
    name: faker.name.firstName() + ' ' + faker.name.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    message: faker.random.words()
};

describe('H1 Text', () => {
    test('h1 loads correctly', async () => {
        let browser = await puppeteer.launch({
            headless: false
        });
        let page = await browser.newPage();

        page.emulate({
            viewport: {
                width: 500,
                height: 2400
            },
            userAgent: ''
        });

        await page.goto('http://localhost:3000/#/login');
        await page.waitForSelector('.navbar-brand');

        const html = await page.$eval('.navbar-brand', e => e.innerHTML);
        expect(html).toBe('Easy Event');

        browser.close();
    }, 16000);
});
