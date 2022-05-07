// variabila de status
let state = {
  list: [],
  idxEdit: null,
  varClass: [],
  sortDirection: 1,
};

// functia de adaugare contacte
function addItem(event) {
  event.preventDefault();
  let nume = document.querySelector('[name="nume"]').value.trim();
  let varClass = ["fontSize"];
  if (nume.length === 0) {
    return;
  } else {
    if (state.idxEdit === null) {
      state.list.push({
        nume: nume,
        varClass: varClass,
      });
    } else {
      varClass = state.list[state.idxEdit] = {
        nume: nume,
        varClass: varClass,
      };
    }
  }

  document.querySelector('[name="nume"]').value = null;
  draw();
}

// functia de desenare a tabelului
function draw() {
  let table = document.querySelector("#idTable tbody");
  let str = "";
  if (state.list.length > 0) {
    document.querySelector("#idTable").classList.remove("showTableHead");
    for (let idx = 0; idx < state.list.length; idx++) {
      let elem = state.list[idx];
      str += `<tr>
          <td style="width: 50em;" id="idItem" title="itemTitle" class= "${elem.varClass}">${elem.nume}</td>
          <td style="width: 50em;" class=""> <button onclick="itemHasBuyed(${idx})" class="buttonBuyed ">Mark as buyed</button></td>
        </tr>`;
      table.innerHTML = str;
    }
    varClass = document.querySelector("#idItem").classList;
  } else {
    document.querySelector("#idTable").classList.add("showTableHead");
    return;
  }
}
// functia de editare
function itemHasBuyed(idx) {
  let elem = state.list[idx];
  elem.varClass = document.querySelector("#idItem").classList;
  varClass.add("itemBuyed");
  draw();
}

// functia de stergere cu confirmare intotdeauna
function deleteContact(idx) {
  if (
    confirm(`Esti sigur ca vrei sa stergi contactul "${state.list[idx].nume}"?`)
  ) {
    state.list.splice(idx, 1);
    draw();
  }
}

//functia de sortare
function sortTitle(column) {
  state.list.sort(function (a, b) {
    let numeA = a.nume;
    let numeB = b.nume;
    numeA = numeA.toLowerCase();
    numeB = numeB.toLowerCase();
    if (numeA > numeB) {
      return 1 * state.sortDirection;
    } else if (numeA < numeB) {
      return -1 * state.sortDirection;
    } else return 0;
  });
  draw();
}

//functia de sortare descendent
function sortDesc(column) {
  state.sortDirection = -1;
  sortTitle();
}
//functia de sortare ascendent
function sortAsc(column) {
  state.sortDirection = 1;
  sortTitle();
}
