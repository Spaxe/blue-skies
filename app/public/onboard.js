// var interest_list = [
//   "Outdoors & Adventure",
//   "Tech",
//   "Family",
//   "Health & Wellness",
//   "Sports & Fitness",
//   "Learning",
//   "Photography",
//   "Food & Drink",
//   "Writing",
//   "Language & Culture",
//   "Music",
//   "Movements",
//   "LGBTQ",
//   "Film",
//   "Sci-Fi & Games",
//   "Beliefs",
//   "Arts",
//   "Book Clubs",
//   "Dance",
//   "Pets",
//   "Hobbies & Crafts",
//   "Fashion & Beauty",
//   "Social",
//   "Career & Business",
// ];

var interest_list = [
  "Development",
  "Cycling",
  "Community gardens",
  "Walking my dog",
  "School holiday",
  "Local events",
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
