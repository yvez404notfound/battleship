import inlineSVGMin from "inline-svg";

const convertAssetsToInlineSVG = function () {
	inlineSVGMin.init({
		svgSelector: "img.svg",
		initClass: "",
	});
};

export { convertAssetsToInlineSVG };
