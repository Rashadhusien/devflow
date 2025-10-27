"use client";

import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  type MDXEditorMethods,
  toolbarPlugin,
  ConditionalContents,
  ChangeCodeMirrorLanguage,
  UndoRedo,
  Separator,
  BoldItalicUnderlineToggles,
  ListsToggle,
  CreateLink,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  InsertCodeBlock,
  BlockTypeSelect,
  InsertAdmonition,
  linkPlugin,
  linkDialogPlugin,
  imagePlugin,
  tablePlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
  frontmatterPlugin,
  directivesPlugin,
  AdmonitionDirectiveDescriptor,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import "./dark-editor.css";
import { basicDark } from "cm6-theme-basic-dark";
import { useTheme } from "next-themes";
import { forwardRef } from "react";

interface Props {
  value: string;
  fieldChange: (value: string) => void;
}

const Editor = forwardRef<MDXEditorMethods, Props>(
  ({ value, fieldChange, ...props }, ref) => {
    const { resolvedTheme } = useTheme();
    const theme = resolvedTheme === "dark" ? [basicDark] : [];

    return (
      <MDXEditor
        key={resolvedTheme}
        markdown={value}
        ref={ref}
        onChange={fieldChange}
        className="background-light800_dark200 light-border-2 markdown-editor dark-editor w-full border rounded-lg grid"
        plugins={[
          headingsPlugin(),
          listsPlugin(),
          quotePlugin(),
          thematicBreakPlugin(),
          markdownShortcutPlugin(),
          linkPlugin(),
          linkDialogPlugin(),
          imagePlugin(),
          tablePlugin(),
          codeBlockPlugin({ defaultCodeBlockLanguage: "" }),
          codeMirrorPlugin({
            codeBlockLanguages: {
              txt: "txt",
              scss: "scss",
              saas: "saas",
              "": "unspecified",
              tsx: "typescript (React)",
              jsx: "javascript (React)",
              javascript: "JavaScript",
              typescript: "TypeScript",
              python: "Python",
              java: "Java",
              cpp: "C++",
              css: "CSS",
              html: "HTML",
              json: "JSON",
              markdown: "Markdown",
              sql: "SQL",
              bash: "Bash",
              shell: "Shell",
              yaml: "YAML",
              xml: "XML",
              php: "PHP",
              ruby: "Ruby",
              go: "Go",
              rust: "Rust",
              swift: "Swift",
              kotlin: "Kotlin",
              dart: "Dart",
              r: "R",
              scala: "Scala",
              clojure: "Clojure",
              haskell: "Haskell",
              lua: "Lua",
              perl: "Perl",
              powershell: "PowerShell",
              dockerfile: "Dockerfile",
              ini: "INI",
              toml: "TOML",
              makefile: "Makefile",
              cmake: "CMake",
              nginx: "Nginx",
              apache: "Apache",
              vim: "Vim",
              diff: "Diff",
              log: "Log",
              plaintext: "Plain Text",
            },
            codeMirrorExtensions: theme,
            autoLoadLanguageSupport: true,
          }),
          diffSourcePlugin({ viewMode: "rich-text", diffMarkdown: " " }),
          frontmatterPlugin(),
          directivesPlugin({
            directiveDescriptors: [AdmonitionDirectiveDescriptor],
          }),
          toolbarPlugin({
            toolbarContents: () => (
              <ConditionalContents
                options={[
                  {
                    when: (editor) => editor?.editorType === "codeblock",
                    contents: () => <ChangeCodeMirrorLanguage />,
                  },
                  {
                    fallback: () => (
                      <>
                        <UndoRedo />
                        <Separator />
                        <BlockTypeSelect />
                        <Separator />
                        <BoldItalicUnderlineToggles />
                        <Separator />
                        <ListsToggle />
                        <Separator />
                        <CreateLink />
                        <InsertImage />
                        <Separator />
                        <InsertTable />
                        <Separator />
                        <InsertThematicBreak />
                        <InsertCodeBlock />
                        <Separator />
                        <InsertAdmonition />
                      </>
                    ),
                  },
                ]}
              />
            ),
          }),
        ]}
        {...props}
      />
    );
  }
);

Editor.displayName = "Editor";

export default Editor;
