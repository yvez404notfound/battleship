const generateGameboardCells = () => {
	const boardPositions = Array.from({ length: 100 }, (_, i) => i);

	const html = `
	${boardPositions
		.map((pos) => {
			return ` <div class="cell" data-position="${pos < 10 ? `0${pos}` : pos}"></div>`;
		})
		.join("")}
	`;

	return html;
};

export { generateGameboardCells };
