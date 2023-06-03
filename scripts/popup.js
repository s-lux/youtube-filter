const storageItems = ["enableAll", "whitelistedChannels"];

window.onload = function () {
	let checkbox = document.getElementById("enableAll");
	checkbox.disabled = true;
	checkbox.checked = true;
	checkbox.addEventListener("change", e => {
		browser.storage.sync.get(storageItems)
		.then(storage => {
			storage.enableAll = e.target.checked === true;

			browser.storage.sync.set(storage)
				.catch(error => console.error(error));
		})
		.catch(error => console.error(error));

		switchEnabled();
	});

	let optionsButton = document.getElementById("optionsButton");
	optionsButton.addEventListener("click", () => {
		browser.runtime.sendMessage("openOptions");
	});

	// Get localized texts
	document.getElementById("titleText").innerText = browser.i18n.getMessage("extensionName");
	document.getElementById("optionsButtonLabel").innerText = browser.i18n.getMessage("popupOptions");
	document.getElementById("shortsFiltering").innerText = browser.i18n.getMessage("shortsFiltering");

	browser.storage.sync.get(storageItems)
		.then(storage => {
			if (storage.enableAll !== undefined &&
				storage.enableAll !== null &&
				storage.enableAll !== true
			) {
				checkbox.checked = false;
			}
			checkbox.disabled = false;

			switchEnabled();
		})
		.catch(error => console.error(error));
};

function switchEnabled() {
	let checkbox = document.getElementById('enableAll');
	let text = document.getElementById('enableAllText');

	if (checkbox.checked === true)
		text.innerText = browser.i18n.getMessage("popupEnabled");
	else
		text.innerText = browser.i18n.getMessage("popupDisabled");
}
