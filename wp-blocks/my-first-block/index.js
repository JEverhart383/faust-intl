// index.js
import './style.scss';
// import block.json
import metadata from './block.json';

// import our React component
import MyFirstBlock from './MyFirstBlock';

import { registerFaustBlock } from '@faustwp/block-editor-utils';

// Register the React component in Gutenberg
registerFaustBlock(MyFirstBlock, {blockJson: metadata})