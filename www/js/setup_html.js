$(document).ready(function() {
  cross = $('<span class="cross icon"></span>').text('');
  $('.field').append(cross);

  circle = $('<span class="circle icon"></span>').text('');
  $('.field').append(circle);

  $('span.icon').hide();

  $('.custom-radio.box[data-group=player]').click(function(event) {
    target = event.target;
    while(!target.hasAttribute('data-group')) {
      target = target.parentElement;
    }
    player_radios = $('.custom-radio.box[data-group=player]');
    for (var i = 0; i < player_radios.length; i++) {
      player_radios[i].classList.remove('checked');
    }
    target.classList.add('checked');
  });

});