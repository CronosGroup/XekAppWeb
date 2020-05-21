import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import Es from "./Es";
import En from "./En"

class AppLocalization{

    constructor() {
        // Set the key-value pairs for the different languages you want to support.
        i18n.translations = {
            es: Es.strings,
            en: En.strings,
        };
        // Set the locale once at the beginning of your app.
        i18n.locale = Localization.locale
        // When a value is missing from a language it'll fallback to another language with the key present.
        i18n.fallbacks = true;
    }

    getLocalized(key):string{
       return i18n.t(key)
    }

    getLocalized(key, args:{}):string{
        return i18n.t(key, args)
    }
}

const languages = new AppLocalization()
export default languages;
