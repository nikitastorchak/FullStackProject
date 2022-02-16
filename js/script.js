
let allPlaces = [];
const textboxHowMuch = '';
const serverAdress = 'http://localhost:8000';
let today = new Date();

today = String(today.getDate()).padStart(2, '0') + '.' + String(today.getMonth() + 1).padStart(2, '0') + '.' + today.getFullYear();
window.onload = () => {
  render();
}
const render = async () => {
  const resp = await fetch(`${serverAdress}/show`, {
    method: 'GET'
  });
  const result = await resp.json();
  allPlaces = result;
  let summAll = 0;
  const wrap = document.getElementById('wrap');
  const information = document.getElementById('information');
  wrap.appendChild(information);
  while(information.firstChild){
    information.removeChild(information.firstChild);
  }
  const summ = document.createElement('p');
  summ.className = 'summ';
  information.appendChild(summ);
  allPlaces.map( (item, index) => {
    summAll += Number(allPlaces[index].price);
    const content = document.createElement('div');
    content.id = 'content';
    content.className = 'content';
    information.appendChild(content);
    const place = document.createElement('p');
    place.className = 'place';
    const date = document.createElement('p');
    date.className = 'date';
    date.id = 'date';
    const price = document.createElement('p');
    price.className = 'price';
    const edit = document.createElement('i');
    edit.className = 'fa-solid fa-pen edit';
    edit.onclick = () => {
      content.removeChild(place);
      content.removeChild(date);
      content.removeChild(price);
      content.removeChild(del);
      content.removeChild(edit);
      editButtonClick(content, index, item);
    }
    const del = document.createElement('i');
    del.className = 'fa-solid fa-trash del';
    del.onclick = () => {
      animAdding(content);
      setTimeout(deleteButtonClick, 350, item._id);
    }
    content.appendChild(place);
    content.appendChild(date);
    content.appendChild(price);
    content.appendChild(edit);
    content.appendChild(del);
    place.innerText = index + 1 + ') ' + 'Магазин ' + '"' + item.place + '"';
    date.innerText = item.date;
    price.innerText = item.price + ' ' + 'р.';
  })
  summ.innerText = 'Итого: ' + summAll + ' р.';
}
const clickAddButton = async () => {
  const inputPlace = document.getElementById('place');
  const inputPrice = document.getElementById('price');
  if(inputPlace.value !== '' && inputPrice.value !== '') {
    const resp = await fetch(`${serverAdress}/add?place=${inputPlace.value}&date=${today}&price=${inputPrice.value}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Origin': '*'
      }
    });
    
    inputPlace.value = '';
    inputPrice.value = '';
    render();
  };
}
const deleteButtonClick = async (index) => {
  allPlaces.splice(index, 1);
  const resp = await fetch(`${serverAdress}/delete?_id=${index}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json;charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    }
  });
  render();
}
const animAdding = (content) => {
  content.className = 'content anim';
}
const editButtonClick = (content, index, item) => {
  const editPlace = document.createElement('input');
  editPlace.className = 'editPlace';
  const editDate = document.createElement('input');
  editDate.type = 'date'
  editDate.className = 'editDate';
  const editPrice = document.createElement('input');
  editPrice.className = 'editPrice';
  const editApply = document.createElement('i');
  editApply.className = 'fa-solid fa-check editApply';
  editPlace.value = allPlaces[index].place;
  editDate.value = allPlaces[index].date;
  editPrice.value = allPlaces[index].price;
  content.appendChild(editPlace);
  content.appendChild(editDate);
  content.appendChild(editPrice);
  content.appendChild(editApply);
  editApply.onclick = async () => {
    allPlaces[index].place = editPlace.value;
    allPlaces[index].date = editDate.value;
    allPlaces[index].price = editPrice.value;
    localStorage.setItem('list', JSON.stringify(allPlaces));
    const resp = await fetch(`${serverAdress}/update?_id=${item._id}&place=${editPlace.value}&date=${editDate.value}&price=${editPrice.value}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Origin': '*'
      }
    });
    render();
  }
}

