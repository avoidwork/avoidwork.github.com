"use strict";

(function (requestAnimationFrame, keysort) {
	const target = document.querySelector("#target"),
		invalid = /SurveyMonkey|website|\.com/,
		render = requestAnimationFrame || function (fn) {
			setTimeout(fn, 16);
		};

	fetch("https://api.github.com/users/avoidwork/repos?per_page=200", {
		method: "GET",
		accept: "application/json",
		credentials: "omit"
	}).then(res => res.json()).then(data => {
		const records = keysort(data.filter(i => i.fork === false && invalid.test(i.name) === false && invalid.test(i.description) === false), "stargazers_count desc, name"),
			html = records.map(i => `
<div>
	<h3 class="is-title is-4">
		<a href="${i.html_url}" title="${i.name}">${i.name} (${i.stargazers_count})</a>
	</h3>
	<h4 class="is-subtitle is-5">
		${i.description}
	</h4>
</div>
`).join("\n");

		render(() => {
			target.innerHTML = html;
		});
	}).catch(err => console.warn(err.message));
}(requestAnimationFrame, keysort));
