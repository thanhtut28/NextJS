import Head from 'next/head';
import '../styles/globals.css';
import Layout from '../components/layout/Layout';

function MyApp({ Component, pageProps }) {
    return (
        <Layout>
            <Head>
                <title>{pageProps.title}</title>
                <meta name="description" content={pageProps.description || pageProps.title}></meta>
            </Head>
            <Component {...pageProps} />
        </Layout>
    );
}

export default MyApp;
