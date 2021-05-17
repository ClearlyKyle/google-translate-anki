# Google Translate + Anki <3

[![Build Status](https://travis-ci.org/razum2um/google-translate-anki.svg?branch=master)](https://travis-ci.org/razum2um/google-translate-anki)

This chrome extension behaves *exactly* like google translate (2.0.7), in fact, it has been reverse engineered and patched.
Now it allows adding the found word to [Anki](https://apps.ankiweb.net/) *desktop* app.

## Setup

1) You must install [AnkiConnect](https://ankiweb.net/shared/info/2055492159) plugin to enable HTTP protocol.
2) The desktop app (afaik) cannot be daemonized, so it should be running while adding (extension doesn't cache anything).
3) Install unpacked extension
4) Setup the URL (default is `http://localhost:8765`), deck and model

![options-screenshot](https://raw.github.com/clearlykyle/google-translate-anki/master/options.png)

## Usage

Highlight a word or sentence you wish to be translated. The google translate icon should appear near the end. 
Click to translate the selected region. 
Just click on "Anki" button to send current transaltion to Anki.
The source will be saved as "Selected Text", the translation as "Translation" card's fields (configurable in the the options menu)
You can highlight a word in the selected transaltion for it be saved seperatly.

![bubble-screenshot](https://raw.github.com/clearlykyle/google-translate-anki/master/bubble.png)

Note, that adding the card takes ~3sec on my MBP, be patient :)

## Why not AnkiWeb?

Don't ask for adding cards right into AnkiWeb, [authors explicitly don't want it](https://anki.tenderapp.com/discussions/ankiweb/1886-issue-with-saving-cards-via-rest-api)
