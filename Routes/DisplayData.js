const express = require('express');
const router = express.Router();

router.post("/foodData", (req, res) => {
    try {
        if (global.food_items && global.foodCategory) {
            res.send({
                food_items: global.food_items,
                foodCategory: global.foodCategory
            });
        } else {
            res.status(500).send("Data not available yet. Please check back later.");
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
