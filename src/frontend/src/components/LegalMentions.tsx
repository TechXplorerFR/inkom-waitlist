import React, { useEffect, useState } from 'react';
import i18n from '../i18n';
import ReactMarkdown from 'react-markdown';

const LegalMentions: React.FC = () => {
    const [content, setContent] = useState('');

    useEffect(() => {
        const lang = (localStorage.getItem('i18nextLng') || i18n.language || 'en').split('-')[0];
        const fileName = `legal.${lang}.md`;
        fetch(`/src/content/${fileName}`)
            .then((res) => {
                if (res.ok) return res.text();
                // fallback to English if file not found
                return fetch('/src/content/legal.en.md').then(r => r.text());
            })
            .then(setContent);
    }, []);

    return (
        <main
            className="mt-20 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64 w-full max-w-screen-2xl mx-auto"
            style={{ minHeight: '70vh' }}
        >
            <div
                className="bg-white bg-opacity-80 p-6"
                style={{ boxSizing: 'border-box' }}
            >
                <ReactMarkdown
                    components={{
                        a: (props) => (
                            <a
                                {...props}
                                className="text-blue-600 font-semibold underline hover:text-blue-800 transition-colors duration-150"
                                target="_blank"
                                rel="noopener noreferrer"
                            />
                        ),
                        h1: (props) => (
                            <h1 {...props} className="text-3xl font-bold mb-6 text-gray-900 border-b border-gray-300 pb-2" />
                        ),
                        h2: (props) => (
                            <h2 {...props} className="text-2xl font-semibold mt-8 mb-4 text-gray-800 border-b border-gray-200 pb-1" />
                        ),
                        h3: (props) => (
                            <h3 {...props} className="text-xl font-semibold mt-6 mb-2 text-gray-700" />
                        ),
                        ul: (props) => (
                            <ul {...props} className="list-disc ml-6 mb-4" />
                        ),
                        ol: (props) => (
                            <ol {...props} className="list-decimal ml-6 mb-4" />
                        ),
                        p: (props) => (
                            <p {...props} className="mb-4 text-gray-700" />
                        ),
                    }}
                >
                    {content}
                </ReactMarkdown>
            </div>
        </main>
    );
};

export default LegalMentions;
