export function Newsletter({
  identifier,
  displayNewsletter,
  updateDisplayNewsletter,
}: {
  identifier: string;
  displayNewsletter: boolean;
  updateDisplayNewsletter: (arg: boolean) => void;
}) {
  return (
    <article
      hidden={displayNewsletter}
      className="newsletter-form"
      role="dialog"
      id={identifier}
      aria-label="Inscription a la newsletter"
      aria-modal="true"
    >
      <main className="newsletter-form__main">
        <button
          className="btn btn-outline-secondary newsletter-form__close-button"
          onClick={() => updateDisplayNewsletter(!displayNewsletter)}
        >
          X
        </button>
        <p>
          Abonnez-vous maintenant et restez informé chaque mois de mes prochaines compétitions, mes derniers classements
          et surtout mon défrief du mois!
        </p>
        <form
          action="https://docs.google.com/forms/d/e/1FAIpQLSe2TveY73jexT4zlbmeJxS9P1T-Xt2nj90DJ-mfm4G3WQddng/formResponse"
          target="_blank"
          method="POST"
          id="mG61Hd"
          className="form-inline"
        >
          <div className="input-group">
            <input
              placeholder="votre@email.ici"
              type="email"
              className="form-control"
              jsname="YPqjbf"
              autoComplete="mail"
              tabIndex={0}
              aria-label="Votre adresse e-mail"
              name="emailAddress"
              value=""
              required
              dir="auto"
              data-initial-dir="auto"
              data-initial-value=""
            />
          </div>
          <div className="input-group">
            <input
              placeholder="votre prénom"
              type="text"
              className="form-control"
              jsname="YPqjbf"
              autoComplete="off"
              tabIndex={0}
              aria-label="Prénom"
              aria-describedby="i.desc.1993717463 i.err.1993717463"
              name="entry.1462355575"
              value=""
              dir="auto"
              data-initial-dir="auto"
              data-initial-value=""
            />
          </div>
          <input type="submit" className="btn btn-danger" />
          <input type="hidden" name="fvv" value="1" />
          <input type="hidden" name="draftResponse" value='[null,null,"6858085896552653950"]' />
          <input type="hidden" name="pageHistory" value="0" />
          <input type="hidden" name="fbzx" value="6858085896552653950" />
        </form>
      </main>
    </article>
  );
}
