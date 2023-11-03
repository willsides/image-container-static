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
	Toolbar,
	ToolbarDropdownMenu,
	ToolbarItem, 
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
    more,
    arrowLeft,
    arrowRight,
    arrowUp,
	trash,
    arrowDown,
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
		blockWidth,
		blockWidthUnit,
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
							setAttributes({ imageUrl: null })
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
								<MenuItem onClick={() => setAttributes({ aspectRatio: null })}>
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
					<ToolbarDropdownMenu
						icon={ resizeCornerNE }
						label="Select a direction"
						popoverProps={{className:'willsides-sizecontrol-popover'}}>
							 { ( { isOpen, onToggle, onClose } ) => (
							<>
								<span>Height</span>
								<div className='willsides-popover-flexrow'>
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
									<div className='willsides-button'>
										<Button
											isSmall
											onClick={() => setAttributes({ blockHeight: null })}
										>
											Unset
										</Button>
									</div>
								</div>
								<span>Width</span>
								<div className='willsides-popover-flexrow'>
									<div className='willsides-range'>
										<RangeControl
											value={blockWidth}
											onChange={(value) =>
												setAttributes({
													blockWidth: parseInt(value, 10),
												})
											}
											min={1}
											max={1000}
										/>
									</div>
									<div className='willsides-select'>
										<SelectControl
											value={blockWidthUnit}
											options={[
												{ label: 'px', value: 'px' },
												{ label: 'vh', value: 'vh' },
												{ label: 'em', value: 'em' },
												{ label: 'rem', value: 'rem' },
												{ label: '%', value: '%' },
											]}
											onChange={(value) =>
												setAttributes({
													blockWidthUnit: value,
												})
											}
										/>
									</div>
									<div className='willsides-button'>
										<Button
											isSmall
											onClick={() => setAttributes({ blockWidth: null })}
										>
											Unset
										</Button>
									</div>
								</div>
							</>
						) }
					</ToolbarDropdownMenu>
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
					className='willsides-overlay'
				>
					<InnerBlocks
					orientation="vertical"
					template={TEMPLATE}
					/>
				</a>
				) : (
				<div 
					className='willsides-overlay'
					style={{ justifyContent: `${flexJustify}`}}
				>
					<InnerBlocks
						orientation="vertical"
						template={TEMPLATE}
					/>
				</div>
				)}
		</div>
	);
}
