/**
 * @copyright  2010-2018 Nikolai Plath
 * @license    WTFPL
 */

/**
 * Small multilanguaging function =;).
 *
 * Also includes sprintf() functionality if more parameters are supplied.
 *
 * @param original    string original The original string to translate
 * @param additionals [n] if additional paramaters are supplied, the function behaves like sprintf.
 *
 * @returns string The translated string or the original if not found.
 */
function g11n3t(original) {
    let translation = g11n.translate(original);

    if (arguments.length > 1) {
        arguments[0] = translation;

        return phpjs.call_user_func_array(phpjs.sprintf, arguments);
    }

    return translation;
}

/**
 * Small multilanguaging pluralisation function =;).
 *
 * @param singular  string   Singular form of text to translate.
 * @param plural    string   Plural form of text to translate.
 * @param count     integer  The number of items.
 *
 * @return string Translated text.
 */
function g11n4t(singular, plural, count) {
    return g11n.translatePlural(singular, plural, count);
}
