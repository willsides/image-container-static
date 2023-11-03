import { 
	InnerBlocks, 
	useBlockProps, 
	MediaUpload, 
	BlockControls,
	__experimentalLinkControl as LinkControl,
} from '@wordpress/block-editor';
import { 
	ToolbarButton, 
	Button, 
	Dropdown,
	ToolbarGroup, 
	RangeControl, 
	SelectControl,
	MenuGroup, 
	MenuItem,
} from '@wordpress/components';
import './editor.scss';
import { 
	lock, 
	unlock,
	sidesLeft, 
	sidesAxial, 
	sidesRight, 
	sidesTop, 
	sidesBottom,
	chevronUp, 
	lineSolid,
	chevronDown,
	aspectRatio as aspectRatioIcon,
	resizeCornerNE,
} from '@wordpress/icons';

const TEMPLATE = [
    [
        'core/group', {"layout":{"type":"constrained"}},
        [
            ['core/post-title', {}]
        ]
    ]
];

import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const { 
		imageUrl, 
		blockHeight, 
		blockHeightUnit, 
		backgroundAttachment,
		flexJustify,
		backgroundPosition,
		page,
		aspectRatio,
	} = attributes;
	const blockProps = useBlockProps();

	function onSelectImage(media) {
		setAttributes({ imageUrl: media.url });
	}

	const toggleBackgroundAttachment = () => {
		const value = backgroundAttachment === 'fixed' ? 'scroll' : 'fixed';
		setAttributes({ backgroundAttachment: value });
	};

	const PositionIcon = () => {
		switch (backgroundPosition) {
			case 'left':
				return sidesLeft;
			case 'right':
				return sidesRight;
			case 'top':
				return sidesTop;
			case 'bottom':
				return sidesBottom;
			default:
				return sidesAxial;
		}
	};

	const FlexJustifyIcon = () => {
		switch (flexJustify) {
			case 'flex-start':
				return chevronUp;
			case 'flex-end':
				return chevronDown;
			default:
				return lineSolid;
		}
	};

	const handleLinkClick = (event) => {
		if (!event.ctrlKey) {
		  event.preventDefault();
		}
	};

	return (
		<div { ...blockProps } style={{
			backgroundImage:  imageUrl ? `url(${imageUrl})` : 'none',
			backgroundAttachment: `${backgroundAttachment}`, 
			backgroundPosition: `${backgroundPosition}`,
			height: blockHeight ? `${blockHeight}${blockHeightUnit}` : 'unset',
			aspectRatio: aspectRatio==='none' ? 'unset' : `${aspectRatio}`,
			justifyContent: `${flexJustify}`,
			}} >
			<BlockControls>
				<ToolbarGroup>
					<MediaUpload
						onSelect={onSelectImage}
						type="image"
						render={({ open }) => (
							<Button label="Select image" onClick={open}>Select Image</Button>
						)}
					/>
					<ToolbarButton
						icon="no-alt"
						label="Clear Image"
						onClick={() => (
							setAttributes({ imageUrl: '' })
						)}
						disabled={!attributes.imageUrl} 
					/>
				</ToolbarGroup>
				<ToolbarGroup>
					<Dropdown
						position="bottom right"
						renderToggle={({ onToggle, isOpen }) => (
							<ToolbarButton
								icon="admin-links"
								label="Link"
								onClick={onToggle}
								aria-expanded={isOpen}
							/>
						)}
						renderContent={() => (
							<div>
								<LinkControl
									searchInputPlaceholder="Search or enter URL..."
									value={page}
									onChange={(newPage) => {
										setAttributes({ page: null });
										setAttributes({ page: newPage });
									}}
									showInitialSuggestions={true}
									onRemove={() => {
										setAttributes({ page: null });
									}}
								/>
							</div>
						)}
					/>
				</ToolbarGroup>
				<ToolbarGroup>
					<Dropdown
						renderToggle={({ isOpen, onToggle }) => (
							<ToolbarButton
								icon={aspectRatioIcon}
								label="Aspect Ratio"
								onClick={onToggle}
								aria-expanded={isOpen}
							/>
						)}
						renderContent={() => (
							<MenuGroup label="Aspect Ratio">
								<MenuItem onClick={() => setAttributes({ aspectRatio: 'none' })}>
									Not set
								</MenuItem>
								<MenuItem onClick={() => setAttributes({ aspectRatio: '21/9' })}>
									21/9
								</MenuItem>
								<MenuItem onClick={() => setAttributes({ aspectRatio: '16/9' })}>
									16/9
								</MenuItem>
								<MenuItem onClick={() => setAttributes({ aspectRatio: '16/10' })}>
									16/10
								</MenuItem>
								<MenuItem onClick={() => setAttributes({ aspectRatio: '3/2' })}>
									3/2
								</MenuItem>
								<MenuItem onClick={() => setAttributes({ aspectRatio: '4/3' })}>
									4/3
								</MenuItem>
								<MenuItem onClick={() => setAttributes({ aspectRatio: '5/4' })}>
									5/4
								</MenuItem>
								<MenuItem onClick={() => setAttributes({ aspectRatio: '1/1' })}>
									1/1
								</MenuItem>
								<MenuItem onClick={() => setAttributes({ aspectRatio: '4/5' })}>
									4/5
								</MenuItem>
								<MenuItem onClick={() => setAttributes({ aspectRatio: '3/4' })}>
									3/4
								</MenuItem>
								<MenuItem onClick={() => setAttributes({ aspectRatio: '2/3' })}>
									2/3
								</MenuItem>
								<MenuItem onClick={() => setAttributes({ aspectRatio: '9/16' })}>
									9/16
								</MenuItem>
							</MenuGroup>
						)}
					/>
					<Dropdown
						renderToggle={({ isOpen, onToggle }) => (
							<ToolbarButton
								icon={<PositionIcon />}
								label="Background Position"
								onClick={onToggle}
								aria-expanded={isOpen}
							/>
						)}
						renderContent={() => (
							<MenuGroup label="Background Position">
								<MenuItem
									icon={sidesTop}
									onClick={() => setAttributes({ backgroundPosition: 'top' })}
								>
									Top
								</MenuItem>
								<MenuItem
									icon={sidesAxial}
									onClick={() => setAttributes({ backgroundPosition: 'center' })}
								>
									Center
								</MenuItem>
								<MenuItem
									icon={sidesBottom}
									onClick={() => setAttributes({ backgroundPosition: 'bottom' })}
								>
									Bottom
								</MenuItem>
								<MenuItem
									icon={sidesLeft}
									onClick={() => setAttributes({ backgroundPosition: 'left' })}
								>
									Left
								</MenuItem>
								<MenuItem
									icon={sidesRight}
									onClick={() => setAttributes({ backgroundPosition: 'right' })}
								>
									Right
								</MenuItem>
							</MenuGroup>
						)}
					/>
					<ToolbarButton
						icon={ backgroundAttachment === 'fixed' ? lock : unlock }
						label={ backgroundAttachment === 'fixed' ? 'Background Fixed' : 'Background Scroll' }
						onClick={ toggleBackgroundAttachment }
						className={ backgroundAttachment === 'fixed' ? 'is-pressed' : '' }
					/>
					<Dropdown
						className="willsides-heightcontrol-dropdown"
						contentClassName="willsides-heightcontrol-popover"
						renderToggle={({ isOpen, onToggle }) => (
							<ToolbarButton
								label="Height Settings"
								icon={resizeCornerNE}
								onClick={onToggle}
								aria-expanded={isOpen}
							/>
						)}
						renderContent={() => (
							<div className='willsides-flexrow'>
								<div className='willsides-range'>
									<RangeControl
										value={blockHeight}
										onChange={(value) =>
											setAttributes({
												blockHeight: parseInt(value, 10),
											})
										}
										min={1}
										max={1000}
									/>
								</div>
								<div className='willsides-select'>
									<SelectControl
										value={blockHeightUnit}
										options={[
											{ label: 'px', value: 'px' },
											{ label: 'vh', value: 'vh' },
											{ label: 'em', value: 'em' },
											{ label: 'rem', value: 'rem' },
											{ label: '%', value: '%' },
										]}
										onChange={(value) =>
											setAttributes({
												blockHeightUnit: value,
											})
										}
									/>
								</div>
							</div>
						)}
					/>
					<Dropdown
						renderToggle={({ isOpen, onToggle }) => (
							<ToolbarButton
								icon={<FlexJustifyIcon />}
								label="Vertical Alignment"
								onClick={onToggle}
								aria-expanded={isOpen}
							/>
						)}
						renderContent={() => (
							<MenuGroup label="Vertical Alignment">
								<MenuItem
									icon={chevronUp}
									onClick={() => setAttributes({ flexJustify: 'flex-start' })}
								>
									Top
								</MenuItem>
								<MenuItem
									icon={lineSolid}
									onClick={() => setAttributes({ flexJustify: 'center' })}
								>
									Middle
								</MenuItem>
								<MenuItem
									icon={chevronDown}
									onClick={() => setAttributes({ flexJustify: 'flex-end' })}
								>
									Bottom
								</MenuItem>
							</MenuGroup>
						)}
					/>
				</ToolbarGroup>
			</BlockControls>
			{page && page.url ? (
				<a 
					href={page.url} 
					style={{ justifyContent: `${flexJustify}`}}
					title={`Ctrl+Click to follow link`}
					onClick={handleLinkClick}
					target={ page.openInNewTab ? "_blank" : "_self" } 
					rel={ page.openInNewTab ? "noopener noreferrer" : "noopener" }
				>
					<InnerBlocks
					orientation="vertical"
					template={TEMPLATE}
					/>
				</a>
				) : (
				<InnerBlocks
					orientation="vertical"
					template={TEMPLATE}
				/>
				)}
		</div>
	);
}
