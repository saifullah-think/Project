//Imports
const express = require('express')
var http = require('http');

const app = express()
var server = http.createServer(app);
const process = require('process')
const bodyParser = require('body-parser')
const User = require('./models/User')
const mongoose = require('mongoose')
const Listings = require('./models/Listings')
const PaidListingSchema=require('./models/PaidListing');
const Activity = require('./models/ProfileActivity')
const ListingReport = require('./models/ListingReport')
const Drafts = require('./models/DraftListings')
const Inactive = require('./models/Inactive')
const Shipping = require('./models/Shipping')
const fileUpload = require("express-fileupload");

const Category = require('./models/Categories')
const ExclusiveCategory=require('./models/ExclusiveCategory')
const Chats = require('./models/Chats')
// const url = 'mongodb://demo:demo123@ds133137.mlab.com:33137/puroartisan'
const url = 'mongodb://demo:demo123@ds137441.mlab.com:37441/artisan'
const Reports = require('./models/Reports')
const PaymentInfo = require('./models/PaymentInfo')
const Icons = require('./models/Icons')
const stripe = require("stripe")('sk_test_HoPdfcNw4Z50hxhA5wbEeT62002SCwGUWP');
const port = process.env.PORT || 5000
// auction stuff
const AuctionItems = require("./models/AuctionItems");
const Auction = require("./models/Auctions");
const ExternalAccount = require('./models/ExternalAccounts')
const Orders = require('./models/Orders')
const Payouts = require('./models/Payouts')
const EbayAuthToken = require('ebay-oauth-nodejs-client');
const cors = require('cors')
var request = require('request');
const CronJob = require("cron").CronJob;

const client = require('socket.io').listen(server).sockets;



var SponsorSchema = require("./models/SponserModel");
var JobBoardSchema = require("./models/JobBoardModal");
var JobCategorySchema = require("./models/CategoryModal");
var messegeSchema = require("./models/ChatModal");
var OrderSchema = require("./models/OrderModel")

//Exclusive services
///Exclusive Services Schema
var ExclusiveUserSchema = require("./models/ExclusiveUserModel");
var ExclusiveServicesSchema = require("./models/ExclusiveServicesModel");
var ExclusiveMessegesSchema = require("./models/ExclusiveMessegesModel");
var ExclusiveOrderSchema = require("./models/ExclusiveOrderModel");

var HelpCenterSchema = require("./models/HelpCenterModel");
var BlogSchema = require("./models/BlogModel");
// Creating an environment
let clientId = "AebZVgTaxE1-E1ACZ-q5lAqMWoNyM7oIdrqswPk8QVR52TdnfqpZ21xHmkxYnMnrFjvDNiKKgD05OPgB";
let clientSecret = "EFhgAq05cpKqUFVhtM0DG6ccDpPBdmhubjw2h4krMsH-UkG3syNyqnTsUXa2Sk1SMNaXTqmWk7QOoHB-";

// let clientt = new paypal.core.PayPalHttpClient(environment);
app.use(bodyParser.json())  //Body Parser MiddleWare
app.use(express.json())
app.use(cors())
// const admin = require("firebase-admin");
const serviceAccount = require('./pureartisann-firebase-adminsdk-br12v-81fec7d953.json');
app.use(bodyParser())
app.use(express.static("public"));
app.use(
    fileUpload({
        limits: { fileSize: 50 * 1024 * 1024123 }
    })
);
var admin = require("firebase-admin");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://pureartisann.firebaseio.com"
});

//PAYPAL CLIENT ID: AebZVgTaxE1-E1ACZ-q5lAqMWoNyM7oIdrqswPk8QVR52TdnfqpZ21xHmkxYnMnrFjvDNiKKgD05OPgB

// stripe.oauth.token({
//     grant_type: 'authorization_code',
//     code: 'ac_GmvHvlusr8MVHY60QuHDMWjuF968yoF6',
//   }).then(function(response) {
//     // asynchronously called
//     var connected_account_id = response.stripe_user_id;
//     console.log(connected_account_id)
//   });
mongoose.connect(url, { useNewUrlParser: true }) //MongoDB connection using Mongoose
var db = mongoose.connection //Mongo Connection Instance
let access_token = ''
async function generateToken() {
    await request.post({
        uri: "https://api.sandbox.paypal.com/v1/oauth2/token",
        headers: {
            "Accept": "application/json",
            "Accept-Language": "en_US",
            "content-type": "application/x-www-form-urlencoded"
        },
        auth: {
            'user': 'AebZVgTaxE1-E1ACZ-q5lAqMWoNyM7oIdrqswPk8QVR52TdnfqpZ21xHmkxYnMnrFjvDNiKKgD05OPgB',
            'pass': 'EFhgAq05cpKqUFVhtM0DG6ccDpPBdmhubjw2h4krMsH-UkG3syNyqnTsUXa2Sk1SMNaXTqmWk7QOoHB-',
        },
        form: {
            "grant_type": "client_credentials"
        }
    }, (error, response, body) => {
        let data = JSON.parse(body)
        access_token = data.access_token
        console.log(access_token)
    });
}
db.on('open', () => {
    console.log('database connected')
    generateToken()
})
function handleErr(err) {
    if (err) return {
        message: "Failed",
        err
    }
}
function handleSuccess(data) {
    if (data) return {
        message: "Success",
        doc: data
    }
}


setInterval(() => {
    generateToken()
}, 14000 * 1000);
app.delete("/api/deleteAdminOrUSer", (req, res) => {
    admin.auth().deleteUser(req.body.uid)
        .then(() => {

            User.deleteOne({firebaseUID:req.body.uid}).then((err,success)=>{
                if(err)
                {
                    console.log(err.message)
                }
                else
                {
                    console.log("success===>",success)
                    res.send({message:success})
                }
            })
            res.json({
                message: "success",

            })
        })
        .catch(function (error) {
            res.json({
                message: "Fail",

            })
        });
})


//block request
app.post("/api/bloclkuser", (req,res) => {
    User.findOneAndUpdate({firebaseUID:req.body.uid},
        {blocked:true},
        {new:true},
        (err,doc)=>{
        if(err){
        res.json(handleErr(err))
        } 
        else 
        {
            return res.json(handleSuccess(doc))
        }
    })
})


//unbllock id
app.post("/api/Unbloclkuser", (req,res) => {
    User.findOneAndUpdate({firebaseUID:req.body.uid},
        {blocked:false},
        {new:true},
        (err,doc)=>{
        if(err){
     res.json(handleErr(err))
        } 
        else 
        {
            return res.json(handleSuccess(doc))
        }
    })
})



app.put("/api/createUser", (req, res) => {
    admin.auth().createUser({
        email: req.body.email,
        password: req.body.password,
        displayName: req.body.name,
        disabled: false
    })
        .then(function (userRecord) {
            // See the UserRecord reference doc for the contents of userRecord.
            console.log('Successfully created new user:', userRecord.uid);

        })
        .catch(function (error) {
            console.log('Error creating new user:', error);
        });
})




//PaidListing

app.get('/readPaidListing', (req, res) => {

    PaidListingSchema.find({}, (err, docs) => {
        if (err) return res.json(handleErr)
        else {
            res.send({
                message:"get data Successfully",
                doc:docs
            })
      
        }
    })
})



app.post('/addPaidListing', (req, res) => {

    
    var PaidData = new PaidListingSchema({
    Title:req.body.title,
    Description:req.body.description,
    Price:req.body.price,
    Currency:req.body.currency,
    Trade:req.body.trade,
    shippingNational:req.body.shippingNational,
    shippingInternational:req.body.shippingInternational,
    ImageLink:req.body.ImageLink,
    Category:req.body.category,
    subCategory:req.body.subCategory,
    accountID:req.body.accountID,
    listingID:req.body.listingID,
    shipping:req.body.shipping,
    isPRO:req.body.isPRO,
    Status:req.body.Status

    })


    PaidData.save().then(data => {
        console.log("data===>",data)
        res.send(data)
    })

})















//   yahan takk
app.post('/api/sendNotification', (req, res) => {
    let data = req.body
    const message = {
        notification: {
            body: data.notification.message,
            title: data.notification.fName
        },
        tokens: data.tokens
    }
    admin.messaging().sendMulticast(message)
        .then((response) => {
            // Response is a message ID string.
            res.json({ message: 'Success' })
            if (response.failureCount > 0) {
                const failedTokens = [];
                response.responses.forEach((resp, idx) => {
                    if (!resp.success) {
                        failedTokens.push(data.tokens[idx]);
                    }
                });
                console.log('List of tokens that caused failures: ' + failedTokens);
            }
        })
})



app.get('/', function (req, res) {  //HomePage for API
    res.json({ message: 'Welcome' })
})

app.post('/api/addUser', (req, res) => {
    const user = req.body
    console.log(user)
    if (user.firebaseUID) {
        User.create(user, (err, doc) => {
            if (err) {
                console.log(err)
                res.json(err)
            }
            else {
                console.log(doc)
                Activity.create({ firebaseUID: doc.firebaseUID })
                res.json({
                    message: "Success",
                    user: doc
                })
            }
        })
    }
})
app.put('/api/updateUser', (req, res) => {
    User.findOneAndUpdate({ firebaseUID: req.body.firebaseUID }, req.body, { new: true }, (err, doc) => {
        if (err) res.json({ message: "Failed", err })
        else res.json({
            message: 'Success',
            doc
        })
    })
})
app.get('/api/checkUsername:name', (req, res) => {
    User.findOne({ username: req.params.name }, (err, doc) => {
        if (err) return res.json({
            message: "Failed",
            err
        })
        else {
            return res.json({
                message: "Success",
                doc
            })
        }
    })
})
app.put('/api/addImage', (req, res) => {
    const user = req.body
    if (user.profilePic) {
        User.findOneAndUpdate({ firebaseUID: user.firebaseUID }, { $set: { profilePic: user.profilePic } },
            { new: true }, (err, doc) => {
                if (err) throw err
                res.json({
                    message: 'Success',
                    data: doc
                })
            })
    }
})
app.get('/api/getActivity:firebaseUID', (req, res) => {
    Activity.findOne({ firebaseUID: req.params.firebaseUID }).populate([
        { path: 'onSale' },
        { path: "Favorites" },
        { path: "Conversations" },
        { path: "Orders" },
        { path: "Purchases" }
    ]).exec((err, data) => {
        if (err) return res.json(handleErr(err))
        else {
            return res.json(handleSuccess(data))
        }
    })
})
app.post('/api/status', (req, res) => {
    User.findOne({ firebaseUID: req.body.firebaseUID }, 'isLoggedIn', (err, data) => {
        if (err) res.json(err)
        res.json({
            message: 'Success',
            data
        })
    })
})


app.put('/api/login', (req, res) => {
    console.log('API call', req.body)
    const firebaseUID = req.body
    User.findOneAndUpdate(firebaseUID, { $set: { isLoggedIn: true } }, { new: true }, (err, doc) => {
        if (err) res.json(err)
        console.log(doc)
        res.json({
            message: 'Success',
            user: doc
        })
    })
})
//become pro

app.put('/api/becomePRO', (req, res)=>{
    if(req.body.firebaseUID){
        let {firebaseUID} = req.body
        User.findOneAndUpdate({ firebaseUID},{isPRO:true},{ new: true}, (err, doc)=>{
            if(err)return res.json(handleErr(err))
            else{
                return res.json(handleSuccess(doc))
            }
        })
    }
})
app.post('/api/googleError', (req, res) => {
    console.log(req.body)
    res.json({
        message: "OK"
    })
})

