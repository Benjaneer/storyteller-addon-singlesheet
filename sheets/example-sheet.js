import { StorySheet } from '../../storyteller/sheets/story-sheet.js';

const bookSizeCorrection = 1
const bookWidth = 1390
const bookHeight = 937

/* I recommend inheriting from the StorySheet class, but if you know what you're doing, you can use anything. */
export class ExampleSheet extends StorySheet {
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            baseApplication: 'JournalSheet',
            /* One of the most important lines, here you can add classes that will apply to the entire Journal window. */
            classes: ["sheet", "story-sheet", "storyteller-addon-example"],
            /* This file contains the html markup code, in case you need a more complex design style. For example, without page turning. */
            template: 'modules/storyteller-addon-example/templates/example-sheet.html',
            width: getBookWidth(),
            height: getBookHeight(),
            resizable: false,
            closeOnSubmit: false,
            submitOnClose: true,
        });
    }
}

function getBookWidth() {
    let height = getBookHeight()
    return (bookWidth / bookHeight) * height
}

function getBookHeight() {
    let bookSize = game.settings.get('storyteller', 'size') / 100
    return window.innerHeight * bookSize * bookSizeCorrection
}