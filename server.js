const express = require('express');
const app = express();
const nodemailer = require("nodemailer");
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: 'huh.csv',
    header: [
        {id: 'email', title: 'Email Adress'},
        {id: 'fname', title: 'First Name'},
        {id: 'lname', title: 'Last Name'},
        {id: 'address', title: 'Address'},
        {id: 'phone', title: 'Phone Number'},
        {id: 'region', title: 'Region'},

    ]
});


const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: "alejandrodiego70@zohomail.com",
        pass : 'rksWKMUBZBj5'
    }
})

const PORT = process.env.PORT || 5000;

//Middleware
app.use(express.static('public'))
app.use(express.json());

app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/public/contactform.html')
    
})



app.post('/',(req,res)=>{
    console.log(req.body.fname);


    const records = [
        {email: req.body.email , fname : req.body.fname , lname : req.body.lname , address: req.body.address, phone : req.body.phone , region : "HUH"}
    ];
     
    const foo = async () => {
        await csvWriter.writeRecords(records)       
        .then(() => {
            console.log('...Done');
        });
      }
    
      foo();

    const mailOptions = {
        from : 'alejandrodiego70@zohomail.com',
        to: "alejandrodiego70@zohomail.com",
        subject: `Message from BRUH ${req.body.email}: ${req.body.subject}`,
        text : JSON.stringify(req.body) + " " + req.body.message,
        attachments :[{
            filename : "huh.csv",
            path : "huh.csv"

        }]

    }
    



   transporter.sendMail(mailOptions, (error,info)=>{
        if(error){
            console.log(error);
            res.send('error');

        }
        else{
            console.log("Email sent " + info.response);
            res.send('success');
        }
        
    })

})

app.listen(PORT , ()=>{
    console.log(`Server running on PORT : ${PORT}`);
})