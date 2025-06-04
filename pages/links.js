import fs from 'fs';
import path from 'path';
import { useState } from 'react';

export async function getServerSideProps() {
  const filePath = path.join(process.cwd(), 'links.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const links = JSON.parse(fileContents);
  return { props: { links } };
}

export default function LinksPage({ links }) {
  const [selectedTag, setSelectedTag] = useState(null);

  const filteredLinks = selectedTag
    ? Object.fromEntries(
        Object.entries(links).filter(([_, data]) => 
          data.tags.includes(selectedTag)
        )
      )
    : links;

  const handleTagClick = (tag) => {
    setSelectedTag(selectedTag === tag ? null : tag);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>svitlanas shortlinks</h1>
      {selectedTag && (
        <div style={{ marginBottom: '1rem' }}>
          <span>Filtering by tag: </span>
          <span 
            style={{ 
              backgroundColor: '#e0e0e0', 
              padding: '4px 8px', 
              borderRadius: '4px',
              cursor: 'pointer'
            }}
            onClick={() => setSelectedTag(null)}
          >
            {selectedTag} ×
          </span>
        </div>
      )}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>go link</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>tags</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>desc</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>link</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(filteredLinks).map(([name, data]) => (
            <tr key={name}>
              <td style={{ border: '1px solid #ccc', padding: '8px', fontWeight: 'bold' }}>{name}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                {Array.isArray(data.tags) ? data.tags.map(tag => (
                  <span
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    style={{
                      backgroundColor: selectedTag === tag ? '#e0e0e0' : '#f0f0f0',
                      padding: '2px 6px',
                      margin: '0 4px 4px 0',
                      borderRadius: '4px',
                      display: 'inline-block',
                      cursor: 'pointer'
                    }}
                  >
                    {tag}
                  </span>
                )) : ''}
              </td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{data.description || ''}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                <a href={data.url} target="_blank" rel="noopener noreferrer">{data.url}</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 