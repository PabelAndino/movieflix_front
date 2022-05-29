import cookie from "cookie";


export default async (req, res) => {
    const cookies = cookie.parse(req.headers.cookie ?? "")
    if(req.method === 'GET' && res.statusCode === 200){
        if(cookies.refresh){
            return res.status(200).json({
                message:1,
                access : `${cookies.access}`
            })
        }else{
            return res.status(500).json({
                message : 2,
            })
        }


    }else {
        return res.status(res.statusCode).json({
            message : 2
        })
    }
}