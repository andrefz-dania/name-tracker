# CaraBace
<img width="1210" height="1026" alt="carabace_main" src="https://github.com/user-attachments/assets/4be03730-2dea-4ccb-af10-a10e6fb3c703" />

## About

Name is subject to change.

This is an Electron application made with Svelte and TypeScript. It is aimed at fantasy/scifi writers, tabletop gamemasters, and other similar creative worldbuilding. The goal is to create an application that lets you track and manage a large list of characters, while keeping everything local.

## Screenshots
<img width="300" height="255" alt="carabace_search" src="https://github.com/user-attachments/assets/4dc937e7-1058-4daf-a048-ebb75e77c4d7" />
<img width="300" height="255" alt="carabace_command" src="https://github.com/user-attachments/assets/e39a7566-2fc0-4eaa-9f22-5dafbd5931b7" />
<img width="300" height="255" alt="carabace_char" src="https://github.com/user-attachments/assets/80878dde-eec0-415a-88ed-4afc98423a71" />
<img width="300" height="255" alt="carabace_settings" src="https://github.com/user-attachments/assets/00224a15-d247-47ec-a670-073c12db1023" />

---

## Installation

### Windows
- Dowload the setup.exe installer and run it.
- Upon completion, you should now have a start menu shortcut to launch CaraBace

### Linux
**Debian-based**
- Download the .deb file from releases and install it.

**Fedora-based**
- Download the .rpm file from releases and install it.

**All distros**
- Download the AppImage file from releases
- make the AppImage executable
- Run the AppImage

### Mac (untested)
- Follow the development instructions and run the build command for your OS
- install the resulting .dmg package.

## Development Progress
### Implemented

**Core**
- Create, browse, edit and delete characters
- Store a description, age, occupation, location & more for each character
- add images to each character
- Import/export characters to JSON
- Run on Windows, Linux or Mac (untested)
- Hotkeys (see setting for full list)
- Command palette to quickly navigate, change settings, or perform actions

**Worlds**
- Create multiple worlds and switch between them
- Each world has its own characters and tags
- Edit world names and descriptions from settings

**Sorting**
- Search all characters
- Filter each column ascending or descending
- Persist search and sorting between screens
- character tagging and tag search
- pinned / favourited characters
- recently viewed characters

**UI**
- toggle list style
- dark & light themes
- toggle columns on/off
- Set the length of preview text in search results

---

### Planned

**Major**
- markdown text editing
- deep search through descriptions and more
- character relationships
- factions
- timeline / events for each character
- custom time system
- hotkey rebinding
- flathub package

**Minor**
- quickly swap character status from the search list
- persist scroll location
- Allow world switching inside command palette rather than navigating to worlds page

- Use arrow keys and Enter to select and activate worlds in worlds page.



### Known bugs
- Ending a tag search in the search bar by pressing Enter can occasionally navigate to a previously visited character
- Command palette does not scroll to highlighted result in command palette when using arrow keys and list is long enough to have a scrollbar
- Running both the dev and released build at the same time causes issues with saving to localStorage (settings / list of recently visited characters)

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
