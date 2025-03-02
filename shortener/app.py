from flask import Flask, render_template, request, redirect, jsonify
import json
import os

app = Flask(__name__)

# Paths configuration
DB_PATH = 'links.json'
GITHUB_PAGES_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))  # Go up one directory to reach repository root

def load_links():
    if os.path.exists(DB_PATH):
        with open(DB_PATH, 'r') as f:
            return json.load(f)
    return {}

def save_links(links):
    with open(DB_PATH, 'w') as f:
        json.dump(links, f, indent=4)

def create_redirect_html(short_code, long_url):
    """Generate a static HTML file for GitHub Pages redirect"""
    redirect_html = f"""<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="refresh" content="0; url={long_url}">
    <title>Redirecting...</title>
</head>
<body>
    <p>Redirecting to {long_url}... If you are not redirected automatically, 
       <a href="{long_url}">click here</a>.</p>
</body>
</html>"""
    
    # Create directory if it doesn't exist
    os.makedirs(os.path.join(GITHUB_PAGES_PATH, short_code), exist_ok=True)
    
    # Write the index.html file
    with open(os.path.join(GITHUB_PAGES_PATH, short_code, 'index.html'), 'w') as f:
        f.write(redirect_html)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/create_link', methods=['POST'])
def create_link():
    data = request.json
    long_url = data.get('long_url')
    short_code = data.get('short_code')
    
    if not long_url or not short_code:
        return jsonify({'error': 'Missing required fields'}), 400
    
    links = load_links()
    
    if short_code in links:
        return jsonify({'error': 'Short code already exists'}), 400
    
    links[short_code] = long_url
    save_links(links)
    
    # Generate static HTML file for GitHub Pages
    try:
        create_redirect_html(short_code, long_url)
        return jsonify({
            'message': 'Link created successfully',
            'short_url': f'https://svitlana.me/{short_code}',
            'note': 'Remember to commit and push the changes to GitHub!'
        })
    except Exception as e:
        return jsonify({
            'error': f'Failed to create static file: {str(e)}'
        }), 500

@app.route('/<short_code>')
def redirect_to_url(short_code):
    if short_code in ['create_link']:
        return render_template('404.html'), 404
        
    links = load_links()
    long_url = links.get(short_code)
    
    if long_url:
        return redirect(long_url)
    return render_template('404.html'), 404

if __name__ == '__main__':
    app.run(debug=True) 