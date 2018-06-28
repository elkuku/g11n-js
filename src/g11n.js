/**
 * @copyright  2010-2018 Nikolai Plath
 * @license    WTFPL
 */
(function () {
    /**
     *
     */
    g11n = {
        strings: {},
        stringsPlural: {},
        debug: '',

        pluralFunction: '',

        /**
         *
         */
        loadLanguageStrings: function (object) {
            for (let key in object) {
                this.strings[key] = object[key];
            }
        },

        /**
         *
         */
        loadPluralStrings: function (object) {
            for (let key in object) {
                this.stringsPlural[key] = object[key];
            }
        },

        /**
         *
         */
        setPluralFunction: function (object) {
            this.pluralFunction = object;
        },

        /**
         *
         */
        translate: function (string, parameters) {
            if (this.debug) {
                return this.debugTranslate(string, parameters);
            }

            let test = phpjs.md5(string);

            if (typeof this.strings[test] !== 'undefined') {
                let translation = phpjs.base64_decode(this.strings[test]);
                return parameters ? phpjs.strtr(translation, parameters): translation;
            }

            return parameters ? phpjs.strtr(string, parameters): string;
        },

        /**
         *
         */
        debugTranslate: function (string, parameters) {
            let test = phpjs.md5(string);
            let add;

            if (typeof this.strings[test] !== 'undefined') {
                add = this.log(string);
                if (parameters) {
                    console.warn(parameters);
                }

                let translation = phpjs.base64_decode(this.strings[test]);

                return phpjs.sprintf(add, parameters ? phpjs.strtr(translation, parameters): translation);
            }

            add = this.log(string, 'warn');

            if (parameters) {
                console.error(parameters);
            }

            return phpjs.sprintf(add, parameters ? phpjs.strtr(string, parameters): string);
        },

        /**
         *
         */
        translatePlural: function (singular, plural, count, parameters) {
            if (this.debug) {
                return this.debugTranslatePlural(singular, plural, count, parameters);
            }

            let key = phpjs.md5(singular);
            let index = phpjs.call_user_func(this.pluralFunction, count);

            if (typeof this.stringsPlural[key] !== 'undefined') {
                if (typeof this.stringsPlural[key][index] !== 'undefined') {
                    let translation =  phpjs.base64_decode(this.stringsPlural[key][index]);
                    return parameters ? phpjs.strtr(translation, parameters): translation;
                }
            }

            // -- Fallback - english: singular == 1
            let translation =  (count === 1) ? singular : plural;
            return parameters ? phpjs.strtr(translation, parameters) : translation;
        },

        /**
         *
         */
        debugTranslatePlural: function (singular, plural, count, parameters) {
            let key = phpjs.md5(singular);
            let index = phpjs.call_user_func(this.pluralFunction, count);

            let msg, add;

            if (typeof this.stringsPlural[key] !== 'undefined') {
                if (typeof this.stringsPlural[key][index] !== 'undefined') {
                    msg = phpjs.sprintf('%s\nCount: %d', singular + ' / ' + plural, count);

                    add = this.log(msg);

                    if (parameters) {
                        console.warn(parameters);
                    }

                    let translation = phpjs.base64_decode(this.stringsPlural[key][index]);

                    return phpjs.sprintf(
                        add,
                        parameters ? phpjs.strtr(translation, parameters) : translation
                    );
                }
            }

            // -- Fallback - english: singular == 1
            let untranslated = (count === 1) ? singular : plural;
            untranslated = parameters ? phpjs.strtr(untranslated, parameters) : untranslated;
            add = this.log(phpjs.sprintf('Untranslated plural:\nO: %s', untranslated),
                'warn');

            if (parameters) {
                console.error(parameters);
            }

            return phpjs.sprintf(add, untranslated);
        },

        /**
         *
         */
        log: function (string, type) {

            let add = '%s';

            switch (type) {
                case 'warn':
                    // untranslated
                    add = '¿-%s-¿';
                    console.error(string);
                    break;
                case undefined:
                default:
                    // translated/other
                    add = '+-%s-+';
                    console.warn(string);
                    break;
            }

            return add;
        }
    };
})();

