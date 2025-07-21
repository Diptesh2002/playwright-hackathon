export class HomePage{

    constructor(page){
     this.page=page;
     this.searchBox="//input[@id='search-autocomplete-input']";
     this.searchButton="(//div[@class='magnifier-wrapper'])[2]";
     this.enterprise="//a[normalize-space()='For Enterprise']";
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
    async login(){
        
    }

}