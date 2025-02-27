/* the first selector is required for youtrack-5 and the second for youtrack-6 */
clockifyButton.render(
	'.fsi-toolbar-content:not(.clockify), .toolbar_fsi:not(.clockify)',
	{ observe: true },
	function (elem) {
		let description;
		const numElem = $('a.issueId');
		const titleElem = $('.issue-summary');

		const projectElem = $(
			'.fsi-properties a[title^="Project"], .fsi-properties .disabled.bold'
		);

		description = titleElem.textContent;
		description =
			numElem.firstChild.textContent.trim() + ' ' + description.trim();

		const link = clockifyButton.createButton(
			description,
			projectElem.textContent
		);
		elem.insertBefore(link, titleElem);
	}
);

/* new view for single issues — obligatory since YouTrack 2018.3 */
clockifyButton.render(
	'.yt-issue-view:not(.clockify)',
	{ observe: true },
	function (elem) {
		const issueId = elem.querySelector('.js-issue-id').textContent;
		const link = clockifyButton.createButton(
			issueId + ' ' + $('h1').textContent.trim(),
			issueId.split('-')[0]
		);
		const toolbar = $('.yt-issue-toolbar');
		link.style.paddingLeft = '20px';
		elem.style.display = 'flex';
		toolbar.appendChild(link);
	}
);

// lite view for single issues
// $('h1[data-test="ticket-summary"]')
clockifyButton.render(
	'div[data-test="issue-container"] summary > h1:not(.clockify)',
	{ observe: true },
	function (elem) {
		const summary = () => {
			return $('div[data-test="issue-container"] summary > h1');
		};

		const issueId = () => {
			return $('div[data-test="issue-container"] a[data-test="ring-link"]')
				.textContent;
		};

		const desc = () => {
			return issueId() + ' ' + summary().textContent.trim();
		};
		const link = clockifyButton.createButton(desc, issueId().split('-')[0]);
		link.style.paddingLeft = '15px';
		elem.parentElement.appendChild(link);
	}
);

// Agile board
clockifyButton.render(
	'.yt-agile-card:not(.clockify)',
	{ observe: true },
	function (elem) {
		const container = $('.yt-agile-card__summary', elem);
		const projectName = $('.yt-issue-id').textContent.split('-');

		const description = function () {
			const text = $('.yt-agile-card__summary span', elem).textContent;
			const id = $('.yt-agile-card__summary a', elem).textContent;
			return (id ? id + ' ' : '') + (text ? text.trim() : '');
		};

		if (projectName.length > 1) {
			projectName.pop();
		}

		const link = clockifyButton.createButton(description, projectName.join(''));
		link.style.paddingLeft = '15px';
		container.appendChild(link);
	}
);
