/**
 * @copyright  2010-2018 Nikolai Plath
 * @license    WTFPL
 */

/**
 * Small multilanguaging function =;).
 *
 * Also includes sprintf() functionality if more parameters are supplied.
 *
 * @param original   string The original string to translate
 * @param parameters object Replacement parameters.
 *
 * @returns string The translated string or the original if not found.
 */
function g11n3t(original, parameters) {
    return g11n.translate(original, parameters);
}

/**
 * Small multilanguaging pluralisation function =;).
 *
 * @param singular   string  Singular form of text to translate.
 * @param plural     string  Plural form of text to translate.
 * @param count      integer The number of items.
 * @param parameters object  Replacement parameters.
 *
 * @return string Translated text.
 */
function g11n4t(singular, plural, count, parameters) {
    return g11n.translatePlural(singular, plural, count, parameters);
}
