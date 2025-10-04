// Email translations for subscription/welcome email

import {
  englishEmail,
  frenchEmail,
  rawEnglishEmail,
  rawFrenchEmail,
} from "../data/welcomeEmail.js";

export interface EmailTranslation {
  subject: string;
  html: string;
  text: string;
}

export const emailTranslations: { [key: string]: EmailTranslation } = {
  en: {
    subject: "🎉 Welcome to Inkom Beta - Your Exclusive Benefits Await!",
    html: englishEmail,
    text: rawEnglishEmail,
  },
  fr: {
    subject:
      "🎉 Bienvenue dans la Bêta Inkom - Vos Avantages Exclusifs Vous Attendent !",
    html: frenchEmail,
    text: rawFrenchEmail,
  },
  // Add more languages as needed
};
