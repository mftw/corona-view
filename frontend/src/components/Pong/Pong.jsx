import React, { 
  Suspense
} from "react";
import IO from "./IO";
import Page from '../Page/Page';
import Loader from '../Loader/Loader';


export default function Pong(props) {
  return (
    <Suspense
      fallback={
        <Page>
          <Loader />
        </Page>
      }
    >
      <IO />
    </Suspense>
  );
}
