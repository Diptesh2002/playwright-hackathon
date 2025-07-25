export class EnterpriseFormPage{
    constructor(page){
        this.page=page;
        this.firstName=page.getByPlaceholder('First Name');
        this.lastName=page.getByPlaceholder('Last Name');
        this.workEmailAddress=page.getByPlaceholder('Work Email Address');
        this.phoneNumber=page.getByPlaceholder('Country Code + Phone Number');
        this.organizationDropDown="//select[@id='rentalField9']";
        this.jobTitle=page.getByPlaceholder("Job Title");
        this.company=page.locator("//input[@id='Company']");
        this.companySizeDropDown="//select[@id='Employee_Range__c']";
        this.countryDropDown="//select[@id='Country']";
        this.reasonForSelect="//select[@id='What_the_lead_asked_for_on_the_website__c']";
        this.submitButton="(//button[normalize-space()='Submit'])[1]";
    }
    async scrollToForm(){
        for(let i=0;i<7;i++){
         await this.page.keyboard.press('Space');
        }
    }
    async validFillForm(formdata){
        await this.firstName.fill(formdata.FirstName);
        await this.lastName.fill(formdata.LastName);
        await this.workEmailAddress.fill(formdata.Email.Valid);
        await this.phoneNumber.fill(formdata.PhoneNumber);
        await this.page.click(this.organizationDropDown);
        await this.page.locator(this.organizationDropDown).selectOption({value:formdata.OrganizationType});
        await this.page.waitForTimeout(2000);
        await this.jobTitle.fill(formdata.Job_Title);
        await this.company.fill(formdata.CompanyName);
        await this.page.click(this.companySizeDropDown);
        await this.page.locator(this.companySizeDropDown).selectOption(formdata.CompanySize);
        await this.page.click(this.reasonForSelect);
        await this.page.locator(this.reasonForSelect).selectOption({value:formdata.needs});
        await this.page.click(this.countryDropDown);
        await this.page.locator(this.countryDropDown).selectOption({value:formdata.Country});
        await this.page.click(this.submitButton);
    }
    async invalidFillForm(formdata){
        await this.firstName.fill(formdata.FirstName);
        await this.lastName.fill(formdata.LastName);
        await this.workEmailAddress.fill(formdata.Email.Invalid);
        await this.phoneNumber.fill(formdata.PhoneNumber);
        await this.page.click(this.organizationDropDown);
        await this.page.locator(this.organizationDropDown).selectOption({value:formdata.OrganizationType});
        await this.page.waitForTimeout(2000);
        await this.jobTitle.fill(formdata.Job_Title);
        await this.company.fill(formdata.CompanyName);
        await this.page.click(this.companySizeDropDown);
        await this.page.locator(this.companySizeDropDown).selectOption(formdata.CompanySize);
        await this.page.click(this.reasonForSelect);
        await this.page.locator(this.reasonForSelect).selectOption({value:formdata.needs});
        await this.page.click(this.countryDropDown);
        await this.page.locator(this.countryDropDown).selectOption({value:formdata.Country});
        await this.page.click(this.submitButton);
        await this.page.waitForLoadState('load');
    }
}