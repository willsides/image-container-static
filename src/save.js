import { 
	InnerBlocks, 
	useBlockProps
 } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const blockProps = useBlockProps.save();
	const { 
		imageUrl, 
		blockHeight, 
		blockHeightUnit, 
		backgroundAttachment,
		flexJustify,
		backgroundPosition,
		page,
		aspectRatio,
		blockWidth,
		blockWidthUnit,
	} = attributes;
	return (
		<div { ...blockProps }
			style={(() => {
				const styles = {};

				if (imageUrl != null) {
					styles.backgroundImage = `url(${imageUrl})`;
					styles.backgroundAttachment = backgroundAttachment;
					styles.backgroundPosition = backgroundPosition;
				}

				if (blockHeight != null) {
					styles.height = `${blockHeight}${blockHeightUnit}`;
				}

				if (blockWidth != null) {
					styles.width = `${blockWidth}${blockWidthUnit}`;
				}
			
				if (aspectRatio != null) {
					styles.aspectRatio = aspectRatio;
				}
			
				return styles;
			})()} 
		>
			{page && page.url ? (
				<a 
					href={page.url} 
					style={{ justifyContent: `${flexJustify}`}}
					target={ page.openInNewTab ? "_blank" : "_self" } 
					rel={ page.openInNewTab ? "noopener noreferrer" : "noopener" }
					className='willsides-overlay'
				>
					<InnerBlocks.Content/>
				</a>
				) : (
				<div 
					className='willsides-overlay'
					style={{ justifyContent: `${flexJustify}`}}
				>
					<InnerBlocks.Content/>
				</div>
				)}
		</div>
	);
}

