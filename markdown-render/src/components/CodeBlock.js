import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Importing Prism theme

// Custom CodeBlock component
const CodeBlock = ({ language, value }) => {
  // Function to copy code to clipboard
  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    alert('Code copied to clipboard!');
  };

  return (
    <div className="code-block">
      <div className="code-header">
        <span className="language-label">{language}</span>
        <button className="copy-button" onClick={() => handleCopy(value)}>
          Copy
        </button>
      </div>
      <SyntaxHighlighter language={language} style={oneDark}>
        {value}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
