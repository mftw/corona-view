import React, { Suspense } from "react";
import Loader from "../../Loader/Loader";
// import CoronaGraph from "../../Graph/CoronaVirusGraph";

// Dette er en anden syntax til at importe components.
// Her gøres brug af code-splitting og lazy loading
// så disse components først bliver downloaded af browseren
// når de skal bruges. <Suspense /> sørger for at vise en
// loader imens de bliver downloaded.
const CoronaGraph = React.lazy(() => import("../../Graph/CoronaVirusGraph"));

export default function Graphs(props) {
  return (
    <Suspense
      fallback={
        <div>
          <h1>Henter virus info..</h1>
          <Loader />
        </div>
      }
    >
      <h3>Corona udbrud</h3>
      <CoronaGraph />
    </Suspense>
  );
}
