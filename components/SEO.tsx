
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Metadata } from '../types';

interface SEOProps {
  metadata: Metadata;
}

const SEO: React.FC<SEOProps> = ({ metadata }) => {
  const { title, description, keywords, openGraph, twitter } = metadata;

  // Returning Helmet directly. In React 19, functional components must return null or an element.
  // We wrap it to ensure a valid node is returned.
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords.join(', ')} />}

      {/* Open Graph / Facebook */}
      {openGraph && (
        <>
          <meta property="og:type" content={openGraph.type || 'website'} />
          <meta property="og:title" content={openGraph.title || title} />
          <meta property="og:description" content={openGraph.description || description} />
          {openGraph.siteName && <meta property="og:site_name" content={openGraph.siteName} />}
          {openGraph.url && <meta property="og:url" content={openGraph.url} />}
          {openGraph.images?.map((image, index) => (
            <React.Fragment key={index}>
              <meta property="og:image" content={image.url} />
              {image.width && <meta property="og:image:width" content={image.width.toString()} />}
              {image.height && <meta property="og:image:height" content={image.height.toString()} />}
              {image.alt && <meta property="og:image:alt" content={image.alt} />}
            </React.Fragment>
          ))}
        </>
      )}

      {/* Twitter */}
      {twitter && (
        <>
          <meta name="twitter:card" content={twitter.card || 'summary_large_image'} />
          <meta name="twitter:title" content={twitter.title || title} />
          <meta name="twitter:description" content={twitter.description || description} />
          {twitter.images?.[0] && <meta name="twitter:image" content={twitter.images[0]} />}
        </>
      )}
    </Helmet>
  ) || null;
};

export default SEO;
