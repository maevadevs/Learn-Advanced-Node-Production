import React from 'react'

const BlogField = ({ input, label, meta: { error, touched } }) => (
  <div className={input.name}>
    <label>{label}</label>
    <input {...input} style={{ marginBottom: '5px' }} />
    <div className="red-text" style={{ marginBottom: '20px' }}>
      {touched && error}
    </div>
  </div>
)

export default BlogField
