import { test, expect } from '@playwright/test';


// this test should only run once 
// test('should register a new user', async ({ page }) => {
//   await page.goto('/register');

//   await page.fill('#firstName', 'tester');
//   await page.fill('#lastName', 'testerlast');
//   await page.fill('#email', 'testerlast@gmail.com');
//   await page.fill('#password', 'password-tester-123');

//   const button = page.getByRole('button', { name: /Sign/i })
//   await button.click()

//   // Wait for the redirection
//   await page.waitForURL('**/notes');

//   expect(page.url()).toContain('/notes')
// });


test('should redirect user to the /login route if user not authenticated', async ({ page }) => {
    await page.goto('/notes');
    expect(page.url()).toContain('/login');
});
