const mongoose = require('mongoose')
require('dotenv').config()
// const mongoURI = 'mongodb+srv://FF_cafe:Nayan123@cluster0.bcfcnvn.mongodb.net/FF_cafe?retryWrites=true&w=majority'

const mongoDB = async () => {
    try {
        // mongoose.set('strictQuery', false)
        await mongoose.connect(process.env.REACT_APP_mongoURI)
        console.log('Mongo connected')
        const fetched_data = await mongoose.connection.db.collection("food_items");
        fetched_data.find({}, { projection: {} }).toArray()
            .then(async function (i) {

                const foodCategory = await mongoose.connection.db.collection("foodCategory");
                foodCategory.find({}, { projection: {} }).toArray()
                .then( function (catData) {
                    global.food_items = i;
                    global.foodCategory = catData;
                   
                })


                // console.log( global.food_items)


            })
        // .then (function(i) {
        //     console.log(i);
        //   })
    } catch (err) {
        console.log("---", err)
        process.exit();
    }
}


module.exports = mongoDB;