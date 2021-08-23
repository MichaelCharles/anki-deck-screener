import library from './index'

const STORAGE_SLUG = 'anki-deck-screener-001-'

const get = key => {
	library.log('storage.get', key)
	if (!key) return undefined
	const data = localStorage.getItem(`${STORAGE_SLUG}${key}`)
	return JSON.parse(data)
}

const set = (key, val = '') => {
	library.log('storage.set', {
		key,
		val,
	})
	if (!key) return undefined
	localStorage.setItem(`${STORAGE_SLUG}${key}`, JSON.stringify(val))
}

const remove = key => {
	library.log('storage.remove', {
		key,
	})
	if (!key) return undefined
	localStorage.removeItem(`${STORAGE_SLUG}${key}`)
}

const storage = {
	set,
	get,
	remove,
}

export default storage;
