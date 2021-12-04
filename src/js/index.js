import Input from "./components/Input";
import List from "./components/List";
import store from "./data";
import { fetchDataDB } from "./data/shopping";

const app = document.querySelector("#app");

new Input(app);
new List(app);

store.dispatch(fetchDataDB());
