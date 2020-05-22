import React, { useState, useEffect } from "react";
import * as yup from "yup";
import formSchema from "../validation/formSchema.js";
import axios from "axios";

const initialFormValues = {
  name: "",
  size: "",
  toppings: {
    cheese: false,
    pepperoni: false,
    bacon: false,
    onion: false,
  },
  special: "",
};

const initialFormErrors = {
  name: "",
  size: "",
};

const initialDisabled = true;

export default function PizzaForm(props) {
  const [pizza, setPizza] = useState([]);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);

  const postNewPizza = (newPizza) => {
    axios
      .post("", newPizza)
      .then((res) => {
        setPizza([res.data], ...pizza);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setFormValues(initialFormValues);
      });
  };

  const onInputChange = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;

    yup
      .reach(formSchema, name)
      .validate(value)
      .then((valid) => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        });
      })
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        });
      });
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const onSubmit = (evt) => {
    evt.preventDefault();

    const newPizza = {
      name: formValues.fName.trim(),
      size: formValues.size,
      topping: Object.keys(formValues.topping).filter(
        (accepted) => formValues.terms[accepted] === true
      ),
      special: formValues.special,
    };
    postNewPizza(newPizza);
  };

  useEffect(() => {
    formSchema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]);

  return (
    <form className="form container" onSubmit={onSubmit}>
      <h2>Make A Pizza</h2>
      <div className="form inputs">
        <h4>Create Your Pizza</h4>
        <label>
          Name
          <input
            value={formValues.name}
            onChange={onInputChange}
            name="name"
            type="text"
          />
        </label>
        <label>
          Size
          <select onChange={onInputChange} value={formValues.size} name="size">
            <option value="">- Select an option -</option>
            <option value="Small">Small</option>
            <option value="Med">Med</option>
            <option value="Large">Large</option>
            <option value="XL">XL</option>
          </select>
        </label>
        <h3>Toppings:</h3>
        <label>
          Cheese
          <input
            type="radio"
            name="toppings"
            value="Cheese"
            onChange={onInputChange}
          />
        </label>
        <label>
          Pepperoni
          <input
            type="radio"
            name="toppings"
            value="Pepperoni"
            onChange={onInputChange}
          />
        </label>
        <label>
          Bacon
          <input
            type="radio"
            name="toppings"
            value="Bacon"
            onChange={onInputChange}
          />
        </label>
        <label>
          Onion
          <input
            type="radio"
            name="toppings"
            value="Onion"
            onChange={onInputChange}
          />
        </label>
        <label>
          Special Instructions
          <input
            value={formValues.special}
            onChange={onInputChange}
            name="special"
            type="text"
          />
        </label>
      </div>
      <div>
        <button disabled={disabled} className="submit">
          Submit
        </button>
      </div>
      <div className="errors">
        <div>{formErrors.name}</div>
        <div>{formErrors.size}</div>
      </div>
    </form>
  );
}
