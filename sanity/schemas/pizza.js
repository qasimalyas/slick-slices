import { MdLocalPizza as icon } from "react-icons/md";
import PriceInput from "../components/PriceInput";

export default {
  name: "pizza",
  title: "Pizzas",
  type: "document",
  icon: icon,
  fields: [
    {
      name: "name",
      title: "Pizza name",
      type: "string",
      description: "Name of the pizza",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name", // this comes from name field in first object
        maxLength: 100,
      },
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "price",
      title: "Price",
      type: "number",
      description: "Price of the pizza",
      inputComponent: PriceInput,
      validation: (Rule) => Rule.min(1000).max(50000),
      // TODO: Add custom input component
    },
    {
      name: "toppings",
      title: "Toppings",
      type: "array",
      of: [{ type: "reference", to: [{ type: "topping" }] }],
    },
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
      topping0: "toppings.0.name",
      topping1: "toppings.1.name",
      topping2: "toppings.2.name",
      topping3: "toppings.3.name",
    },
    prepare: ({ media, title, ...toppings }) => {
      // 1. filter undefined toppings out
      const tops = Object.values(toppings).filter(Boolean);
      // 2. return preview object for pizza
      return {
        title,
        media,
        subtitle: tops.join(", "),
      };
    },
  },
};
