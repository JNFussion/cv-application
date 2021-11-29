function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getSelectType(string) {
  return string.slice(string.search(/\./) + 1);
}

function fakeDeepCopy(original) {
  // ADD PROPER DEEP COPY IF ADDED FUNCTIONS OR COMPLEX VALUES (DATE/NaN) TO original
  return JSON.parse(JSON.stringify(original));
}

function getKeys(obj) {
  return Object.keys(obj).reduce((res, el) => {
    if (el === "id") {
      return res;
    }
    if (Array.isArray(obj[el])) {
      return res;
    } else if (typeof obj[el] === "object" && obj[el] !== null) {
      return [...res, ...getKeys(obj[el])];
    }
    return [...res, el];
  }, []);
}

export { capitalize, getSelectType, fakeDeepCopy, getKeys };
