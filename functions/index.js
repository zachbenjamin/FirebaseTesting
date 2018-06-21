const functions = require('firebase-functions');
const admin = require('firebase-admin')
const express = require('express')
const stripe = require('stripe')('sk_test_olzndPxycLsdGDT1e2FfVjOS')
const bodyParser = require('body-parser')
const app = express()
const path = require('path')



  // This function assumes that some previous middleware has determined the
  // correct customerId for the session and saved it on the request object.
//   stripe.ephemeralKeys.create(
//     {customer: req.customerId},
//     {stripe_version: stripe_version}
//   ).then((key) => {
//     res.status(200).json(key);
//   }).catch((err) => {
//     res.status(500).end();
//   });
// });

// const port = process.env.PORT || 5000
//
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended : true
}))

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')

app.post('/charge', (req, res) => {
  const customer = req.body.customer
  const amount = req.body.amount
  const currency = req.body.currency

  stripe.charges.create({     //may need to be "charge"
    customer : customer,
    amount : amount,
    currency : currency
  }, function(err, charge) {
    if (err) {
      console.log(err, req.body)
      res.status(500).end()
    } else {
      res.status(200).send()
    }
  })


})

app.post('/ephemeral_keys', (req, res) => {
  const customerID = req.body.customer_id
  const api_version = req.body.api_version

    stripe.ephemeralKeys.create(
      {customer : customerID},
      {stripe_version : api_version}
    ).do((key) => {
      res.status(200).send(key)
    }).catch((error) => {
    //  console.log(err, req.body)
      res.status(500).end()
    })
})

// // server.listen(port, function() {
// //     console.log("App is running on port " + port);
// // });
//
//   //.listen(PORT, () => console.log(`Listening on ${ PORT }`))
//   .listen(process.env.PORT || 5000)


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloToWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
