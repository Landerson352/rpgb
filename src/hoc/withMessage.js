// Example cloud function call as HoC
import { compose, lifecycle, withHandlers, withState } from 'recompose';

import { helloWorld } from '../functions';

const withMessage = compose(
  withState('message', 'setMessage'),
  withHandlers({
    getMessage: ({ setMessage }) => () => {
      // TODO: cancel the setState if the component un-mounts before a response
      // https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html
      helloWorld().then(({ data }) => {
        setMessage(data);
      }).catch(({ code, message, details }) => {
        // console.log(code, message, details);
      });
    },
  }),
  lifecycle({
    componentDidMount() {
      this.props.getMessage();
    }
  }),
);

export default withMessage;
