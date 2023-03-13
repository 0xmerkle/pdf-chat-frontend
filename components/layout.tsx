import React from 'react';
import styles from './layout.module.css';
import Head from 'next/head';
import Image from 'next/image';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';

const name = 'Chat PDF';
export const siteTitle = 'Chat PDF';

interface LayoutProps {
  children: React.ReactNode;
  home: boolean;
}

export default function Layout({ children, home }: LayoutProps) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Learn how to build a personal website using Next.js" />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <Image
              priority
              src="/images/magic_spell_book-2.png"
              className={utilStyles.borderCircle}
              height={144}
              width={144}
              alt=""
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <Image
                priority
                src="/images/magic_spell_book-2.png"
                className={utilStyles.borderCircle}
                height={108}
                width={108}
                alt=""
              />
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/" className={utilStyles.colorInherit}>
                {name}
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">← Back to home</Link>
        </div>
      )}
      <footer className={styles.footer}>
        <p>quick build to learn ~ merk 🧰 </p>
        Follow me on Twitter
        <a href="https://twitter.com/0xmerkle" target="_blank" rel="noopener noreferrer">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16px" height="16px">
            <path
              fill="#000"
              d="M21.943 5.185c.008.16.008.32.008.483 0 4.923-3.738 10.56-10.558 10.56-2.096 0-4.048-.61-5.691-1.64.29.034.583.051.875.051 1.711 0 3.286-.585 4.524-1.566a3.74 3.74 0 0 1-3.492-2.589c.29.051.592.085.9.085.437 0 .855-.068 1.254-.204a3.735 3.735 0 0 1-2.992-3.663v-.047a3.747 3.747 0 0 0 1.684.468 3.73 3.73 0 0 1-1.195-4.987 10.59 10.59 0 0 0 7.69 3.893 3.734 3.734 0 0 1 6.37-3.403 7.48 7.48 0 0 0 2.358-.897 3.716 3.716 0 0 1-1.633 2.054 7.45 7.45 0 0 0 2.14-.585 7.72 7.72 0 0 1-1.848 1.927z"
            />
          </svg>{' '}
        </a>
      </footer>
    </div>
  );
}
