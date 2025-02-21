import jwt from 'jsonwebtoken'

export const sign =(payload={} , signature =signature ||  process.env.USER_TOKEN_KEY , expiresIn ='1w')=>
    jwt.sign(payload , signature , {expiresIn} );