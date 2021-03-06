import * as React from 'react';
import { NextContext } from 'next';

import Routes from '../routes';

class Index extends React.Component {
  static async getInitialProps({ res }: NextContext) {
    // If we arrive to the index '/' page, redirect to today's map:
    // /map/yyyy/mm/dd
    const [today] = new Date().toISOString().split('T');

    // `today` is in dd-mm-yyyy format, we convert it to yyyy/mm/dd format
    const newUrl = today.split('-').join('/');

    // https://github.com/zeit/next.js/wiki/Redirecting-in-%60getInitialProps%60
    if (res) {
      res.writeHead(302, {
        Location: `/map/${newUrl}`
      });
      res.end();
    } else {
      Routes.Router.pushRoute(`/map/${newUrl}`);
    }
    return {};
  }
}

export default Index;
