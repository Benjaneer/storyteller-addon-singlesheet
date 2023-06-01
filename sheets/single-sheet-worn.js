const bookSizeCorrection = 1
const bookWidth = 695
const bookHeight = 937

/* I recommend inheriting from the StorySheet class, but if you know what you're doing, you can use anything. */
export class SingleSheetWorn extends JournalSheet {
    pageFlip = "modules/storyteller/sounds/paper-flip.mp3"

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            baseApplication: 'JournalSheet',
            /* One of the most important lines, here you can add classes that will apply to the entire Journal window. */
            classes: ["sheet", "single-sheet", "worn", "storyteller-addon-singlesheet"],
            /* This file contains the html markup code, in case you need a more complex design style. For example, without page turning. */
            template: 'modules/storyteller-addon-singlesheet/templates/single-sheet.html',
            width: getBookWidth(),
            height: getBookHeight(),
            resizable: false,
            closeOnSubmit: false,
            submitOnClose: true,
        });
    }

    sound() {
        if (game.settings.get('storyteller', 'bookOpenSound')) {
            AudioHelper.play({src: this.pageFlip, volume: 0.8, autoplay: true, loop: false}, false);
        }
    }

    /** @inheritdoc */
    async _render(force, options = {}) {
        this.sound()
        await super._render(force, options);

        let data = this.getData().data
        let startPage = 1
        let savedPage = getPage(data._id)

        $('#story-' + data._id).turn({
            duration: 500,
            page: savedPage >= 1 ? savedPage : startPage,
            acceleration: true,
            display: 'single',
            // autoCenter: true,
            turnCorners: "bl,br",
            elevation: 300,
            when: {
                turned: function (e, page) {
                    setPage(data._id, page)
                }
            }
        });
        if (options.pageId != undefined) {
            this.goToPage(options.pageId);
        };
        let images = document.querySelectorAll('.single-sheet .page-num .journal-entry-page.image');
        if(images.length > 0) {
            images.forEach((image) => {
                let pageClass=image.parentElement.className;
                document.getElementsByClassName(pageClass)[0].style.overflow='hidden';
            });
        };
    }

    /** @inheritdoc */
    async _updateObject(event, formData) {
        if (formData.img === "") {
            formData.img = this.object.data.img
        }
        return super._updateObject(event, formData);
    }

    /** @inheritdoc */
    _getHeaderButtons() {
        const buttons = super._getHeaderButtons();

        if (game.user.isGM) {
            buttons.unshift({
                label: "STORYTELLER.CopyID",
                class: "switch-copyid",
                icon: "fas fa-crosshairs",
                onclick: ev => this._onCopyID(ev)
            })
        }

        return buttons;
    }

    async _onShowPlayers(event) {
        event.preventDefault();
        await this.submit();
        return this.object.show(this._sheetMode, true);
    }

    _onConfigureStory(event) {
        let story = $(event.target).closest(".window-app.story-sheet")
        let pageRightImage = story.find('.page-inner.image')
        let pageRightSettings = story.find('.page-inner.settings')
        pageRightImage.toggleClass("hidden")
        pageRightSettings.toggleClass("hidden")
    }

    _onCopyID(event) {
        const text = `game.StoryTeller.showStoryByIDToAll("` + this.object.id + `")`
        let aux = document.createElement("input");
        aux.setAttribute("value", text);
        document.body.appendChild(aux);
        aux.select();
        document.execCommand("copy");
        document.body.removeChild(aux);

        ui.notifications.info(game.i18n.format("STORYTELLER.CopyIDMessage", {
            mode: "text",
            title: "Info",
            which: "authorized"
        }));
    }

    /** Меняем анимацию скрытия книги */
    /** @inheritdoc */
    async close(options = {}) {
        let el = this.element;
        super.close(options)
        return new Promise(resolve => {
            el.fadeOut(200, () => {
                el.remove();

                // Clean up data
                this._element = null;
                delete ui.windows[this.appId];
                this._minimized = false;
                this._scrollPositions = null;
                this._state = Application.RENDER_STATES.CLOSED;
                resolve();
            });
        });
    }

    goToPage(pageId) {
        let targetPage = document.querySelector('.pagelookup li[data-page-id="' + pageId + '"]');
        let targetPageNum = Number(targetPage.getAttribute("page"));
        let pageList = targetPage.closest(".journal-entry-pages").children[1];
        let journalId = pageList.getAttribute("id").split('-')[1];
        let curentPageNum = $('#story-' + journalId).turn("page");
        $('#story-' + journalId).turn("page", targetPageNum+1);
    }
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function getBookWidth() {
    let height = getBookHeight()
    return (bookWidth / bookHeight) * height
}

function getBookHeight() {
    let bookSize = game.settings.get('storyteller', 'size') / 100
    return window.innerHeight * bookSize * bookSizeCorrection
}

async function setPage(id, page) {
    let pages = game.settings.get('storyteller', 'pages')
    pages[id] = page
    await game.settings.set('storyteller', 'pages', pages)
}

function getPage(id) {
    let pages = game.settings.get('storyteller', 'pages')
    return pages[id]
}
