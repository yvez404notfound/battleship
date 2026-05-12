import inlineSVGMin from "inline-svg";

const convertAssetsToInlineSVG = () => {
	inlineSVGMin.init({
		svgSelector: "img.svg",
		initClass: "",
	});
};

export { convertAssetsToInlineSVG };
