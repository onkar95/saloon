const bcrypt = require('bcryptjs')
const User = require('../module/user')
const Shop = require('../module/shop');

const jwt = require("jsonwebtoken");
const maxAge = 5 * 24 * 60 * 60
const createJWT = id => {
    return jwt.sign({ id }, 'chatroom secret', {
        expiresIn: maxAge
    })
}

const dotenv = require('dotenv');
dotenv.config();

const alertError = (err) => {
    let errors = { name: '', email: '', password: '' }
    console.log('err message', err.message);
    console.log('err code', err.code);
    if (err.message === 'incorrect email') {
        errors.email = 'This email not found';
    }
    if (err.message === 'incorrect pwd') {
        errors.password = 'The password is incorrect';
    }
    if (err.code === 11000) {
        errors.email = 'This email is already registered';
        return errors;
    }
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }
    // if (err.message.includes('userStudent validation failed')) {
    //     Object.values(err.errors).forEach(({ properties }) => {
    //         errors[properties.path] = properties.message
    //     })
    // }
    return errors
}
module.exports.register = async (req, res) => {

    const { name, email, password, Confirmpassword, City, State, phoneNo, Pincode, Role } = req.body
    try {
        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ error: 'user already exist' })
        }

        let empty = await User.email

        let hashed_password;
        console.log(password);
        console.log(Confirmpassword);
        if (password === Confirmpassword) {

            hashed_password = await bcrypt.hash(password, 10);
        } else {
            return res.status(400).json({ error: 'password doesnt match' })

        }
        // user = new User({
        //     name,
        //     email,
        //     password: hashed_password,
        //     Confirmpassword: hashed_password,
        //     name, email, City, State, phoneNo, Pincode, Role
        // });
        const createuser = await User.create({
            name,
            email,
            password: hashed_password,
            Confirmpassword: hashed_password,
            name, email, City, State, phoneNo, Pincode, Role
        });
        const token = createJWT(createuser._id);

        // const token = jwt.sign({ _id: createuser._id }, process.env.JWT_SECRET, {
        //     expiresIn: '30d',
        // });
        console.log(token);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })

        // await user.save();
        console.log(req.body);
        // return res.status(201).json({ message: "user created sucessfuly" })
        return res.status(201).json({ createuser });

    } catch (err) {
        let errors = alertError(err);
        // return res.status(400).json({ error: error.message });
        return res.status(400).json({ errors });

    }

}

module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "user doesnot exit" })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ error: 'invalid creaditentiol' })
        }
        const token = createJWT(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })

        console.log(token);
        return res.status(200).json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                Role: user.Role,
            },
        });
    } catch (error) {
        let errors = alertError(error);
        // return res.status(400).json({ error: error.message });
        return res.status(400).json({ errors });
    }

}

module.exports.verifyuser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'chatroom secret', async (err, decodedToken) => {
            console.log('decoded token', decodedToken)
            if (err) {
                console.log(err.message)
            } else {
                let user = await User.findById(decodedToken.id)
                res.json(user);
                next();

            }
        })
    } else {
        next();
    }
}
module.exports.shopkeeper = async (req, res) => {
    const { ShopName, shopAddress, shopPincode, shopImage, hairstyle, openTiming, closeTiming } = req.body;

    try {
        const shopDetails = await Shop.create({
            ShopName, shopAddress, shopPincode, shopImage, hairstyle, openTiming, closeTiming
        });
        // const shopDetails = new Shop({
        //     ShopName, shopAddress, shopPincode, shopImage, hairstyle, openTiming, closeTiming
        // });
        // await shopDetails.save();
        res.status(201).json({ shopDetails });
        return res.status(201).json({ message: "user created sucessfuly" })

        // const token = createJWT(user._id);
        // res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
    } catch (error) {
        let errors = alertError(error);
        res.status(400).json({ errors });
    }
}

module.exports.shopfilterer = async (req, res) => {
    let searchPin = req.query.shopPincode;
    let searchName = req.query.ShopName;
    const valueorSearch = (v1,v2) => {
        let searchPin = "";
        let searchName = "";
        if (v2=== undefined) {
    
            searchPin = v1;
            return searchPin;
        } else {
            searchName = v2;
            return searchName;
        }
    
    }
    const value=valueorSearch(searchPin,searchName)
    try {
        await Shop.find({ $or: [{ ShopName: { $regex: value , $options: '$i' } }, { shopPincode: { $regex:  value , $options: '$i' } }] })
            .then(data => res.send(data))
    } catch (error) {
        res.status(400).json({ error });
    }
}
module.exports.shops = async (req, res) => {
    Shop.find()
        .then((data) => {
            res.send(data)
        })
        .catch(err => console.log(err))
}
module.exports.singleShop = async (req, res) => {
    const id = req.params.id;
    try {
        const shop = await Shop.findById(id);
        res.status(200).json(shop);
      } catch (err) {
        res.status(500).json(err);
      }
}


module.exports.logout = (req, res, next) => {
    res.cookie('jwt', "", { maxAge: 1 })
    // const tkn=jwt.destroy() 
    res.status(200).json({ logout: true })
    next();
}

