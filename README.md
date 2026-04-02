# CaraBace

Name is subject to change.

This is Electron application made with Svelte and TypeScript. It is aimed at fantasy/scifi writers, tabletop gamemasters, and other similar creative worldbuilding. The goal is to create an application that lets you track and manage a large list of characters, while keeping everything local.

This application is still in very early development, with only the basics implemented

# Installation

## Windows
Dowload the installer and run it. Upon completion, you should now have a start menu shortcut to launch CaraBace

## Linux
Native distribution is a work in progress
Follow the development instructions and run the build command for your OS - install the resulting package (untested)

## Mac
Native distribution is a work in progress
Follow the development instructions and run the build command for your OS - install the resulting package (untested)

# Development Progress
## Implemented

### Core
- Create characters
- Edit characters
- Delete characters
- Import/export characters to JSON
- Run on Windows, Linux or Mac (untested)
- Hotkeys (partial)

### Sorting
- Seach all characters
- Filter each column ascending or descending
- Persist search and sorting between screens

### UI
- toggle list style
- dark & light themes
- toggle columns on/off

## Planned
- markdown editing
- deep search
- favourites
- quickly swap character status from the search list
- persist scroll location
- add images to each character
- character tags
- pinned lists/tags
- factions
- character relationships
- timeline / events for each character
- custom time system
- multiple worlds
- distribution / installers
- flathub package


# Development Setup

### Install

```bash
$ npm install
```

### Development

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
