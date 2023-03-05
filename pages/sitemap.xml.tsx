import { ServerResponse } from "http";
import site from '../site.conf';

function generateSiteMap(links: string[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${links
       .map((link) => {
         return `
       <url>
           <loc>${site.baseUrl}/${link}</loc>
           <lastmod>${new Date().toUTCString()}</lastmod>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

export default function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }: {res: ServerResponse}) {
  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(['', 'en']);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}