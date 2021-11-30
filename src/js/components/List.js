import store from "../data";
import { deleteItem } from "../data/shopping";

export default class List {
  constructor(holder) {
    this.holder = holder;
    this.ref = this.init();
    this.render();
    this.setEvents();
    store.subscribe(this.render.bind(this));
  }
  init() {
    this.holder.insertAdjacentHTML(
      "beforeend",
      `<div class="container">
      <ul class="list-group" id="shoppingList"></ul>
      </div>
    `
    );
    return this.holder.querySelector("#shoppingList");
  }
  render() {
    const data = store.getState().shoppingState.items;
    this.ref.innerHTML = data
      .map(
        (item) =>
          `<li class="list-group-item mb-3" data-id="${item.id}">
          <span class="badge bg-primary rounded-pill col-1 me-2">${item.qty}</span>
          <span class="col me-auto">${item.name}</span>
          <button class="deleteItem btn btn-danger col-2">Delete</button></li>`
      )
      .join("");
  }
  setEvents() {
    this.ref.onclick = (e) => {
      if (e.target.classList.contains("deleteItem")) {
        store.dispatch(deleteItem(e.target.parentElement.dataset.id));
      }
    };
  }
}