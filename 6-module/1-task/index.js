/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      },ы
 *
 * @constructor
 */
export default class UserTable {
  constructor(rows) {
    this.elem = document.createElement('table');
    let tbodyTmplt = '';
    for (let rowObj of rows) {
      tbodyTmplt += `<tr><td>${rowObj.name}</td><td>${rowObj.age}</td><td>${rowObj.salary}</td><td>${rowObj.city}</td><td><button>X</button></td></tr>`
    }
    this.elem.insertAdjacentHTML('afterbegin', `<thead><tr><th>Имя</th><th>Возраст</th><th>Зарплата</th><th>Город</th><th></th></tr></thead><tbody>${tbodyTmplt}</tbody>`);
    this.elem.onclick = function(event) {
      let target = event.target;
      
      if (target.tagName === 'BUTTON') {
        target.closest('tr').remove();
      }
    }
  }
}
