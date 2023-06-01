import {SingleSheet} from "./sheets/single-sheet.js";
import {SingleSheetWorn} from "./sheets/single-sheet-worn.js";
import {SingleSheetRagged} from "./sheets/single-sheet-ragged.js";

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

Handlebars.registerHelper("offset", function(value)
{
    return parseInt(value) + 1;
});

Handlebars.registerHelper('getIdByIndex', function(array, index) {
    return array[index].id;
});
