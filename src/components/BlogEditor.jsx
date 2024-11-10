import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const BlogEditor = ({ content, onChange }) => {
  return (
    <ReactQuill
      value={content}
      onChange={onChange}
      modules={{
        toolbar: [
          [{ 'header': [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'align': [] }],
          ['link', 'image'],
          ['clean']
        ],
      }}
      formats={[
        'header', 'bold', 'italic', 'underline', 'strike',
        'list', 'bullet', 'align', 'link', 'image'
      ]}
      placeholder="Write your blog content here..."
    />
  );
};

export default BlogEditor;