app.post('/api/checkgoogle', (req, res) => {
    let { displayName, email, photoURL, uid } = req.body
    let firebaseUID = uid
    let fName = displayName.split(' ')
    let data = {
        fName: displayName,
        email,
        firebaseUID,
        profilePic: photoURL,
        isLoggedIn: true,
        username: fName[0] + Math.round(Math.random() * 1000)
    }
    console.log(data)
    User.findOne({ firebaseUID }, (err, doc) => {
        if (err) return res.json({
            message: "Failed",
            err
        })
        else if (doc === null) {
            User.create(data, (error, user) => {
                if (error) {
                    console.log(error)
                    return res.json({
                        message: "Failed",
                        error
                    })
                }
                else if (user) {
                    console.log('created=>', doc)
                    Activity.create({ firebaseUID: user.firebaseUID })
                    res.json({
                        message: "Success",
                        doc: user
                    })
                }
            })
        }
        else {
            User.findOneAndUpdate({ firebaseUID }, { $set: { isLoggedIn: true } }, { new: true }, (err, doc) => {
                if (err) res.json(err)
                console.log('exists=>', doc)
                res.json({
                    message: 'Success',
                    doc
                })
            })
        }
    })
})
app.put('/api/fbLogin', (req, res) => {
    console.log(req.body)
    let { firebaseUID } = req.body
    User.findOne({ firebaseUID }, (err, doc) => {
        if (doc === null) {
            User.create(req.body, (error, user) => {
                if (error) {
                    console.log(error)
                    res.json(error)
                }
                if (user) {
                    console.log('created')
                    console.log(user)
                    res.json({
                        message: "Success",
                        doc: user
                    })
                    Activity.create({ firebaseUID: user.firebaseUID })
                }
            })
        }
        else {
            User.findOneAndUpdate({ firebaseUID }, { $set: { isLoggedIn: true } }, { new: true }, (err, doc) => {
                if (err) {
                    console.log(err)
                    res.json(err)
                }
                else {
                    console.log('updated')
                    console.log(doc)
                    res.json({
                        message: 'Success',
                        doc
                    })
                }
            })
        }
    })
})
app.put('/api/getBusiness', (req, res) => {
    if (req.body.firebaseUID) {
        Chats.find({
            firebaseUID: req.body.firebaseUID
        })
    }
})
app.put('/api/logout', (req, res) => {
    const { firebaseUID } = req.body
    User.findOneAndUpdate({ firebaseUID }, { isLoggedIn: false }, { new: true }, (err, doc) => {
        if (err) res.json(err)
        res.json({
            message: 'Success',
            user: doc
        })
    })
})

app.post('/api/addListing', (req, res) => {
    const data = req.body
    Listings.create(data, (err, doc) => {
        if (err) res.json(err)
        Activity.findOneAndUpdate({ firebaseUID: doc.firebaseUID }, { $push: { onSale: doc._id } }, { new: true }, (err, docs) => {

        })
        res.json({
            message: 'Success',
            data: doc
        })
    })
})

app.post('/api/replicateListing', (req, res) => {
    if (req.body.email) {
        let data = req.body
        let email = data.email
        User.findOne({ email: email }, (err, doc) => {
            if (err) return res.json({ err, message: "User Error" })
            else {
                if (doc !== null) {
                    let { firebaseUID } = doc
                    data.firebaseUID = firebaseUID
                    Listings.create(data, (err, listing) => {
                        if (err) res.json(err)
                        Activity.findOneAndUpdate({ firebaseUID: firebaseUID }, { $push: { onSale: doc._id } }, { new: true }, (err, docs) => {

                        })
                        res.json({
                            message: 'Success',
                            data: listing
                        })
                    })
                }
                else {
                    return res.json({ message: "User not found" })
                }
            }
        })
    } else {
        return res.json({ message: "User is required" })
    }
})
app.put('/api/addToken', (req, res) => {
    const { token } = req.body
    if (token) {
        User.findOneAndUpdate({ firebaseUID: req.body.firebaseUID }, { $push: { tokens: token } }, { new: true }, (err, doc) => {
            if (err) throw err
            res.json({
                message: "Success",
                doc
            })
        })
    }
    else {
        res.json({
            message: 'Error'
        })
    }
})
app.post('/api/findByLocation', (req, res) => {
    if (req.body.longitude && req.body.latitude && req.body.distance) {
        Listings.find(
            {
                geometry: {
                    $nearSphere: {
                        $geometry: {
                            type: "Point",
                            coordinates: [req.body.longitude, req.body.latitude]    //longitude and latitude
                        },
                        $minDistance: 0,
                        $maxDistance: req.body.distance * 1000
                    }
                }
            },
            (err, docs) => {
                if (err) return res.json(handleErr(err))
                else res.json({
                    message: "Success",
                    docs
                })
            }
        )
    }
    else res.json({
        message: "Lcation Not Found",

    })
})

app.post('/api/getListings:page', (req, res) => {
    const query = Object.assign({}, req.body)
    var perPage = 20
    var page = req.params.page || 1
    if (query.hasOwnProperty("minPrice")) {
        console.log('fhaosidhfo')
        delete query.minPrice
        delete query.maxPrice
        if (query.hasOwnProperty('last')) {
            let startDate = new Date()
            startDate.setDate(startDate.getDate() - query.last)
            startDate.setHours(0)   // Set the hour, minute and second components to 0
            startDate.setMinutes(0)
            startDate.setSeconds(0)
            Listings.find({
                trade: query.trade, $or: [{ shippingNational: query.deliverable }, { shippingInternational: query.deliverable }], price: {
                    $lte: req.body.maxPrice,
                    $gte: req.body.minPrice
                },
                createdDate: { $gte: startDate }
            }).skip((perPage * page) - perPage).limit(perPage).exec((err, data) => {

                Listings.estimatedDocumentCount().exec((err, count) => {
                    if (err) return res.json({ message: err })
                    res.json({
                        data,
                        current: page,
                        pages: Math.ceil(count / perPage)
                    })
                })
            })
        }
        else {
            Listings.find({
                trade: req.body.trade, $or: [{ shippingNational: req.body.deliverable }, { shippingInternational: req.body.deliverable }], price: {
                    $lte: req.body.maxPrice,
                    $gte: req.body.minPrice
                }
            }).skip((perPage * page) - perPage).limit(perPage).exec((err, data) => {

                Listings.estimatedDocumentCount().exec((err, count) => {
                    if (err) return res.json({ message: err })
                    res.json({
                        data,
                        current: page,
                        pages: Math.ceil(count / perPage)
                    })
                })
            })
        }
    }
    else {
        Listings.find(query).skip((perPage * page) - perPage).limit(perPage).exec((err, data) => {
            Listings.estimatedDocumentCount().exec((err, count) => {
                if (err) return res.json({ message: err })
                res.json({
                    data,
                    current: page,
                    pages: Math.ceil(count / perPage)
                })
            })
        })
    }
})
app.post('/api/addIcons', (req, res) => {
    const data = req.body
    let icons = data.map(icon => {
        return {
            name: icon,
            type: 'ionicon'
        }
    })
    Icons.create(icons, (err, docs) => {
        if (err) throw err
        res.json({
            message: 'Success',
            docs
        })
    })
})
app.get('/api/getIcons:type', (req, res) => {
    let { type } = req.params
    Icons.find({ type: type }, (err, docs) => {
        if (err) throw err
        res.json({
            message: 'Success',
            docs
        })
    })
})
app.post('/api/sortByDate:page', (req, res) => {
    var page = req.params.page || 1
    var perPage = 20
    if (req.body.type === 'asc') {
        Listings.find({}).sort({ createdDate: 1 }).skip((perPage * page) - perPage).limit(perPage).exec((err, data) => {
            if (err) return res.json(handleErr(err))
            else Listings.estimatedDocumentCount().exec((err, count) => {
                if (err) return res.json({ message: err })
                res.json({
                    data,
                    current: page,
                    pages: Math.ceil(count / perPage),
                    message: "Success"
                })
            })
        })

    } else {
        Listings.find({}).sort({ createdDate: -1 }).skip((perPage * page) - perPage).limit(perPage).exec((err, data) => {
            if (err) return res.json(handleErr(err))
            else Listings.estimatedDocumentCount().exec((err, count) => {
                if (err) return res.json({ message: err })
                res.json({
                    data,
                    current: page,
                    pages: Math.ceil(count / perPage),
                    message: "Success"

                })
            })
        })
    }
})
app.post('/api/sortByPrice:page', (req, res) => {
    var page = req.params.page || 1
    var perPage = 20
    if (req.body.type === 'asc') {
        Listings.find({}).sort({ price: 1 }).skip((perPage * page) - perPage).limit(perPage).exec((err, data) => {
            if (err) return res.json(handleErr(err))
            else Listings.estimatedDocumentCount().exec((err, count) => {
                if (err) return res.json({ message: err })
                res.json({
                    data,
                    current: page,
                    pages: Math.ceil(count / perPage),
                    message: "Success"
                })
            })
        })

    } else {
        console.log('afoshfiashd')
        Listings.find({}).sort({ price: -1 }).skip((perPage * page) - perPage).limit(perPage).exec((err, data) => {
            if (err) return res.json(handleErr(err))
            else Listings.estimatedDocumentCount().exec((err, count) => {
                if (err) return res.json({ message: err })
                res.json({
                    data,
                    current: page,
                    pages: Math.ceil(count / perPage),
                    message: "Success"
                })
            })
        })
    }
})
app.get('/api/getListing:listingId', (req, res) => {
    Listings.findById(req.params.listingId, (err, doc) => {
        if (err) throw err
        User.findOne({ firebaseUID: doc.firebaseUID }, 'fName profilePic', (err, data) => {
            Shipping.findOne({ firebaseUID: doc.firebaseUID }, (err, shipping) => {
                let result = {
                    doc,
                    userData: data,
                    shipping
                }
                if (err) throw err
                res.json({
                    message: "Success",
                    result
                })
            })
        })
    })
})
app.get('/api/listingByListingID:listingId',(req,res)=>{
    console.log(req.params.listingId)
    // Listings.findOne({listingID: req.params.listingId},(err, doc)=>{
    //     if (err) res.json(handleErr(err))
    //     User.findOne({ firebaseUID: doc.firebaseUID }, 'fName profilePic', (err, data) => {
    //         Shipping.findOne({ firebaseUID: doc.firebaseUID }, (error, shipping) => {
    //             let result = {
    //                 doc,
    //                 userData: data,
    //                 shipping
    //             }
    //             if (error) return res.json(handleErr(error))
    //             else res.json({
    //                 message: "Success",
    //                 result
    //             })
    //         })
    //     })
    // })
    Listings.findOne({listingID:req.params.listingId}).populate('shippingID').exec((err,doc)=>{
        if(err)return res.json(handleErr(err))
        User.findOne({ firebaseUID: doc.firebaseUID }, 'fName profilePic', (error, data) => {
        if(error)return res.json(handleErr(error))
           else{

            let result = {
                doc,
                userData:data
            }
            res.json({ 
                message:"Success",
                result
            })
           }
        })
    })
})
app.get('/api/getUserData:firebaseUID', (req, res) => {
    if (req.params.firebaseUID) {
        User.findOne({ firebaseUID: req.params.firebaseUID }, (err, doc) => {
            if (err) {
                res.json({
                    message: "Failed",
                    err
                })
            }
            else {
                res.json({
                    message: "Success",
                    doc
                })
            }
        })
    }
})
app.put('/api/dislike', (req, res) => {
    Activity.findOneAndUpdate({ firebaseUID: req.body.firebaseUID }, { $pull: { Favorites: req.body.id } }, { new: true }, (err, doc) => {
        if (err) res.json({ message: "Falied" })
        res.json({
            message: "Success",
            doc
        })
    })
})
app.get('/api/getCategories', (req, res) => {
    Category.find({}, (err, docs) => {
        if (err) 
        res.json(handleErr(err))
        res.json({
            message: "Success",
            docs
        })
    })
})
app.get('/api/getReports', (req, res) => {
    Reports.find({}, (err, docs) => {
        if (err) throw err
        res.json({
            message: "Success",
            docs
        })
    })
})
app.get('/api/getListReports', (req, res) => {
    ListingReport.find({}, (err, docs) => {
        if (err) throw err
        res.json({
            message: "Success",
            docs
        })
    })
})
app.post('/api/getSpacShippings', (req, res) => {
    Shipping.find({ firebaseUID: req.body.firebaseUID }, (err, docs) => {
        if (err) res.json(err)
        res.json({
            message: "Success",
            data: docs
        })
    })
})
app.get('/api/getShippings:firebaseUID', (req, res) => {
    Shipping.find({ firebaseUID: req.params.firebaseUID }, (err, docs) => {
        if (err) return res.json(handleErr(err))
        else {
            return res.json(handleSuccess(docs))
        }
    })
})
app.get('/api/getShipping:id', (req, res) => {
    Shipping.findById(req.params.id, (err, doc) => {
        if (err) res.json({ message: "Failed", err })
        else res.json({
            message: "Success",
            data: doc
        })
    })
})
app.delete('/api/deleteShipping:id', (req, res) => {
    Shipping.findByIdAndDelete(req.params.id, (err, doc) => {
        if (err) res.json({ message: "Failed", err })
        else {
            res.json({
                message: "Success",
                doc
            })
        }
    })
})
app.post('/api/getFilteredShippings', (req, res) => {
    Shipping.find({ firebaseUID: req.body.id, type: req.body.type }, (err, docs) => {
        if (err) res.json({ message: "Failed", err })
        else {
            res.json({
                message: "Success",
                docs
            })
        }
    })
})

