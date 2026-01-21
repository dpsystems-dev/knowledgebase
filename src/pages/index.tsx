import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
      </div>
    </header>
  );
}

type ProductCardProps = {
  title: string;
  description: string;
  link: string;
};

function ProductCard({title, description, link}: ProductCardProps) {
  return (
    <div className={clsx('col col--4')}>
      <div className={styles.productCard}>
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
        <Link className="button button--primary" to={link}>
          View Documentation
        </Link>
      </div>
    </div>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Home"
      description="DPSystems Knowledge Base - Documentation for all products">
      <HomepageHeader />
      <main>
        <section className={styles.products}>
          <div className="container">
            <Heading as="h2" className="text--center margin-bottom--lg">
              Products
            </Heading>
            <div className="row">
              <ProductCard
                title="ABM Web Portal"
                description="Comprehensive documentation for the ABM Web Portal including installation, technical guides, and troubleshooting."
                link="/abm-web-portal/description"
              />
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
