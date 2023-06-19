import {SingleSheet} from "./sheets/single-sheet-clean.js";
import {SingleSheetWorn} from "./sheets/single-sheet-worn.js";
import {SingleSheetRagged} from "./sheets/single-sheet-ragged.js";

Hooks.on("init", () => {
    registerSettings()
//    game.StoryTeller = new StoryTeller()
//    game.StoryTeller.init()

//    console.log("Storyteller | Init");

//    if (game.settings.get('storyteller-addon-singlesheet', 'dontOpen')) {
//        disableImageOpen() //storyteller-addon-disableimageopen.css
//    }
});

Hooks.on("ready", () => {
    /* Use this method at hook "ready" to register your journal style. */
    game.StoryTeller.registerAddonSheet({
        /* Unique key, must not overlap with other keys. It is used to access the object. */
        key: "single",
        /* The class that implements the settings for the new journal. You don't need to create an instance, the class description itself is passed. */
        sheet: SingleSheet,
        /* Key-identifier of the string for translation. */
        label: "STORYTELLER_ADDON_SINGLE.SingleSheet"
    })
    /* Use this method at hook "ready" to register your journal style. */
    game.StoryTeller.registerAddonSheet({
        /* Unique key, must not overlap with other keys. It is used to access the object. */
        key: "worn",
        /* The class that implements the settings for the new journal. You don't need to create an instance, the class description itself is passed. */
        sheet: SingleSheetWorn,
        /* Key-identifier of the string for translation. */
        label: "STORYTELLER_ADDON_SINGLE.SingleSheetWorn"
    })
    /* Use this method at hook "ready" to register your journal style. */
    game.StoryTeller.registerAddonSheet({
        /* Unique key, must not overlap with other keys. It is used to access the object. */
        key: "ragged",
        /* The class that implements the settings for the new journal. You don't need to create an instance, the class description itself is passed. */
        sheet: SingleSheetRagged,
        /* Key-identifier of the string for translation. */
        label: "STORYTELLER_ADDON_SINGLE.SingleSheetRagged"
    })
    console.log("Storyteller addon singlesheet | Ready")
});

function registerSettings() {
//https://foundryvtt.com/api/v10/classes/client.ClientSettings.html#register
    game.settings.register('storyteller-addon-singlesheet', 'background', {
        name: game.i18n.localize('STORYTELLER_ADDON_SINGLE.Settings.ImageBackground'),
        hint: game.i18n.localize('STORYTELLER_ADDON_SINGLE.Settings.ImageBackgroundHint'),
        scope: "world",
        type: Boolean,
        default: true,
        config: true
    });

    game.settings.register('storyteller-addon-singlesheet', 'dontOpen', {
        name: game.i18n.localize('STORYTELLER_ADDON_SINGLE.Settings.DontOpenImages'),
        hint: game.i18n.localize('STORYTELLER_ADDON_SINGLE.Settings.DontOpenImagesHint'),
        scope: "world",
        type: Boolean,
        default: true,
        config: true
    });
}

Handlebars.registerHelper("offset", function(value)
{
    return parseInt(value) + 1;
});

Handlebars.registerHelper('getIdByIndex', function(array, index) {
    return array[index].id;
});

Handlebars.registerHelper('getDontOpen', function() {
    let addClass = "";
    if (game.settings.get('storyteller-addon-singlesheet', 'dontOpen')) {
        addClass = "dontopen";
    }
    return addClass;
});