app.put('/api/updateShipping:id', (req, res) => {
    const query = Object.assign({}, req.body)
    let id = req.params.id
    Shipping.findByIdAndUpdate(id, query, { new: true }, (err, doc) => {
        if (err) res.json({ message: 'Failed', err })
        else {
            res.json({
                message: "Success",
                doc
            })
        }
    })
})
app.get('/api/getShips', (req, res) => {
    Shipping.find({}, (err, docs) => {
        if (err) res.json({
            message: "Failed",
            err
        })
        res.json({
            message: "Success",
            docs
        })
    })
})
app.post('/api/UserStausUpdate', (req, res) => {
    User.findByIdAndUpdate(req.body.id, { $set: { status: req.body.status } }, (err, docs) => {
        if (err) res.json(err)
        res.json({
            message: "Success",
            data: docs
        })
    })
})
app.post('/api/updateSubCat', (req, res) => {
    Category.findByIdAndUpdate(req.body.id, { $set: { subCategories: req.body.subCategories } },{new:true}, (err, docs) => {
        if (err) res.json(err)
        res.json({
            message: "Success",
            data: docs
        })
    })
})
app.post('/api/updateCat', (req, res) => {
    console.log(req)
    Category.findOneAndUpdate({ _id: req.body.id }, {
        $set: {
            subCategories: req.body.subCategories,
            name: req.body.name,
            color: req.body.color,
            iconType: req.body.iconType,
            iconName: req.body.iconName,
        }
    }, (err, docs) => {

        if (err) res.json(err)
        res.json({
            message: "Success",
            data: docs
        })
    })
})
app.get('/api/getProfile:firebaseUID', (req, res) => {
    User.findOne({ firebaseUID: req.params.firebaseUID }, (err, doc) => {
        if (err) res.json(err)
        let data = doc
        Activity.findOne({ firebaseUID: req.body.firebaseUID }, (err, docs) => {
            if (err) res.json(err)
            let userData = {
                data, docs
            }
            res.json({
                message: 'Success',
                user: userData
            })
        })
    })
})
app.post('/api/addCategory', (req, res) => {
    Category.create(req.body, (err, docs) => {
        if (err) res.json(err)
        res.json({
            message: "Success",
            category: docs
        })
    })
})
app.post('/api/addSubCategory', (req, res) => {
    Category.findByIdAndUpdate(req.body.id,
        { $push: { subCategories: req.body } }, { new: true }, (err, docs) => {
            if (err) res.json(err)
            res.json({
                message: "Success",
                data: docs
            })
        })
})
app.delete('/api/deleteCategory', (req, res) => {
    Category.findByIdAndRemove(req.body.id, (err, doc) => {
        if (err) res.json(err)
        res.json({
            message: "Success",
            data: doc
        })
    })
})

app.get('/api/getFavoriteIds:firebaseUID', (req, res) => {
    console.log(req.params.firebaseUID)
    if (req.params.firebaseUID !== null) {
        Activity.findOne({ firebaseUID: req.params.firebaseUID }, 'Favorites', (err, docs) => {
            if (err) res.json({
                message: "Failed"
            })
            else {
                console.log('fav => ',docs)
                res.json({
                    message: "Success",
                    docs
                })
            }
        })
    }
})

app.get('/api/getFavorites:firebaseUID', (req, res) => {
    Activity.findOne({ firebaseUID: req.params.firebaseUID }, 'Favorites', (err, doc) => {
        if (err) {
            console.log(err)
            res.json({ message: 'Failed' })
        }
        else {
            let ids = doc.Favorites
            let objecIDs = ids.map(id => mongoose.Types.ObjectId(id))
            console.log(objecIDs)
            if (ids.length > 0) {
                Listings.find({ _id: { $in: objecIDs } }, (err, docs) => {
                    if (err) throw err
                    if (docs.length > 0)
                        res.json({
                            message: "Success",
                            data: docs
                        })
                })
            }

        }
    })
})
app.get('/api/getPurchases:firebaseUID', (req, res) => {
    Activity.findOne({ firebaseUID: req.params.firebaseUID }, 'Purchases', (err, doc) => {
        if (err) {
            res.json({ message: 'Failed' })
        }
        else {
            let ids = doc.Purchases
            let objecIDs = ids.map(id => mongoose.Types.ObjectId(id))
            if (ids.length > 0) {
                Orders.find({ _id: { $in: objecIDs } }, (err, docs) => {
                    if (err) throw err
                    if (docs.length > 0)
                        res.json({
                            message: "Success",
                            data: docs
                        })
                })
            }

        }
    })
})
app.get('/api/Orders:firebaseUID', (req, res) => {
    Activity.findOne({ firebaseUID: req.params.firebaseUID }, 'Orders', (err, doc) => {
        if (err) {
            res.json({ message: 'Failed' })
        }
        else {
            let ids = doc.Orders
            let objecIDs = ids.map(id => mongoose.Types.ObjectId(id))
            if (ids.length > 0) {
                Orders.find({ _id: { $in: objecIDs } }, (err, docs) => {
                    if (err) throw err
                    if (docs.length > 0)
                        res.json({
                            message: "Success",
                            data: docs
                        })
                })
            }

        }
    })
})
app.post('/api/report', (req, res) => {
    Reports.create(req.body, (err, doc) => {
        if (err) throw err
        res.json({
            message: "Success",
            data: doc
        })
    })
})
// app.get('/api/getChats',(req,res)=>{
//     const chatIds = req.body
//     let chats = []
//     chatIds.forEach(id=>{
//         Chats.findById(id,(err,docs)=>{
//             if(err)return err
//             chats.push(docs)
//         })
//     })
//     if(chats.length>0){
//         res.json({
//             message:"Success",
//             data:chats
//         })
//     }
//     else{
//         res.json({
//             message:"No chat found"
//         })
//     }

// })
/*
Get messages of a chat by userID
  if chat is found, return chat with messages
      else
      create chat for firebaseUID of user, push the chatId 
*/
app.put('/api/getChats', (req, res) => { //get messages of a chat from conversations
    console.log(req.body)
    if (req.body.firebaseUID) {
        Activity.findOne({ firebaseUID: req.body.firebaseUID }, 'Conversations', (err, doc) => {
            if (err) return res.json({ err })

            if (doc.Conversations) {
                let conversations = doc.Conversations
                let objecIDs = conversations.map(conversation => mongoose.Types.ObjectId(conversation))
                if (conversations.length > 0) {
                    Chats.find({ _id: { $in: objecIDs } }, (err, docs) => {
                        if (err) {
                            return res.json({ err })
                        }
                            return res.json({
                                message: "Success",
                                data: docs
                            })
                    })
                }
            }
        })
    } else {
        return res.json({ err: "Valid UID is required" })
    }
})
app.get('/getAcc', (req, res) => {
    stripe.accounts.list(
        { limit: 5 },
        function (err, accounts) {
            // asynchronously called
            res.json({ message: "Success", accounts })
        }
    );
})
// app.post('/api/getChatMessages',(req,res)=>{
//     Chats.findById(req.body.chatId,(err,doc)=>{
//         if(err)throw err
//         res.json({
//             message:"Success",
//             data:doc
//         })
//     })
// })
app.get('/api/getTokens:firebaseUID', (req, res) => {
    User.findOne({ firebaseUID: req.params.firebaseUID }, 'tokens', (err, doc) => {
        if (err) throw err
        res.json({
            message: 'Success',
            doc
        })
    })
})
app.put('/api/getMessages', (req, res) => {         //get messages of a chat from listing
    Chats.findOne({ sellerUserID: req.body.sellerUserID, firebaseUID: req.body.firebaseUID }, (err, docs) => {
        if (err) res.json(err)
        console.log(docs)
        if (docs !== null) {
            res.json({
                message: "Success",
                data: docs
            })
        }
        else {
            let data = req.body
            Chats.create(data, (err, doc) => {
                if (err) res.json(err)
                if (doc !== null) {
                    Activity.findOneAndUpdate({ firebaseUID: req.body.firebaseUID }, { $push: { Conversations: doc._id } }, { new: true }, (err, res) => console.log('Buyer DOne...', res))
                    Activity.findOneAndUpdate({ firebaseUID: req.body.sellerUserID }, { $push: { Conversations: doc._id } }, { new: true }, (err, res) => console.log('Seller DOne...', res))
                    res.json({
                        message: "Chat created",
                        data: doc
                    })

                }

            })
        }
    })
})
app.post('/paym', (req, res) => {
    var collfeefloat = req.body.Category === 'Jobs & Services' ? req.body.amount * 0.2 : req.body.amount * 0.1
    var collfee = Math.ceil(collfeefloat)
    stripe.customers.create({
        email: req.body.token.email,   //khareed rha hai..
    }).then((customer) => {
        return stripe.charges.create({
            amount: req.body.amount,
            currency: "usd",
            source: req.body.token.id,
            application_fee_amount: collfee,   //platform pese
        }, {
            stripe_account: req.body.accountID,  //jis ko bhej rahe hain...
        }).then(function (charge) {
            let data = Object.assign({}, req.body)
            delete data.token
            Orders.create(data, (err, doc) => {
                if (err) {
                    console.log(err)
                    res.json({ message: "Failed", err })
                }
                else {
                    console.log(doc)
                    Activity.findOneAndUpdate({ firebaseUID: req.body.buyerFirebaseUID }, { $push: { Purchases: doc._id } }, { new: true }, (err, res) => console.log('Buyer DOne...', res))
                    Activity.findOneAndUpdate({ firebaseUID: req.body.sellerFirebaseUID }, { $push: { Orders: doc._id } }, { new: true }, (err, res) => console.log('Seller DOne...', res))
                    res.json({
                        message: "Success",
                        doc,
                        charge
                    })
                }
            })
        });
    });
})

