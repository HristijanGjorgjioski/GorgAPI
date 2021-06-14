const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const { validationResult } = require('express-validator');

const User = require("../../models/Auth/authModel");

const secret = 'test';

exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await User.findOne({ email });

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

    const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" } );

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    
    console.log(error);
  }
};

exports.requestPasswordReset = async (req, res, next) => {
  try {
    crypto.randomBytes(32, async (err, buffer) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "Something went wrong" });
      }
      const token = buffer.toString('hex');
      
      const user = await User.findOne({ email: req.body.email });
  
      if(!user) return res.status(500).json({ message: "Something went wrong" });
  
      user.resetToken = await token;
      user.resetTokenExpiration = await Date.now() + 3600000;
      await user.save();
  
      await res.status(200);

      sendgrid.setApiKey('API_KEY_HERE');
      await sendgrid.send({
        from: 'hristijangorgioski501@gmail.com',
        to: req.body.email,
        subject: 'Password reset',
        html: `
          <h2>You requested a password reset. Click <a href="http://localhost:3000/new-password/${token}">HERE</a></h2>
          <h2>and change your password. We hope you enjoy our app!</h2>
        `
      });
    }) 
  } catch (error) {
    res.redirect('/reset');
    console.log(error);
  }
}

exports.newPassword = async (req, res) => {
  const token = req.params.token;
  const newPassword = req.body.password;
  const userId = req.body.userId;
  const passwordToken = req.body.passwordToken;
  let resetUser;
  let hashedPassword;

  try {
    const user = await User.findOne({
      resetToken: passwordToken,
      resetTokenExpiration: { $gt: Date.now() },
      _id: userId
    });
  
    resetUser = user;
  
    if(user) {
      hashedPassword = bcrypt.hash(newPassword, 12);
      return hashedPassword;
    }
  
    if(hashedPassword) {
      resetUser.password = hashedPassword;
      resetUser.resetToken = undefined;
      resetUser.resetTokenExpiration = undefined;
      return resetUser.save();
    }
  
    return res.status(200).json({ message: "Success!" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", token }) 
  }
}
