const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the schema
const payProductSchema = new Schema({
  productName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  point: {
    type: Number,
    default: 0,
  },
  img: {
    type: String,
    default: "", // Added the 'img' field
  },
  ValidDate: {
    type: Date,
    default: null, // Changed default to 'null'
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the model
const PayProduct = mongoose.model("PayProduct", payProductSchema);
module.exports = PayProduct;

// // Mock data
// const payProductData = [
//   {
//     productName: "signal Class",
//     description: "1 class",
//     price: 200,
//     point: 200,
//     img: "path/to/image1.jpg",
//     ValidDate: new Date("2025-05-24"),
//   },
//   {
//     productName: "5 Class",
//     description: "5 classes",
//     price: 825,
//     point: 825,
//     img: "path/to/image2.jpg",
//     ValidDate: new Date("2025-05-24"),
//   },
//   {
//     productName: "10 Class",
//     description: "10 classes",
//     price: 1450,
//     point: 1450,
//     img: "path/to/image4.jpg",
//     ValidDate: new Date("2025-05-24"),
//   },
//   {
//     productName: "15 Class",
//     description: "15 classes",
//     price: 1950,
//     point: 1950,
//     img: "path/to/image4.jpg",
//     ValidDate: new Date("2025-05-24"),
//   },
//   {
//     productName: "Monthly Pass",
//     description: "30 days to attend courses including workshops, pop-up courses, collab class*except Showcase",
//     price: 0,
//     point: 3200, // Negative points as per mock data
//     img: "path/to/image4.jpg",
//     ValidDate: null,
//   },
//   {
//     productName: "Xtra lab T-shirt",
//     description: "Our own Design T-shirt",
//     price: 0,
//     point: -300, // Negative points as per mock data
//     img: "path/to/image4.jpg",
//     ValidDate: null,
//   },
// ];

// // Save each product to the database
// payProductData.forEach((data) => {
//   const newPayProduct = new PayProduct(data);
//   newPayProduct
//     .save()
//     .then((savedDoc) => {
//       console.log("儲存完畢, 資料是:");
//       console.log(savedDoc);
//     })
//     .catch((e) => {
//       console.error("Error while saving:", e.message);
//     });
// });

// module.exports = PayProduct;