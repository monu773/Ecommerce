require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Razorpay = require("razorpay");
const crypto = require("crypto");
// require('./db/config')
const User = require('./db/user');
const Product = require('./db/product');
const AddCart = require('./db/addCart');
const mongoose = require('mongoose');

const Jwt = require('jsonwebtoken');
const jwtKey = 'e-comm';

const app = express();

app.use(express.json());
app.use(cors());

const URI = process.env.MONGODB_URL || 5000;
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
},err => {
    if(err) throw err;
    console.log(`Connected to mongoDB`);
});

app.post('/register', async (req, res) => {
    const user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    Jwt.sign({result}, jwtKey, {expiresIn:"2h"}, (err, token) => {
        if(err){
            res.send({result: "Something went wrong, Please try after sometime"})
        }
        res.send({result, auth: token});
    })
})

app.post('/login', async (req, res) => {
    console.log(req.body);
    if(req.body.password && req.body.email){
        let user = await User.findOne(req.body).select("-password");
        if(user){
            Jwt.sign({user}, jwtKey, {expiresIn:"2h"}, (err, token) => {
                if(err){
                    res.send({result: "Something went wrong, Please try after sometime"})
                }
                res.send({user, auth: token});
            })
        }else{
            res.send({result: 'No User Found'});
        }
    }else{
        res.send({result: 'No User Found'});
    }
})

app.post('/add-product', verifyToken, async (req, res) => {
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);
})

app.get('/products', verifyToken, async (req, res) => {
    let products = await Product.find();
    if(products.length>0){
        res.send(products);
    }else{
        res.send({result:"No Products Found"});
    }
})

app.delete('/product/:id', verifyToken, async (req, res) => {
    const result = await Product.deleteOne({_id: req.params.id});
    res.send(result);
})

app.get('/product/:id', verifyToken, async (req, res) => {
    let result = await Product.findOne({_id: req.params.id});
    if(result){
        res.send(result);
    }else{
        res.send({result: "No result Found"});
    }
})

app.put('/product/:id', verifyToken, async (req, res) => {
    let result = await Product.updateOne(
        {_id: req.params.id},
        {$set : req.body}
    )
    res.send(result);
})

app.get('/search/:key' , verifyToken, async (req, res) => {
    let result = await Product.find({
        "$or": [
            {name: {$regex: req.params.key}},
            {company: {$regex: req.params.key}},
            {category: {$regex: req.params.key}}
        ]
    });
    res.send(result);
})

app.post('/addCart', verifyToken, async (req, res) => {
    let addCart = new AddCart(req.body);
    let result = await addCart.save();
    res.send(result);
})

app.get('/cart', verifyToken, async (req, res) => {
    let addCart = await AddCart.find();
    if(addCart.length>0){
        res.send(addCart);
    }else{
        res.send({result:"No Products Found"});
    }
})

app.delete('/cart/:id', verifyToken, async (req, res) => {
    const result = await AddCart.deleteOne({_id: req.params.id});
    res.send(result);
})

app.post('/orders', async (req, res) => {
	try {
		const instance = new Razorpay({
			key_id: process.env.KEY_ID,
			key_secret: process.env.KEY_SECRET,
		});

		const options = {
			amount: req.body.amount * 100,
			currency: "INR",
			receipt: crypto.randomBytes(10).toString("hex"),
		};

		instance.orders.create(options, (error, order) => {
			if (error) {
				console.log(error);
				return res.status(500).json({ message: "Something Went Wrong!" });
			}
			res.status(200).json({ data: order });
		});
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error!" });
		console.log(error);
	}
});

app.post('/verify', async (req, res) => {
	try {
		const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
			req.body;
		const sign = razorpay_order_id + "|" + razorpay_payment_id;
		const expectedSign = crypto
			.createHmac("sha256", process.env.KEY_SECRET)
			.update(sign.toString())
			.digest("hex");

		if (razorpay_signature === expectedSign) {
			return res.status(200).json({ message: "Payment verified successfully" });
		} else {
			return res.status(400).json({ message: "Invalid signature sent!" });
		}
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error!" });
		console.log(error);
	}
});

function verifyToken(req, res, next){
    let token = req.headers['authorization']; 
    if(token){
        token = token.split(' ')[1];
        Jwt.verify(token, jwtKey, (err, valid) => {
            if(err){
                res.status(401).send({result: 'Please provide valid token'});
            }else{
                next();
            }
        });
    }else{
        res.status(403).send({result: 'Please add token with header'});
    }
    // console.log("Middleware Called", token);
}

if(process.env.NODE_ENV == 'production'){
    app.use(express.static('e-comm/build'))
    app.use('*', (req,res) => {
      res.sendFile(path.join(__dirname, 'e-comm', 'build', 'index.html'))
    })
}

app.listen(5000, () => {
    console.log("Serving on port 5000");
})