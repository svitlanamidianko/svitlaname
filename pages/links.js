import fs from 'fs';
import path from 'path';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

export async function getServerSideProps(context) {
  const filePath = path.join(process.cwd(), 'pages', 'links.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const links = JSON.parse(fileContents);
  
  // Check if we're on localhost
  const isLocalhost = context.req.headers.host?.includes('localhost') || context.req.headers.host?.includes('127.0.0.1');
  
  return { props: { links, isLocalhost } };
}

export default function LinksPage({ links: initialLinks, isLocalhost }) {
  const [links, setLinks] = useState(initialLinks);
  const [selectedTags, setSelectedTags] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const [editingNames, setEditingNames] = useState({});
  const [editingTags, setEditingTags] = useState({});

  // Update local state when initialLinks changes
  useEffect(() => {
    setLinks(initialLinks);
    setEditingNames({});
    setEditingTags({});
  }, [initialLinks]);

  // Get all unique tags from all links
  const allTags = Array.from(
    new Set(
      Object.values(links)
        .flatMap(data => Array.isArray(data.tags) ? data.tags : [])
        .filter(tag => tag && tag.trim() !== '')
    )
  ).sort();

  const filteredLinks = selectedTags.length > 0
    ? Object.fromEntries(
        Object.entries(links).filter(([_, data]) => 
          Array.isArray(data.tags) && 
          selectedTags.some(tag => data.tags.includes(tag))
        )
      )
    : links;

  const handleTagClick = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleTagFilterClick = (tag) => {
    handleTagClick(tag);
  };

  const handleNameInputChange = (oldName, newName) => {
    // Store temporary name while typing
    setEditingNames(prev => ({
      ...prev,
      [oldName]: newName
    }));
  };

  const handleNameBlur = (oldName, newName) => {
    // Clear temporary name
    setEditingNames(prev => {
      const updated = { ...prev };
      delete updated[oldName];
      return updated;
    });

    // Only update if name actually changed and is not empty
    if (newName !== oldName && newName.trim() !== '') {
      const newLinks = { ...links };
      // Check if new name already exists
      if (newLinks[newName]) {
        // Name already exists, revert to old name
        return;
      }
      newLinks[newName] = { ...newLinks[oldName] };
      delete newLinks[oldName];
      setLinks(newLinks);
    }
  };

  const handleDeleteRow = (name) => {
    const newLinks = { ...links };
    delete newLinks[name];
    setLinks(newLinks);
  };

  const handleAddRow = () => {
    const timestamp = Date.now();
    const newKey = `new-link-${timestamp}`;
    const newLinks = {
      ...links,
      [newKey]: {
        url: '',
        tags: [],
        description: ''
      }
    };
    setLinks(newLinks);
  };

  const handleUrlChange = (name, newUrl) => {
    setLinks(prevLinks => ({
      ...prevLinks,
      [name]: {
        ...prevLinks[name],
        url: newUrl
      }
    }));
  };

  const handleTagsInputChange = (name, tagsString) => {
    // Store raw input while typing
    setEditingTags(prev => ({
      ...prev,
      [name]: tagsString
    }));
  };

  const handleTagsBlur = (name, tagsString) => {
    // Clear temporary tags
    setEditingTags(prev => {
      const updated = { ...prev };
      delete updated[name];
      return updated;
    });

    // Convert to array and update links
    const tagsArray = tagsString.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    setLinks(prevLinks => ({
      ...prevLinks,
      [name]: {
        ...prevLinks[name],
        tags: tagsArray
      }
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus(null);
    
    try {
      const response = await fetch('/api/links', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ links }),
      });

      if (response.ok) {
        setSaveStatus('Saved successfully!');
        setTimeout(() => setSaveStatus(null), 3000);
      } else {
        setSaveStatus('Error saving. Please try again.');
      }
    } catch (error) {
      console.error('Error saving:', error);
      setSaveStatus('Error saving. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <Head>
        <title>svitlana's shortlinks</title>
        <meta content="Svitlana Midianko | Shortlinks" property="og:title" />
        <meta content="Svitlana Midianko | Shortlinks" property="twitter:title" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link href="/images/favicon.png" rel="shortcut icon" type="image/x-icon" />
        <link href="/images/webclip.png" rel="apple-touch-icon" />
      </Head>
      <div className="page-wrapper">
        <Header />
        <div className="section">
          <div className="container-default w-container">
            <div style={{ width: '100%', display: 'block' }}>
              {isLocalhost && (
                <div style={{ 
                  marginBottom: '1rem', 
                  padding: '1rem', 
                  backgroundColor: '#f0f0f0', 
                  borderRadius: '4px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1rem',
                  width: '100%',
                  boxSizing: 'border-box'
                }}>
                  <button
                    onClick={handleAddRow}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#28a745',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      textTransform: 'lowercase'
                    }}
                  >
                    + add new row
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: isSaving ? '#ccc' : '#0070f3',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: isSaving ? 'not-allowed' : 'pointer',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      textTransform: 'lowercase'
                    }}
                  >
                    {isSaving ? 'saving...' : 'save changes'}
                  </button>
                  {saveStatus && (
                    <span style={{ color: saveStatus.includes('Error') ? 'red' : 'green' }}>
                      {saveStatus}
                    </span>
                  )}
                </div>
              )}
              {allTags.length > 0 && (
                <div style={{ 
                  marginBottom: '1rem', 
                  padding: '1rem', 
                  backgroundColor: '#f9f9f9', 
                  borderRadius: '4px',
                  border: '1px solid #e0e0e0'
                }}>
                  <div style={{ marginBottom: '0.5rem', fontSize: '14px', fontWeight: 'bold' }}>
                    filter by tags:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {allTags.map(tag => (
                      <span
                        key={tag}
                        onClick={() => handleTagFilterClick(tag)}
                        style={{
                          backgroundColor: selectedTags.includes(tag) ? '#0070f3' : '#e0e0e0',
                          color: selectedTags.includes(tag) ? 'white' : '#333',
                          padding: '4px 12px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '13px',
                          display: 'inline-block',
                          transition: 'background-color 0.2s'
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                    {selectedTags.length > 0 && (
                      <span
                        onClick={() => setSelectedTags([])}
                        style={{
                          backgroundColor: '#dc3545',
                          color: 'white',
                          padding: '4px 12px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '13px',
                          display: 'inline-block'
                        }}
                      >
                        clear all
                      </span>
                    )}
                  </div>
                </div>
              )}
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid #ccc', padding: '8px' }}>go link</th>
                  <th style={{ border: '1px solid #ccc', padding: '8px' }}>tags</th>
                  <th style={{ border: '1px solid #ccc', padding: '8px' }}>link</th>
                  {isLocalhost && (
                    <th style={{ border: '1px solid #ccc', padding: '8px' }}>actions</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {Object.entries(filteredLinks).map(([name, data]) => {
                  const displayName = editingNames[name] !== undefined ? editingNames[name] : name;
                  return (
                  <tr key={name}>
                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                      {isLocalhost ? (
                        <input
                          type="text"
                          value={displayName}
                          onChange={(e) => handleNameInputChange(name, e.target.value)}
                          onBlur={(e) => handleNameBlur(name, e.target.value)}
                          placeholder="link name"
                          style={{
                            width: '100%',
                            padding: '4px',
                            border: '1px solid #ddd',
                            borderRadius: '2px',
                            fontWeight: 'bold'
                          }}
                        />
                      ) : (
                        <span style={{ fontWeight: 'bold' }}>{name}</span>
                      )}
                    </td>
                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                      {isLocalhost ? (
                        <input
                          type="text"
                          value={editingTags[name] !== undefined 
                            ? editingTags[name] 
                            : (Array.isArray(data.tags) ? data.tags.join(', ') : '')}
                          onChange={(e) => handleTagsInputChange(name, e.target.value)}
                          onBlur={(e) => handleTagsBlur(name, e.target.value)}
                          placeholder="tag1, tag2, tag3"
                          style={{
                            width: '100%',
                            padding: '4px',
                            border: '1px solid #ddd',
                            borderRadius: '2px'
                          }}
                        />
                      ) : (
                        Array.isArray(data.tags) ? data.tags.map(tag => (
                        <span
                          key={tag}
                          onClick={() => handleTagClick(tag)}
                          style={{
                              backgroundColor: selectedTags.includes(tag) ? '#0070f3' : '#f0f0f0',
                              color: selectedTags.includes(tag) ? 'white' : '#333',
                            padding: '2px 6px',
                            margin: '0 4px 4px 0',
                            borderRadius: '4px',
                            display: 'inline-block',
                            cursor: 'pointer'
                          }}
                        >
                          {tag}
                        </span>
                        )) : ''
                      )}
                    </td>
                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                      {isLocalhost ? (
                        <input
                          type="text"
                          value={data.url || ''}
                          onChange={(e) => handleUrlChange(name, e.target.value)}
                          placeholder="https://..."
                          style={{
                            width: '100%',
                            padding: '4px',
                            border: '1px solid #ddd',
                            borderRadius: '2px'
                          }}
                        />
                      ) : (
                      <a href={data.url} target="_blank" rel="noopener noreferrer">{data.url}</a>
                      )}
                    </td>
                    {isLocalhost && (
                      <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>
                        <button
                          onClick={() => handleDeleteRow(name)}
                          style={{
                            padding: '4px 8px',
                            backgroundColor: '#dc3545',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '12px',
                            textTransform: 'lowercase'
                          }}
                        >
                          delete
                        </button>
                      </td>
                    )}
                  </tr>
                  );
                })}
              </tbody>
            </table>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
} 