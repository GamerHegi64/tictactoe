$(document).ready(function() {
  cross = $('<span class="cross icon"></span>').text('');
  $('.field').append(cross);

  circle = $('<span class="circle icon"></span>').text('');
  $('.field').append(circle);

  $('span.icon').hide();
});