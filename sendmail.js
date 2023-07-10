const nodemailer = require('nodemailer')
const {google} = require('googleapis')

const CLIENT_ID='Enter clinet_id from google cloud api'
const CLIENT_SECRET='Enter client_secret from google cloud api'
const REDIRECT_URI='https://developers.google.com/oauthplayground'
const REFRESH_TOKEN='Enter refresh from google cloud api'

const OAuth2client= new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URI)
OAuth2client.setCredentials({refresh_token:REFRESH_TOKEN})

 async function sendMail(){
    try {
        const accessToken = await OAuth2client.getAccessToken()
        const transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                type:'OAuth2',
                user:'enter your sender mail',
                clientId:CLIENT_ID,
                clientSecret:CLIENT_SECRET,
                refreshToken:REFRESH_TOKEN,
                accessToken:accessToken
            }
        })
        const mailOptions={
            from:'sender name < enter your sender mail ID>',
            to:'enter your reciever mail ID',
            subject:'Email from nodejs (message)',
            text:'Hello guys this email from backend (nodejs)',
            html:'<h1> Hello Guys this email from <b>backend</b> (nodejs) </h1>'
        }
        const result = await transporter.sendMail(mailOptions)
        return result
    } 
    catch (error) {
        return console.log(error)
    }
}


(async() => {
    try{
        let response = await sendMail()
        console.log(response)
    }
    catch(e){
        console.log(e.message)
    }
})()
