import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import styled from "styled-components";

const ToppingStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;
  a {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 0 1rem;
    align-items: center;
    padding: 5px;
    background: var(--grey);
    border-radius: 2px;
    .count {
      background: white;
      padding: 2px 5px;
    }
    &[aria-current="page"] {
      background: var(--yellow);
    }
  }
`;

function countPizzasInToppings(pizzas) {
  // return pizzas with count
  const counts = pizzas
    .map((pizza) => pizza.toppings)
    .flat()
    .reduce((acc, topping) => {
      // check if this is an existing topping,
      const existingTopping = acc[topping.id];
      if (existingTopping) {
        // if it is then increment by 1
        existingTopping.count += 1;
      } else {
        acc[topping.id] = {
          id: topping.id,
          name: topping.name,
          count: 1,
        };
      }
      return acc;
      // otherwise create a new entry in our acc and set it to one
    }, {});
  // sort item based on their acc
  const sortedToppings = Object.values(counts).sort(
    (a, b) => b.count - a.count
  );
  return sortedToppings;
}

export default function ToppingsFilter({ activeTopping }) {
  // `activeTopping` is passed from \src\pages\pizzas.js which itself gets it from
  // get a list of all toppings
  const { pizzas } = useStaticQuery(graphql`
    query {
      pizzas: allSanityPizza {
        nodes {
          toppings {
            name
            id
          }
        }
      }
    }
  `);
  // get a list of all pizzas with their toppings
  // count how many pizzas are in each topping
  const toppingsWithCounts = countPizzasInToppings(pizzas.nodes);
  // console.log(toppingsWithCounts);
  // loop over list of toppings....
  return (
    <ToppingStyles>
      <Link to="/pizzas">
        <span className="name">All</span>
        <span className="count">{pizzas.nodes.length}</span>
      </Link>
      {toppingsWithCounts.map((topping, index) => (
        <Link
          key={index}
          to={`/topping/${topping.name}`}
          id={topping.id}
          className={activeTopping === topping.name ? "active" : null}
        >
          <span className="name">{topping.name}</span>
          <span className="count">{topping.count}</span>
        </Link>
      ))}
    </ToppingStyles>
  );
}
