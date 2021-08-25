const axios = require("axios")
const formData = require("form-data")

const imgKit = async (req, res, next) => {

    const imgBuffer = req.file.buffer.toString("base64")
    const key = "private_EPZxqKpml9TV6chOL98nmD8u8fM="
    try {
        const form = formData()
        form.append("file", imgBuffer)
        form.append("fileName", req.file.originalname)
        const result = await axios({
            method: 'post',
            headers: {
                ...form.getHeaders()
            },
            url: 'https://upload.imagekit.io/api/v1/files/upload',
            data: form,
            auth: {
              username: `${key}`,
              password: ''
            }
          });
          req.body.imageUrl = result.data.url
          next()
    } catch (error) {
        res.status(500)
    }
}

module.exports = imgKit