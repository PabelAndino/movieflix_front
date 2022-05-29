import cookie from "cookie"
import jwt_decode from "jwt-decode";
const API_URL = process.env.NEXT_PUBLIC_API

export default async (req, res) => {


    if (req.method === 'POST') {
        const {username, password} = req.body;
        const body = JSON.stringify({
            username, password
        })

        let date = new Date()
        let hours = date.getHours()
        const expirationHour = () => {
            if(hours > 17)
                return 60*60//11 18 11
            else return 60*60*8
        }



        try {
            const apiRes = await fetch(`${API_URL}/token/`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: body
            })

            const data = await apiRes.json()
            if (apiRes.status === 200) {
                const access = jwt_decode(data.access)
                res.setHeader('Set-Cookie', [
                    cookie.serialize(
                        'access', data.access, {
                            httpOnly: true,
                            secure: true,
                            maxAge: expirationHour(),//media hora 60*60*24 = 1 dia, 60*60*24*30= 30 dias, 60*60= 1 hora , esta notado en milisegundos
                            sameSite: 'strict',
                            path: '/api/'
                        }
                    ),
                    cookie.serialize(
                        'refresh', data.refresh, {
                            httpOnly: true,
                            secure: true,
                            maxAge: 60 * 60 * 8,
                            sameSite: 'strict',
                            path: '/api/'
                        }
                    ),
                    cookie.serialize(
                        'user_id', access.user_id, {
                            httpOnly: true,
                            secure: true,
                            maxAge: expirationHour(),
                            sameSite: 'strict',
                            path: '/api/'
                        }
                    ),
                    cookie.serialize(
                        'area', access.area_id, {
                            httpOnly: true,
                            secure: true,
                            maxAge: expirationHour(),
                            sameSite: 'strict',
                            path: '/api/'
                        }
                    ),
                    cookie.serialize(
                        'first_name', access.first_name, {
                            httpOnly: true,
                            maxAge: expirationHour(),
                            sameSite: 'strict',
                            path: '/api/'
                        }
                    ),
                    cookie.serialize(
                        'last_name', access.last_name, {
                            httpOnly: true,
                            maxAge: expirationHour(),
                            sameSite: 'strict',
                            path: '/api/'
                        }
                    )
                ])

                return res.status(200).json({
                    success: 'Logged Successfully',
                    access: data.access
                })
            } else {
                return res.status(apiRes.status).json({
                    error: 'Authentication Failed'
                })
            }
        } catch (e) {
            return res.status(500).json({
                error: 'Something went wrong when trying to authenticate'
            })
        }

    } else {
        res.setHeader('Allow', ['POST'])
        return res.status(405).json({error: `METHOT ${re.method} not allowed`})
    }


}