let table = document.querySelector("table");
let counter = 1;
let local = JSON.parse(localStorage.getItem("values")) || [];

// create fucntion
function create(obj) {
  let values = Object.values(obj);
  let tr = document.createElement("tr");
  let td = document.createElement("td");
  let number = document.createTextNode(count());

  values = values.filter((e) => e != obj.id);

  td.appendChild(number);
  tr.appendChild(td.cloneNode(true));
  td.removeChild(number);
  for (let i = 0; i < values.length; i++) {
    let txt = document.createTextNode(values[i]);
    td.appendChild(txt);
    tr.appendChild(td.cloneNode(true));
    td.removeChild(txt);
  }
  tr.appendChild(button("Update"));
  tr.appendChild(button("Delete"));

  tr.classList.add("el");
  return tr.cloneNode(true);
}

// create event

let createEl = document.querySelector(".create");

createEl.addEventListener("click", () => {
  let obj = {
    title: document.querySelector(".title").value,
    price: document.querySelector(".pricee").value,
    taxes: document.querySelector(".taxes").value,
    ads: document.querySelector(".ads").value,
    discount: document.querySelector(".discount").value,
  };
  obj.total = total(obj.price, obj.taxes, obj.ads, obj.discount);
  obj.category = document.querySelector(".category").value;
  let count = document.querySelector(".count").value;
  !count ? (count = 1) : count;
  for (let i = 0; i < count; i++) {
    let el = create(obj);
    let id = createID();
    el.id = id;
    table.appendChild(el);
    addToLocalStorage({
      ...obj,
      id: id,
    });
  }
  clearInputs();
});

function button(type) {
  let td = document.createElement("td");
  let span = document.createElement("span");
  let txt = document.createTextNode(type);

  span.appendChild(txt);
  td.appendChild(span);

  type == "Delete"
    ? span.classList.add("Delete")
    : span.classList.add("Update");

  return td.cloneNode(true);
}

function count() {
  return counter++;
}

function total(price, taxes, ads, discount) {
  return discount
    ? Number(price) + Number(taxes) + Number(ads) - Number(discount)
    : Number(price) + Number(taxes) + Number(ads);
}

function addToLocalStorage(obj) {
  console.log();
  local.push(obj);
  localStorage.setItem("values", JSON.stringify(local));
}

function createID() {
  let result = [];

  for (let i = 0; i < 5; i++) {
    result.push(Math.floor(Math.random() * 5));
  }

  return result.join("");
}

function clearInputs() {
  document.querySelector(".title").value = "";
  document.querySelector(".pricee").value = "";
  document.querySelector(".taxes").value = "";
  document.querySelector(".ads").value = "";
  document.querySelector(".discount").value = "";
  document.querySelector(".count").value = "";
  document.querySelector(".category").value = "";
}

// read function

function read(e, price, taxes, ads, discount) {
  e.innerHTML = `total: ${total(price, taxes, ads, discount)}`;
}

setInterval(() => {
  let price = document.querySelector(".pricee").value;
  let taxes = document.querySelector(".taxes").value;
  let ads = document.querySelector(".ads").value;
  let p = document.querySelector(".total");
  let discount = document.querySelector(".discount").value;
  if (price && taxes && ads) {
    read(p, price, taxes, ads, discount);
  } else {
    p.innerHTML = "total: ";
  }
});

// display

function displayLocalStorage() {
  for (let i = 0; i < local.length; i++) {
    let el = create(local[i]);
    el.id = local[i].id;
    table.appendChild(el);
  }
}

displayLocalStorage();

// delete

setInterval(() => {
  let deleteButtons = document.querySelectorAll(".Delete");

  deleteButtons.forEach((el) => {
    el.addEventListener("click", () => {
      let element = el.parentElement.parentElement;
      element.remove();
      removeFromLocalStorage(element);
    });
  });
});

function removeFromLocalStorage(e) {
  for (let i = 0; i < local.length; i++) {
    if (local[i].id == e.id) {
      local.splice(i, 1);
    }
  }
  localStorage.setItem("values", JSON.stringify(local));
}

// cleanAll

let cleanEl = document.querySelector(".delete-all");

setInterval(() => {
  let els = document.querySelectorAll(".el");
  cleanEl.innerHTML = `Delete All (${els.length})`;
  cleanEl.addEventListener("click", () => {
    els.forEach((e) => e.remove());
    local = [];
    localStorage.setItem("values", JSON.stringify(local));
  });
});

// search

let searchTitleEl = document.querySelector(".search-title");
let searchCategoryEl = document.querySelector(".search-category");

function searchByTitle() {
  let els = document.querySelectorAll(".el");
  let inputSearch = document.querySelector(".input-search").value;

  for (let i = 0; i < els.length; i++) {
    if (els[i].children[1].innerHTML.includes(inputSearch)) {
      els[i].style.display = "table-row";
    } else {
      els[i].style.display = "none";
    }
  }
}

searchTitleEl.addEventListener("click", searchByTitle);

function searchByCategory() {
  let els = document.querySelectorAll(".el");
  let inputSearch = document.querySelector(".input-search").value;

  for (let i = 0; i < els.length; i++) {
    if (els[i].children[7].innerHTML.includes(inputSearch)) {
      els[i].style.display = "table-row";
    } else {
      els[i].style.display = "none";
    }
  }
}

searchCategoryEl.addEventListener("click", searchByCategory);

// update

setInterval(() => {
  let updateEl = document.querySelectorAll(".Update");
  let title = document.querySelector(".title");
  let price = document.querySelector(".pricee");
  let taxes = document.querySelector(".taxes");
  let ads = document.querySelector(".ads");
  let discount = document.querySelector(".discount");
  let count = document.querySelector(".count");
  let category = document.querySelector(".category");
  let createEl = document.querySelector(".create");
  let updateButton = document.querySelector(".update");
  updateEl.forEach((e) =>
    e.addEventListener("click", () => {
      for (let i = 0; i < local.length; i++) {
        if (local[i].id == e.parentElement.parentElement.id) {
          count.style.visibility = "hidden";
          createEl.style.display = "none";
          updateButton.style.display = "block";
          title.value = local[i].title;
          price.value = local[i].price;
          taxes.value = local[i].taxes;
          ads.value = local[i].ads;
          discount.value = local[i].discount;
          category.value = local[i].category;
        }
      }

      updateButton.onclick = () => {
        let obj = {
          title: document.querySelector(".title").value,
          price: document.querySelector(".pricee").value,
          taxes: document.querySelector(".taxes").value,
          ads: document.querySelector(".ads").value,
          discount: document.querySelector(".discount").value,
        };
        obj.total = total(obj.price, obj.taxes, obj.ads, obj.discount);
        obj.category = document.querySelector(".category").value;
        let values = ["", ...Object.values(obj)];
        for (let i = 1; i < 8; i++) {
          e.parentElement.parentElement.children[i].innerHTML = values[i];
        }
        createEl.style.display = "block";
        updateButton.style.display = "none";
        count.style.visibility = "visible";
        title.value = "";
        price.value = "";
        taxes.value = "";
        ads.value = "";
        discount.value = "";
        category.value = "";
        for (let i = 0; i < local.length; i++) {
          if (local[i].id == e.parentElement.parentElement.id) {
            local[i] = { ...obj, id: e.parentElement.parentElement.id };
            console.log(i);
          }
        }
        localStorage.setItem("values", JSON.stringify(local));
      };
    })
  );
});
