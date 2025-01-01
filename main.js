import {SingleSheetPristine} from "./sheets/single-sheet-pristine.js";
import {SingleSheetClean} from "./sheets/single-sheet-clean.js";
import {SingleSheetWorn} from "./sheets/single-sheet-worn.js";
import {SingleSheetRagged} from "./sheets/single-sheet-ragged.js";
import {SingleSheetCustom} from "./sheets/single-sheet-custom.js";
import {SingleSheetScrollV} from "./sheets/single-sheet-scroll-V.js";
import {SingleSheetScrollH} from "./sheets/single-sheet-scroll-H.js";
import {SingleSheetSlate} from "./sheets/single-sheet-slate.js";
import {SingleSheetParchment} from "./sheets/single-sheet-parchment.js";
import {SingleSheetPaper} from "./sheets/single-sheet-paper.js";
import {SingleSheetBound} from "./sheets/single-sheet-bound.js";

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
    game.StoryTeller.registerAddonSheet({
        key: "pristine",
        sheet: SingleSheetPristine,
        label: "STORYTELLER_ADDON_SINGLE.SingleSheetPristine"
    })
    /* Use this method at hook "ready" to register your journal style. */
    game.StoryTeller.registerAddonSheet({
        /* Unique key, must not overlap with other keys. It is used to access the object. */
        key: "clean",
        /* The class that implements the settings for the new journal. You don't need to create an instance, the class description itself is passed. */
        sheet: SingleSheetClean,
        /* Key-identifier of the string for translation. */
        label: "STORYTELLER_ADDON_SINGLE.SingleSheetClean"
    })
    game.StoryTeller.registerAddonSheet({
        key: "worn",
        sheet: SingleSheetWorn,
        label: "STORYTELLER_ADDON_SINGLE.SingleSheetWorn"
    })
    game.StoryTeller.registerAddonSheet({
        key: "ragged",
        sheet: SingleSheetRagged,
        label: "STORYTELLER_ADDON_SINGLE.SingleSheetRagged"
    })
    game.StoryTeller.registerAddonSheet({
        key: "customimage",
        sheet: SingleSheetCustom,
        label: "STORYTELLER_ADDON_SINGLE.SingleSheetCustom"
    })
    game.StoryTeller.registerAddonSheet({
        key: "scrollvertical",
        sheet: SingleSheetScrollV,
        label: "STORYTELLER_ADDON_SINGLE.SingleSheetScrollV"
    })
    game.StoryTeller.registerAddonSheet({
        key: "scrollhorizontal",
        sheet: SingleSheetScrollH,
        label: "STORYTELLER_ADDON_SINGLE.SingleSheetScrollH"
    })
    game.StoryTeller.registerAddonSheet({
        key: "slate",
        sheet: SingleSheetSlate,
        label: "STORYTELLER_ADDON_SINGLE.SingleSheetSlate"
    })
    game.StoryTeller.registerAddonSheet({
        key: "parchment",
        sheet: SingleSheetParchment,
        label: "STORYTELLER_ADDON_SINGLE.SingleSheetParchment"
    })
    game.StoryTeller.registerAddonSheet({
        key: "paper",
        sheet: SingleSheetPaper,
        label: "STORYTELLER_ADDON_SINGLE.SingleSheetPaper"
    })
    game.StoryTeller.registerAddonSheet({
        key: "bound",
        sheet: SingleSheetBound,
        label: "STORYTELLER_ADDON_SINGLE.SingleSheetBound"
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
