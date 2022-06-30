import { isArr, isObj } from 'x-is-type';

/**
 * Based in replaceItemAtIndex in Recoil documentation:
 * https://recoiljs.org/docs/basic-tutorial/atoms/
 *
 * @param {Array} arr
 * @param {Number} index
 * @param {*} value
 */
const replaceAtIndex = (arr, index, value) => {
	if (!isArr(arr) || index < 0 || index >= arr.length) {
		return arr;
	}
	return [...arr.slice(0, index), value, ...arr.slice(index + 1)];
};

const json_encode = (data) => {
	try {
		return JSON.stringify(data);
	} catch (e) {
		return null;
	}
};
/**
 * @param {String} json
 */
const json_decode = (json) => {
	try {
		return JSON.parse(json);
	} catch (e) {
		return null;
	}
};

/**
 * @param {String} key
 */
const getStorageItem = (key) => {
	try {
		const data = localStorage.getItem(key);
		return !data ? null : json_decode(data) || data;
	} catch (e) {
		return null;
	}
};
/**
 * @param {String} key
 * @param {*} data
 */
const setStorageItem = (key, data) => {
	try {
		localStorage.setItem(
			key,
			isArr(data) || isObj(data) ? json_encode(data) : data
		);
		return true;
	} catch (e) {
		return false;
	}
};

export {
	replaceAtIndex,
	json_decode,
	json_encode,
	getStorageItem,
	setStorageItem,
};
