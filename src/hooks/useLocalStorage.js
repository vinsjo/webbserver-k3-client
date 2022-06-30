import { getStorageItem, setStorageItem } from '../utils';
import { useState, useEffect } from 'react';

/**
 * @param {String} storageKey
 * @param {*} [initialValue]
 */
const useLocalStorage = (storageKey, initialValue = null) => {
	const [state, setState] = useState(
		() => getStorageItem(storageKey) || initialValue
	);

	useEffect(() => {
		setStorageItem(storageKey, state);
	}, [storageKey, state]);

	return [state, setState];
};

export default useLocalStorage;
