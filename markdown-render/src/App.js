import React, { useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CodeBlock from './components/CodeBlock';
import './App.css';

// Sample list of files stored in public folder
const files = ['Auth.md', 'Basics of Backend.md', 'Design Patterns with codes .md', 'Internet Resources.md', 'JPA.md', 'SOLID.md', 'Spring.md'];

const App = () => {
  const [markdownContent, setMarkdownContent] = useState('');
  const [renderedContent, setRenderedContent] = useState('');
  const [selectedFile, setSelectedFile] = useState('');
  const contentRef = useRef();
  const editorRef = useRef();
  const lineNumbersRef = useRef();

  // Handle file selection from local system
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

  // Handle file selection from dropdown
  const handleDropdownChange = async (event) => {
    const fileName = event.target.value;
    setSelectedFile(fileName);
    
    if (fileName) {
      try {
        const response = await fetch(`./cheatsheets/${fileName}`);
        const text = await response.text();
        setMarkdownContent(text);
        setRenderedContent(text);
      } catch (error) {
        console.error('Error loading file:', error);
      }
    }
  };


  const handleEditorScroll = () => {
    lineNumbersRef.current.scrollTop = editorRef.current.scrollTop;
  };

  const compileMarkdown = () => {
    setRenderedContent(markdownContent);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Markdown Editor</h1>

        <div className="dropdown-container">
          {/* Dropdown for selecting sample files */}
          <select onChange={handleDropdownChange} value={selectedFile}>
            <option value="" disabled>
              Select a sample file
            </option>
            {files.map((file, index) => (
              <option key={index} value={file}>
                {file}
              </option>
            ))}
          </select>
        </div>

        <div className="button-container">
          <label htmlFor="file-upload" className="upload-button">
            Upload
          </label>
          <input
            id="file-upload"
            type="file"
            accept=".md"
            onChange={handleFileChange}
            style={{ display: 'none' }} // Hide the actual input
          />

          {markdownContent && (
            <button onClick={compileMarkdown} className="compile-button">
              Compile
            </button>
          )}
        </div>

        <div className="editor-container">
          <div className="line-numbers" ref={lineNumbersRef}>
            {markdownContent.split('\n').map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>

          <textarea
            className="markdown-editor"
            value={markdownContent}
            onChange={(e) => setMarkdownContent(e.target.value)}
            onScroll={handleEditorScroll}
            ref={editorRef}
          />

          <div className="markdown-renderer" ref={contentRef}>
            <ReactMarkdown
              children={renderedContent}
              remarkPlugins={[remarkGfm]}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <CodeBlock
                      language={match[1]}
                      value={String(children).replace(/\n$/, '')}
                    />
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
