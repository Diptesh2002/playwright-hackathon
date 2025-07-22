export class HomePage{

    constructor(page){
     this.page=page;
     this.searchBox="//input[@id='search-autocomplete-input']";
     this.searchButton="(//div[@class='magnifier-wrapper'])[2]";
     this.enterprise="//a[normalize-space()='For Enterprise']";

     //login
     this.loginButton = "//span[@class='cds-button-label' and text() = 'Log In']";
     this.email = page.getByPlaceholder("name@email.com");
     this.password = page.getByPlaceholder("Enter your password");
    }
    async navigate(){
        await this.page.goto('/',{timeout:120000, waitUntil: 'domcontentloaded'});
    }
    async SearchCourses(courseName){
        await this.page.type(this.searchBox,courseName);
        await this.page.click(this.searchButton);
    }
    async handleForm(formdata){
        let link=await this.page.locator(this.enterprise);
        await link.click();
        await this.page.waitForLoadState('domcontentloaded');
    }
    async login(email, password){
        await this.page.click(this.loginButton);
        await this.email.fill(email);
        await this.password.fill(password);
        await this.page.click("//button[@type='submit']");
        await this.page.waitForTimeout(2000);

        const invalidMessageLocator = await this.page.locator("//div[@class='css-q1vc80']");
        return invalidMessageLocator;
    }

}