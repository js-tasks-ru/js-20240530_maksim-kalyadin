/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  const massSplit = path.split('.');

  return function (obj) {
    let result = {...obj};

    massSplit.forEach(value => {
      if (result?.hasOwnProperty(value)) {
        result = result[value];
      } else {
        result = undefined;
      }
    });
    return result;
  };
}
