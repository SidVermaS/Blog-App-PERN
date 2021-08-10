import './loadEnv'
import express from 'express'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import indexRouter from './routes/index.route'

const app=express()
app.use(cors())
app.use(express.json())
app.use(fileUpload())
app.use('/uploads/users', express.static(__dirname+'/uploads/users'))
app.use('/uploads/posts', express.static(__dirname+'/uploads/posts'))

app.use('/api/', indexRouter)

const PORT=process.env.PORT
app.listen(PORT, ()=> {
    console.log(`Server is running on ${PORT}`)
})