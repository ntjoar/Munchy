const puppeteer = require('puppeteer');
const jestPuppeteerConfig = require("./jest-puppeteer.config");


const person = {
  email: 'testemail@gmail.com',
  password: '123456789',
};

const appUrlBase = 'http://localhost:3000';
const routes = {
  public: {
	register: `${appUrlBase}/signup`,
	login: `${appUrlBase}/login`,
  noMatch: `${appUrlBase}/ineedaview`,
  logout: `${appUrlBase}/test-logout`,
  },
  private: {
	home: `${appUrlBase}/dashboard`,
  },
};

let browser
let page

beforeAll(async () => {
  browser = await puppeteer.launch(jestPuppeteerConfig)
  page = await browser.newPage()
  await page.setViewport({
    width: 640,
    height: 480,
    deviceScaleFactor: 1,
  });
})

// The user should not login, and the veiw should stay in the login page
describe('Login :', () => {
  test('user cannot login with wrong credentials', async () => {
	await page.goto(routes.public.login);
	await page.waitForSelector('.signin-form');

	await page.click('input[name=email]')
	await page.type('input[name=email]', 'test895@test8545.com')
	await page.click('input[name=password]')
	await page.type('input[name=password]', '123456789')
	await page.click('#click-login')
	await page.waitForSelector('.signin-form')
  }, 160000);
});


//End to End login test
describe('Login :', () => {
  test('users can login with correct credentials', async () => {
	await page.goto(routes.public.login);
	await page.waitForSelector('.signin-form');

	await page.click('input[name=email]')
	await page.type('input[name=email]', 'test@test.com')
	await page.click('input[name=password]')
	await page.type('input[name=password]', '123456789')
	await page.click('#click-login')
	await page.waitForSelector('[data-testid="homepage"]')
  }, 160000);
});

describe('Unauthorized view', () => {
  test('users that are not logged in are redirected to sign in page', async () => {
    await page.goto(routes.private.home);
    await page.waitForSelector('.signin-form')
  }, 9000000);
});


afterAll(() => {
  browser.close()
})



// test('testing login', async ()=> {
//  const browser = await puppeteer.launch(jestPuppeteerConfig);
//  const page = await browser.newPage();
//  await page.goto('http://localhost:3000/login')

//  await page.click('#email');
//  await page.type('#email', 'k.benlghalia@gmail.com');

//  await page.click('#password');
//  await page.type('#password', '123456789');

//  await page.click('#click-login');

//  const html = await page.$eval('.App-title', e => e.innerHTML);
//     expect(html).toBe('Welcome to React');





// })