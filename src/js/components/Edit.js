import store from "../data";
import { updateItem } from "../data/shopping";
import { stripHTML } from "./helpers";

export default class Edit {
  constructor(holder) {
    this.holder = holder;
    this.ref = this.init();
    this.setEvents();
  }
  init() {
    const data = store
      .getState()
      .shoppingState.items.filter((item) => item.id === this.holder.dataset.id);
    this.holder.innerHTML = `
    <form id="editItem">
    <div class="row g-3 d-flex align-items-end">
    <div class="col">
    <input type="text" value="${data[0].name}" class="form-control editName" required autofocus />
    </div>
    <div class="col">
    <input type="number" value="${data[0].qty}" class="form-control editQty" required />
    </div>
    <div class="col">
    <button type="submit" class="btn btn-primary" id="updateItem">Update</button>
    </div>
    </div>
    </form>`;
    return document.querySelector("#editItem");
  }
  setEvents() {
    document.querySelector("#updateItem").onclick = (e) => {
      e.preventDefault();
      console.log(this.ref);
      const item = {
        id: this.holder.dataset.id,
        name: stripHTML(this.ref.querySelector(".editName").value),
        qty: +this.ref.querySelector(".editQty").value,
      };
      store.dispatch(updateItem(item));
    };
  }
}
