function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getSelectType(string) {
  return string.slice(string.search(/\./) + 1);
}

export { capitalize, getSelectType };
