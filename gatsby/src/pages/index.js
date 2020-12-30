import React from "react";
import ItemGrid from "../components/ItemGrid";
import LoadingGrid from "../components/LoadingGrid";
import { HomePageGrid } from "../styles/Grids";
import useLatestData from "../utils/useLatestData";

function CurrentlySlicing({ slicemasters }) {
  console.log(slicemasters);
  return (
    <div>
      <h2 className="center tilt">
        <span className="mark tilt">Slicemasters on</span>
      </h2>
      <p>Standing by ready to slice you up! 🍕</p>
      {!slicemasters && <LoadingGrid count={4} />}
      {slicemasters && !slicemasters?.length && <p>No one is working atm</p>}
      {slicemasters?.length && <ItemGrid items={slicemasters} />}
    </div>
  );
}

function HotSlices({ hotSlices }) {
  return (
    <div>
      <h2 className="center tilt">
        <span className="mark tilt">Hot slices</span>
      </h2>
      <p>Come on by, bye the slice! 🌶</p>
      {!hotSlices && <LoadingGrid count={4} />}
      {hotSlices && !hotSlices?.length && <p>Nothing in the case</p>}
      {hotSlices?.length && <ItemGrid items={hotSlices} />}
    </div>
  );
}

function HomePage({ pageContext }) {
  console.log("index page", pageContext);
  const { hotSlices, slicemasters } = useLatestData();
  return (
    <div className="center">
      <h1>The best pizza downtown!</h1>
      <p>Open 11am to 11pm every single day</p>
      <HomePageGrid>
        <CurrentlySlicing slicemasters={slicemasters} />
        <HotSlices hotSlices={hotSlices} />
      </HomePageGrid>
    </div>
  );
}

export default HomePage;
