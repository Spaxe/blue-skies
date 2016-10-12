var create_item_card = function (name, cat) {
  var comments = Math.round(Math.random() * 200);
  var day = Math.round(Math.random() * 30) + 1;
  var template =
          '<div class="card">' +
            '<div class="top">' +
              '<span class="float-left star">★</span>' +
              '<span class="float-right close">✖</span>' +
            '</div>' +
            '<div class="main">' +
              '<img class="picture" src="http://placekitten.com/250/150">' +
              '<div class="content">' +
                '<span class="subtitle">' + cat + '</span>' +
                '<span class="name">' + name + '</span>' +
              '</div>' +
            '</div>' +
            '<div class="bottom">' +
              '<span class="float-left comments">☰ ' + comments + ' comments</span>' +
              '<span class="float-right">ends ' + day + ' Oct 2016</span>' +
            '</div>' +
          '</div>';

  return template;
};

// entry point - main page
var our_picks = document.getElementById('our_picks');
var our_picks_list = [
  {
    name: 'Parkville Regeneration Project',
    cat: 'Planning',
  },
  {
    name: 'Australian Open Event Feedback Some Long Title Goes Here Trying To Break Content',
    cat: 'Event',
  },
  {
    name: 'Tram Closure Route 61',
    cat: 'Publications',
  },
  {
    name: 'Parkville Regeneration Project',
    cat: 'Planning',
  },
  {
    name: 'Australian Open Event Feedback',
    cat: 'Event',
  },
  {
    name: 'Tram Closure Route 61',
    cat: 'Publications',
  },
];
our_picks_list.forEach( function (item) {
  var container = document.createElement('div');
  container.className = 'card-container';

  var item = create_item_card(item.name, item.cat);
  container.innerHTML = item;

  our_picks.appendChild(container);
});

var interest_list = [
  "Development",
  "Cycling",
  "Community gardens",
  "Walking my dog",
];

var create_interest_card = function (name) {

  // Creating interest cards
  var card = document.createElement('div');
  card.className = 'interest';
  var flexbox = document.createElement('div');
  flexbox.className = 'flex-center';
  var text = document.createElement('span');
  text.textContent = name;
  flexbox.appendChild(text);
  card.appendChild(flexbox);

  // Selecting interests
  card.addEventListener('click', function (event) {
    card.classList.toggle('selected');
  });

  return card;
};

// entry point - onboarding
var onboard_interest = document.getElementById('onboard_interest_cards');
interest_list.forEach( function (interest) {
  var interest_card = create_interest_card(interest);
  onboard_interest.appendChild(interest_card);
});

var submit_onboard = function () {
  window.location = window.location.origin + '/index.html';
};
