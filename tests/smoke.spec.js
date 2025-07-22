import{test,expect} from '@playwright/test'
import { HomePage } from '../Pages/HomePage'
import Searchdata from '../test-data/Searchdata.json'
import { CoursesPage } from '../Pages/CoursesPage';
import signUpData from '../test-data/signUpdata.json';

test('@smoke ST001: Should load coursera homepage',async({page})=>{
    await page.goto('/');
    let homepage=new HomePage(page);
    await expect(page).toHaveURL(/coursera\.org/);
})

test('@smoke ST002: Should search for Web Development',async({page})=>{
    await page.goto('/',{ waitUntil: 'domcontentloaded', timeout: 60000 });
    let homepage=new HomePage(page);
    await homepage.SearchCourses(Searchdata['search-text']);
    await page.waitForSelector("//div[@data-e2e='NumberOfResultsSection']",{timeout:10000});
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
    await page.pause();
});
test('@smoke ST006: Invalid Email SignUp', async({page})=>{
    await page.goto('/');
    let homepage=new HomePage(page);
    let email = await homepage.SignUp(signUpData.name, signUpData.email.invalid, signUpData.email.valid);
    await page.waitForLoadState('load');
    await expect(email).toContainText('Invalid email. Please enter email as name@email.com');
})
test('@smoke ST007: Invalid SignUp password < 8',async({page})=>{
    await page.goto('/');
    let homepage=new HomePage(page);
    let msg=await homepage.SignUp(signUpData.name,signUpData.email.valid,signUpData.password.LessThan8);
    await expect(msg).toContainText('Password must contain between 8 and 72 characters.');
})
test('@smoke ST008: Invalid SignUp password > 72', async({page})=>{
    await page.goto('/');
    let homepage=new HomePage(page);
    let msg=await homepage.SignUp(signUpData.name,signUpData.email.valid,signUpData.password.GreaterThan72);
    await expect(msg).toContainText('Password must contain between 8 and 72 characters.');
} )