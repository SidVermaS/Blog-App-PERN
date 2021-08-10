import path from "path"
import fs from 'fs'
import {UploadedFile} from 'express-fileupload'
import {Request, Response} from 'express'

const uploadPhoto=async (req: Request<any>)=> {
    try {
        const file=req.files?.file as UploadedFile
        
        const fileLocation:string=path.join(path.resolve(), `/src/uploads/${req.body.file_type}/${req.body.file_name}`)
        await file.mv(fileLocation)
        return req.body.file_name
    }   catch(error)    {
        return ''
    }
}

export {
    uploadPhoto,
}