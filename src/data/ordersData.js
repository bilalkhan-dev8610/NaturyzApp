// src/data/ordersData.js

export const ordersData = [
  {
    id: "NYZ12584",
    date: "18 Jan 2025",
    status: "Out for Delivery",
    statusGroup: "Shipped",
    deliveryLabel: "Expected Delivery",
    deliveryDate: "Today, 19 Jan",
    itemCount: 3,
    total: 5399,
    products: [
      {
        id: "whey",
        image: require("../../assets/images/naturyz-product-whey-protein.png"),
      },
      {
        id: "creatine",
        image: require("../../assets/images/naturyz-product-creatine-x7.png"),
      },
      {
        id: "gainer",
        image: require("../../assets/images/naturyz-product-mass-gainer.png"),
      },
    ],
  },
  {
    id: "NYZ12490",
    date: "12 Jan 2025",
    status: "Shipped",
    statusGroup: "Shipped",
    deliveryLabel: "Expected Delivery",
    deliveryDate: "20 Jan 2025",
    itemCount: 2,
    total: 3398,
    products: [
      {
        id: "whey",
        image: require("../../assets/images/naturyz-product-whey-protein.png"),
      },
      {
        id: "creatine",
        image: require("../../assets/images/naturyz-product-creatine-x7.png"),
      },
    ],
  },
  {
    id: "NYZ12317",
    date: "05 Jan 2025",
    status: "Delivered",
    statusGroup: "Delivered",
    deliveryLabel: "Delivered on",
    deliveryDate: "08 Jan 2025",
    itemCount: 1,
    total: 3299,
    products: [
      {
        id: "gainer",
        image: require("../../assets/images/naturyz-product-mass-gainer.png"),
      },
    ],
  },
  {
    id: "NYZ12048",
    date: "28 Dec 2024",
    status: "Cancelled",
    statusGroup: "Cancelled",
    deliveryLabel: "Cancelled on",
    deliveryDate: "28 Dec 2024",
    itemCount: 1,
    total: 2499,
    products: [
      {
        id: "whey",
        image: require("../../assets/images/naturyz-product-whey-protein.png"),
      },
    ],
  },
];