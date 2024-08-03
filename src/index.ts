import * as ff from '@google-cloud/functions-framework';
import main from "./main"

ff.http('DuckDuckGoFunction', (req: ff.Request, res: ff.Response) => {
  main(req, res)
})
