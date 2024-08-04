import * as ff from '@google-cloud/functions-framework';
import { withBrowser } from "./browser"
import { By } from "selenium-webdriver"

ff.http('DuckDuckGoFunction', async (req: ff.Request, res: ff.Response) => {
  const params = req.params
  let token = ''
  if ('token' in params) {
    token = params['token']
  }

  const accesstToken = process.env.ACCESS_TOKEN
  if (token !== undefined && token && accesstToken !== undefined && token === accesstToken) {
    res.status(401)
  } else {
    let query = ''
    if ('q' in params) {
      query = params['q']
    }
  
    if (query.trim()) {
      await withBrowser(async browser => {
        const ddgBaseUrl = "https://duckduckgo.com/"
        // The trick:
        // 1. load the landing page first
        await browser.visit(ddgBaseUrl)
    
        // (2.1 - not part of the trick - Sanitize the query)
        const q = Array.from(query.trim())
          .filter(char => char.match(/[a-zA-Z0-9\s+]/))
          .join('')
          .replace(/\s+/g, '+')
    
          // 2.2 And then load the query URL
        await browser.visit(`${ddgBaseUrl}?q=${q}&t=h_&ia=web&assist=true`)
    
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
    } else {
      res.status(400)
    }
  }
})
