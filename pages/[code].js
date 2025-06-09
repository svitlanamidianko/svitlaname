import fs from 'fs';
import path from 'path';

export async function getServerSideProps(context) {
  const { code } = context.params;

  // Read links.json
  const filePath = path.join(process.cwd(), 'pages', 'links.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const links = JSON.parse(fileContents);

  if (links[code]) {
    // Redirect to the mapped URL
    return {
      redirect: {
        destination: links[code].url,
        permanent: false,
      },
    };
  } else {
    // Not found
    return {
      notFound: true,
    };
  }
}

export default function ShortlinkPage() {
  // This page will never actually render, because of the redirect or 404 above
  return null;
}