function Message (action, content) {
  this.action = action
  this.content = content
}

Message.prototype.toString = function () {
  return JSON.stringify({action: this.action, content: this.content})
}

Message.prototype.setAction = function (action) {
  this.action = action
}

Message.prototype.setContent = function (content) {
  this.content = content
}

var Action = {
  FILE_MODIFY: 0,
  FILE_DELETE: 1,
  FILE_ADD: 2,
  FILE_RENAME: 3,
  FILE_MOVE: 4
}

export {
  Message,
  Action
}

