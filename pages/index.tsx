/* eslint-disable @next/next/no-img-element */
import site from '../site.conf';
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()
  const { locale, defaultLocale } = router;
  const version = (locale || defaultLocale) as keyof typeof site.home;

  return ([
    <section key="header">
      <div id="header" className="container-fluid d-flex">
        <div id="header-bg-1" className="bg bg1"></div>
        <div id="header-bg-2" className="bg"></div>
        <div className="jumbotron">
          <h1 className="display-3 text-uppercase text-white">{ site.title }</h1>
          <h2 className="text-capitalize spacer-lg-top text-white">{ site.home[version].description }</h2>
          <a id="" className="btn btn-lg btn-danger spacer-lg-top text-white newsletter">{ site.home[version].cta }</a>
        </div>
      </div>            
    </section>,
    
    <section id="actus" className=" bg-light" key="actu">
      <div className="container py-5">
        <div className="row ">
          <div className="col-12">
           <h2 className="spacer-lg-top">{ site.header.news[version] }</h2>                  
          </div>
        </div>
        <div id="posts"></div>
        <div className="row text-center spacer">
          <div className="col-sm-12 spacer-lg-bottom">
            <button id="more-posts" className="btn btn-default">{ site.header.see_more[version] }</button>
          </div>
        </div>
      </div>
    </section>,
    
    <section id="calendrier" key="calendrier">
      <div className="container py-5">
        <div className="row ">
          <div className="col-12">
            <h2 className="spacer-lg-top">{ site.header.calendar[version] }</h2>                  
          </div>
        </div>
        <div id="events"></div>
        <div className="row text-center">
          <div className="col-sm-12 spacer-lg-bottom">
            <button id="more-events" className="btn btn-default">{ site.header.see_more[version] }</button>
          </div>
        </div>
      </div>
    </section>,
    
    <section id="resultats" className="bg-light" key="resultat">
      <div className="container py-5">
        <div className="row">
          <div className="col-12">
           <h2 className="spacer-lg-top">{ site.header.results[version] }</h2>                  
          </div>
        </div>
        <div id="results"></div>
        <div className="row text-center">
          <div className="col-sm-12 spacer-lg-bottom">
            <button id="more-results" className="btn btn-default">{ site.header.see_more[version] }</button>
          </div>
        </div>
      </div>
    </section>,
    
    <section id="parrainage" className="spacer-lg-top text-center" key="parrainage">
      <div className="container py-5">
        <div className="row">
          <div className="col-12">
            <h2 className="spacer-lg-bottom">{ site.header.mentoring[version] }</h2>                  
          </div>
        </div>              
        <div className="row">
          {
            site.mentoring.map((mentor, key) => (
              <div className="col-sm-6 col-md-2 mx-auto" key={key}>
                <img src={ mentor.img } alt={ mentor.name } />
              </div>
            ))
          }
        </div>
      </div>
    </section>,
    
    <section id="sponsors" className="spacer-lg-top  text-center bg-light" key="sponsors">
      <div className="container py-5">
        <div className="row">
          <div className="col-12">
            <h2 className="spacer-lg-top spacer-lg-bottom">{ site.header.sponsors[version] }</h2>                
          </div>
        </div>              
        <div className="row pb-5">
          {site.sponsors.map((sponsor, key) => (
            <div className="col-sm-6 col-md-2 spacer-lg-bottom mx-auto my-2" key={key}>
              <img src={ sponsor.img } alt={ sponsor.name } />
            </div>
          ))}
        </div>
      </div>
    </section>,
    
    <section id="bio" className="" key="bio">
      <div className="container">
        <div className="row ">
          <div className="col-12">
            <h2 id="" className="spacer-lg-top liseret"><i className="fa fa-user" aria-hidden="true"></i> { site.title }</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <h3 className="spacer-lg-top spacer-lg-bottom text-center">{ site.header.team[version] }</h3>                  
          </div>
        </div>              
        <div className="row">
          {site.teams.map((team, key) => (
            <div className="col-sm-6 col-md-4 mx-auto spacer-lg-bottom" key={key}>
              <img src={ team.img } alt={ team.name } />
            </div>
          ))}
        </div>
        <div className="row text-center spacer">
          <div className="col-xs-12 col-sm-4 spacer-lg-bottom">
            <div className="row">
              <div className="col-12">
                <h3 className="spacer-sm-bottom">PROFIL</h3> 
                <ul>
                  <li><strong>{ site.profil[version].name } :</strong> { site.title }</li>
                  <li><strong>{ site.profil[version].nationality } :</strong> Franco - Brittanique</li>
                  <li><strong>{ site.profil[version].date_of_birth } :</strong> 06/04/1988</li>
                  <li><strong>{ site.profil[version].size } :</strong> 1m82</li>
                  <li><strong>{ site.profil[version].weight } :</strong> 70Kg</li>
                </ul>                      
              </div>
            </div>
            <div className="row ">
              <div className="col-12">
                <h3 className="spacer-sm-bottom spacer-lg-top text-uppercase">{ site.profil[version].awards }</h3>
              </div>
            </div>
            <div className="row text-center spacer">
              <div className="col-12">
                <h4 className="text-center spacer-xs-top">DUATHLON</h4>
                <ul>
                  {site.profil[version].results.map(((result, key) => <li key={key}>- { result }</li>))}
                </ul>
              </div>
            </div>
          </div>   
          <div className="col-xs-12 col-sm-8 mb-5">
            <h3 className="text-xs-center text-left">BIO</h3>
            {site.profil[version].bio.map((bio, key) => <p className="text-justify" key={key}>{bio}</p>)}
          </div>
        </div>
      </div>
    </section>,
     
    <section className="container-fluid d-flex bg-light" key="cta">
      <div className="jumbotron">
        <h3 className="spacer-lg-top">{ site.home[version].cta_description }</h3>
        <a className="btn btn-lg btn-danger spacer-lg-top text-white newsletter">{ site.home[version].cta }</a>
      </div>          
    </section>,
  ]      
  )
}
