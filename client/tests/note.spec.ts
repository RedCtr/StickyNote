import { test, expect } from '@playwright/test';


test.describe('Test Note Operations', () => {

  test.beforeEach(async ({ page }) => {
    test.setTimeout(6000 * 10);
    await page.goto('/login')

    await page.fill('#email', 'testerlast@gmail.com');
    await page.fill('#password', 'password-tester-123');

    const button = page.getByRole('button', { name: /Sign In/i })
    await button.click()

    // Wait for the redirection
    await page.waitForURL('**/notes');
  })


  test('should create a new note', async ({ page }) => {
    test.setTimeout(10000 * 10);

    console.log("url", page.url())

    // click create note button
    await page.waitForSelector('#newnote')
    await page.click('#newnote')

    await page.waitForURL(/\/notes\/[a-zA-Z0-9]+$/)

    // fill the note title and content
    await page.fill('#title', 'Create Test Note');
    await page.fill('#content', 'Test content .....');

    // submit the note
    await page.click('button[type="submit"]');

    // check the success toast message 
    const toast = await page.waitForSelector('.succestoast')
    expect(await toast.isVisible()).toBe(true)

  });

  test('should delete a note', async ({ page }) => {
    test.setTimeout(10000 * 10);

    await page.waitForSelector('.notes-test')

    // get the first note , load the initialNotesItem
    const noteItem = page.getByTestId('note-id').nth(0)
    const initialNotesItem = await page.$$('[data-testid="note-id"]')
    console.log("initialNotesItem", initialNotesItem.length);

    // click the note operation button
    const noteOperationButton = noteItem.getByRole('button')
    await noteOperationButton.click()

    // click delete button
    await page.waitForSelector('.delete-btn')
    const deleteButton = page.getByTestId('delete-btn')
    await deleteButton.click()

    // confirm delete in modal
    await page.waitForSelector('.delete-btn-modal')
    const deleteButtonModal = page.getByTestId('delete-btn-modal')
    await deleteButtonModal.click()

    // reload the page
    await page.reload()

    // load the notesItemAfterNoteDelete
    const notesItemAfterNoteDelete = await page.$$('[data-testid="note-id"]')
    console.log("notesItemAfterNoteDelete", notesItemAfterNoteDelete.length);


    expect(notesItemAfterNoteDelete.length).toEqual(initialNotesItem.length - 1)
  });
})
