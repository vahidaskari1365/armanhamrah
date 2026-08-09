declare module 'react-quill' {
  import * as React from 'react';

  interface ReactQuillProps {
    id?: string;
    className?: string;
    style?: React.CSSProperties;
    value: string | undefined;
    onChange: (content: string, delta: any, source: string, editor: any) => void;
    onChangeSelection?: (range: any, source: string, editor: any) => void;
    onFocus?: (range: any, source: string, editor: any) => void;
    onBlur?: (previousRange: any, source:string, editor: any) => void;
    onKeyPress?: React.KeyboardEventHandler;
    onKeyDown?: React.KeyboardEventHandler;
    onKeyUp?: React.KeyboardEventHandler;
    readOnly?: boolean;
    defaultValue?: string;
    theme?: string;
    modules?: { [key: string]: any };
    formats?: string[];
    bounds?: string | HTMLElement;
    placeholder?: string;
    tabIndex?: number;
  }

  const ReactQuill: React.FC<ReactQuillProps>;
  export default ReactQuill;
}
