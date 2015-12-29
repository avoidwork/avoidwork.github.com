"use strict";

(function (requestAnimationFrame, haro, adapter) {
	var target = document.querySelector("section"),
		tpl = "<h3><a href='{{url}}'>{{name}} ({{stargazers_count}})</a></h3><p>{{description}}</p>",
		id = "github",
		render, store;

	render = requestAnimationFrame || function (fn) {
		setTimeout(fn, 16);
	};

	store = haro(null, {
		id: id,
		key: "name",
		index: ["fork"],
		versioning: false,
		adapters: {
			local: id
		}
	});

	// Registering localStorage adapter
	store.register("local", adapter);

	// Wiring data to UI
	store.onbatch = function () {
		var regex = /SurveyMonkey|website|\.com/,
			html = [],
			records = store.find({fork: false}, true).filter(function (i) {
				return !regex.test(i.name) && !regex.test(i.description);
			});

		keysort(records, "stargazers_count desc, name").forEach(function (i) {
			var ltpl = tpl.replace("{{name}}", i.name)
				.replace("{{stargazers_count}}", i.stargazers_count)
				.replace("{{description}}", i.description)
				.replace("{{url}}", i.homepage || i.html_url);

			html.push(ltpl);
		});

		render(function () {
			target.innerHTML = html.join("\n");
			console.info("Updated UI", records);
		});
	};

	// Loading from localStorage, and then updating over the wire
	store.load("local").then(function () {
		return store.setUri("https://api.github.com/users/avoidwork/repos?per_page=200", true);
	}).catch(function () {
		console.warn("Failed to process GitHub repositories.");
	});
})(requestAnimationFrame, haro, haroLocalStorage);
