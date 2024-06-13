/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if (size === 0) {
    return '';
  }

  if (size === undefined || string === undefined) {
    return string;
  }

  let text = string.length ? string[0] : '';
  let count = 1;

  for (let i = 1; i < string.length; i++) {
    if (text[text.length - 1] === string[i]) {
      if (size > count) {
        text += string[i];
        count += 1;
      } else {
        count = 1;
      }
    } else {
      text += string[i];
      count = 1;
    }
  }

  return text;
}
