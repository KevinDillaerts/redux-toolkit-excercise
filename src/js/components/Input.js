import store from "../data";
import { nanoid } from "@reduxjs/toolkit";
import { addItem } from "../data/shopping";

export default class Input {
  constructor(holder) {
    this.holder = holder;
    this.ref = this.init();
    this.setEvents();
  }
  init() {
    this.holder.insertAdjacentHTML(
      "beforeend",
      `
      <div class="container">
      <form class="mt-3 mb-5">
      <div class="row g-3 d-flex align-items-end">
        <div class="col">
          <div class="mb-3">
            <label for="item" class="form-label">Item</label>
            <input type="text" class="form-control" id="inputItem" required autofocus />
          </div>
        </div>
        <div class="col-sm-2 lg-1">
          <div class="mb-3">
            <label for="qty" class="form-label">Qty</label>
            <input type="number" value="1" class="form-control" id="inputQty" required />
          </div>
        </div>
        <div class="col-sm-2">
          <button type="submit" class="btn btn-primary mb-3" id="addItem">Add</button>
        </div>
      </div>
    </form>
    </div>`
    );
    return this.holder.querySelector("form");
  }
  setEvents() {
    const intputItem = this.ref.querySelector("#inputItem");
    this.ref.querySelector("#addItem").onclick = (e) => {
      e.preventDefault();
      if (intputItem.value === "") {
        window.alert("please enter an item");
        return;
      }
      const item = {
        id: nanoid(),
        name: this.ref.querySelector("#inputItem").value,
        qty: +this.ref.querySelector("#inputQty").value,
      };
      store.dispatch(addItem(item));
      this.ref.reset();
      intputItem.focus();
    };
  }
}
