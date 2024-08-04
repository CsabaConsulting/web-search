import * as ff from '@google-cloud/functions-framework';
import main from "./main"

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
      await main(req, res)
    } else {
      res.status(400)
    }
  }
})
