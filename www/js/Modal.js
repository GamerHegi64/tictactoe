class Modal {

  constructor() {
    $('#modal').hide();
  }

  hide() {
    $('#modal').slideUp(200);
  }

  show() {
    $('#modal').slideDown(200);
  }

  setMessage(message) {
    $('#modal .message').text(message);
  }

  deleteMessage() {
    $('#modal .message').html('');
  }

  showMessage(message) {
    this.show();
    this.setMessage(message);
  }

  

}