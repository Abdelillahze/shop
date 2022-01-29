let id = 1;
let createEl = document.querySelector(".create");
let values = JSON.parse(localStorage.getItem("values"));

function readElement() {
  let price = document.querySelector(".pricee").value;
  let taxes = document.querySelector(".taxes").value;
  let ads = document.querySelector(".ads").value;
  let discount = document.querySelector(".discount").value;
  let title = document.querySelector(".title").value;
  let count = document.querySelector(".count").value;
  let category = document.querySelector(".category").value;
  let table = document.querySelector("table");
  let inputs = document.querySelectorAll("form input");

  if (count == "") {
    count = 1;
  }
  for (let i = 0; i < count; i++) {
    table.appendChild(createTr(title, [price, taxes, ads, discount], category));
    values.push({
      title: title,
      price: price,
      taxes: taxes,
      ads: ads,
      discount: discount,
      category: category,
    });
  }

  inputs.forEach((e) => (e.value = ""));
}

function total(price, taxes, ads, discount) {
  let total = Number(price) + Number(taxes) + Number(ads);
  if (discount) {
    total -= discount;
  }
  return total;
}

function createTd(text) {
  let td = document.createElement("td");
  let txt = document.createTextNode(text);
  td.appendChild(txt);
  return td.cloneNode(true);
}

function createTr(title, [price, taxes, ads, discount], category) {
  let tr = document.createElement("tr");

  tr.appendChild(createTd(id));
  tr.appendChild(createTd(title));
  tr.appendChild(createTd(price));
  tr.appendChild(createTd(taxes));
  tr.appendChild(createTd(ads));
  tr.appendChild(createTd(discount || 0));
  tr.appendChild(createTd(total(price, taxes, ads, discount)));
  tr.appendChild(createTd(category));
  tr.appendChild(udEl("Update"));
  tr.appendChild(udEl("Delete"));

  id++;
  return tr.cloneNode(true);
}

function udEl(t) {
  let td = document.createElement("td");
  let span = document.createElement("span");
  let text = document.createTextNode(t);
  span.appendChild(text);
  td.appendChild(span);
  if (t == "Delete") {
    span.classList.add("delete");
  } else {
    span.classList.add("update");
  }
  return td.cloneNode(true);
}

createEl.addEventListener("click", readElement);

function readTotal() {
  let price = document.querySelector(".pricee").value;
  let taxes = document.querySelector(".taxes").value;
  let ads = document.querySelector(".ads").value;
  let discount = document.querySelector(".discount").value;
  let totall = document.querySelector(".total");
  if (price && taxes && ads) {
    totall.innerHTML = `total: ${total(price, taxes, ads, discount)}`;
  }
}

setInterval(readTotal);

// read

function read() {
  let table = document.querySelector("table");
  for (let i = 0; i < values.length; i++) {
    table.appendChild(
      createTr(
        values[i].title,
        [values[i].price, values[i].taxes, values[i].ads, values[i].discount],
        values[i].category
      )
    );
  }
}

read();

let deleteAll = document.querySelector(".delete-all");

setInterval(() => {
  deleteAll.innerHTML = `Delete all (${
    document.querySelectorAll("tr").length - 1
  })`;
  localStorage.setItem("values", JSON.stringify(values));
});

// delete

let deleteEl = document.querySelectorAll(".delete");

deleteEl.forEach((e) =>
  e.addEventListener("click", () => {
    e.parentElement.parentElement.remove();
    for (let i = 0; i < values.length; i++) {
      if (
        values[i].title == e.parentElement.parentElement.childNodes[1].innerHTML
      ) {
        values.splice(i, 1);
      }
    }
  })
);