app.get('/api/getUserListings:firebaseUID', (req, res) => {
    Listings.find({ firebaseUID: req.params.firebaseUID }, (err, docs) => {
        if (err) res.json({ message: "Failed" })
        else {
            console.log(docs)
            res.json({
                message: "Success",
                docs
            })
        }
    })
})
app.put('/api/searchReport', (req, res) => {
    ListingReport.find({ $text: { $search: req.body.title } })
        .exec((err, docs) => {
            if (err) throw err
            res.json(docs)
        });
})
app.get('/api/getPaymentInfo:firebaseUID', (req, res) => {
    PaymentInfo.findOne({ firebaseUID: req.params.firebaseUID }, (err, doc) => {
        if (doc !== null) {
            console.log(doc)
            res.json({
                message: "Success",
                doc
            })
        }

        else {
            res.json({ message: "Failed" })
        }
    })
})
app.get('/tos', (req, res) => {

    stripe.accounts.update('acct_1Eat1XIMeTEWEPkW', {
        tos_acceptance: {
            ip: req.connection.remoteAddress,
            date: Math.floor(Date.now() / 1000)
        }
    })
    res.json({
        message: "Success"
    })
})
app.post('/payoutexample', (req, res) => {
    // let requestBody = {
    //     "sender_batch_header": {
    //       "recipient_type": "EMAIL",
    //       "email_message": "SDK payouts test txn",
    //       "note": "Enjoy your Payout!!",
    //       "sender_batch_id": "Test_sdk_1",
    //       "email_subject": "This is a test transaction from SDK"
    //     },
    //     "items": [{
    //       "note": "Your Payment!",
    //       "amount": {
    //         "currency": "USD",
    //         "value": "1.00"
    //       },
    //       "receiver": "hamxa1331@gmail.com",
    //       "sender_item_id": "Test_txn_1"
    //     }]
    //   }

    // // Construct a request object and set desired parameters
    // // Here, PayoutsPostRequest() creates a POST request to /v1/payments/payouts
    // let request = new paypal.payouts.PayoutsPostRequest();
    // request.requestBody(requestBody);

    // // Call API with your client and get a response for your call
    // let createPayouts  = async ()=>{
    //         let response = await clientt.execute(request);

    //         console.log(`Response: ${JSON.stringify(response)}`);
    //         res.json({message:"Success"})
    //         // If call returns body in response, you can get the deserialized version from the result attribute of the response.
    //        console.log(`Payouts Create Response: ${JSON.stringify(response.result)}`);
    // }
    // createPayouts();
    request.post({
        uri: "https://api.sandbox.paypal.com/v1/payments/payouts",
        headers: {
            "Accept": "application/json",
            "Accept-Language": "en_US",
            "content-type": "application/x-www-form-urlencoded",
            "Authorization": "Bearer "
        },
        form: {
            "grant_type": "client_credentials"
        }
    }, function (error, response, body) {
        console.log(JSON.parse(body));
        res.json({ body: JSON.parse(body) })
    });
})
app.post('/createacc', (req, res) => {
    let data = req.body
    for (let c in data) {
        if (data[c] === '') {
            res.json({
                message: "Failed",
            })
            return
        }
    }
    let dateofbirth = data.dob.split('/')
    if (data.type === 'Individual') {
        let account = {
            default_currency: "usd",
            type: "custom",
            country: data.country,
            requested_capabilities: ["card_payments"],
            business_type: "individual",
            individual: {
                first_name: data.first_name,
                last_name: data.last_name,
                gender: data.gender,
                id_number: data.ssn,
                email: data.email,
                phone: data.phone,
                dob: {
                    month: dateofbirth[0],
                    day: dateofbirth[1],
                    year: dateofbirth[2]
                },
                address: {
                    line1: data.line1,
                    state: data.state,
                    postal_code: data.postal_code,
                    city: data.city,
                    country: data.country
                }
            },
            business_profile: {
                url: data.businesweb,
                mcc: data.mcc
            },
            tos_acceptance: {
                ip: req.connection.remoteAddress,
                date: Math.floor(Date.now() / 1000)
            }
        }
        stripe.accounts.create(account, function (err, response) {
            if (err) {
                console.log(err)
                res.json({
                    message: "Failed"
                })
            }
            else {
                let profile = {
                    businessType: "individual",
                    first_name: data.first_name,
                    last_name: data.last_name,
                    gender: data.gender,
                    ssn: data.ssn,
                    email: data.email,
                    phone: data.phone,
                    address: {
                        line1: data.line1,
                        state: data.state,
                        postal_code: data.postal_code,
                        city: data.city,
                        country: data.country,
                        mcc: data.mcc
                    },
                    dob: {
                        month: dateofbirth[0],
                        day: dateofbirth[1],
                        year: dateofbirth[2]
                    },
                    firebaseUID: data.firebaseUID,
                    accountID: response.id,
                    businesweb: data.businesweb
                }
                PaymentInfo.create(profile, (err, doc) => {
                    if (err) throw err
                    console.log(doc)
                    res.json({
                        message: "Success",
                        doc
                    })
                })
            }
        });
    }
})
app.post('/person', (req, res) => {
    stripe.accounts.createPerson(
        'acct_1EaXXRCEW9pT8D0d',
        req.body,
        function (err, person) {
            if (err) throw err
            res.json({
                message: "Success",
                person
            })
        }
    );
})
app.post('/createexternalacc', (req, res) => {
    /*
        country: '',
        currency: '',
        account_holder_name: '',
        account_holder_type: '',
        routing_number: '',
        account_number:''
    */
    let data = {
        routing_number: req.body.routing_number,
        account_holder_name: req.body.account_holder_name,
        account_holder_type: req.body.account_holder_type,
        currency: "usd",
        country: 'US',
        account_number: req.body.account_number
    }
    stripe.tokens.create({
        bank_account: data
    }, function (err, token) {
        if (err) console.log(err)
        else {
            stripe.accounts.createExternalAccount(
                req.body.accountID,
                {
                    external_account: token.id,
                },
                function (err, bank_account) {
                    // asynchronously called
                    if (err) res.json({ message: "Falied" })
                    else {
                        console.log(bank_account)
                        let acct = {
                            ...data,
                            firebaseUID: req.body.firebaseUID
                        }
                        ExternalAccount.create(acct, (err, doc) => {
                            res.json({
                                message: "Success",
                                doc
                            })
                        })
                    }
                }
            );
        }
    });
})
app.put('/api/updatePassword', (req, res) => {
    if (req.body.firebaseUID) {
        admin.auth().updateUser(req.body.firebaseUID, {
            password: req.body.newPassword
        }).then(function (userRecord) {
            // See the UserRecord reference doc for the contents of userRecord.
            // console.log('Successfully updated user', userRecord.toJSON());
            res.json({
                message: "Success"
            })
        })
            .catch((error) => {
                console.log(error)
                return res.json({
                    message: "Failed",
                    error
                })
            });
    } else {
        return res.json({ message: "Valid FirebaseUID is required" })
    }
})
app.put('/api/searchListing', (req, res) => {
    Listings.find({ $text: { $search: req.body.title } })
        .limit(30)
        .exec((err, docs) => {
            if (err) return res.json({ message: "Success", err })
            res.json({ message: "Success", doc: docs })
        });
})
client.on('connection', (socket) => {
    console.log('Client connected')
    //Exclusive Service


    socket.on('exclusive-new-messege', (message) => {
        ExclusiveMessegesSchema.findByIdAndUpdate(message.chatId, { $push: { messeges: message } }, { new: true }, (err, res) => {
            var length = res.messeges.length;
            var newMess = res.messeges[length - 1];
            client.emit('Exclusive-New-Messege', newMess)
        })



    })
    //Custom Made

    socket.on('new-messege', (data) => {

        messegeSchema.findByIdAndUpdate(data.ChatID, { $push: { messages: data.messages } }, { new: true }, (err, res) => {
            var length = res.messages.length;
            var newMess = res.messages[length - 1]
            client.emit('new-Messege', newMess)
        })
    })
    // console.log("made socket connection", socket.id);

    socket.on("count" + socket.handshake.query.auctionID, function (data) {
        client.emit("count" + socket.handshake.query.auctionID, {
            message: "Failed",
            count: socket.client.conn.server.clientsCount
        });
    });
    socket.on("start" + socket.handshake.query.auctionID, function (data) {
        Auction.findOne({ _id: socket.handshake.query.auctionID })
            .populate("userId")
            .exec((err, doc) => {
                if (err) {
                    client.emit("startAuction" + socket.handshake.query.auctionID, {
                        message: "Failed",
                        err
                    });
                } else {
                    console.log("Auction Socket", doc);
                    client.emit("startAuction" + socket.handshake.query.auctionID, {
                        message: "success",
                        doc
                    });
                }
            });
    });

    socket.on("itemDetails" + socket.handshake.query.auctionID, function (data) {
        console.log("item details", socket.handshake.query.auctionID);
        AuctionItems.findOne(
            { used: false, auctionID: socket.handshake.query.auctionID },
            (err, doc) => {
                if (err) {
                    client.emit("item" + socket.handshake.query.auctionID, {
                        message: "Failed",
                        err
                    });
                } else {
                    // console.log("itemDetails else", doc);
                    client.emit("item" + socket.handshake.query.auctionID, {
                        message: "success",
                        doc
                    });
                }
            }
        );
    });

    socket.on("warning" + socket.handshake.query.auctionID, function (data) {
        // console.log("warning");
        client.emit(
            "warning" + socket.handshake.query.auctionID,
            "This Item is About to close"
        );
    });

    socket.on("close" + socket.handshake.query.auctionID, function (data) {
        client.emit(
            "close" + socket.handshake.query.auctionID,
            "Auction Has Ended for Today"
        );
    });

    socket.on("chat" + socket.handshake.query.auctionID, function (data) {
        console.log("chat des", data);
        client.emit("chat" + socket.handshake.query.auctionID, data);
    });

    socket.on("disconnect", function () {
        client.emit("count" + socket.handshake.query.auctionID, {
            message: "Failed",
            count: socket.client.conn.server.clientsCount
        });
    });
    // Create function to send status
    sendStatus = function (s) {
        socket.emit('status', s);
    }

    // Get chats from mongo collection
    // Handle input events
    socket.on('input', (response) => {

        let data = JSON.parse(response)
        let { chatId } = data
        let message = {}
        if (data.hasOwnProperty('text')) {
            message = {
                createdAt: data.createdAt,
                text: data.text,
                senderAvatarLink: data.senderAvatarLink,
                senderID: data.senderID
            }
        }
        else if (data.hasOwnProperty('image')) {
            message = {
                createdAt: data.createdAt,
                image: data.image,
                senderAvatarLink: data.senderAvatarLink,
                senderID: data.senderID
            }
        }
        let firebaseUID = data.senderID
        // Check for name and message
        if (firebaseUID == '' || message == undefined) {
            // Send error status
            return
        } else {
            // Insert message
            Chats.findByIdAndUpdate(chatId, { $push: { messages: message } }, { new: true }, (err, docs) => {
                if (err) console.log('Error: ' + err)
                let newmsg = docs.messages[docs.messages.length - 1]
                newmsg.fName = docs.fName
                let emitter = socket.broadcast
                emitter.emit('Sent', JSON.stringify(newmsg))
            })
            // Chats.insert({firebaseUID: firebaseUID, message: message}, function(){
            //     client.emit('output', [data]);

            //     // Send status object
            //     sendStatus({
            //         message: 'Message sent',
            //         clear: true
            //     });
            // });
        }
    });

    // Handle clear
    socket.on('clear', function (data) {
        // Remove all chats from collection
        Chats.remove({}, function () {
            // Emit cleared
            socket.emit('cleared');
        });
    });
});
//Server

// my server.js
// 
// 
// 
// 
// 

//Imports




//   rest of server calls



app.get("/api/allUsers", (req, res) => {
    User.find({}, (err, sales) => {
        if (err) {
            res.json({
                message: "fail",

            })
        }
        res.json(sales)
    })
})
app.get("/api/AllListings", (req, res) => {
    Listings.find({}, (err, sales) => {
        if (err) {
            res.json({
                message: "failed",

            })
        }
        res.json(sales)
    })
})
app.get("/api/AllSales", (req, res) => {
    Orders.find({}, (err, sales) => {
        if (err) {
            res.json({
                message: "fail",

            })
        }
        res.json(sales)
    })
})

app.get("/api/AllCatigories", (req, res) => {
    Category.find({}, (err, sales) => {
        if (err) {
            res.json({
                message: "failed",

            })
        }
        res.json(sales)
    })
})





app.post('/api/getOrders', (req, res) => {
    Orders.find({}, (err, sales) => {
        if (err) {
            res.json({
                message: "failed",

            })
        }
        res.json(sales)
    })
})
app.delete('/api/deletOrder', (req, res) => {
    Orders.findByIdAndRemove(req.body.id, (err, doc) => {
        if (err) res.json(err)
        res.json({
            message: "Success",
            data: doc
        })
    })
})
app.delete('/api/deleteListing', (req, res) => {
    Listings.findByIdAndRemove(req.body.id, (err, doc) => {
        if (err) res.json(err)
        res.json({
            message: "Success",
            data: doc
        })
    })
})
app.delete('/api/DeleteAllListings', (req, res) => {
    Listings.remove({ firebaseUID: req.body.id }, (err, doc) => {
        if (err) res.json(err)
        res.json({
            message: "Success",
            data: doc
        })
    })
})

app.delete('/api/DeleteReportListing', (req, res) => {
    Listings.findByIdAndRemove(req.body.id, (err, doc) => {
        if (err) res.json(err)
        res.json({
            message: "Success",
            data: doc
        })
    })
})
app.delete('/api/DeleteListingReport', (req, res) => {
    ListingReport.findOneAndDelete(req.body.id, (err, doc) => {
        if (err) res.json(err)
        res.json({
            message: "Success",
            data: doc
        })
    })
})


