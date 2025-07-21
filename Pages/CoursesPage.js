export class CoursesPage{
    constructor(page){
        this.page=page;
        this.buttonTOShowAllLanguage="//button[@aria-label='Show more Language options']";
        this.languageLists="//div[@data-testid='search-filter-group-Language']//div[@class='css-q5d1os']//div[@class='css-1xi2dvh']";
        this.levelList="//div[@data-testid='search-filter-group-Level']//div[@class='css-1xi2dvh']";
        this.courseBlocks="//ul[@class='cds-9 css-5t8l4v cds-10']//li[@class='cds-9 css-0 cds-11 cds-grid-item cds-56 cds-64 cds-76 cds-90']";
        this.courseNames="//h3[@class='cds-CommonCard-title css-6ecy9b']";
        this.ratings="//span[@class='css-6ecy9b']";
        this.durations="//div[@class='cds-CommonCard-metadata']";
    
    }
    async selectLanguage(language){
        await this.page.click(this.buttonTOShowAllLanguage);
        await this.page.waitForTimeout(3000);
        let languagelists=await this.page.$$(this.languageLists);
        let languageArray=[];
        for(let i=0;i<languagelists.length;i++){
        const locator=await this.page.locator(this.languageLists).nth(i);
        let languageName=await languagelists[i].textContent();
            languageArray.push(languageName);
            languageName=await languageName.toLowerCase();
        if(languageName.includes(language.toLowerCase())){
           await locator.click();
        }
     }
     return languageArray;
    }
    async selectLevel(level){
        let levels=await this.page.$$(this.levelList);
        let levelArray=[];
        for(let i=0;i<levels.length;i++){
            let levelName=await levels[i].textContent();
                levelArray.push(levelName);
                levelName=await levelName.toLowerCase();
            if(levelName.includes(level.toLowerCase())){
                const locator=await this.page.locator(this.levelList).nth(i);
                await locator.click();
            }
        }
        return levelArray;
    }

    async cousrseDetails(number){
        await this.page.waitForLoadState('load');
        let cousrseDetailsArray=[];
        //let courseLists=await this.page.$$(this.courseBlocks);
        let nameList=await this.page.$$(this.courseNames);
        let ratingsList=await this.page.$$(this.ratings);
        let durationsList=await this.page.$$(this.durations);
        for(let i=0;i<number;i++){
            let obj={};
            obj.name=await nameList[i].textContent();
            obj.rating=await ratingsList[i].textContent();
            obj.duration=await durationsList[i].textContent();
            cousrseDetailsArray.push(obj);
        }
        return cousrseDetailsArray;
    }
    async backToHome(){
        await this.page.goBack();
    }
    async fetchAllLanguage(){
        await this.page.click(this.buttonTOShowAllLanguage);
        await this.page.waitForTimeout(3000);
        let languagelists=await this.page.$$(this.languageLists);
        let languageArray=[];
        for(let i=0;i<languagelists.length;i++){
            const locator=await this.page.locator(this.languageLists).nth(i);
            let languageName=await languagelists[i].textContent();
                languageArray.push(languageName)
         }
         return languageArray;
    }
    async fetchAllLevel(){
        let levels=await this.page.$$(this.levelList);
        let levelArray=[];
        for(let i=0;i<levels.length;i++){
            let levelName=await levels[i].textContent();
                levelArray.push(levelName);
        }
        return levelArray;
    }

}