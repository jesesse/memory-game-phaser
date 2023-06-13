import Phaser from 'phaser'
import { AnimKeys, SheetKeys } from './Keys'

export default class Game extends Phaser.Scene {
	boxes!: Phaser.Physics.Arcade.StaticGroup
	cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
	player!: Phaser.Physics.Arcade.Sprite;

	constructor() {
		super('game')
	}

	private createLevel() {
		const { width, height } = this.scale
		this.boxes = this.physics.add.staticGroup()

		const boxWidth = 64;
		const boxHeight = 64;
		const alleyWidth = 100

		for (let x = 0; x < 3 * (boxWidth + alleyWidth); x = x + boxWidth + alleyWidth) {
			for (let y = 0; y < 3 * (boxHeight + alleyWidth); y = y + boxHeight + alleyWidth) {
				this.boxes.create(x, y, SheetKeys.SokobanTilesheet, 10)
			}
		}
		this.boxes.setOrigin(0, 0)
		this.boxes.incXY((width / 2 - (boxWidth + alleyWidth + (boxWidth / 2))), (height / 2 - (boxHeight + alleyWidth + boxHeight / 2)))

		this.boxes.children.iterate(child => {
			const body = child.body as Phaser.Physics.Arcade.Body
			body.updateFromGameObject();
			body.setSize(child.displayWidth, child.displayHeight - 15)
			body.setOffset(0,15)
		})
	}

	private createPlayer() {
		this.player = this.physics.add.sprite(0, 0, SheetKeys.SokobanTilesheet, 52).setOrigin(0, 0)
		this.player.body.setSize(this.player.displayWidth - 20, this.player.displayHeight - 10)
	}


	private handleMovement(){
		if (this.cursors.down.isDown) {
			this.player.anims.play(AnimKeys.WalkDown, true)
			this.player.setVelocity(0, 200)
		} else if (this.cursors.up.isDown) {
			this.player.anims.play(AnimKeys.WalkUp, true)
			this.player.setVelocity(0, -200)
		} else if (this.cursors.right.isDown) {
			this.player.anims.play(AnimKeys.WalkRight, true)
			this.player.setVelocity(200, 0)
		} else if (this.cursors.left.isDown) {
			this.player.anims.play(AnimKeys.WalkLeft, true)
			this.player.setVelocity(-200, 0)
		} else { 
			this.player.anims.stop(); 
			this.player.setVelocity(0,0) 
		}
	}




	create() {
		this.cursors = this.input.keyboard.createCursorKeys();
		
		this.createPlayer()
		this.createLevel()
		this.physics.world.addCollider(this.player, this.boxes)
	}

	update(time: number, delta: number): void {
		this.handleMovement();
	}
}
