// import { I18n } from "i18n-js";
// import * as Localization from "react-native-localize";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const translations = {
//   en: {
//     welcome: "Welcome",
//     language: "Language",
//     english: "English",
//     spanish: "Spanish",
//   },
//   es: {
//     welcome: "Bienvenido",
//     language: "Idioma",
//     english: "Inglés",
//     spanish: "Español",
//   },
// };

// const i18n = new I18n(translations);

// const setI18nConfig = async () => {
//   const savedLanguage = await AsyncStorage.getItem("language");
//   const fallback = { languageTag: "en", isRTL: false };

//   const { languageTag }: any =
//     savedLanguage ||
//     Localization.findBestLanguageTag(Object.keys(translations)) ||
//     fallback;

//   i18n.locale = languageTag;
// };

// setI18nConfig();

// export default i18n;
