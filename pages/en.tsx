import Layout from '../components/layout/layout';
import Home from '../views/home';

export default function IndexEn() {
  const version = 'en';
  return (
    <Layout version={version}>
      <Home version={version}></Home>
    </Layout>
  );
}
