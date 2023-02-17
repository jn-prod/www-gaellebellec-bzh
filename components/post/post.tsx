import { useState } from 'react';

export function Post({
  title,
  summary,
  content,
  link,
}: {
  title: string;
  summary: string;
  content: string;
  link: string;
}) {
  const [displayContent, setDisplayContent] = useState(false);
  const handleDisplayContent = () => {
    setDisplayContent(!displayContent);
  };

  return (
    <article className="post">
      <h3 className="text-danger my-3">{title}</h3>
      <div hidden={displayContent} className="post__summary">
        <p>{summary}</p>
        <button className="btn btn-danger post__load-more" onClick={handleDisplayContent}>
          Lire +
        </button>
      </div>
      <p hidden={!displayContent}>{content}</p>
      {link && (
        <p>
          {' '}
          <a rel="noreferrer" target="_blank" href={link}>
            {' '}
            Suivre le lien
          </a>
        </p>
      )}
    </article>
  );
}
