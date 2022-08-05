import {merge, namespaced} from "overmind/config";
import app from "./app";
import days from "./days";

const root = merge(
  app,
  namespaced({
    days,
  })
);
export default root;

/** @typedef {typeof root} AppContext */
