export const exec = (command, value = null) => {
  document.execCommand(command, false, value)
}

export const state = command => {
  return document.queryCommandState(command)
}
