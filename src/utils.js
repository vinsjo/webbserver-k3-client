/**
 * Based in replaceItemAtIndex in Recoil documentation:
 * https://recoiljs.org/docs/basic-tutorial/atoms/
 *
 * @param {Array} arr
 * @param {Number} index
 * @param {*} value
 */
const replaceAtIndex = (arr, index, value) => {
	if (!Array.isArray(arr) || index < 0 || index >= arr.length) {
		return arr;
	}
	return [...arr.slice(0, index), value, ...arr.slice(index + 1)];
};

export { replaceAtIndex };