app.post('/api/getFilteredListings:page', (req, res) => {
    const query = Object.assign({}, req.body)
    var perPage = 20
    var page = req.params.page || 1
    if (query.hasOwnProperty('last')) {
        let startDate = new Date()
        startDate.setDate(startDate.getDate() - query.last)
        startDate.setHours(0)   // Set the hour, minute and second components to 0
        startDate.setMinutes(0)
        startDate.setSeconds(0)
        Listings.find({
            trade: query.trade, shippingNational: query.shippingNational, shippingInternational: query.shippingInternational,
            price: {
                $gte: req.body.minPrice
            },
            createdDate: { $gte: startDate }
        }).skip((perPage * page) - perPage).limit(perPage).exec((err, data) => {

            Listings.estimatedDocumentCount().exec((err, count) => {
                if (err) return res.json({ message: err })
                else res.json({
                    data,
                    current: page,
                    pages: Math.ceil(count / perPage)
                })
            })
        })
    }

})



// app.put('/api/addShipping', (req, res) => {
//     Shipping.findOne({ firebaseUID: req.body.firebaseUID }, (err, docs) => {
//         if (err) throw err
//         if (docs === null) {    //insert
//             let data = req.body
//             Shipping.create(data, (err, docs) => {
//                 if (err) res.json(err)
//                 return res.json({
//                     message: "Success",
//                     data: docs
//                 })
//             })
//         }
//         else {           //update
//             let data = req.body
//             Shipping.findOneAndUpdate({ firebaseUID: req.body.firebaseUID }, data, { new: true }, (err, doc) => {
//                 if (err) throw err
//                 return res.json({
//                     message: "Success",
//                     data: doc
//                 })
//             })
//         }
//     })
// })
app.post('/api/addShipping', (req, res) => {
    if (req.body.firebaseUID) {
        let data = req.body
        Shipping.create(data, (err, doc) => {
            if (err) return res.json(handleErr(err))
            else {
                return res.json(handleSuccess(doc))
            }
        })
    } else {
        return res.json(handleErr("Valid UID is required"))
    }
})
app.put('/api/updateShipping', (req, res) => {
    if (req.body.id) {
        let data = req.body
        let id = data.id
        Shipping.findByIdAndUpdate(id, data, { new: true }, (err, doc) => {
            if (err) return res.json(handleErr(err))
            else {
                return res.json(handleSuccess(doc))
            }
        })
    } else {
        return res.json(handleErr('Shipping profile ID required'))
    }
})

app.delete('/api/deleteUser', (req, res) => {
    User.findByIdAndRemove(req.body.id, (err, doc) => {
        if (err) res.json(err)
        res.json({
            message: "Success",
            data: doc
        })
    })
})
app.delete('/api/deleteListingsUser', (req, res) => {
    User.findOneAndDelete(req.body.uid, (err, doc) => {
        if (err) res.json(err)
        res.json({
            message: "Success",
            data: doc
        })
    })
})
app.delete('/api/deleteActivityUserUID', (req, res) => {
    Activity.findOneAndDelete(req.body.uid, (err, doc) => {
        if (err) res.json(err)
        res.json({
            message: "Success",
            data: doc
        })
    })
})
app.delete('/api/deleteActivityUserUID', (req, res) => {
    Activity.findOneAndDelete(req.body.uid, (err, doc) => {
        if (err) res.json(err)
        res.json({
            message: "Success",
            data: doc
        })
    })
})

app.delete('/api/deleteShippingUID', (req, res) => {
    Shipping.findOneAndDelete(req.body.uid, (err, doc) => {
        if (err) res.json(err)
        res.json({
            message: "Success",
            data: doc
        })
    })
})
app.delete('/api/deletePaymentInfoUID', (req, res) => {
    PaymentInfo.findOneAndDelete(req.body.uid, (err, doc) => {
        if (err) res.json(err)
        res.json({
            message: "Success",
            data: doc
        })
    })
})


app.put('/api/deleteSubCategory', (req, res) => {
    Category.findByIdAndUpdate(req.body.id, { $set: { subCategories: req.body.subCategories } }, {new:true}, (err, docs) => {
        if (err) return res.json(err)
        res.json({
            message: "Success",
            data: docs
        })
    })
})
app.put('/api/addFavorite', (req, res) => {
    Activity.findOneAndUpdate({ firebaseUID: req.body.firebaseUID }, { $push: { Favorites: req.body.id } }, { new: true }, (err, docs) => {
        if (err) res.json(err)
        res.json({
            message: "Success",
            data: docs
        })
    })
})

app.post("/api/addOrder", (req, res) => {

    Orders.create(req.body, (err, doc) => {
        if (err) res.json({ err })
        res.json({
            message: "Success",
            data: doc
        })
    })



})


// app.get('/api/getChats',(req,res)=>{
//     const chatIds = req.body
//     let chats = []
//     chatIds.forEach(id=>{
//         Chats.findById(id,(err,docs)=>{
//             if(err)return err
//             chats.push(docs)
//         })
//     })
//     if(chats.length>0){
//         res.json({
//             message:"Success",
//             data:chats
//         })
//     }
//     else{
//         res.json({
//             message:"No chat found"
//         })
//     }

// })
/*
Get messages of a chat by userID
  if chat is found, return chat with messages
      else
      create chat for firebaseUID of user, push the chatId 
*/

// app.post('/api/getChatMessages',(req,res)=>{
//     Chats.findById(req.body.chatId,(err,doc)=>{
//         if(err)throw err
//         res.json({
//             message:"Success",
//             data:doc
//         })
//     })
// })


// user Search
app.post('/api/userSearch', (req, res) => {
    User.find({ fName: { $regex: req.body.name } })
        .limit(20)
        .exec((err, docs) => {
            if (err) res.json({message:"Failed",err})
            res.json({message:"Success",doc:docs})
        });
})
// 
app.put('/api/UpdateReportStatus', (req, res) => {
    ListingReport.findByIdAndUpdate({ _id: req.body.id }, { $set: { Action: req.body.Action } }, (err, docs) => {
        if (err) res.json(err)
        res.json({
            message: "Success",
            data: docs
        })
    })
})
app.post('/api/getUsers:page', (req, res) => {
    const query = Object.assign({}, req.body)
    var perPage = 20
    var page = req.params.page || 1
    console.log(query)
    if (query.hasOwnProperty("minPrice")) {
        delete query.minPrice
        delete query.maxPrice
        if (query.hasOwnProperty('last')) {
            let startDate = new Date()
            startDate.setDate(startDate.getDate() - query.last)
            startDate.setHours(0)   // Set the hour, minute and second components to 0
            startDate.setMinutes(0)
            startDate.setSeconds(0)
            User.find({
                trade: query.trade, $or: [{ shippingNational: query.deliverable }, { shippingInternational: query.deliverable }], price: {
                    $lte: req.body.maxPrice,
                    $gte: req.body.minPrice
                },
                createdDate: { $gte: startDate }
            }).skip((perPage * page) - perPage).limit(perPage).exec((err, data) => {

                User.estimatedDocumentCount().exec((err, count) => {
                    if (err) return res.json({ message: err })
                    res.json({
                        data,
                        current: page,
                        pages: Math.ceil(count / perPage)
                    })
                })
            })
        }
        else {
            User.find({
                trade: req.body.trade, $or: [{ shippingNational: req.body.deliverable }, { shippingInternational: req.body.deliverable }], price: {
                    $lte: req.body.maxPrice,
                    $gte: req.body.minPrice
                }
            }).skip((perPage * page) - perPage).limit(perPage).exec((err, data) => {

                User.estimatedDocumentCount().exec((err, count) => {
                    if (err) return res.json({ message: err })
                    res.json({
                        data,
                        current: page,
                        pages: Math.ceil(count / perPage)
                    })
                })
            })
        }
    }
    else {
        User.find(query).skip((perPage * page) - perPage).limit(perPage).exec((err, data) => {
            User.estimatedDocumentCount().exec((err, count) => {
                if (err) return res.json({ message: err })
                res.json({
                    data,
                    current: page,
                    pages: Math.ceil(count / perPage)
                })
            })
        })
    }
})

app.post('/api/userSearch', (req, res) => {
    User.find({ $text: { $search: req.body.name } })
        .limit(20)
        .exec((err, docs) => {
            if (err)
            res.json(handleErr(err))
        else {res.json(handleSuccess(docs))}
        });
})

app.post('/api/reportListing', (req, res) => {
    ListingReport.create(req.body, (err, doc) => {
        if (err) {
            res.json({
                message: 'Failed',
                err
            })
        }
        else {
            res.json({
                message: "Success",
                doc
            })
        }
    })
})
app.delete('/api/removeReport', (req, res) => {
    ListingReport.findByIdAndDelete(req._id, (err, doc) => {
        if (err) {
            res.json({
                message: 'Failed',
                err
            })
        }
        else {
            res.json({
                message: "Success",
                doc
            })
        }
    })
})


app.post('/api/generateToken', (req, res) => {
    request.post({
        uri: "https://api.sandbox.paypal.com/v1/oauth2/token",
        headers: {
            "Accept": "application/json",
            "Accept-Language": "en_US",
            "content-type": "application/x-www-form-urlencoded"
        },
        auth: {
            'user': 'AebZVgTaxE1-E1ACZ-q5lAqMWoNyM7oIdrqswPk8QVR52TdnfqpZ21xHmkxYnMnrFjvDNiKKgD05OPgB',
            'pass': 'EFhgAq05cpKqUFVhtM0DG6ccDpPBdmhubjw2h4krMsH-UkG3syNyqnTsUXa2Sk1SMNaXTqmWk7QOoHB-',
        },
        form: {
            "grant_type": "client_credentials"
        }
    }, function (error, response, body) {
        console.log(JSON.parse(body));
        res.json({ body: JSON.parse(body) })
    });
})

app.post('/api/createPayout', (req, res) => {
    let data = req.body
    Payouts.create(data, (err, doc) => {
        if (err) res.json({ message: "Failed", err })
        else {
            return res.json({ message: "Success", doc })
        }
    })
})

app.get('/api/getPayout:id', (req, res) => {
    Payouts.findById(req.params.id).populate([
        { path: 'receiver' },
        { path: "sender" }
    ]).exec(function (err, doc) {
        if (err) return res.json({ err })
        else {
            return res.json({ doc })
        }
    })
})

app.get('/api/getPendingPayouts', (req, res) => {
    Payouts.find({ status: false }).populate([
        { path: 'receiver' },
        { path: "sender" }
    ]).exec((err, docs) => {
        if (err) return res.json({ message: "Failed", err })
        return res.json({ message: "Success", docs })
    })
})

app.get('/api/getAllPayouts', (req, res) => {
    Payouts.find({}).populate([
        { path: 'receiver' },
        { path: "sender" }
    ]).exec((err, docs) => {
        if (err) return res.json({ message: "Failed", err })
        return res.json({ message: "Success", docs })
    })
})

// Auction starts here
// Auction starts here

app.post("/api/addAuction", (req, res) => {

    const Auctions = new Auction(req.body);
    Auctions.save()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            console.log("err", err);
            res.json(err);
        });
});

app.get("/api/getAuction", (req, res) => {
    console.log("auction working");
    Auction.findOne({ _id: req.query.id }, (err, doc) => {
        console.log(err, "ERROR ERROR");
        if (err) {
            res.json({
                message: "Failed",
                err
            });
        } else {
            res.json({
                message: "Success",
                doc
            });
        }
    });
});

app.get("/api/getAuctionById", (req, res) => {
    Auction.findById(req.query.id , (err, doc) => {
        console.log('sdhafoi')
        if (err) {
            res.json({
                message: "Failed",
                err
            });
        } else {
            res.json({
                message: "Success",
                doc
            });
        }
    });
});
app.get("/api/getAuctionByUserId", (req, res) => {
    Auction.findOne({userId:req.query.id} , (err, doc) => {
        console.log('sdhafoi')
        if (err) {
            res.json({
                message: "Failed",
                err
            });
        } else {
            res.json({
                message: "Success",
                doc
            });
        }
    });
});

app.get("/api/getUser", (req, res) => {
    User.findOne({ _id: req.query.id }, "fName userName", (err, doc) => {
        console.log(doc, req.query.id, "user");
        if (err) {
            res.json({
                message: "Failed",
                err
            });
        } else {
            res.json({
                message: "Success",
                doc
            });
        }
    });
});

app.get("/api/getItemById", (req, res) => {
    AuctionItems.findOne({ _id: req.query.id }, (err, doc) => {
        console.log(doc, req.query.id);
        if (err) {
            res.json({
                message: "Failed",
                err
            });
        } else {
            res.json({
                message: "Success",
                doc
            });
        }
    });
});

