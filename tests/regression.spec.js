import {test,expect} from '@playwright/test'
import { HomePage } from '../Pages/HomePage';
import { CoursesPage } from '../Pages/CoursesPage';
import Searchdata from '../test-data/Searchdata.json';
import { EnterpriseFormPage } from '../Pages/EnterpriseFormPage';
import formdata from '../test-data/formdata.json'

test('@regression RT001: Check Back is Working or not',async({page})=>{
    await page.goto('/',{ waitUntil: 'domcontentloaded', timeout: 60000 });
   let home=new HomePage(page);
   await home.SearchCourses(Searchdata['search-text']);
   let course=new CoursesPage(page);
   await course.backToHome();
   await expect (page).toHaveURL(/www\.coursera\.org/);
})
test('@regression RT002: Check valid Form',async({page})=>{
    await page.goto('/',{ waitUntil: 'domcontentloaded', timeout: 60000 });
    let home=new HomePage(page);
    await home.handleForm();
    let form=new EnterpriseFormPage(page);
    await page.waitForTimeout(2000);
    await form.scrollToForm();
    await form.validFillForm(formdata);
    await page.waitForLoadState('load');
    await expect(page.locator("(//h1[normalize-space()='Thanks for your interest in Coursera for Business'])[1]")).toContainText('Thanks for your interest in Coursera for Business');
})
test('@regression RT003: Check Invalid Form',async({page})=>{
    await page.goto('/',{ waitUntil: 'domcontentloaded', timeout: 60000 });
    let home=new HomePage(page);
    await home.handleForm();
    let form=new EnterpriseFormPage(page);
    await page.waitForTimeout(2000);
    await form.scrollToForm();
    await form.invalidFillForm(formdata);
    await page.waitForLoadState('load');
    await expect(page.locator("//div[@id='ValidMsgEmail']")).toBeVisible();
    await expect(page.locator("//div[@id='ValidMsgEmail']")).toContainText('Invalid Input');
})
test('@regression RT004: Validate course names are displayed',async({page})=>{
    await page.goto('/',{ waitUntil: 'domcontentloaded', timeout: 60000 });
    let home=new HomePage(page);
    await home.SearchCourses(Searchdata['search-text']);
    let course=new CoursesPage(page);
    let courseLists=await course.cousrseDetails(Searchdata.topCourses);
    expect(courseLists.length).toBe(Searchdata.topCourses);
    for(let i=0;i<courseLists.length;i++){
         expect(courseLists[i].name).not.toBeNull();
    }
    console.log(courseLists);
})
test.only('@regression RT005: Validate course ratings and duration',async({page})=>{
    await page.goto('/',{ waitUntil: 'domcontentloaded', timeout: 60000 });
    let home=new HomePage(page);
    await home.SearchCourses(Searchdata['search-text']);
    let course=new CoursesPage(page);
    let courseLists=await course.cousrseDetails(Searchdata.topCourses);
    expect(courseLists.length).toBe(Searchdata.topCourses);
    for(let i=0;i<courseLists.length;i++){
        expect(parseFloat(courseLists[i].rating)).toBeGreaterThan(0);
        expect(parseFloat(courseLists[i].rating)).toBeLessThan(5);
   }
})
test('@regression RT006: Extract all languages',async({page})=>{

})
// test.fixme('@regression RT007: Extract all learning level',async({page})=>{

// })
// test.fixme('@regression RT008:')