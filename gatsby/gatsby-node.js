import path, { resolve } from "path";
import fetch from "isomorphic-fetch";

/**
 * The `turnPizzasIntoPages` creates pizza pages, e.g. "/pizza/Cluck Norris"
 */
async function turnPizzasIntoPages({ graphql, actions }) {
  // 1. get a template for this pages
  const pizzaTemplate = path.resolve("./src/templates/Pizza.js");
  // 2. query all pizzas
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);
  // console.log(data);
  // 3. loop over each pizza and create a page for that pizza
  data.pizzas.nodes.forEach((pizza) =>
    actions.createPage({
      // url for this new path
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      // 👋🏼 context is passed to Pizza.js template where the `slug` key becomes accessible
      // to graphql
      context: {
        slug: pizza.slug.current,
      },
    })
  );
}

/**
 * The `turnToppingsIntoPages` creates the topping page which once clicked
 * shows a list of pizzas using the topping.
 */
async function turnToppingsIntoPages({ graphql, actions }) {
  // console.log("TURNING TOPPINGS INTO PAGES.....");
  // 1. get the template
  const toppingTemplate = path.resolve("./src/pages/pizzas.js");
  // 2. graphql query all the toppings
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
        }
      }
    }
  `);
  // console.log(data);
  // 3. create page for that topping
  data.toppings.nodes.forEach((topping) => {
    actions.createPage({
      path: `topping/${topping.name}`,
      component: toppingTemplate,
      context: {
        topping: topping.name,
        // TODO regex for topping
      },
    });
    // console.log("Creating page for", topping.name);
  });
  // 4. pass topping data to pizza.js
}

/**
 * Here we create the 'beer' nodes in graphql. We pass in an API which parses
 * all the properties and we also additional custom properties , merge them and
 * expose them to graphql API
 */
async function fetchBeersAndTurnIntoNodes({
  actions,
  createNodeId,
  createContentDigest,
}) {
  // 1. fetch a list of beers
  const res = await fetch("https://sampleapis.com/beers/api/ale");
  const beers = await res.json();
  // console.log(beers);
  // 2. loop over each one
  for (const beer of beers) {
    // create a node for each beer
    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      children: null,
      internal: {
        type: "Beer",
        mediaType: "application/json",
        contentDigest: createContentDigest(beer),
      },
    };
    // 3. create a node for that beer
    actions.createNode({
      ...beer,
      ...nodeMeta,
    });
  }
}

/**
 * Sourcing - Putting the date into your Gatsby API
 * Nodes - Piece of data
 *
 */

async function turnSlicemastersIntoPages({ graphql, actions }) {
  // 1. query all slicemasters
  const { data } = await graphql(`
    query {
      people: allSanityPerson {
        totalCount
        nodes {
          name
          id
          slug {
            current
          }
        }
      }
    }
  `);
  // 2. turn each slicemaster into their own page
  data.people.nodes.forEach((slicemaster) => {
    actions.createPage({
      component: resolve("./src/templates/Slicemaster.js"),
      path: `/slicemaster/${slicemaster.slug.current}`,
      context: {
        slug: slicemaster.slug.current,
      },
    });
  });
  /**
   * PAGING FOR SLICE MASTERS
   */
  // 3. figure out how many pages their are based on how many slicemaster there are
  // and ow many oer page
  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
  const pageCount = Math.ceil(data.people.totalCount / pageSize);
  // console.log(pageCount);
  // 4. loop from 1 to N and create the pages for them
  Array.from({ length: pageCount }).forEach((_, i) => {
    // console.log(`creating page ${i}`);
    actions.createPage({
      path: `/slicemasters/${i + 1}`,
      component: path.resolve("./src/pages/slicemasters.js"),
      // passed to template when we create it
      context: {
        skip: i * pageSize,
        currentPage: i + 1,
        pageSize,
      },
    });
  });
}

/**
 * sourceNodes is used to pull external apis and make them queryable
 * in our graphql api.
 */
export async function sourceNodes(params) {
  // fetch a list of beers and source them into our gatsby api
  await Promise.all([fetchBeersAndTurnIntoNodes(params)]);
}

export async function createPages(params) {
  /**
   * # create pages dynamically
   *  Wait for all promises to be resolved before finishing this function
   */
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params),
    turnSlicemastersIntoPages(params),
  ]);
  // 1. pizzas
  // 2. toppings
  // slicemasters
}
