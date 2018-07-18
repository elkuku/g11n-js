/**
 * @copyright  2010-2018 Nikolai Plath
 * @license    WTFPL
 */
const md5 = require('locutus/php/strings/md5')
const strtr = require('locutus/php/strings/strtr')
const base64_decode = require('locutus/php/url/base64_decode')
const call_user_func = require('locutus/php/funchand/call_user_func')
const sprintf = require('locutus/php/strings/sprintf')

class G11n {
    constructor() {
        this.strings = {}
        this.stringsPlural = {}
        this.pluralFunction = ''
        this.debug = false
    }

    loadLanguageStrings(object) {
        for (let key in object) {
            this.strings[key] = object[key]
        }
    }

    loadPluralStrings(object) {
        for (let key in object) {
            this.stringsPlural[key] = object[key]
        }
    }

    setPluralFunction(object) {
        this.pluralFunction = object
    }

    translate(string, parameters) {
        if (this.debug) {
            return this.debugTranslate(string, parameters)
        }

        let test = md5(string)

        if (typeof this.strings[test] !== 'undefined') {
            let translation = base64_decode(this.strings[test])
            return parameters ? strtr(translation, parameters) : translation
        }

        return parameters ? strtr(string, parameters) : string
    }

    debugTranslate(string, parameters) {
        let test = md5(string)
        let add

        if (typeof this.strings[test] !== 'undefined') {
            add = this.log(string)
            if (parameters) {
                console.warn(parameters)
            }

            let translation = base64_decode(this.strings[test])

            return sprintf(add, parameters ? strtr(translation, parameters) : translation)
        }

        add = this.log(string, 'warn')

        if (parameters) {
            console.error(parameters)
        }

        return sprintf(add, parameters ? strtr(string, parameters) : string)
    }

    translatePlural(singular, plural, count, parameters) {
        if (this.debug) {
            return this.debugTranslatePlural(singular, plural, count, parameters)
        }

        let key = md5(singular)
        let index = call_user_func(this.pluralFunction, count)

        if (typeof this.stringsPlural[key] !== 'undefined') {
            if (typeof this.stringsPlural[key][index] !== 'undefined') {
                let translation = base64_decode(this.stringsPlural[key][index])
                return parameters ? strtr(translation, parameters) : translation
            }
        }

        // -- Fallback - english: singular == 1
        let translation = (count === 1) ? singular : plural
        return parameters ? strtr(translation, parameters) : translation
    }

    debugTranslatePlural(singular, plural, count, parameters) {
        let key = md5(singular)
        let index = call_user_func(this.pluralFunction, count)

        let msg, add

        if (typeof this.stringsPlural[key] !== 'undefined') {
            if (typeof this.stringsPlural[key][index] !== 'undefined') {
                msg = sprintf('%s\nCount: %d', singular + ' / ' + plural, count)

                add = this.log(msg)

                if (parameters) {
                    console.warn(parameters)
                }

                let translation = base64_decode(this.stringsPlural[key][index])

                return sprintf(
                    add,
                    parameters ? strtr(translation, parameters) : translation
                )
            }
        }

        // -- Fallback - english: singular == 1
        let untranslated = (count === 1) ? singular : plural
        untranslated = parameters ? strtr(untranslated, parameters) : untranslated
        add = this.log(sprintf('Untranslated plural:\nO: %s', untranslated), 'warn')

        if (parameters) {
            console.error(parameters)
        }

        return sprintf(add, untranslated)
    }

    log(string, type) {

        let add = '%s'

        switch (type) {
            case 'warn':
                // untranslated
                add = '¿-%s-¿'
                console.error(string)
                break
            case undefined:
            default:
                // translated/other
                add = '+-%s-+'
                console.warn(string)
                break
        }

        return add
    }
}

g11n = new G11n()

module.exports = g11n

// We do this to provision the translations in the window object (coming from PHP...)
window.g11n = g11n
