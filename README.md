# CaraBace

## About

Name is subject to change.

This is an Electron application made with Svelte and TypeScript. It is aimed at fantasy/scifi writers, tabletop gamemasters, and other similar creative worldbuilding. The goal is to create an application that lets you track and manage a large list of characters, while keeping everything local.

This application is still in very early development, with only the basics implemented

## Installation

### Windows
Dowload the installer and run it. Upon completion, you should now have a start menu shortcut to launch CaraBace

### Linux
**Debian-based**
Download the .deb file from releases and install it.

**All distros**
Download the AppImage from releases, make it executable, then run it.

### Mac (untested)
Follow the development instructions and run the build command for your OS - install the resulting .dmg package.

## Development Progress
### Implemented

**Core**
- Create characters
- Edit characters
- Delete characters
- Import/export characters to JSON
- Run on Windows, Linux or Mac (untested)
- Hotkeys (partial)
- add images to each character
- character tags and tag search

**Sorting**
- Seach all characters
- Filter each column ascending or descending
- Persist search and sorting between screens
- pinned / favourites
- recently viewed characters

**UI**
- toggle list style
- dark & light themes
- toggle columns on/off

### Planned
- markdown editing
- deep search
- quickly swap character status from the search list
- persist scroll location
- factions
- character relationships
- timeline / events for each character
- custom time system
- multiple worlds
- distribution / installers
- flathub package


## Development Setup

### Install dependencies

Download the repository and open a terminal in the folder.
Make sure you have Nodejs v20+ and npm installed.
Then run:

```bash
$ npm install
```

### Run in Development Mode

```bash
$ npm run dev
```

### Build

```bash
# For windows
$ npm run build:win

# For macOS
$ npm run build:mac

# For Linux
$ npm run build:linux
```
