
var createPostArea = document.querySelector('#create-post');

var sharedMomentsArea = document.querySelector('#shared-moments');

function clearCards() {
  while(sharedMomentsArea.hasChildNodes()) {
    sharedMomentsArea.removeChild(sharedMomentsArea.lastChild);
  }
}

function createCard(data) {
  var cardWrapper = document.createElement('div');
  cardWrapper.className = 'shared-moment-card col-md-8';
  var cardLink = document.createElement('a');
  cardLink.className = 'img-link';
  cardLink.href = 'detail.html?title=' + encodeURIComponent(data.title) + '&description=' + encodeURIComponent(data.description) + '&location=' + encodeURIComponent(data.location) + '&image=' + encodeURIComponent(data.image);
  var cardTitle = document.createElement('div');
  cardTitle.className = 'mdl-card__title';
cardTitle.style.backgroundImage = 'url(' + data.image + ')';
cardTitle.style.backgroundSize = 'cover';
cardTitle.style.backgroundPosition = 'center';
cardTitle.style.height = '350px'; 
  cardTitle.style.width = '1200px';
  cardLink.appendChild(cardTitle);
  var cardTitleTextElement = document.createElement('h2');
  cardTitleTextElement.style.color = 'white';
  cardTitleTextElement.className = 'mdl-card__title-text';
  cardTitleTextElement.textContent = data.title;
  cardTitle.appendChild(cardTitleTextElement);
  var cardSupportingText = document.createElement('div');
  cardSupportingText.className = 'mdl-card__supporting-text';
  cardSupportingText.textContent = data.location;
  cardSupportingText.style.textAlign = 'center';
  cardWrapper.appendChild(cardSupportingText);
  componentHandler.upgradeElement(cardWrapper);
  sharedMomentsArea.appendChild(cardLink);

  cardLink.addEventListener('click', function(event) {
    event.preventDefault(); 
    showDetailPage(data); 
  });
}
function showDetailPage(data) {
  window.location.href = 'detail.html?title=' + encodeURIComponent(data.title) + '&description=' + encodeURIComponent(data.description) + '&location=' + encodeURIComponent(data.location) + '&image=' + encodeURIComponent(data.image);
}


function updateUI(data) {
  clearCards();
  for (var i = 0; i < data.length; i++) {
    createCard(data[i]);
  }
}

var url = 'https://tes1pwa-2f8fc-default-rtdb.firebaseio.com/posts.json';
var networkDataReceived = false;

fetch(url)
  .then(function(res) {
    return res.json();
  })
  .then(function(data) {
    networkDataReceived = true;
    console.log('From web', data);
    var dataArray = [];
    for (var key in data) {
      dataArray.push(data[key]);
    }
    updateUI(dataArray);
    
  });
  
if ('indexedDB' in window) {
  readAllData('posts')
    .then(function(data) {
      if (!networkDataReceived) {
        console.log('From cache', data);
        updateUI(data);
      }
    });
}
