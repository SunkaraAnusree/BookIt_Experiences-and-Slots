import mongoose from "mongoose";
import dotenv from "dotenv";
import Experience from "./models/Experience.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const seedData = [
  {
    title: "Kayaking in Udupi",
    place: "Udupi, Karnataka",
    price: 1199,
    image: "/images/udipi.jpg",
    short: "Paddle through serene backwaters surrounded by coconut groves.",
  },
  {
    title: "Bungee Jumping in Manali",
    place: "Manali, Himachal Pradesh",
    price: 2299,
    image: "/images/manali.jpg",
    short: "An adrenaline-filled jump amidst the majestic Himalayan peaks.",
  },
  {
    title: "Sunrise Trek in Nandi Hills",
    place: "Nandi Hills, Karnataka",
    price: 899,
    image: "/images/nandi hills.jpg",
    short: "Catch the first rays of the sun over mist-covered valleys.",
  },
  {
    title: "Coffee Trail in Coorg",
    place: "Coorg, Karnataka",
    price: 1299,
    image: "/images/cofee.jpg",
    short: "Explore lush plantations and savor authentic South Indian coffee.",
  },
  {
    title: "Boat Cruise in Sunderbans",
    place: "Sunderbans, West Bengal",
    price: 999,
    image: "/images/Boat Cruise.jpg",
    short: "Glide through mangrove forests and spot the Royal Bengal Tiger.",
  },
  {
    title: "River Rafting in Rishikesh",
    place: "Rishikesh, Uttarakhand",
    price: 1499,
    image: "/images/river.jpg" ,
    short: "Ride the thrilling rapids of the Ganges with professional guides.",
  },
  {
    title: "Nature Camp in Munnar",
    place: "Munnar, Kerala",
    price: 1799,
    image: "/images/munnar.jpg",
    short: "Stay in the lap of nature surrounded by misty tea plantations.",
  },
  {
    title: "Heritage Walk in Jaipur",
    place: "Jaipur, Rajasthan",
    price: 1399,
    image: "/images/jaipur.jpg",
    short: "Walk through ancient forts, palaces, and vibrant local bazaars.",
  },
  {
    title: "Camel Safari in Jaisalmer",
    place: "Jaisalmer, Rajasthan",
    price: 1699,
    image: "/images/camelsafari.jpg",
    short: "Ride camels across golden dunes and enjoy desert folk music.",
  },
  {
    title: "Scuba Diving in Goa",
    place: "Goa, India",
    price: 1499,
    image: "/images/goa.jpg",
    short: "Explore vibrant coral reefs and colorful marine life up close.",
  },
  {
    title: "Jungle Safari in Jim Corbett",
    place: "Jim Corbett, Uttarakhand",
    price: 1899,
    image: "/images/junglesafari.jpg",
    short: "Embark on an exciting jeep safari to witness wild elephants and tigers.",
  },
  {
    title: "Sunset Boat Ride in Udaipur",
    place: "Udaipur, Rajasthan",
    price: 1099,
    image: "/images/uaipurboatride.jpg",
    short: "Enjoy the golden sunset over Lake Pichola with city palace views.",
  },
  {
    title: "Ganga Aarti Experience in Varanasi",
    place: "Varanasi, Uttar Pradesh",
    price: 699,
    image: "/images/gangaaarathi.jpg",
    short: "Witness the spiritual beauty of the evening Ganga Aarti ceremony.",
  },
  {
    title: "Stargazing Camp in Spiti Valley",
    place: "Spiti Valley, Himachal Pradesh",
    price: 2599,
    image: "/images/Stargazing Camp.jpg",
    short: "Camp under crystal-clear skies surrounded by Himalayan silence.",
  },
  {
    title: "Snorkeling in Andaman Islands",
    place: "Havelock Island, Andaman & Nicobar",
    price: 3499,
    image: "/images/Andaman Islands.jpg",
    short: "Dive into turquoise waters and swim alongside tropical fish.",
  },
];

async function seedDatabase() {
  try {
    await Experience.deleteMany();
    await Experience.insertMany(seedData);
    console.log("✅ Database seeded successfully with 15 Indian experiences!");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
