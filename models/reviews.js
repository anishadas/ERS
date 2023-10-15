const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({

    review: {
        type: String,
        required: true,
    },
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    editedBy: {
        type:String,
    }

}, {
    timestamps: true,
});


const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;