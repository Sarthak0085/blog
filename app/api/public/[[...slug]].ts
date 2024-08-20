import fs from "fs";
import ejs from "ejs";

export default function handler(req: any, res: any) {
    if (req.query.slug && req.query.slug.length) {
        const publicDir = __dirname.split(".next")[0] + "public/"
        const fileUrl = req.query.slug.join("/")
        ejs.renderFile(publicDir + fileUrl, (error, data) => {
            if (error) {
                return res.status(404).send(null)
            }
            return res.status(200).send(data)
        })
    } else {
        res.status(404).send(null)
    }
}