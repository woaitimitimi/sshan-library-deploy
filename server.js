// create node.js servers
import express from 'express'

const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send('Hello from Node.js')
})

// 反引号才会解析其中的port变量
// 单引号只会用于定义字符串，不会解析其中的变量
app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})