const form = document.getElementById('optForm');
const message = document.getElementById('message');
form.onsubmit = save;
load();
function reportWrap(s){
    message.textContent = s
}
function save(e) {
	e.preventDefault();
	let data = {};
	Array.from(form.elements).forEach( element => {
	if( element.type === 'submit' || element.type === 'button' ) return;
		data[element.id] = getValue(element); // only works for checkboxes obviously. 
	});
	let setSync = browser.storage.sync.set(data);
    setSync.then(report('settings saved'), reportWrap);

}
function load() {
	let data = {};
	Array.from(form.elements).forEach( element => {
		if( element.type === 'submit' || element.type === 'button' ) return;
		data[element.id] = true;
	})
	let getSync = browser.storage.sync.get(data);
    getSync.then(items => {
		console.log(items);
		Object.keys(items).forEach(key => setValue(form.elements[key], items[key]));
	});
}

function report(text, delay = 5000) {
	return function() {
		message.textContent = text;
		setTimeout(_ => message.textContent = '', delay);
	}
}
function setValue(element, value) {
	element[isCheckbox(element) ? 'checked' : 'value'] = value;
}
function getValue(element) {
	return element[isCheckbox(element) ? 'checked' : 'value'];
}

function isCheckbox(element) {
	return element.type.toLowerCase() === 'checkbox';
}
