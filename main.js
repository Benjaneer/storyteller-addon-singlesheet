import {ExampleSheet} from "./sheets/example-sheet.js";

Hooks.on("ready", () => {
    /* Check that the core is installed and ready to run. */
    if (game.StoryTeller !== undefined) {
        /* Use this method at hook "ready" to register your journal style. */
        game.StoryTeller.registerAddonSheet({
            /* Unique key, must not overlap with other keys. It is used to access the object. */
            key: "example",
            /* The class that implements the settings for the new journal. You don't need to create an instance, the class description itself is passed. */
            sheet: ExampleSheet,
            /* Key-identifier of the string for translation. */
            label: "STORYTELLER_ADDON_EXAMPLE.ExampleEntry"
        })
    }
    console.log("Storyteller addon example | Ready")
})