app.get("/api/getItemsWon", (req, res) => {
    console.log(req.query.id);
    AuctionItems.find({ used: true, "finalBid.userId": req.query.id })
        .populate("auctionID")
        .exec((err, doc) => {
            // let arr =
            if (err) {
                res.json({
                    message: "Failed",
                    err
                });
            } else {
                res.json({
                    message: "Success",
                    // doc
                    doc: doc.filter(v => v.finalBid && v.finalBid.userId === req.query.id)
                });
            }
        });
});

app.get("/api/getAllAuctions", (req, res) => {
    // var perPage = 10;
    // var page = req.params.page || 1;
    // let date = new Date();
    // var startTime = new Date(date.getTime() - 10 * 60 * 1000);
    // var nextWeek = new Date(date.getTime() + 10 * 24 * 60 * 60 * 1000);

    // let filter_str =
    //     startTime.getFullYear() +
    //     "-" +
    //     ((startTime.getMonth() + 1).toString().length === 1
    //         ? "0" + (startTime.getMonth() + 1)
    //         : startTime.getMonth() + 1) +
    //     "-" +
    //     (startTime.getDate().toString().length === 1
    //         ? "0" + startTime.getDate()
    //         : startTime.getDate()) +
    //     " " +
    //     startTime.getHours() +
    //     ":" +
    //     (startTime.getMinutes().toString().length === 1
    //         ? "0" + startTime.getMinutes()
    //         : startTime.getMinutes());
    // let filter_str_limit =
    //     nextWeek.getFullYear() +
    //     "-" +
    //     ((nextWeek.getMonth() + 1).toString().length === 1
    //         ? "0" + (nextWeek.getMonth() + 1)
    //         : nextWeek.getMonth() + 1) +
    //     "-" +
    //     (nextWeek.getDate().toString().length === 1
    //         ? "0" + nextWeek.getDate()
    //         : nextWeek.getDate()) +
    //     " " +
    //     nextWeek.getHours() +
    //     ":" +
    //     (nextWeek.getMinutes().toString().length === 1
    //         ? "0" + nextWeek.getMinutes()
    //         : nextWeek.getMinutes());
    // console.log("yare yare des", filter_str, filter_str_limit);

    // Auction.count({}, (err, count) => {
    //     return Auction.find()
    //         .populate("userId")
    //         .and([
    //             {
    //                 $or: [
    //                     { startTime: { $gte: filter_str, $lte: filter_str_limit } },
    //                     { status: 1 }
    //                 ]
    //             }
    //         ])
    //         .exec((err, doc) => {
    //             console.log(doc, err);
    //             if (err) {
    //                 res.json({
    //                     message: "Failed",
    //                     err
    //                 });
    //             } else {
    //                 res.json({
    //                     message: "Success",
    //                     doc,
    //                     count
    //                 });
    //             }
    //         });
    // });
    let date = new Date();
    var startTime = new Date(date.getTime() - 10 * 60 * 1000);
    var nextWeek = new Date(date.getTime() + 10 * 24 * 60 * 60 * 1000);
  
    let filter_str =
      startTime.getFullYear() +
      "-" +
      ((startTime.getMonth() + 1).toString().length === 1
        ? "0" + (startTime.getMonth() + 1)
        : startTime.getMonth() + 1) +
      "-" +
      (startTime.getDate().toString().length === 1
        ? "0" + startTime.getDate()
        : startTime.getDate()) +
      " " +
      startTime.getHours() +
      ":" +
      (startTime.getMinutes().toString().length === 1
        ? "0" + startTime.getMinutes()
        : startTime.getMinutes());
    let filter_str_limit =
      nextWeek.getFullYear() +
      "-" +
      ((nextWeek.getMonth() + 1).toString().length === 1
        ? "0" + (nextWeek.getMonth() + 1)
        : nextWeek.getMonth() + 1) +
      "-" +
      (nextWeek.getDate().toString().length === 1
        ? "0" + nextWeek.getDate()
        : nextWeek.getDate()) +
      " " +
      nextWeek.getHours() +
      ":" +
      (nextWeek.getMinutes().toString().length === 1
        ? "0" + nextWeek.getMinutes()
        : nextWeek.getMinutes());
    // console.log("yare yare des", filter_str, filter_str_limit);
  
    Auction.count({}, (err, count) => {
      return Auction.find({
      //   $and: [
      //     {
      //       $or: [
      //         // {startTime:  { $gte: filter_str, $lte: filter_str_limit }},
      //         // { status: 0 }
      //       ]
      //     }
      //   ]
      })
        .populate("userId")
      //   .and([
      //     { startTime: { $gte: filter_str, $lte: filter_str_limit } }
      //     // { status: 1 }
      //   ])
        .exec((err, doc) => {
          if (err) {
            res.json({
              message: "Failed",
              err
            });
          } else {
            res.json({
              message: "Success",
              doc,
              count
            });
          }
        });
    });
});

app.get("/api/getItems", (req, res) => {
    AuctionItems.find(
        { auctionID: req.query.id, used: req.query.used },
        (err, doc) => {
            console.log("auction Items", req.query, doc);
            if (err) {
                res.json({
                    message: "Failed",
                    err
                });
            } else {
                res.json({
                    message: "Success",
                    doc
                });
            }
        }
    );
});

app.get("/api/deleteItem", (req, res) => {
    AuctionItems.findByIdAndRemove(req.query.id, (err, todo) => {
        // As always, handle any potential errors:
        if (err) return res.status(500).send(err);
        // We'll create a simple object to send back with a message and the id of the document that was removed
        // You can really do this however you want, though.
        const response = {
            message: "Todo successfully deleted",
            id: todo._id
        };
        return res.status(200).send(response);
    });
});

app.post("/api/updateAuction", (req, res) => {
    let { title, details, startTime, _id, image, bidTime, type } = req.body;

    Auction.findOne({ _id: _id }, (err, doc) => {
        doc.title = title;
        doc.details = details;
        doc.startTime = startTime;
        doc.image = image;
        doc.bidTime = bidTime;
        doc.type = type;
        doc.save().then(data => {
            if (err) {
                res.json({
                    message: "Failed",
                    err
                });
            } else {
                res.json({
                    message: "Success",
                    doc: data
                });
            }
        });
    });
});

app.post("/api/addItem", (req, res) => {

    const item = new AuctionItems({
        ...req.body
    });
    item
        .save()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            console.log("err", err);
            res.json(err);
        });
});

app.post("/api/updateItems", (req, res) => {
    let { images, title, description, _id, startingBid } = req.body;

    AuctionItems.findOne({ _id: _id }, (err, doc) => {
        doc.title = title;
        doc.description = description;
        doc.images = images;
        doc.startingBid = startingBid;

        doc.save().then(data => {
            console.log("ok yar", data);

            if (err) {
                res.json({
                    message: "Failed",
                    err
                });
            } else {
                res.json({
                    message: "Success",
                    doc: data
                });
            }
        });



    });
});

app.post("/api/updateItemLive", (req, res) => {
    let { finalBid, _id, close } = req.body;
    console.log(req.body.close, "des", _id);

    AuctionItems.findOne({ _id: _id }, (err, doc) => {
        // if (close == true) {
        // console.log(req.body.close, "desu");
        // doc.used = true;
        // } else {
        // console.log(parseInt(bid), bid)
        doc.finalBid = finalBid;
        // }
        doc.save().then(data => {
            // console.log("ok yar", data)

            if (err) {
                res.json({
                    message: "Failed",
                    err
                });
            } else {
                res.json({
                    message: "Success",
                    doc: data
                });
            }
        });
    });
});

app.post("/api/closeItemLive", (req, res) => {
    let { _id } = req.body;
    AuctionItems.findOne({ _id: _id }, (err, doc) => {
        console.log(req.body.close, "desu");
        doc.used = true;
        doc.save().then(data => {
            if (err) {
                res.json({
                    message: "Failed",
                    err
                });
            } else {
                res.json({
                    message: "Success",
                    doc: data
                });
            }
        });
    });
});

app.post("/api/updateAuctionLive", (req, res) => {
    let { _id, status, streamId, playBackId } = req.body;
    console.log("something desu");
    Auction.findOne({ _id: _id }, (err, doc) => {
        doc.status = status;
        var date = doc.startTime.split(" ");
        var finalDateArr = date[0].split("-");
        let createdAt = +new Date(
            finalDateArr[0] + "-" + finalDateArr[1] + "-" + finalDateArr[2]
        );
        doc.lastAuction = createdAt;
        doc.streamId = streamId;
        doc.playBackId = playBackId;
        doc.save().then(data => {
            // console.log("ok yar", data)

            if (err) {
                res.json({
                    message: "Failed",
                    err
                });
            } else {
                console.log(data);
                res.json({
                    message: "Success",
                    doc: data
                });
            }
        });
    });
});

app.get("/api/countItems", (req, res) => {
    let { auctionID, status } = req.query;
    console.log("count here");
    AuctionItems.count({ auctionID, used: false }, (err, doc) => {
        if (err) {
            res.json({
                message: "Failed",
                err
            });
        } else {
            res.json({
                message: "Success",
                doc: doc
            });
        }
    });
});
const job = new CronJob("0 */1 * * * *", function () {
    let date = new Date();
    let minus_10_min = new Date(date.getTime() - 1 * 60 * 1000);
    var nextWeek = new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000);
    console.log(minus_10_min, nextWeek);

    let filter_str =
        minus_10_min.getFullYear() +
        "-" +
        ((minus_10_min.getMonth() + 1).toString().length === 1
            ? "0" + (minus_10_min.getMonth() + 1)
            : minus_10_min.getMonth() + 1) +
        "-" +
        (minus_10_min.getDate().toString().length === 1
            ? "0" + minus_10_min.getDate()
            : minus_10_min.getDate()) +
        " " +
        minus_10_min.getHours() +
        ":" +
        (minus_10_min.getMinutes().toString().length === 1
            ? "0" + minus_10_min.getMinutes()
            : minus_10_min.getMinutes());
    console.log("yare yare");
    let filter_str_limit =
        nextWeek.getFullYear() +
        "-" +
        ((nextWeek.getMonth() + 1).toString().length === 1
            ? "0" + (nextWeek.getMonth() + 1)
            : nextWeek.getMonth() + 1) +
        "-" +
        (nextWeek.getDate().toString().length === 1
            ? "0" + nextWeek.getDate()
            : nextWeek.getDate()) +
        " " +
        nextWeek.getHours() +
        ":" +
        (nextWeek.getMinutes().toString().length === 1
            ? "0" + nextWeek.getMinutes()
            : nextWeek.getMinutes());

    console.log(filter_str, filter_str_limit);

    Auction.find({ type: "Timed" })
        .and([
            { startTime: { $gte: filter_str, $lte: filter_str_limit } },
            { status: 0 }
        ])
        .exec((err, doc) => {
            if (doc.length > 0) {
                doc.map((v, i) => {
                    doc[i].status = 1;

                    doc[i].save().then(data => {
                        console.log("updated", data);
                    });
                });
            }
            else {

            }
        });

});
job.start();

////////////////////////  Sponsorship Routes ///////////////////////


var job2 = new CronJob('00 00 00 * * *', function () {

    var eventDate = '';
    var currentDate = '';
    var Id = '';
    var Donation = 0;

    SponsorSchema.find({}).then(data => {

        var length = data.length;
        eventDate = data[length - 1].Date;
        Id = data[length - 1]._id;
        Donation = data[length - 1].Donation;

        currentDate = new Date().toLocaleDateString();
    }).then(() => {
        if (eventDate !== currentDate) {
            var data = SponsorSchema.findByIdAndUpdate(Id, {
                // $set:{Date:currentDate},
                // $push:{GraphData:Donation}
            }, { new: true })

            data.then(() => console.log('done'))
        }
        else {
            console.log('eeeee')
        }

    })


}, null, true, 'America/Los_Angeles');
job2.start();




app.get('/readevent', (req, res) => {


    // SponsorSchema.find({}).then(sponsorData=>{
    //     console.log(sponsorData)
    //     if(sponsorData.length===0)
    //     {
    //         res.send({event:'No Event Started',Comments:[]})
    //     }
    //     {
    //         const dataLength = sponsorData.length;

    //         res.send(sponsorData[dataLength-1])
    //     }
    // })
    SponsorSchema.find({}, (err, docs) => {
        if (err) return res.send(err)
        else {
            console.log(docs)
            if (docs.length > 0) {
                const dataLength = docs.length;
                res.send(docs[dataLength - 1])
            }
            else if (docs.length === 0) {
                res.send({ event: 'No Event Started', Comments: [] })

            }
        }
    })
})


