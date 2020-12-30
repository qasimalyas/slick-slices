import { MdStore as icon } from "react-icons/md";

export default {
  name: "storeSettings",
  title: "Store settings",
  type: "document",
  icon,
  fields: [
    {
      name: "name",
      title: "Store name",
      type: "string",
      description: "Name of the store",
    },
    {
      name: "slicemasters",
      title: "Slicemasters currently slicing",
      type: "array",
      of: [{ type: "reference", to: [{ type: "person" }] }],
    },
    {
      name: "hotSlices",
      title: "Hot slices available in the case",
      type: "array",
      of: [{ type: "reference", to: [{ type: "pizza" }] }],
    },
  ],
};