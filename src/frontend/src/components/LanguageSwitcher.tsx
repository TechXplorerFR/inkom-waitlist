import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  return (
    <div className="flex gap-2">
      <button onClick={() => changeLanguage('en')} className={i18n.language === 'en' ? 'font-bold underline' : ''}>EN</button>
      <button onClick={() => changeLanguage('fr')} className={i18n.language === 'fr' ? 'font-bold underline' : ''}>FR</button>
    </div>
  );
};

export default LanguageSwitcher;
