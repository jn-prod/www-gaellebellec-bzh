import Layout from '../components/layout/layout';
import Home from '../views/home';

export default function Index() {
  const version = 'fr';
  return (
    <Layout version={version}>
      <Home version={version}></Home>
    </Layout>
  );
}
