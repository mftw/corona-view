import Pong from "../Pong/Pong";
import Graphs from "../Pages/Graphs/Graphs";
import WorldMap from '../WorldMap/WorldMap'

export const routes = [
  {
    name: "Corona tal",
    path: "/",
    exact: true,
    component: Graphs
  },
  {
    name: "Verdenskort",
    path: "/world-map",
    exact: true,
    component: WorldMap,
    // noPage: true
  },
  {
    name: "Sjov",
    path: "/pong",
    exact: true,
    component: Pong
  },
];

export const length = routes.length - 1;
