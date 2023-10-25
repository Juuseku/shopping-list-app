const { test, expect } = require("@playwright/test");

test("Main page has expected title and headings.", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Shared shopping lists");
  await expect(page.locator("h2")).toHaveText("Statistics");
});

test("Can add a list and then deactivate it.", async ({ page }) => {
  await page.goto("/lists");
  const listName = `My list: ${Math.random()}`;
  await page.locator("input[type=text]").type(listName);
  await page.locator("input[type=submit]").click();
  await expect(page.locator(`a >> text='${listName}'`)).toHaveText(listName);
  await page.locator("input[type=submit][value='Deactivate list!']").click();
});

test("Can add a list and then open a list page.", async ({ page }) => {
  await page.goto("/lists");
  const listName = `My list: ${Math.random()}`;
  await page.locator("input[type=text]").type(listName);
  await page.locator("input[type=submit]").click();
  await page.locator(`a >> text='${listName}'`).click();
  await expect(page.locator("h1")).toHaveText(listName);
  await page.goto("/lists");
  await page.locator("input[type=submit][value='Deactivate list!']").click();
});

test("Can add a item to a list.", async ({ page }) => {
  await page.goto("/lists");
  const listName = `My list: ${Math.random()}`;
  const itemName = `${Math.random()}`;
  await page.locator("input[type=text]").type(listName);
  await page.locator("input[type=submit]").click();
  await page.locator(`a >> text='${listName}'`).click();
  await page.locator("input[type=text]").type(itemName);
  await page.locator("input[type=submit][value='Add item!']").click();
  await expect(page.locator("span")).toHaveText(itemName);
  await page.goto("/lists");
  await page.locator("input[type=submit][value='Deactivate list!']").click();
});

test("Can go back from the individual list to the lists", async ({ page }) => {
  await page.goto("/lists");
  const listName = `My list: ${Math.random()}`;
  await page.locator("input[type=text]").type(listName);
  await page.locator("input[type=submit]").click();
  await page.locator(`a >> text='${listName}'`).click();
  await page.locator(`a >> text='Shopping lists'`).click();
  const currentUrl = page.url();
  const expectedPath = "/lists";
  const currentPath = new URL(currentUrl).pathname;
  expect(currentPath).toBe(expectedPath);
});