app.post('/startevent', (req, res) => {

    var SponsorData = new SponsorSchema({
        Title: req.body.Title,
        TargetedAmount: req.body.targetedAmount,
        Donation: req.body.Donation,
        RequiredAmount: req.body.RequiredAmount,
        GraphData: req.body.GraphData,
        Comments: req.body.Comments,
        Date: req.body.Date
    })

    SponsorData.save().then(newSponsorData => {
        res.send(newSponsorData);
    })
})


app.put('/updateevent', (req, res) => {

    var data = SponsorSchema.findByIdAndUpdate(req.body.Id, {
        $set: { Title: req.body.Title, TargetedAmount: req.body.TargetedAmount }
    }, { new: true })

    data.then(updateEvent => {
        res.send(updateEvent);
    })

})

app.put('/addcomment', (req, res) => {

    var data = SponsorSchema.findByIdAndUpdate(req.body.Id, {
        $push: { Comments: req.body.Comment }
    }, { new: true })

    data.then(newData => {
        res.send(newData);
    })
})


app.put('/deletecomment', (req, res) => {

    var newComm;
    var Event = SponsorSchema.findOne({ _id: req.body.Id })


    Event.then(data => {
        newComm = data.Comments.filter(values => {
            return data.Comments[req.body.Index] !== values
        })

        setTimeout(() => {
            SponsorSchema.findByIdAndUpdate(req.body.Id, { Comments: newComm }, { new: true })
                .then(newComment => {
                    res.send(newComment);
                })
        }, 500)

    })

})

app.put('/donation', (req, res) => {

    var newDonation;
    var data = SponsorSchema.findById({ _id: req.body.Id })

    data.then(value => {
        newDonation = value.Donation + req.body.Donation
    })


    setTimeout(() => {
        SponsorSchema.findByIdAndUpdate(req.body.Id, { Donation: newDonation }, { new: true })
            .then(newData => {
                res.send(newData)
            })
    }, 500)
})


//////////////////////// End Of Sponsorship Routes ///////////////////////


////////////////////////  Custom Made Routes ///////////////////////

app.post('/postjob', (req, res) => {
    var PostJob = new JobBoardSchema({
        BuyerEmail: req.body.BuyerEmail,
        BuyerName: req.body.BuyerName,
        JobTitle: req.body.Title,
        Budget: req.body.Budget,
        JobCategory: req.body.Category,
        MaterialDes: req.body.Material,
        Size: req.body.Size,
        Shipping: req.body.Shipping,
        PostedDate: req.body.PostedDate,
        JobDetail: req.body.JobDetail,
        Image: req.body.Image
    })

    PostJob.save().then(data => {
        res.send(data)
    })
})


app.get('/readjob', (req, res) => {

    JobBoardSchema.find({}).then(jobData => {
        res.send(jobData)
    })
})


app.put('/updatejob', (req, res) => {

    JobBoardSchema.findByIdAndUpdate(req.body.Id, {

        JobTitle: req.body.Title,
        Budget: req.body.Budget,
        MaterialDes: req.body.Material,
        Size: req.body.Size,
        Shipping: req.body.Shipping,
        JobDetail: req.body.JobDetail,
        Image: req.body.Image
    }, { new: true }).then(data => res.send(data))
})


app.delete('/deletejob', (req, res) => {

    JobBoardSchema.findByIdAndRemove(req.body.Id, (err, data) => {
        res.send(data)
    })
})



////////////////////////  End Of Custom Made Routes ///////////////////////



////////////////////////  Job Category Routes ///////////////////////


app.get('/readcategory', (req, res) => {

    JobCategorySchema.find({}).then(data => {
        res.send(data)
    })

})

app.post('/addcategory', (req, res) => {

    var newCategories = new JobCategorySchema({
        Name: req.body.Name,
        Image: req.body.Image
    })

    newCategories.save().then(data => {
        res.send(data)
    })

})


app.delete('/deletecategory', (req, res) => {

    JobCategorySchema.findByIdAndRemove(req.body.Id, (err, data) => {
        res.send(data)
    })

})

////////////////////////  End Of Job Category Routes ///////////////////////



////////////////////////  For Chat ///////////////////////

app.post('/readmessege', (req, res) => {

    messegeSchema.findByIdAndUpdate(req.body.Id, {
        isRead: true
    }, { new: true }).then(data => res.send(data))


})

app.post('/sendproposal', (req, res) => {

    var newMesseg = new messegeSchema({

        messages: req.body.messages,
        sellerID: req.body.sellerID,
        sellerProfilePic: req.body.sellerProfilePic,
        sellerName: req.body.sellerName,
        buyerID: req.body.buyerID,
        buyerProfilePic: req.body.buyerProfilePic,
        buyerName: req.body.buyerName,
        isRead: req.body.isRead
    })

    newMesseg.save().then(Proposal => {
        res.send(Proposal)
    })
})



app.get('/readchatdata', (req, res) => {

    messegeSchema.find({}).then(data => {
        res.send(data)
    })
})

app.post('/sendchatdata', (req, res) => {

    var messeges = new messegeSchema({
        content: req.body.content,
        name: req.body.name
    })

    messeges.save().then((data) => {
        res.send(data)
    })
})

////////////////////////  End Of Chat ///////////////////////



////////////////////////  Order Routes ///////////////////////

app.get('/readorders', (req, res) => {



    OrderSchema.find({}).then(data => {
        res.send(data)
    })
})


app.post('/createorder', (req, res) => {
    var newOrderData = new OrderSchema({

        SellerName: req.body.SellerName,
        SellerID: req.body.SellerID,
        BuyerName: req.body.BuyerName,
        BuyerID: req.body.BuyerID,
        JobID: req.body.JobID,
        StartDate: req.body.StartDate,
        EndDate: req.body.EndDate,
        Amount: req.body.Amount,
        isComplete: req.body.isComplete,

    })

    newOrderData.save().then(data => {
        res.send(data)
    })
})


app.delete('/canceljob', (req, res) => {

    OrderSchema.findByIdAndRemove(req.body.Id, (err, data) => {
        res.send(data)
    })

})


app.delete('/cancelorder', (req, res) => {

    var data = OrderSchema.findById({ _id: req.body.Id })

    data.then(order => {
        var orderEndDate = order.EndDate;
        var currentDate = new Date();

        var days = Math.floor((Date.parse(orderEndDate) - Date.parse(currentDate)) / 86400000);
        var hours = days * 24;

        console.log(days)
        console.log(hours)
    })

})

app.put('/completeorder', (req, res) => {


})

////////////////////////  End Of Order Routes ///////////////////////

////////////////////////  Connect Store Routes ///////////////////////

app.get('/openurl', (req, res) => {

    const scopes = ['https://api.ebay.com/oauth/api_scope',
        'https://api.ebay.com/oauth/api_scope/sell.marketing.readonly',
        'https://api.ebay.com/oauth/api_scope/sell.marketing',
        'https://api.ebay.com/oauth/api_scope/sell.inventory.readonly',
        'https://api.ebay.com/oauth/api_scope/sell.inventory',
        'https://api.ebay.com/oauth/api_scope/sell.account.readonly',
        'https://api.ebay.com/oauth/api_scope/sell.account',
        'https://api.ebay.com/oauth/api_scope/sell.fulfillment.readonly',
        'https://api.ebay.com/oauth/api_scope/sell.fulfillment',
        'https://api.ebay.com/oauth/api_scope/commerce.identity.readonly',
    ];

    const ebayAuthToken = new EbayAuthToken({
        filePath: 'config.json'
    });


    const url = ebayAuthToken.generateUserAuthorizationUrl('PRODUCTION', scopes);

    res.send(url)

})


app.post('/gettoken', (req, res) => {

    var token = '';
    var refreshToken = '';

    const ebayAuthToken = new EbayAuthToken({
        filePath: 'config.json'
    });

    ebayAuthToken.exchangeCodeForAccessToken('PRODUCTION', req.body.code)
        .then(data => JSON.parse(data))
        .then(data1 => {
            token = data1.access_token;
            refreshToken = data1.refresh_token;
        })
        .then(() => {

            var myDate = new Date();
            var newdate = myDate.toISOString();


            var d = new Date();
            d.setDate(d.getDate() - 80);
            var oldDate = d.toISOString();


            ////listing
            const obj = {
                '@': {
                    'xmlns': 'urn:ebay:apis:eBLBaseComponents'
                },
                'ErrorLanguage': 'en_US',
                'WarningLevel': 'High',
                'StartTimeFrom': oldDate,
                'StartTimeTo': newdate,
                'DetailLevel': 'ItemReturnDescription',
                'Pagination': {
                    'EntriesPerPage': 300
                }
            };



            var content = js2xmlparser.parse('GetSellerListRequest', obj, { declaration: { encoding: 'UTF-8' } });

            var dataInXML = '';

            fetch('https://api.ebay.com/ws/api.dll', {
                method: "Post",
                body: content,
                headers: {
                    'X-EBAY-API-SITEID': 0,
                    'X-EBAY-API-COMPATIBILITY-LEVEL': 967,
                    'X-EBAY-API-CALL-NAME': 'GetSellerList',
                    'X-EBAY-API-IAF-TOKEN': token
                }
            })
                .then(res => res.text())
                .then(res2 => dataInXML = res2)
                .then(() => {
                    const dataInJSON = xml2json.toJson(dataInXML);
                    const dataObj = JSON.parse(dataInJSON);

                    const items = dataObj.GetSellerListResponse.ItemArray.Item;


                    res.send(items);


                })


        })

})

//////////////////////Exclusive Services routes


///////Exclusiver User Routes/////




app.post('/requestforregisteration', (req, res) => {

    var newExclusiveUserData = new ExclusiveUserSchema({
        BusinessName: req.body.CompanyName,
        Email: req.body.Email,
        Contact: req.body.Contact,
        Category: req.body.Category,
        Country: req.body.Country,
        BusinessDetail: req.body.Detail,
        Image: req.body.Image,
        Password: req.body.Password,
        isRegistered: req.body.isRegister,
        firebaseUID: req.body.firebaseUID

    })

    newExclusiveUserData.save().then(data => {
        res.send(data)
    })
})
app.get('/readexclusiveuserdata', (req, res) => {

    ExclusiveUserSchema.find({}).then(data => {
        res.send(data)
    })

})

app.post('/readAcceptRequest', (req, res) => {

    ExclusiveUserSchema.findByIdAndUpdate(req.body.Id, {
        isRegistered:true,
    }, { new: true }).then(data => res.send(data))

})

app.put('/updateexclusiveuserdata', (req, res) => {

    ExclusiveUserSchema.findByIdAndUpdate(req.body.Id, {
        BusinessName: req.body.Name,
        Password: req.body.Password,
        Contact: req.body.Contact,
        BusinessDetail: req.body.Detail,
    }, { new: true }).then(data => res.send(data))

})







//Exclusivecategory


app.get('/readExclusivecategory', (req, res) => {

    ExclusiveCategory.find({}).then(data => {
        res.send(data)
    })

})

app.post('/addExclusiveCategory', (req, res) => {

    var newCategories = new ExclusiveCategory({
        Name: req.body.Name,
    })

    newCategories.save().then(data => {
        res.send(data)
    })

})


app.delete('/deleteExclusivecategory', (req, res) => {

    ExclusiveCategory.findByIdAndRemove(req.body.Id, (err, data) => {
        res.send(data)
    })

})


app.put('/updateexclusiveCategory', (req, res) => {

    ExclusiveCategory.findByIdAndUpdate(req.body.Id, {
        Name: req.body.Name,
      
    }, { new: true }).then(data => res.send(data))

})








/////// End Exclusiver User Routes/////

/////// Exclusiver Service Routes/////


/////// Exclusiver Service Routes/////

