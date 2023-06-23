import { Helmet } from 'react-helmet-async';

export const MetaTag = ({
   title,
   ogTitle,
   description,
   image,
   url,
   twitterTitle,
   twitterDescription,
   twitterImage,
   twitterCard,
   href,
   ogType,
}: any) => {
   return (
      <Helmet>
         <title>{title}</title>
         <meta name="description" content={description} />
         <meta property="og:title" content={ogTitle} />
         <meta property="og:type" content={ogType} />
         <meta property="og:description" content={description} />
         <meta property="og:image" content={image} />
         <meta property="og:url" content={url} />
         <meta name="twitter:title" content={twitterTitle} />
         <meta name="twitter:description" content={twitterDescription} />
         <meta name="twitter:image" content={twitterImage} />
         <meta name="twitter:card" content={twitterCard} />
         <link rel="canonical" href={href} />
      </Helmet>
   );
};
