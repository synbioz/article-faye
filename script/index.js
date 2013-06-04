;(function () {
  var client = new Faye.Client('/faye'),
      ui = {}

  ui.messageList  = document.getElementById('message-list')
  ui.chatForm     = document.forms['chat-form']
  ui.nickField    = document.getElementById('nick')
  ui.messageField = document.getElementById('message')

  function addMessage(message) {
    var dt = document.createElement('dt'),
        dd = document.createElement('dd'),
        frag = document.createDocumentFragment()

    dt.textContent = message.nick
    dd.textContent = message.message

    frag.appendChild(dt)
    frag.appendChild(dd)

    ui.messageList.appendChild(frag)
  }

  client.subscribe('/chat', function(message) {
    addMessage(message)

  })

  ui.chatForm.addEventListener('submit', function(event) {
    client.publish('/chat', {
      nick: ui.nickField.value,
      message: ui.messageField.value
    })

    ui.messageField.value = ""
    ui.messageField.focus()

    event.preventDefault()
  }, true)
})(window);
