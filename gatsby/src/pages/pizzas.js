import React from "react";
import { graphql } from "gatsby";
import PizzaList from "../components/PizzaList";
import ToppingsFilter from "../components/ToppingFilter";
import SEO from "../components/SEO";

// pageContext comes from gatsby
function PizzaPage({ data, pageContext }) {
  const pizzas = data.pizzas.nodes;
  return (
    <>
      <SEO
        title={
          pageContext.topping
            ? `Pizzas with ${pageContext.topping}`
            : `All pizzas`
        }
      />
      <ToppingsFilter activeTopping={pageContext.topping} />
      <PizzaList pizzas={pizzas} />
    </>
  );
}

export default PizzaPage;

// page query
/**
 * Filters pizzas by topping which comes from `turnToppingsIntoPages`
 * in gatsby-node.js
 */
export const query = graphql`
  query PizzaQuery($topping: [String]) {
    pizzas: allSanityPizza(
      filter: { toppings: { elemMatch: { name: { in: $topping } } } }
    ) {
      nodes {
        name
        price
        slug {
          current
        }
        toppings {
          name
        }
        id
        image {
          asset {
            fixed(width: 200, height: 200) {
              ...GatsbySanityImageFixed
            }
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
