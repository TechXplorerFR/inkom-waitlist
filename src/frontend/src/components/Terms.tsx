import React, { useEffect, useState } from 'react';
import i18n from '../i18n';
import ReactMarkdown from 'react-markdown';

const Terms: React.FC = () => {
  const [content, setContent] = useState('');

  useEffect(() => {
    const lang = (localStorage.getItem('i18nextLng') || i18n.language || 'en').split('-')[0];
    const fileName = `terms.${lang}.md`;
    fetch(`/src/content/${fileName}`)
      .then((res) => {
        if (res.ok) return res.text();
        // fallback to English if file not found
        return fetch('/src/content/terms.en.md').then(r => r.text());
      })
      .then(setContent);
  }, []);

  return (
    <div className='mt-20'>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default Terms;
