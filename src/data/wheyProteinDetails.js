// src/data/wheyProteinDetails.js

export const wheyProteinDetails = {
  id: "naturyz-whey-protein",
  name: "Whey Protein",
  subtitle: "Premium Whey Protein Blend for Muscle Growth & Recovery",
  description:
    "NATURYZ Whey Protein is a demo product entry for the mobile app prototype. Product composition, ingredients and claims must be confirmed against the official product label before production.",
  rating: 4.8,
  reviews: 2346,
  bought: "10K+",
  image: require("../../assets/images/naturyz-product-whey-protein.png"),

  flavors: [
    { id: "rich-chocolate", label: "Rich Chocolate", icon: "nutrition-outline" },
    { id: "vanilla", label: "Vanilla", icon: "flower-outline" },
    { id: "strawberry", label: "Strawberry", icon: "nutrition-outline" },
  ],

  sizes: [
    { id: "1kg", label: "1 kg", price: 2499, mrp: 2999 },
    { id: "2kg", label: "2 kg", price: 4799, mrp: 5999 },
    { id: "3kg", label: "3 kg", price: 6999, mrp: 8999 },
  ],

  features: [
    { icon: "fitness-outline", title: "High\nProtein" },
    { icon: "leaf-outline", title: "No Added\nSugar" },
    { icon: "cube-outline", title: "Gluten\nFree" },
    { icon: "shield-checkmark-outline", title: "Lab\nTested" },
  ],

  productDescription:
    "A convenient protein supplement option for your fitness routine. Please refer to the official product packaging for verified ingredients, directions and allergen information.",

  nutritionNote:
    "Nutritional values vary by serving size and flavor. The official NATURYZ product label should be used as the source of truth. This prototype does not display unverified nutrition quantities.",
};

export const formatINR = (amount) =>
  `₹${Number(amount || 0).toLocaleString("en-IN")}`;

export const getDiscountPercent = (mrp, price) => {
  if (!mrp || mrp <= price) return 0;
  return Math.round(((mrp - price) / mrp) * 100);
};