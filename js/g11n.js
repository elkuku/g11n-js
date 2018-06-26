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
        translate: function (string) {
            if (this.debug) {
                return this.debugTranslate(string);
            }

            let test = phpjs.md5(string);

            if (typeof this.strings[test] !== 'undefined') {
                return phpjs.base64_decode(this.strings[test]);
            }

            return string;
        },

        /**
         *
         */
        debugTranslate: function (string) {
            let test = phpjs.md5(string);
            let msg, add;

            if (typeof this.strings[test] !== 'undefined') {
                msg = phpjs.sprintf('Translated:\nO: %s\nT: %s', string,
                    phpjs.base64_decode(this.strings[test]));
                add = this.log(msg);

                return phpjs.sprintf(add, phpjs
                    .base64_decode(this.strings[test]));
            }

            add = this.log(phpjs.sprintf('Untranslated:\nO: %s', string),
                'warn');

            this.log('', 'trace');

            return phpjs.sprintf(add, string);
        },

        /**
         *
         */
        translatePlural: function (singular, plural, count) {
            if (this.debug) {
                return this.debugTranslatePlural(singular, plural, count);
            }

            let key = phpjs.md5(singular);
            let index = phpjs.call_user_func(this.pluralFunction, count);

            if (typeof this.stringsPlural[key] !== 'undefined') {
                if (typeof this.stringsPlural[key][index] !== 'undefined') {
                    return phpjs.base64_decode(this.stringsPlural[key][index]);
                }
            }

            // -- Fallback - english: singular == 1
            return (count === 1) ? singular : plural;
        },

        /**
         *
         */
        debugTranslatePlural: function (singular, plural, count) {
            let key = phpjs.md5(singular);
            let index = phpjs.call_user_func(this.pluralFunction, count);

            let msg, add;

            if (typeof this.stringsPlural[key] !== 'undefined') {
                if (typeof this.stringsPlural[key][index] !== 'undefined') {
                    //return phpjs.base64_decode(this.stringsPlural[key][index]);
                    msg = phpjs.sprintf(
                        'Translated plural:\nO: %s\nT: %s\nC: %d',
                        singular + ' / ' + plural,
                        phpjs.base64_decode(this.stringsPlural[key][index]),
                        count
                    );

                    add = this.log(msg);

                    return phpjs.sprintf(
                        add,
                        phpjs.base64_decode(this.stringsPlural[key][index])
                    );
                }
            }

            // -- Fallback - english: singular == 1
            let untranslated = (count === 1) ? singular : plural;
            add = this.log(phpjs.sprintf('Untranslated plural:\nO: %s', untranslated),
                'warn');

            this.log('', 'trace');

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
                    console.warn(string);
                    break;
                case 'trace':
                    console.trace('Trace');
                    break;
                case undefined:
                default:
                    // translated/other
                    add = '+-%s-+';
                    console.log(string);
                    break;
            }

            return add;
        }
    };
})();

