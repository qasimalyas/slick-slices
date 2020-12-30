/**
 * Form state updater.
 *
 * This is used to track and store form field values in an object (values).
 * The hook returns the object and an updater function (updateValue).
 *
 * values:      object - key/value
 * updateValue  func   - event as parameter
 *
 * As the user types in the field the updateValue function is fired which passes
 * the event to `useForm` hook. We destructure the value and store that using
 * `setValues` function. The values object is updated and returned to the consuming
 * component.
 *
 */

import { useState } from "react";

export default function useForm(defaults) {
  const [values, setValues] = useState(defaults);

  function updateValue(e) {
    // check if its a number and convert
    let { value } = e.target;
    if (e.target.type === "number") {
      value = parseInt(value);
    }
    setValues({
      // copy exusting values
      ...values,
      // update new value changed
      [e.target.name]: value,
    });
  }

  return { values, updateValue };
}
