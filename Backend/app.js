const express = require('express');
const app = express();
const axios = require('axios');
let env = require('dotenv')

env.config();  
const PORT = process.env.PORT || 5000;
let bcrypt=require('bcrypt')
let jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const cors = require('cors')
app.use(cors({credentials:true}))

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'))
app.use(cookieParser())



app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret_key',
    resave: false,
    saveUninitialized: false,
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

const mongoose = require('mongoose')
let userSchema = require('./models/user.model')
let MailSchema = require('./models/emailPost.model')

// Function to summarize email using Hugging Face API
const summarizeEmail = async (emailText) => {
    const apiKey = process.env.HUGGING_FACE_API_KEY;  // Fetch API key from .env

    const headers = {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
    };

    const body = {
        inputs: emailText,
    };

    try {
        const response = await axios.post(
            'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',  // Summarization model
            body,
            { headers }
        );
        return response.data[0].summary_text;
    } catch (error) {
        console.error("Error during API request:", error);
        return { error: 'Failed to summarize email' };
    }
};

app.post('/api/createUser',async (req,res)=>{
    let {firstname,lastname,username,email,password}=req.body
    let checkEmail = await userSchema.findOne({ email });
        if (checkEmail) return res.status(400).json({ error: "Email already exists" });

    let checkUser = await userSchema.findOne({ username });
        if (checkUser) return res.status(400).json({ error: "Username already exists" });
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(password,salt,async(err,hash)=>{
            
            let createdUser = await userSchema.create({firstname,lastname,username,email,password:hash})
            console.log("user created",createdUser.username,createdUser.password)
            
        })
    })

    let token = jwt.sign({email:email},process.env.JWT_SECRET)
    res.json({token:token})
})

app.post('/api/login',async(req,res)=>{
    let{email,password}=req.body;
    let user = await userSchema.findOne({email})
    if(user)
    {
        bcrypt.compare(password,user.password,(err,result)=>{
            console.log(result)
            if(result)
            {
                let token = jwt.sign({email:email},process.env.JWT_SECRET);
                res.cookie('token',token)
                res.json({token:token})
            }
            else
            {
                res.send('invalid creditinals wrong password or email')
            }
        })    
    }
    else{res.send('invalid creditinals wrong password or email')}
})

app.get('/logout',(req,res)=>{
    res.clearCookie('token')
    res.send('logged out')
})

function isLoggedIn(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: "Unauthorized. Please log in." }); // Send JSON response
    }

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data;
        next();
    } catch (err) {
        return res.status(403).json({ error: "Invalid or expired token." });
    }
}


// API endpoint for summarizing email
app.post('/api/summarize',isLoggedIn, async (req, res) => {
    const { emailText,name } = req.body;
    let userdetails = await userSchema.findOne({email:req.user.email});
    let mailData=await MailSchema.create({user:userdetails._id,name,Mailcontent:emailText})
    userdetails.posts.push(mailData._id)
    await userdetails.save()
    if (!emailText) {
        return res.status(400).json({ result: 'No email content provided' });
    }

    const summary = await summarizeEmail(emailText);
    return res.json({result:summary})
});

//user posted mails
app.get('/allMailUploads',isLoggedIn,async(req,res)=>{
    let user=await userSchema.findOne({email:req.user.email}).populate('posts')
    res.json({posts:user.posts})
})

//save otp and expiry time
app.post('/api/save-otp', async (req, res) => {
    const { email, otp, expiryTime } = req.body;

    try {
        let user = await userSchema.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Save OTP and expiration time
        user.verifyOtp = otp;
        user.verifyOtpExpiresAt = expiryTime;
        await user.save();

        res.json({ success: true, message: "OTP saved successfully" });
    } catch (error) {
        console.error("Error saving OTP:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

//check otp 
app.get('/api/confirmOtp/:userEmail', async (req, res) => {
    try {
        const user = await userSchema.findOne({ email: req.params.userEmail });
        if (user) {
            return res.send(user)
        } else {
            return res.json({ userExist: false });
        }
    } catch (error) {
        console.error('Error finding user:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

//delte mail
app.delete('/deleteMail/:id', isLoggedIn, async (req, res) => {
    try {
        const post = await MailSchema.findByIdAndDelete(req.params.id);

        if (!post) {
            return res.status(404).json({ message: "Mail not found" });
        }
        // await UserSchema.findByIdAndUpdate(req.user.id, {
        //     $pull: { mails: req.params.id } // Remove mail ID from the user's mails array
        // });

        res.status(200).json({ message: "Mail deleted successfully", deletedMail: post });
    } catch (error) {
        res.status(500).json({ error: "Error deleting mail" });
    }
});

//check user existed or not for reset password
app.get('/api/finduser/:email', async (req, res) => {
    try {
        const user = await userSchema.findOne({ email: req.params.email });

        if (user) {
            return res.json({ userExist: true });
        } else {
            return res.json({ userExist: false });
        }
    } catch (error) {
        console.error('Error finding user:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/api/setPass/:email',async(req,res)=>{
    let email = req.params.email
    let {pass} = req.body
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(pass,salt,async(err,hash)=>{    
            let user = await userSchema.findOneAndUpdate({email},{password:hash},{new:true})
            console.log("user created",user.password)
            res.json({'set':true})
        })
})
})

mongoose.connect(`${process.env.MONGODB_URL}/projectDB`)
.then(()=>{
    console.log('database connected')
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
})
})

.catch((err)=>{console.log('error',err.message)})

const { spawn } = require('child_process'); // For spawning Python process

// API route for classification
app.post('/api/classify',isLoggedIn ,async (req, res) => {
    const { emailText,name } = req.body;
    let userdetails = await userSchema.findOne({email:req.user.email});
    let mailData=await MailSchema.create({user:userdetails._id,name,Mailcontent:emailText})
    userdetails.posts.push(mailData._id)
    await userdetails.save()
    if (!emailText) {
        return res.status(400).json({ result: 'No email content provided' });
    }

    // Spawn a new Python process to classify the email
    const pythonProcess = spawn('python', ['predict.py', emailText]);

    let result = '';
    pythonProcess.stdout.on('data', (data) => {
        result += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    pythonProcess.on('close', (code) => {
        if (code === 0) {
            result = result.trim().replace(/\r?\n/g, '');
            // Send the classification result as a response
            res.json({ result: result });
        } else {
            res.status(500).json({result: 'Error during classification' });
        }
    });
});

//user logged in
app.get('/api/userData',isLoggedIn,async(req,res)=>{
    const data = await userSchema.findOne({email:req.user.email})
    res.json({user:data})
})

// Google OAuth Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await userSchema.findOne({ email: profile.emails[0].value });

        if (!user) {
            user = await userSchema.create({
                firstname: profile.name.givenName,
                lastname: profile.name.familyName,
                username: profile.emails[0].value.split('@')[0],
                email: profile.emails[0].value,
                password: undefined, // Ensure password is undefined
                googleId: profile.id, // Store Google ID to bypass password requirement
                profilePicture: profile.photos[0]?.value // Store profile picture if available
            });
        }
        return done(null, user);
    } catch (err) {
        return done(err, null);
    }
}));


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        let user = await userSchema.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

// Google OAuth Routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        if (!req.user) {
            return res.redirect(`${process.env.FRONTEND_URL}/login`); // If authentication fails
        }

        // Generate JWT token
        let token = jwt.sign({ email: req.user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Set token as a cookie (No "secure" flag for local testing)
        res.cookie('token', token);

        // Redirect to /mail after successful login
        res.redirect(`${process.env.FRONTEND_URL}/mail`);
    }
);
