/* eslint-disable @next/next/no-img-element */
import site from '../site.conf';
import Carousel from '../components/carousel/carousel';
import { Fragment, useEffect, useState } from 'react';
import { Newsletter } from '../components/newsletter/newsletter';
import { Post } from '../components/post/post';
import { getAll } from '../services/base.service';
import { Event } from '../components/event/event';
import { nextEvents } from '../components/event/event.service';
import { Result } from '../components/result/result';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Section } from '../components/section/section';

export default function Home({ version }: { version: string }) {
  const [displayNewsletter, setDisplayNewsletter] = useState(true);
  const [posts, setPosts] = useState([]);
  const [events, setEvents] = useState([]);
  const [results, setResults] = useState([]);
  const [displayAllPost, setDisplayAllPost] = useState(false);
  const [displayAllResults, setDisplayAllResults] = useState(false);

  const toggleDisplayNewsletter = () => setDisplayNewsletter(!displayNewsletter);
  const handleUpdateDisplayNewsletter = (newValue: boolean) => setDisplayNewsletter(newValue);
  const handleDisplayMorePost = () => {
    setDisplayAllPost(!displayAllPost);
  };
  const handleDisplayMoreResult = () => {
    setDisplayAllResults(!displayAllResults);
  };

  useEffect(() => {
    getAll('post').then((datas) => {
      setPosts(datas.reverse());
    });
    getAll('calendar').then((datas) => {
      setEvents(nextEvents(datas) as never[]);
    });
    getAll('results').then((datas) => {
      setResults(datas);
    });
  }, [setPosts, setEvents, setResults]);

  return (
    <>
      <Fragment key="header">
        <Carousel>
          <header>
            <h1 className="display-3 text-uppercase text-white mb-5">{site.title}</h1>
            <h2 className="text-capitalize text-white">{site.home[version as keyof typeof site.home].description}</h2>
            <div>
              <button
                className="btn btn-lg btn-danger mt-5 text-white"
                aria-controls="modal"
                onClick={toggleDisplayNewsletter}
              >
                {site.home[version as keyof typeof site.home].cta}
              </button>
              <Newsletter
                identifier="modal"
                displayNewsletter={displayNewsletter}
                updateDisplayNewsletter={handleUpdateDisplayNewsletter}
              ></Newsletter>
            </div>
          </header>
        </Carousel>
      </Fragment>

      <Section background="bg-light" title={site.header.news[version as keyof typeof site.header.news]} key="actu">
        {(displayAllPost ? posts : posts.length > 0 ? [posts[0]] : []).map(([title, summary, content, link], key) => (
          <Post key={key} summary={summary} title={title} content={content} link={link}></Post>
        ))}
        <div className="text-center spacer">
          <button className="btn btn-secondary" onClick={handleDisplayMorePost}>
            {site.header.see_more[version as keyof typeof site.header.see_more]}
          </button>
        </div>
      </Section>

      <Section key="calendrier" title={site.header.calendar[version as keyof typeof site.header.calendar]}>
        {events.length < 1 ? (
          <h3 className="text-danger mt-3 text-center mt-3"> Aucune épreuve à venir</h3>
        ) : (
          events.map(({ displayDate, city, title }, key) => (
            <Event key={key} date={displayDate} city={city} title={title}></Event>
          ))
        )}
      </Section>

      <Section
        background="bg-light"
        key="resultat"
        title={site.header.results[version as keyof typeof site.header.results]}
      >
        {(displayAllResults ? results : results.length > 0 ? [results[0]] : []).map(
          ([date, event, city, place], key) => (
            <Result key={key} date={date} event={event} city={city} place={place}></Result>
          )
        )}
        {!displayAllResults && (
          <div className="text-center">
            <button className="btn btn-secondary" onClick={handleDisplayMoreResult}>
              {site.header.see_more[version as keyof typeof site.header.see_more]}
            </button>
          </div>
        )}
      </Section>

      <Section title={site.header.mentoring[version as keyof typeof site.header.mentoring]} key="parrainage">
        <div className="row">
          {site.mentoring.map((mentor, key) => (
            <div className="col-sm-6 col-md-2 mx-auto" key={key}>
              <img src={mentor.img} alt={mentor.name} />
            </div>
          ))}
        </div>
      </Section>

      <Section
        background="bg-light"
        title={site.header.sponsors[version as keyof typeof site.header.sponsors]}
        key="sponsors"
      >
        <div className="row pb-5">
          {site.sponsors.map((sponsor, key) => (
            <div className="col-sm-6 col-md-2 mb-5 mx-auto my-2" key={key}>
              <img src={sponsor.img} alt={sponsor.name} />
            </div>
          ))}
        </div>
      </Section>

      <section key="bio" className="container">
        <h2 className="mt-5 liseret">
          <FontAwesomeIcon icon={faUser}></FontAwesomeIcon> {site.title}
        </h2>
        <h3 className="mt-5 mb-5 text-center">{site.header.team[version as keyof typeof site.header.team]}</h3>
        <div className="row">
          {site.teams.map((team, key) => (
            <div className="col-sm-6 col-md-4 mx-auto mb-5" key={key}>
              <img src={team.img} alt={team.name} />
            </div>
          ))}
        </div>
        <div className="row text-center spacer">
          <div className="col-xs-12 col-sm-4 mb-5">
            <h3 className="mb-3">PROFIL</h3>
            <ul>
              <li>
                <strong>{site.profil[version as keyof typeof site.profil].name} :</strong> {site.title}
              </li>
              <li>
                <strong>{site.profil[version as keyof typeof site.profil].nationality} :</strong> Franco - Brittanique
              </li>
              <li>
                <strong>{site.profil[version as keyof typeof site.profil].date_of_birth} :</strong> 06/04/1988
              </li>
              <li>
                <strong>{site.profil[version as keyof typeof site.profil].size} :</strong> 1m82
              </li>
              <li>
                <strong>{site.profil[version as keyof typeof site.profil].weight} :</strong> 70Kg
              </li>
            </ul>
            <h3 className="mb-3 mt-5 text-uppercase">{site.profil[version as keyof typeof site.profil].awards}</h3>
            <div className="text-center spacer">
              <h4 className="text-center mt-2">DUATHLON</h4>
              <ul>
                {site.profil[version as keyof typeof site.profil].results.map((result, key) => (
                  <li key={key}>- {result}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-xs-12 col-sm-8 mb-5">
            <h3 className="text-xs-center text-left">BIO</h3>
            {site.profil[version as keyof typeof site.profil].bio.map((bio, key) => (
              <p className="text-justify" key={key}>
                {bio}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="container-fluid d-flex bg-light" key="cta">
        <div className="jumbotron">
          <h3 className="mt-5">{site.home[version as keyof typeof site.home].cta_description}</h3>
          <button
            aria-controls="modal"
            className="btn btn-lg btn-danger mt-5 text-white"
            onClick={() => {
              setDisplayNewsletter(!displayNewsletter);
            }}
          >
            {site.home[version as keyof typeof site.home].cta}
          </button>
        </div>
      </section>
    </>
  );
}
