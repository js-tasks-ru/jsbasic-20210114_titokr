/**
 * Генерация HTML списка друзей
 * @param {Object[]} friends
 * @return {HTMLUListElement}
 */
function makeFriendsList(friends) {
  // ваш код...
  let listFriends = document.createElement('ul');
  for (let friend of friends) {
    listFriends.innerHTML += `<li>${friend.firstName} ${friend.lastName}</li>`;
  }
  return listFriends;
}
