import { useRef, useCallback } from "react";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  height?: string;
}

export function CodeEditor({
  value,
  onChange,
  placeholder = "// Paste your Java code here...",
  readOnly = false,
  height = "320px",
}: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const lines = value.split("\n");
  const lineCount = Math.max(lines.length, 10);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Tab") {
        e.preventDefault();
        const start = e.currentTarget.selectionStart;
        const end = e.currentTarget.selectionEnd;
        const newValue = value.substring(0, start) + "    " + value.substring(end);
        onChange(newValue);
        requestAnimationFrame(() => {
          if (textareaRef.current) {
            textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 4;
          }
        });
      }
    },
    [value, onChange]
  );

  return (
    <div className="rounded-lg overflow-hidden border border-border">
      {/* Editor toolbar */}
      <div className="flex items-center gap-2 px-4 py-2 code-editor-bg border-b border-code-line">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-destructive/70" />
          <div className="w-3 h-3 rounded-full bg-warning/70" />
          <div className="w-3 h-3 rounded-full bg-success/70" />
        </div>
        <span className="ml-3 text-xs font-mono text-code-comment">Main.java</span>
      </div>

      {/* Editor body */}
      <div className="flex code-editor-bg" style={{ height }}>
        {/* Line numbers */}
        <div className="flex-shrink-0 py-3 px-3 text-right select-none border-r border-code-line">
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i} className="text-xs leading-6 font-mono text-code-comment">
              {i + 1}
            </div>
          ))}
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          readOnly={readOnly}
          spellCheck={false}
          className="flex-1 p-3 bg-transparent text-code-fg font-mono text-sm leading-6 resize-none outline-none placeholder:text-code-comment/50 overflow-auto"
        />
      </div>
    </div>
  );
}
