import { useEffect, useState } from "react";

const deets = `
name
_id
image {
  asset {
    url
    metadata {
      lqip
    }
  }
}
`;

export default function useLatestData() {
  // hot slices
  const [hotSlices, setHotSlices] = useState();
  // slicemasters
  const [slicemasters, setSlicemaster] = useState();

  // use sideeffect to fetch the data from the graph wl endpoint
  useEffect(function () {
    // when component loads, fetch the data
    fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
           
          query {
            StoreSettings(id: "downtown") {
              name
              slicemasters {
                ${deets}
              }
              hotSlices {
                ${deets}
              }
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        // TODO: check for errors
        // set the data to state
        // console.log(res.data);
        setHotSlices(res.data.StoreSettings.hotSlices);
        setSlicemaster(res.data.StoreSettings.slicemasters);
      })
      .catch((err) => console.log(err));
  }, []);
  return {
    hotSlices,
    slicemasters,
  };
}
