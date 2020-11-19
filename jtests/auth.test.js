describe('Authentication', () => {
  

    beforeEach(async () => {
      await page.goto('http://localhost:3000/login');
    });
  
    afterEach(async () => {
      // Logout after each test
      try{
        await page.waitForSelector("div.item>button")
        await page.click("div.item>button")
      }
      catch(err) {
        console.log(err)
      }
    })
  
    it('should login to an existing account', async () => {
      await page.waitForSelector('input[type=text]')
      await page.type('input[type=text]', "k.benlghalia@gmail.com")
      await page.type('input[type=password]', "123456789")
     // const loginButton = await page.$('button[role=button]');
      await form.evaluate( form => form.click() );
      await page.waitForSelector('h3.ui.header>div')
  
      let username = await page.evaluate(()=> {
        return document.querySelector('h3.ui.header>div').innerText
      })
      await expect(username).toBe("testuser")
    });
  
 
  });
  