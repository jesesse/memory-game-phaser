import Phaser from 'phaser'

import Game from './Game'
import Preloader from './Preloader'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 800,
	height: 600,
	backgroundColor: '#FFFFFF',
	physics: {
		default: 'arcade',
		arcade: {
			debug: false,
			gravity: { y: 0 },
		},
		
	},
	
	scene: [Preloader, Game],
}

export default new Phaser.Game(config)
