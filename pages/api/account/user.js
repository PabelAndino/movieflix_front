import cookie from "cookie";


export default async (req, res) => {
    const cookies = cookie.parse(req.headers.cookie ?? "")
    if(req.method === 'GET' && res.statusCode === 200){
        if(cookies.first_name){
            return res.status(200).json({
                user : `${cookies.first_name} ${cookies.last_name} `
            })
        }else{
            return res.status(500).json({
                user : null
            })
        }


    }else {
        return res.status(res.statusCode).json({
            user : null
        })
    }
}