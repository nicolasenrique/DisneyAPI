const path = require("path");
const bcryptjs = require("bcryptjs");
let db = require("../database/models");
const jwt = require("jsonwebtoken");
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const controlUsers = {

    register: async (req, res, next) =>  {
        // Our register logic starts here
        try {
          // Get user input
          const { first_name, last_name, email, password } = req.body;
      
          // Validate user input
          if (!(email && password && first_name && last_name)) {
            res.status(400).send("All input is required");
          }
      
          // check if user already exist
          // Validate if user exist in our database
          const oldUser = await db.User.findOne({where: { email: email }});
      
          if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
          }
      
          //Encrypt user password
          encryptedPassword = await bcryptjs.hashSync(password, 10);
      
          // Create user in our database
          const user = await db.User.create({
            first_name,
            last_name,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
          });

          //Sendgrid email
          const msg =  await {
            to: email, // Your recipient
            from: 'nicolas.enrique56@gmail.com', // Your verified sender
            subject: 'Welcome to Nicolas server',
            text: 'Welcome',
            html: '<strong>Success! User registered</strong>',
          }
          sgMail
            .send(msg)
            .then(() => {
              console.log('Email sent')
            })
            .catch((error) => {
              console.error(error)
            })
      
          // Create token
          const token = jwt.sign(
            { user_id: user.id_user, email },
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );
          // save user token
          user.token = token;
      
          // return new user
          res.status(201).json(user);
        } catch (err) {
          console.log(err);
        }
        // Our register logic ends here
      },

   login: async (req, res, next) =>  {
     // Our login logic starts here
    try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await db.User.findOne({where: { email: email }});

    if (user && (await bcryptjs.compareSync(password, user.password))) {
      //store user in session
      req.session.userLogged = user
      // Create token
      const token = jwt.sign(
        { user_id: user.id_user, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      // user
      return res.status(200).json(user);
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
}
}
module.exports = controlUsers;