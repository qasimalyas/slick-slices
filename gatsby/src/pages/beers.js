import React from "react";
import { graphql } from "gatsby";
import styled from "styled-components";
import SEO from "../components/SEO";

const BeerGridStyles = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

const SingleBeerStyles = styled.div`
  border: 1px solid var(--grey);
  padding: 2rem;
  text-align: center;
  img {
    display: grid;
    align-items: center;
    width: 100%;
    height: 200px;
    object-fit: contain;
  }
`;

function BeersPage({ data }) {
  const { beers } = data;
  return (
    <>
      <SEO title={`Beers! We have ${beers.nodes.length}`} />
      <h2>We have {beers.nodes.length} beers available. Dine in only!</h2>
      <BeerGridStyles>
        {beers.nodes.map((beer) => {
          const rating = Math.round(beer.rating.average);
          return (
            <SingleBeerStyles key={beer.id}>
              <img src={beer.image} alt={beer.name} />
              <h3>{beer.name}</h3>
              {beer.price}
              <p title={`${rating} out of 5 stars`}>
                {`⭐`.repeat(rating)}
                <span style={{ filter: "grayscale(100%)" }}>
                  {`⭐`.repeat(5 - rating)}
                </span>
                <span>({beer.rating.reviews})</span>
              </p>
            </SingleBeerStyles>
          );
        })}
      </BeerGridStyles>
    </>
  );
}

export const query = graphql`
  query BeerQuery {
    beers: allBeer {
      nodes {
        name
        price
        id
        image
        rating {
          reviews
          average
        }
      }
    }
  }
`;

export default BeersPage;
