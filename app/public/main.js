var create_item_card = function (name, cat) {
  var template =
          '<div class="card">' +
            '<div class="top">' +
              '<span class="float-left">:star:</span>' +
              '<span class="float-right">:x:</span>' +
            '</div>' +
            '<div class="main">' +
              '<img class="picture" src="http://placekitten.com/250/150">' +
              '<div class="content">' +
                '<span class="subtitle">' + cat + '</span>' +
                '<span class="name">' + name + '</span>' +
              '</div>' +
            '</div>' +
            '<div class="bottom">' +
              '<span class="float-left">:comments:</span>' +
              '<span class="float-right">:end-date:</span>' +
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