function filterGutenbergClasses(classes) {
	if (typeof classes === "string") {
		classes = classes.split(" ");
	}
	// gutnbrg clasx
	const gutenbergClasses = [
		"wp-block",
		"alignwide",
		"alignfull",
		"alignleft",
		"alignright",
		"aligncenter",
		"has-text-align-left",
		"has-text-align-center",
		"has-text-align-right",
		"has-text-align-justify",
		"wp-block-columns",
		"wp-block-column",
		"wp-block-button",
		"wp-block-button__link",
		"is-style-fill",
		"is-style-outline",
		"is-style-squared",
		"wp-block-image",
		"size-full",
		"size-large",
		"size-medium",
		"size-thumbnail",
		"wp-block-cover",
		"wp-block-cover-image",
		"has-background-dim",
		"has-drop-cap",
		"has-background",
		"has-text-color",
		"wp-block-heading",
		"wp-block-list",
		"is-style-default",
		"is-style-checked",
		"wp-block-quote",
		"is-style-large",
		"wp-block-table",
		"is-style-regular",
		"is-style-stripes",
		"wp-block-separator",
		"is-style-wide",
		"is-style-dots",
		"wp-block-group",
		"wp-block-media-text",
		"has-media-on-the-right",
		"wp-block-embed",
		"is-type-video",
		"is-type-rich",
		"is-type-audio",
		"wp-block-social-links",
		"is-style-logos-only",
		"has-small-spacing",
		"has-medium-spacing",
		"has-large-spacing",
		"is-layout-flex",
		"is-layout-grid",
		"is-content-justification-left",
		"is-content-justification-center",
		"is-content-justification-right",
		"is-content-justification-space-between",
		"is-selected",
		"is-focused",
		"is-vertically-aligned-top",
		"is-vertically-aligned-center",
		"is-vertically-aligned-bottom",
		"is-style-rounded",
		"has-parallax",
		"has-custom-content-position",
		"is-position-top-left",
		"is-position-top-center",
		"is-position-top-right",
		"is-position-center-left",
		"is-position-center-center",
		"is-position-center-right",
		"is-position-bottom-left",
		"is-position-bottom-center",
		"is-position-bottom-right",
	];
	// regx for gutenberg clasex
	const patterns = [/^has-.*-color$/, /^has-.*-background-color$/, /^has-.*-font-size$/, /^is-style-.*$/, /^wp-block-.*$/, /^is-.*$/, /^wp-image-.*$/];
	const filteredClasses = classes.filter((className) => {
		if (gutenbergClasses.includes(className)) {
			return false;
		}
		return !patterns.some((pattern) => pattern.test(className));
	});
	return filteredClasses.join(" ");
}
module.exports = filterGutenbergClasses;
