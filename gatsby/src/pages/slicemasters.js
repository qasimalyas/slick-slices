import React from "react";
import { graphql, Link } from "gatsby";
import Img from "gatsby-image";
import styled from "styled-components";
import Pagination from "../components/Pagination";
import SEO from "../components/SEO";

const SlicemasterGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;

const SlicemasterStyles = styled.div`
  a {
    text-decoration: none;
  }
  .gatsby-image-wrapper {
    height: 400px;
  }
  h2 {
    transform: rotate(-2deg);
    text-align: center;
    font-size: 4rem;
    margin-bottom: -2rem;
    position: relative;
    z-index: 2;
  }
  .description {
    background: var(--yellow);
    padding: 1rem;
    margin-top: -6rem;
    z-index: 2;
    position: relative;
    transform: rotate(1deg);
    text-align: center;
  }
`;

function SlicemastersPage({ data, pageContext }) {
  const slicemasters = data.slicemasters.nodes;
  return (
    <>
      <SEO title={`Slicemasters - page ${pageContext.currentPage || 1}`} />
      <Pagination
        pageSize={process.env.GATSBY_PAGE_SIZE}
        totalCount={data.slicemasters.totalCount}
        currentPage={pageContext.currentPage || 1}
        skip={pageContext.skip}
        base="/slicemasters"
      />
      <SlicemasterGrid>
        {slicemasters.map((person, index) => (
          <SlicemasterStyles key={index}>
            <Link to={`/slicemaster/${person.slug.current}`}>
              <h2>
                <span className="mark">{person.name}</span>
              </h2>
            </Link>
            <Img fluid={person.image.asset.fluid} alt={person.name} />
            <p className="description">{person.description}</p>
          </SlicemasterStyles>
        ))}
      </SlicemasterGrid>
    </>
  );
}

/**
 * The $skip, $pageSize variables come from the context object in
 * `turnSlicemastersIntoPages` function from gatsby-node.js file.
 * These variables are then used with graphql queries which can then be
 * filtered, skipped, limited etc. Neat.
 *
 * Note: You get graph query filtering for free but the variables passed
 * within context are named the same. That doesn't mean that anything you
 * pass in context is available in graphql api.
 *
 * Summary. Pass variables in context so you can use them against graphql
 * queries in your components. Alternatively you can destructure `pageContext`
 * into your component and use the same variables.
 */
export const query = graphql`
  query($skip: Int = 0, $pageSize: Int = 2) {
    slicemasters: allSanityPerson(limit: $pageSize, skip: $skip) {
      totalCount
      nodes {
        id
        name
        slug {
          current
        }
        description
        image {
          asset {
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;

export default SlicemastersPage;
