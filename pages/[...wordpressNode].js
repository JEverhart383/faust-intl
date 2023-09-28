import { getWordPressProps, WordPressTemplate } from '@faustwp/core';

export default function Page(props) {
  return <WordPressTemplate {...props} />;
}

export function getStaticProps(ctx) {
  console.log(ctx)
  return getWordPressProps({ ctx, revalidate: 1});
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}
