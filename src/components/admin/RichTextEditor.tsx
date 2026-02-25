
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  dir?: 'rtl' | 'ltr';
}

const editorModules = {
  toolbar: [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
    ['link', 'image'],
    [{ 'align': [] }],
    [{ 'color': [] }, { 'background': [] }], // Dropdown with color pickers
    [{ 'font': [] }],
    ['clean'], // remove formatting button
  ],
};

const RichTextEditor = ({ value, onChange, placeholder, dir = 'rtl' }: RichTextEditorProps) => {
  return (
    <div className={`rich-text-editor ${dir}`}>
       <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={editorModules}
        placeholder={placeholder}
      />
    </div>
  );
};

export default RichTextEditor;
