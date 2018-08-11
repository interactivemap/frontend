import { compose } from 'recompose';

import handleAuthentication from './decorators/handleAuthentication';
import withLogin from '../decorators/withLogin';

const Callback = (): JSX.Element => null;

export default compose(
  withLogin,
  handleAuthentication
)(Callback);
