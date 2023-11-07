function MyFirstBlock({ style, className, attributes, children, ...props }) {
    const styles = {
      ...style,
    };
    const cssClassName = 'create-block-my-first-block';
	return (
		<div
			style={styles}
			className={cssClassName}
			dangerouslySetInnerHTML={{ __html: attributes.message }}
		/>
	);
}

MyFirstBlock.config = {
	name: "MyFirstBlock",
	editorFields: {
		bg_color: {
			location: "inspector",
			control: "color",
		},
		text_color: {
			location: "inspector",
			control: "color",
		},
	},
};

export default MyFirstBlock