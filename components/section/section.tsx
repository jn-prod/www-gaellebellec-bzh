import { ReactNode } from 'react';

export function Section({ background, children, title }: { background?: string; children: ReactNode; title: string }) {
  return (
    <section className={`py-5 ${background}`} key="actu">
      <div className="container py-5">
        <h2 className="pb-3">{title}</h2>
        {children}
      </div>
    </section>
  );
}
