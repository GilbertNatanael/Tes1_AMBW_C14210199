document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM Loaded');
  
  // Function to extract query parameters from URL
  function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  // Function to populate detail page with card data
  function populateDetailPage(data) {
    console.log('Populating detail page');
    var titleElement = document.getElementById('detail-title');
    var descriptionElement = document.getElementById('detail-description');
    var locationElement = document.getElementById('detail-location');
    var imageElement = document.getElementById('detail-image');

    console.log(titleElement, descriptionElement, locationElement, imageElement);

    if (titleElement && descriptionElement && locationElement && imageElement) {
      titleElement.textContent = data.title;
      descriptionElement.textContent = data.description;
      locationElement.textContent = data.location;
      imageElement.src = data.image;
      imageElement.alt = data.title;
    } else {
      console.error('One or more elements not found');
    }
  }

  // Fetch data from URL parameters and populate detail page
  var title = getParameterByName('title');
  var description = getParameterByName('description');
  var location = getParameterByName('location');
  var image = getParameterByName('image');

  var cardData = {
    title: title,
    description: description,
    location: location,
    image: image
  };

  populateDetailPage(cardData);
});
