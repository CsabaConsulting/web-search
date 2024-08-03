import { Request, Response } from "express"
import { withBrowser } from "./browser"
import { By } from "selenium-webdriver"

/**
 * The name of this export must match the `--entry-point` option in
 * the deploy script.
 */
export default async function main(req: Request, res: Response) {
	await withBrowser(async browser => {
    const ddgBaseUrl = "https://duckduckgo.com/"
    // The trick: load the landing page
    await browser.visit(ddgBaseUrl)
    // Then load the query URL
		await browser.visit(`${ddgBaseUrl}?q=what+is+palm2&t=h_&ia=web&assist=true`)

		// Wait for the DuckAssist tile to load.
    // let duckAssistLabel = await browser.findText("DuckAssist")
    // div[data-react-module-id="wikinlp"] > div > div > div[1] > div > div > p
    // const duckAssistTile = await browser.find('[data-react-module-id="wikinlp"]')

    let response = "";
    const reactModule = await browser.find('.react-module')
    if (reactModule) {
      const paragraphs = await reactModule.findElements(By.css("p"))
      if (paragraphs && paragraphs.length) {
        const duackAssistMain = await paragraphs[0].getText()
        response = duackAssistMain || ""
      }
    }

    res.send(response)
  })
}
