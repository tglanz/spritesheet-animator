spritesheet animator
====================

### motivation

__experimintation__ of how to model the code. instead of doing the experiments in some compiled language, javascript is much more flexible to test out new ideas an models.

__animation construction__, we sometimes have some sprite sheet, but no vision of it's animation sequences, we can try those out

### targets

[x] harcoded definitions for animations and resources, the tool shouldn't previde some GUI for this, as of now

[x] GUI to display harcoded options of different spritesheets, and animations for each one

[x] display chosen spritesheet

[ ] display and animate chosen animation

[ ] export animation definition to some kind of format

### concepts

concept|definition|
-------|----------|
sprite|a (usually small) image|
spritesheet|a spread of multiple _sprites_
animation frame|(key, duration) tuple
animation|ordered collection of _animation frames_
animation player|a state machine which calculates the current frame's key

### models

- SpriteSheet
- AnimationFrame
- Animation
- AnimationPlayer


### abbreviations

abbreviation|full name|
------------|---------|
ss|spritesheet|

### disclaimer

no assets are by my own hand. all from open game art
