# Omori Source
Source code of the game OMORI in the form of RPG Maker project.
This is for educational purposes only

---

# Changes Made

* Decrypted all files (obviously)
* Modified decrypt function to return input since files are already decrypted (see `GTP_CoreUpdates.js` and `rpg_managers.js` for .js files)
* Added `Dev.js` in plugins to automatically open devtools on startup
* Enabled window resizing
* Does not require to be launched from steam anymore

Some additional infos :
| encryped format | decrypted format |
| --- | --- |
| .OMORI | .js |
| .KEL | .json |
| .HERO | .yaml |
| .AUBREY |.json |
| .PLUTO |.yaml |

As of OMORI v1.0.8, files are encrypted with aes-256-ctr algorithm and the key being `6bdb2e585882fbd48826ef9cffd4c511`. Files encrypted by rpg maker with .rpgmvp format have a MD5 hash for the key which is `a7d70260aaebbce74bbbff3194f2b316` resulting in the key `OMORI`

See `GTP_OmoriFixes.js` for file load and `GTP_CoreUpdates.js` for decrypt function among many other usefull stuff in them related to game functions

---

# Known Issues

* Compiled game does not work beyond menu screen
* Scrollbars in both directions appear in game window
* Menu elements are a little bit offset
* Saving and loading may not work because of the change made to decrypt function since it seems they are encrypted too

---

## Feel free to contribute to the project if you made changes
