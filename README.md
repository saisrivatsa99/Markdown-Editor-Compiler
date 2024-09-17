# Markdown Renderer App

This is a simple **Markdown Renderer** built using **React** that allows users to load and edit markdown files. The app renders markdown content on the right side of the screen and provides functionality for loading files, compiling markdown, and copying code blocks to the clipboard.

### Check it out! https://saisrivatsa99.github.io/Markdown-Editor-Compiler/

## Features

- **Markdown File Upload**: Load and view `.md` files directly in the app.
- **Markdown Editor**: Edit markdown on the left, and compile it to view updates on the right.
- **Line Numbers**: Display line numbers alongside the editor for better readability.
- **Code Syntax Highlighting**: Renders code blocks with syntax highlighting using `react-syntax-highlighter` (Prism).
- **Copy to Clipboard**: Easily copy code blocks using the copy button.
- **Compile Button**: Update the markdown view manually with a 'Compile' button.

## Usage

1. **File Upload**: Select a markdown file to load it into the editor.
2. **Editor**: Edit the markdown content on the left.
3. **Compile**: Click the 'Compile' button to see your changes rendered on the right.
4. **Copy Code**: Use the copy button in code blocks to copy the content.

## Technologies Used

- **React**: Frontend library for building the user interface.
- **React-Markdown**: For rendering markdown content.
- **React-Syntax-Highlighter**: For code block syntax highlighting.
- **Prism.js**: A lightweight syntax highlighter.
