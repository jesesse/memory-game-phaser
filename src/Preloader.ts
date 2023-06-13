import Phaser from 'phaser'
import { SheetKeys } from './Keys'
import { AnimKeys } from './Keys'

export default class Preloader extends Phaser.Scene {

	constructor() {
		super('preloader')
	}

	preload() {
    this.load.spritesheet(SheetKeys.SokobanTilesheet, 'public/sokoban_tilesheet.png', {frameWidth: 64})
    this.load.spritesheet(SheetKeys.Animals, 'public/square_nodetailsOutline.png', {frameWidth: 136})
	}

	create() {

		this.anims.create({
			key: 'down-idle',
			frames: [{
				key: SheetKeys.SokobanTilesheet,
				frame: 52
			}]
		})

		this.anims.create({
			key: AnimKeys.WalkDown,
			frames: this.anims.generateFrameNumbers(SheetKeys.SokobanTilesheet, {start:52, end:54}),
			frameRate:10
		})

		this.anims.create({
			key: AnimKeys.WalkUp,
			frames: this.anims.generateFrameNumbers(SheetKeys.SokobanTilesheet, {start:55, end:57}),
			frameRate:10
		})

		this.anims.create({
			key: AnimKeys.WalkLeft,
			frames: this.anims.generateFrameNumbers(SheetKeys.SokobanTilesheet, {start:81, end:83}),
			frameRate:10,
		})

		this.anims.create({
			key: AnimKeys.WalkRight,
			frames: this.anims.generateFrameNumbers(SheetKeys.SokobanTilesheet, {start:78, end:80}),
			frameRate:10
		})

    this.scene.start('game')

		}

}
