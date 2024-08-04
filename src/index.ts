import * as ff from '@google-cloud/functions-framework';
import main from "./main"

ff.http('DuckDuckGoFunction', (req: ff.Request, res: ff.Response) => {
  const url = new URL(req.url)
  const params = new URLSearchParams(url.search)
  const token = params.get('token')
  const accesstToken = process.env.ACCESS_TOKEN
  if (token !== undefined && token && accesstToken !== undefined && token === accesstToken) {
    res.status(401)
  } else {
    const query = params.get('q') || ''
    if (query.trim()) {
      main(req, res)
    } else {
      res.status(400)
    }
  }
})
