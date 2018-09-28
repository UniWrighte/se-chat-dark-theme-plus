
function checkVersion() {
	const { version } = browser.runtime.getManifest();
	let getSync = browser.storage.sync.get({version});
	getSync.then(items => {
		if( items.version !== version ) {
		browser.storage.sync.set({version}, () => {
			browser.tabs.create({url: 'https://github.com/rlemon/se-chat-dark-theme-plus/blob/master/CHANGELOG.md'});
			});
		}
	}, console.log("error"))
}

checkVersion();