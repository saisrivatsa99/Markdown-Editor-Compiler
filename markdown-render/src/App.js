import React, { useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CodeBlock from './components/CodeBlock';
import './App.css';

const App = () => {
  const [markdownContent, setMarkdownContent] = useState('');
  const [renderedContent, setRenderedContent] = useState(''); 
  const contentRef = useRef(); 

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        setMarkdownContent(content);
        setRenderedContent(content); 
      };
      reader.readAsText(file);
    }
    
  };

  const compileMarkdown = () => {
    setRenderedContent(markdownContent); 
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Markdown Editor</h1>
        <input type="file" accept=".md" onChange={handleFileChange} />

        <div className="button-container">
          {markdownContent && (
            <button onClick={compileMarkdown} className="compile-button">Compile</button>
          )}
        </div>

        <div className="editor-container">
          
          <div className="line-numbers">
            {markdownContent.split('\n').map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>

          <textarea
            className="markdown-editor"
            value={markdownContent}
            onChange={(e) => setMarkdownContent(e.target.value)}
          />
          
          <div className="markdown-renderer" ref={contentRef}>
            <ReactMarkdown
              children={renderedContent}
              remarkPlugins={[remarkGfm]}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <CodeBlock language={match[1]} value={String(children).replace(/\n$/, '')} />
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            />
          </div>
        </div>
      </header>
    </div>
  );
};

export default App;
