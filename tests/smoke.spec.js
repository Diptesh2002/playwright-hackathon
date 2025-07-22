import{test,expect} from '@playwright/test'
import { HomePage } from '../Pages/HomePage'
import Searchdata from '../test-data/Searchdata.json'
import { CoursesPage } from '../Pages/CoursesPage';
import fs from 'fs';
test('@smoke ST001: Should load coursera homepage',async({page})=>{
    await page.goto('/');
    let homepage=new HomePage(page);
    await expect(page).toHaveURL(/coursera\.org/);
})

test('@smoke ST002: Should search for Web Development',async({page})=>{
    await page.goto('/',{ waitUntil: 'domcontentloaded', timeout: 60000 });
    let homepage=new HomePage(page);
    await homepage.SearchCourses(Searchdata['search-text']);
    await expect(page.locator("//div[@data-e2e='NumberOfResultsSection']")).toContainText('web development');
})

test('@smoke ST003: Should select Language',async({page})=>{
    await page.goto('/',{ waitUntil: 'domcontentloaded', timeout: 60000 });
    let homepage=new HomePage(page);
    await homepage.SearchCourses(Searchdata['search-text']);
    await expect(page.locator("//div[@id='cds-react-aria-:Rj2tacqkqikta:-formLabel']")).toContainText('Language');
    let coursesPage=new CoursesPage(page);
    await page.waitForLoadState('load');
    await coursesPage.selectLanguage(Searchdata.language);
})

test('@smoke ST004: Should select Level',async({page})=>{
    await page.goto('/',{ waitUntil: 'domcontentloaded', timeout: 60000 });
    let homepage=new HomePage(page);
    await homepage.SearchCourses(Searchdata['search-text']);
    let coursesPage=new CoursesPage(page);
    await page.waitForLoadState('load');
    await coursesPage.selectLevel(Searchdata.level);
})

test('@smoke ST005: Should select both Language and Level',async({page})=>{
    await page.goto('/');
    let homepage=new HomePage(page);
    await homepage.SearchCourses(Searchdata['search-text']);
    await expect(page.locator("//div[@id='cds-react-aria-:Rj2tacqkqikta:-formLabel']")).toContainText('Language');
    let coursesPage=new CoursesPage(page);
    await page.waitForLoadState('load');
    await coursesPage.selectLanguage(Searchdata.language);
    await page.waitForLoadState('load');
    await coursesPage.selectLevel(Searchdata.level);
});

test('@smoke ST008: Login', async({page})=>{
    await page.goto('/');
    let homepage=new HomePage(page);
    let invalidMessage = await homepage.login("123@gmail.com","vinay@1");
    await page.waitForTimeout(5000);
    await expect(invalidMessage).toContainText("We don't recognize that username or password. You can try again or use another login option.")
})