import { FaPepperHot as icon } from "react-icons/fa";

export default {
  name: "topping",
  title: "Toppings",
  type: "document",
  icon: icon,
  fields: [
    {
      name: "name",
      title: "Topping name",
      type: "string",
      description: "What is the name of the topping",
    },
    {
      name: "vegetarian",
      title: "Vegetarian name",
      type: "boolean",
      description: "What is the name of the topping",
    },
  ],
  preview: {
    select: {
      name: "name",
      vegetarian: "vegetarian",
    },
    prepare: (fields) => ({
      title: ` ${fields.name} ${fields.vegetarian ? "🌱" : ""}`,
    }),
  },
};
