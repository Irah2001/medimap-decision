import { type Page, expect } from "@playwright/test"

export async function signUpNewUser(
  page: Page,
  name: string,
  email: string,
  password: string,
) {
  await page.goto("/signup")

  await page.getByPlaceholder("Full Name").fill(name)
  await page.getByPlaceholder("Email").fill(email)
  await page.getByPlaceholder("Mot de passe", { exact: true }).fill(password)
  await page.getByPlaceholder("Confirmer votre mot de passe").fill(password)
  await page.getByRole("button", { name: "S'inscrire" }).click()
  await page.goto("/login")
}

export async function logInUser(page: Page, email: string, password: string) {
  await page.goto("/login")

  await page.getByPlaceholder("Adresse Mail").fill(email)
  await page.getByPlaceholder("Mot de passe", { exact: true }).fill(password)
  await page.getByRole("button", { name: "Connexion" }).click()
  await page.waitForURL("/")
  await expect(
    page.getByText("Bienvenue "),
  ).toBeVisible()
}

export async function logOutUser(page: Page) {
  await page.getByTestId("user-menu").click()
  await page.getByRole("menuitem", { name: "Log out" }).click()
  await page.goto("/login")
}
