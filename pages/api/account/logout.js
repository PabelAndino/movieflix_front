import cookie from "cookie";

export default async (req, res) => {

    if (req.method==='POST') {
        res.setHeader('Set-Cookie', [
            cookie.serialize(
                'access', '', {
                    httpOnly: true,
                    secure: true,
                    maxAge: 0,
                    sameSite: 'strict',
                    path: '/api/'
                }
            ),
            cookie.serialize(
                'refresh', '', {
                    httpOnly: true,
                    secure: true,
                    maxAge: 0,
                    sameSite: 'strict',
                    path: '/api/'
                }
            ),
            cookie.serialize(
                'user_id', '', {
                    httpOnly: true,
                    secure: true,
                    maxAge: 0,
                    sameSite: 'strict',
                    path: '/api/'
                }
            ),
            cookie.serialize(
                'area', '', {
                    httpOnly: true,
                    secure: true,
                    maxAge: 0,
                    sameSite: 'strict',
                    path: '/api/'
                }
            ),
            cookie.serialize(
                'first_name', '', {
                    httpOnly: true,
                    secure: true,
                    maxAge: 0,
                    sameSite: 'strict',
                    path: '/api/'
                }
            ),
            cookie.serialize(
                'last_name', '', {
                    httpOnly: true,
                    secure: true,
                    maxAge: 0,
                    sameSite: 'strict',
                    path: '/api/'
                }
            )
        ])



        return res.status(200).json({
            message: 'Loggedout Successfully',
        })

    } else {
        res.setHeader('Allow',['POST'])
        return res.status(405).json({
            error:`Method ${req.method} not allowed`
        })
    }

}