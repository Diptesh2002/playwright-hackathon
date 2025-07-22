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

     //signup
     this.signup = "//div/a/span[@class='cds-button-label' and text()='Join for Free']";
     this.fullName=page.getByPlaceholder("Enter your full name");
     this.emailId = page.getByPlaceholder("name@email.com");
     this.password=page.getByPlaceholder("Create password");
 
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
    // async login(email, password){
    //     await this.page.click(this.loginButton);
    //     await this.email.fill(email);
    //     await this.password.fill(password);
    //     await this.page.click("//button[@type='submit']");
    //     await this.page.waitForTimeout(2000);

    //     const invalidMessageLocator = await this.page.locator("//div[@class='css-q1vc80']");
    //     return invalidMessageLocator;
    // }

    async SignUp(name,email,password){
        await this.page.click(this.signup);
        await this.fullName.fill(name);
        await this.emailId.fill(email);
        await this.password.fill(password);
        await this.page.getByRole('button',{name:'Join for Free'}).click();
        await this.page.waitForTimeout(2000);
        const messagelocator = await this.page.locator('//ul[@class="css-dlhdzr"]');
        return messagelocator;
    }
}