import { Request, Response } from "express"
import { withBrowser } from "./browser"
import { By } from "selenium-webdriver"
import { GoogleGenerativeAI, Part, TextPart, InlineDataPart } from "@google/generative-ai"
import * as https from 'https';


async function downloadImageToBase64String(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        if (response.statusCode !== 200) {
          reject(new Error(`Failed to download image. Status code: ${response.statusCode}`))
          return
        }

        const chunks: Buffer[] = []
        response
          .on('data', (chunk) => chunks.push(chunk))
          .on('end', () => resolve(Buffer.concat(chunks).toString("base64")))
          .on('error', (error) => reject(error))
      })
      .on('error', (error) => reject(error))
  })
}


/**
 * The name of this export must match the `--entry-point` option in
 * the deploy script.
 */
export default async function main(req: Request, res: Response) {
	await withBrowser(async browser => {
    const ddgBaseUrl = "https://duckduckgo.com/"
    await browser.visit(ddgBaseUrl)
    console.log("-0")
		await browser.visit(`${ddgBaseUrl}?q=what+is+palm2&t=h_&ia=web&assist=true`)
		// await browser.visit(`${ddgBaseUrl}?q=what+is+palm2&kl=us-en&assist=true`)
    // await browser.visit(ddgBaseUrl)
    console.log("--0")
    // const source = await browser.driver.getPageSource()
    // console.log(source)
    console.log("0")
    /*
    const anomalyModal = await browser.find(".anomaly-modal__puzzle")
    console.log("001")
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? "YOUR GEMINI API KEY")
    console.log("002")
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
    console.log("003")
    const instructionElement = await anomalyModal.findElement(By.className("anomaly-modal__instructions"))
    const instruction = await instructionElement.getText()
    console.log(instruction)
    const images = await anomalyModal.findElements(By.className("anomaly-modal__image"))
    console.log("#images: ", images.length)
    const textPromt = "Given the following images return a JSON array of confidence values " +
        `about how much each image satisfies the following criteria: ${instruction}`
    const promptParts: Part[] = [{ text: textPromt } as TextPart]
    for (let index = 0; index < images.length; index++) {
      const imageElement = images[index]
      const imageName = await imageElement.getAttribute("data-id")
      const imageUrl = `${ddgBaseUrl}assets/anomaly/images/challenge/${imageName}`
      const imageData = await downloadImageToBase64String(imageUrl)
      const image = {
        inlineData: {
          data: imageData,
          mimeType: "image/png",
        }
      } as InlineDataPart
      promptParts.push(image)
    }

    const result = await model.generateContent(promptParts);
    console.log(result.response.text());
    */

    /*
    const searchInput = await browser.find("#search_form_input")
    console.log("1")
    await searchInput.sendKeys("What is PaLM2?")
    console.log("2")
    const searchButton = await browser.find("#search_button")
    console.log("3")
    await searchButton.click();
    console.log("4")
    const assistButton = await browser.findText("Assist")
    console.log("5")
    await assistButton.click();    
    console.log("6")
    */

		// Wait for the DuckAssist tile to load.
    // let duckAssistLabel = await browser.findText("DuckAssist")
    // div[data-react-module-id="wikinlp"] > div > div > div[1] > div > div > p
    // const duckAssistTile = await browser.find('[data-react-module-id="wikinlp"]')
    // console.log("0")

    const reactModule = await browser.find('.react-module')
    console.log("7")
    console.log(reactModule.toString())
    const paragraphs = reactModule.findElements(By.tagName("p"))
    console.log("8")
    console.log(paragraphs[0].text)

    /*
		await browser.visit("https://atoth.sote.hu/")
    console.log("0")
    const upsSattus = await browser.findText("UPS status")
    console.log("1")
    await upsSattus.click()
    console.log("2")
    await browser.findText("Network UPS Tools")
    console.log("3")
    */
  })
}
