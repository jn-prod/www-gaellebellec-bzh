/* eslint-disable @next/next/no-img-element */
/* eslint-disable turbo/no-undeclared-env-vars */
import Head from 'next/head'
import Script from 'next/script';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';
import site from '../../site.conf';

interface ILayout {
    children: React.ReactNode
}

export default function Layout({ children }: ILayout) {
    const router = useRouter()
    const { locale, defaultLocale } = router;
    const version = locale || defaultLocale;
  return (
    <>
      <Head>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
        <meta name="author" content={ site.title }/>
        <link rel="icon" href="/favicon.ico"/>
        <title>{`${ site.title }, ${ site.home[version as keyof typeof site.home].description }.`}</title>
        <meta name="description" content={`${ site.title }. ${ site.home[version as keyof typeof site.home].description }.`}/>
        {process.env.development && ([
          <Script key="ga-src" async src="https://www.googletagmanager.com/gtag/js?id=UA-19844527-6" />,
          <Script id="ga-script" key="ga-script">{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){
                dataLayer.push(arguments)
            }
            gtag('js', new Date());

            gtag('config', 'UA-19844527-6');
          `}
          </Script>
        ])}
      </Head>

        <div className="container-fluid ">

            <header className="container-fluid bg-danger  clearfix">

            <div className="container header">
    <div className="row">
            <div className="col-1 liseret">
            </div>
            <div className="col-10">
            <nav>
                <ul className="nav nav-pills text-md-center nav-justified ">
                <li className="nav-item my-auto">
                    <a className="nav-link text-white" href="#actus">{ site.header.news[version as keyof typeof site.header.news] }</a>
                </li>
                <li className="nav-item my-auto">
                    <a className="nav-link text-white" href="#calendrier">{ site.header.calendar[version as keyof typeof site.header.calendar] }</a>
                </li>                
                <li className="nav-item my-auto">
                    <a className="nav-link text-white" href="#resultats">{ site.header.results[version as keyof typeof site.header.results] }</a>
                </li>
                <li className="nav-item my-auto">
                    <a className="nav-link text-white" href="#bio">{ site.header.bio[version as keyof typeof site.header.bio] }</a>
                </li>
                <li className="nav-item my-auto">
                    <a className="nav-link text-white" href="#sponsors">{ site.header.sponsors[version as keyof typeof site.header.sponsors] }</a>
                </li>                
                <li className="nav-item float-right my-auto">
                    <a className="nav-link text-white" target="_blank" href="https://www.youtube.com/results?search_query=gael+le+bellec" rel="noreferrer"><i className="fab fa-youtube" aria-hidden="true"></i></a>
                </li>  
                <li className="nav-item float-right my-auto">
                    <a className="nav-link text-white" target="_blank" href="https://www.facebook.com/gael.lebellec.568" rel="noreferrer"><i className="fab fa-facebook" aria-hidden="true"></i></a>
                </li>
                <li className="nav-item float-right my-auto">
                    <a className="nav-link text-white" target="_blank" href="https://www.instagram.com/gaellbllec/" rel="noreferrer"><i className="fab fa-instagram" aria-hidden="true"></i></a>
                </li>
                <li className="nav-item float-right my-auto">
                    <Link href='/' locale={ version === defaultLocale ? 'en' : defaultLocale } >
                        <a className="nav-link text-white flag">
                            <img src={`/img/${site.header.flag[version as keyof typeof site.header.flag]}`} alt="english version" />
                        </a>
                    </Link>
                </li>                               
                </ul>
            </nav>                
            </div>
            <div className="col-1 liseret">
            </div>
        </div>      
    </div>

            </header>

        <main role="main">

        { children }
        
      </main>
      <footer className="footer">
        <div className="container">
            <div className="row">
                <div className="col-sm-12 text-center">
                <ul>
                    <li>© { site.title } 2017 | </li>
                    <li>
                    <a href="#actus" rel="nofollow" className="text-danger">{ site.header.news[version as keyof typeof site.header.news] }</a> | 
                    </li>
                    <li>
                    <a href="#calendrier" rel="nofollow" className="text-danger">{ site.header.calendar[version as keyof typeof site.header.calendar] }</a> | 
                    </li>
                    <li>
                    <a href="#resultats" rel="nofollow" className="text-danger">{ site.header.results[version as keyof typeof site.header.results] }</a> | 
                    </li>

                    <li>
                    <a href="#bio" rel="nofollow" className="text-danger">{ site.header.bio[version as keyof typeof site.header.bio] }</a> | 
                    </li>
                    <li>
                    <a href="#sponsors" rel="nofollow" className="text-danger">{ site.header.sponsors[version as keyof typeof site.header.sponsors] }</a> | 
                    </li>
                    <li>
                    <a href="https://www.facebook.com/gael.lebellec.568" target="_blank" rel="nofollow noreferrer" className="text-danger"><i className="fab fa-facebook" aria-hidden="true"></i></a> | 
                    </li>  
                    <li>
                    <a href="https://www.instagram.com/gaellbllec/" target="_blank" rel="nofollow noreferrer" className="text-danger"><i className="fab fa-instagram" aria-hidden="true"></i></a> | 
                    </li>                  
                    <li>
                    <a href="https://www.youtube.com/results?search_query=gael+le+bellec" target="_blank" rel="nofollow noreferrer" className="text-danger"><i className="fab fa-youtube" aria-hidden="true"></i></a> | 
                    </li>
                    <li className="text-default">Réalisation <a title="Nicolas Jouanno - PRODUCT MANAGER, skills MARKETING, DESIGN & TECH" href="https://nicolasjouanno.com" target="_blank" rel="noreferrer">Nicolas Jouanno</a></li>
                </ul>                
                </div>
            </div>
            </div>
      </footer>
      </div>
    </>
  )
}