app.post('/addexclusiveservice', (req, res) => {

    var newExclusiveServiceData = new ExclusiveServicesSchema({
        ServiceTitle: req.body.Title,
        Price: req.body.Price,
        Category: req.body.Category,
        ServiceDescription: req.body.Description,
        Images: req.body.Images,
        Date: req.body.postedDate,
        totalRatings: req.body.totalRatings,
        Reviews: req.body.Reviews,
        userName: req.body.userName,
        userID: req.body.userID,
        userCountry: req.body.userCountry,
        userDetail: req.body.userDetail,
        userImage: req.body.userImage

    })

    newExclusiveServiceData.save().then(data => {
        res.send(data)
    })
})


app.get('/readexclusiveservices', (req, res) => {

    ExclusiveServicesSchema.find({}).then(data => {
        res.send(data)
    })

})

app.delete('/deleteexclusiveservice', (req, res) => {

    ExclusiveServicesSchema.findByIdAndRemove(req.body.Id, (err, data) => {
        res.send(data)
    })

})

app.put('/updateexclusiveservice', (req, res) => {

    ExclusiveServicesSchema.findByIdAndUpdate(req.body.Id, {
        ServiceTitle: req.body.Title,
        Price: req.body.Price,
        ServiceDescription: req.body.Description,
        Images: req.body.Images,
    }, { new: true }).then(data => res.send(data))

})

app.put('/addexclusiveservicereview', (req, res) => {



    var data = ExclusiveServicesSchema.findById({ _id: req.body.Review.serviceID })

    data.then(service => {
        var Ratings = 0;

        if (service.totalRatings > 0) {
            Ratings = (service.totalRatings + req.body.totalRatings) / 2;
        }
        else {
            Ratings = req.body.totalRatings;
        }

        ExclusiveServicesSchema.findByIdAndUpdate(req.body.Review.serviceID, {
            $push: { Reviews: req.body.Review },
            totalRatings: Ratings
        }, { new: true }).then(data =>
            res.send(data)
        )


    })

})


/////// End Exclusiver Service Routes/////

/////// Exclusiver Service Chat Routes/////

app.post('/createexclusivechat', (req, res) => {

    var Chats = [];

    ExclusiveMessegesSchema.find({}).then(data => {
        Chats = data.filter(chat => {
            return chat.buyerID === req.body.buyerID && chat.sellerID === req.body.sellerID
        })
    }).then(() => {
        if (Chats.length > 0) {
            res.send(Chats);
        }
        else {
            var newExclusiveChatData = new ExclusiveMessegesSchema({

                messeges: req.body.messeges,
                sellerID: req.body.sellerID,
                sellerProfilePic: req.body.sellerProfilePic,
                sellerName: req.body.sellerName,
                buyerID: req.body.buyerID,
                buyerProfilePic: req.body.buyerProfilePic,
                buyerName: req.body.buyerName,
                ServiceId: req.body.ServiceId
            })

            newExclusiveChatData.save().then(newChat => {
                res.send(newChat)
            })

        }
    })

})

app.get('/readexclusivechat', (req, res) => {
    ExclusiveMessegesSchema.find({}).then(chats => {
        res.send(chats)
    })
})

app.put('/readnewmesseges', (req, res) => {

    const data = ExclusiveMessegesSchema.findById({ _id: req.body.Id })

    var updateMesseges = [];

    data.then(chat => {
        updateMesseges = chat.messeges.map(message => {
            if (message.senderID !== req.body.userID) {
                Object.assign(message, { isRead: true })

                return message
            }

            return message
        })
    }).then(() => {

        ExclusiveMessegesSchema.findByIdAndUpdate(req.body.Id, {
            messeges: updateMesseges
        }, { new: true }).then(data => res.send(data))
    })



})

/////// End Exclusiver Service Chat Routes/////

/////// End Exclusiver Service Order Routes/////

app.post('/createexclusiveorder', (req, res) => {

    var newExclusiveOrderData = new ExclusiveOrderSchema({

        sellerID: req.body.sellerID,
        sellerProfilePic: req.body.sellerProfilePic,
        sellerName: req.body.sellerName,
        buyerID: req.body.buyerID,
        buyerProfilePic: req.body.buyerProfilePic,
        buyerName: req.body.buyerName,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        Price: req.body.Price,
        Days: req.body.Days,
        orderDetail: req.body.orderDetail,
        ServiceId: req.body.ServiceId,
        isComplete: req.body.isComplete
    })

    newExclusiveOrderData.save().then(data => {
        res.send(data)
    })
})

app.get('/readexclusiveorders', (req, res) => {
    ExclusiveOrderSchema.find({}).then(orders => {
        res.send(orders)
    })
})

app.delete('/deleteexclusivesellerorder', (req, res) => {
    ExclusiveOrderSchema.findByIdAndRemove(req.body.Id, (err, data) => {
        res.send(data)
    })
})

app.delete('/deleteexclusivebuyerorder', (req, res) => {

    var orderEndDate = req.body.endDate;
    var currentDate = new Date();

    var days = Math.floor((Date.parse(orderEndDate) - Date.parse(currentDate)) / 86400000);
    var hours = days * 24;

    console.log(days)
    console.log(hours)


    ExclusiveOrderSchema.findByIdAndRemove(req.body.Id, (err, data) => {
        res.send(data)
    })
})

app.put('/completeexclusiveorder', (req, res) => {
    ExclusiveOrderSchema.findByIdAndUpdate(req.body.Id, {
        isComplete: true
    }, { new: true }).then(data => res.send(data))
})


/////// End Exclusiver Service Order Routes/////

app.post('/addstoreslistings', (req, res) => {
    console.log(req.body)
})

//Inactive Listings

//Add Inactive listings

app.post('/api/addInativeListings', (req, res) => {
    if (req.body.data) {
        let { data } = req.body
        if (data.length > 0) {
            Inactive.create(data, (err, docs) => {
                if (err) return res.json(handleErr(err))
                else {
                    return res.json(handleSuccess(docs))
                }

            })
        }
        else {
            return res.json(handleErr("Minimum 1 listings is required"))
        }
    }
})

//Get inactive listings
app.get('/api/getInactiveListings:firebaseUID', (req, res) => {
    if (req.params.firebaseUID.length > 8) {
        Inactive.find({ firebaseUID: req.params.firebaseUID }, (err, docs) => {
            if (err) res.json(handleErr(err))
            else {
                return res.json(handleSuccess(docs))
            }
        })
    }
    else {
        return res.json(handleErr('Valid firebaseUID is required'))
    }
})

//Add inactive listings to active Listings

app.put('/api/publishInactive', (req, res) => {
    if (req.body.ids) {
        if (req.body.ids.length > 0) {
            Inactive.find({ _id: { $in: req.body.ids } }, (err, docs) => {
                if (err) return res.json(handleErr(err))
                if (docs.length > 0)
                  {
                    let updatedListings = docs.map((li) => {
                        let obj = {
                            ...li._doc
                        }
                        delete obj._id
                        delete obj.createdDate
                        return obj
                    })
                Listings.create(updatedListings, (error, listings) => {
                    if (error) return res.json(handleErr(error))
                    else {
                        let ids = listings.map(d => d._id)
                        Activity.findOne({ firebaseUID: req.body.firebaseUID }, (e, act) => {
                            if (e) return res.json(handleErr(e))
                            else {
                                let { onSale } = act
                                let newSales = onSale.concat(ids)
                                Activity.findOneAndUpdate({ firebaseUID: req.body.firebaseUID }, { onSale: newSales }, { new: true }, (error, doc) => {
                                    if (err) return res.json(handleErr(error))
                                    else {
                                        Inactive.deleteMany({ _id:{$in:req.body.ids}},(e,del)=>{
                                            if(e)console.log(e)
                                            else{
                                                return res.json(handleSuccess(docs))
                                            }
                                        })
                                    }
                                })

                            }
                        })
                    }
                })
                  }
            })
        }
    }
    else {
        return res.json(handleErr('Valid listing ID is required'))

    }
})
app.get('/api/update', (req, res)=>{
    User.updateMany({},{isPRO:false},{ new: true}, (err, doc)=>{
        if(err)return res.json(handleErr(err))
        return res.json(handleSuccess(doc))
    })
})



  /////Help Center Routes //////

  app.get('/readquestions',(req,res)=>{
    HelpCenterSchema.find({}).then(data=>{
        res.send(data)
    })
})

app.post('/addtopic',(req,res)=>{

var newHelpCenterSchema =new HelpCenterSchema({
    Topic:req.body.topic,
    Questions:[]
})

newHelpCenterSchema.save().then(data=>{
    res.send(data)
})
})

app.put('/addquestion',(req,res)=>{
HelpCenterSchema.findByIdAndUpdate(req.body.topicId,{
    $push:{Questions:req.body.Questions},
},{new:true}).then(data=>      
    res.send(data)
)
})

////End of Help Center Routes///

/////Blog Routes////

app.get('/readblogs',(req,res)=>{
BlogSchema.find({}).then(data=>{
    res.send(data)
})
})

app.post('/addblogcategory',(req,res)=>{

console.log(req.body)
var newBlogSchema =new BlogSchema({
    Category:req.body.Category,
    Blog:[]
})

newBlogSchema.save().then(data=>{
    res.send(data)
})
})

app.put('/addnewblog',(req,res)=>{
BlogSchema.findByIdAndUpdate(req.body.Id,{
    $push:{Blog:req.body.blog},
},{new:true}).then(data=>      
    res.send(data)
)
})

app.put('/addblogcomment',(req,res)=>{

var data = BlogSchema.findById({_id:req.body.CateId})

var myblog=null;

data.then(blog=>{

        ///Getting commplete data
       var Blogs=blog;

        /// finding blog by Id
        blog.Blog.map(bl=>{
            if(bl._id == req.body.blogId)
            {
                myblog = bl;
            }
        })

    
        ///adding comment data into particular comments
        var newCom = myblog.comments.concat(req.body.comment)
        
        //// adding new comment into that blog
        myblog.comments = newCom;

        /// new blog into blogs
        var newBlog  =  Blogs.Blog.map(data=>{
            if(data._id===myblog._id)
            {
                data = myblog;
                return data
            }
            return data
        })

       
        BlogSchema.findByIdAndUpdate(req.body.CateId,{
            $set:{Blog:newBlog},
        },{new:true}).then(data=>      
            res.send(data)
        )
})
})
//Drafts start from here

//create draft
app.post('/api/createDraft', (req, res)=>{
    if(req.body.firebaseUID){
        let data = req.body
        Drafts.create(data, (err, doc) => {
            if(err) res.json(handleErr(err))
            else{
                return res.json(handleSuccess(doc))
            }
        })
    }
    else{
        return res.json(handleErr('Valid firebaseUID is required'))
    }
})

//update draft

app.put('/api/updateDraft', (req, res)=>{
    if(req.body.firebaseUID && req.body.id){
        let data = req.body
        Drafts.findByIdAndUpdate(req.body.id,{data},{ new: true}, (err, doc)=>{
            if(err)return res.json(handleErr(err))
            else{
                return res.json(handleSuccess(doc))
            }
        })
    }   
    else{
        return res.json(handleErr('Valid firebaseUID and listing _id is required'))
    }
})

//delete draft
app.delete('/api/deleteDraft',(req,res)=>{
    if(req.body.id){
        Drafts.findByIdAndDelete(req.body.id,(err, doc)=>{
            if(err)return res.json(handleErr(err))
            else{
                return res.json(handleSuccess(doc))
            }
        })
    }
    else{
        return res.json(handleErr('Valid draft _id is required'))
    }
})

//get all drafts for user

app.get('/api/getUserDrafts:firebaseUID',(req, res)=>{
    Drafts.find({ firebaseUID: req.params.firebaseUID}, (err, docs)=>{
        if(err)return res.json(handleErr(err))
            else{
                return res.json(handleSuccess(docs))
            }
    })
})


//get my Auctions

app.post('/api/getMyAuctions', (req, res)=>{
    console.log(req.body)
    if(req.body.id){
        Auction.count({}, (err, count) => {
            if(err)return res.json(handleErr(err))
          return Auction.find({
              userId:req.body.id
          })
            .populate("userId")
            .exec((err, docs) => {
              if (err) {
                res.json({
                  message: "Failed",
                  err
                });
              } else {
                res.json({
                  message: "Success",
                  docs,
                  count
                });
              }
            });
        });
    }else{
        return res.json(handleErr('Valid user _id is required'))
    }
})
//Server
server.listen(port, function () {
    console.log('Listening on port' + port)
})


