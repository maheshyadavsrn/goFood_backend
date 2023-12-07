const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://mahesh:Mahesh123@cluster0.tcjfkia.mongodb.net/goFoodMern?retryWrites=true&w=majority';

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB");

        const FoodItem = await mongoose.connection.db.collection("food_items").find({}).toArray();
        const foodCategory = await mongoose.connection.db.collection("foodCategory").find({}).toArray();

        global.food_items = FoodItem;
        global.foodCategory = foodCategory;

        // console.log("Food Items:", global.food_items);
        // console.log("Food Categories:", global.foodCategory);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

module.exports = mongoDB;
