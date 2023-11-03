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
	} = attributes;
	return (
		<div { ...blockProps }style={{
			backgroundImage: `url(${imageUrl})`,
			backgroundAttachment: `${backgroundAttachment}`, 
			backgroundPosition: `${backgroundPosition}`,
			height: `${blockHeight}${blockHeightUnit}`,
			justifyContent: `${flexJustify}`,
			}} >
			<InnerBlocks.Content />
		</div>
	);
}

