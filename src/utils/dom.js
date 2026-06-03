const generateGameboardCells = () => {
	const boardPositions = Array.from({ length: 100 }, (_, i) => i);

	const html = `
	${boardPositions
		.map((pos) => {
			return ` <div class="cell" data-position="${String(pos).padStart(2, "0")}"></div>`;
		})
		.join("")}
	`;

	return html;
};

export { generateGameboardCells };
