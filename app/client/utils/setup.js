
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

const customConnect = function(name, actions, container){
  return connect((state) => ({
    state: state[name]
  }), (dispatch) => ({
    actions: bindActionCreators(actions, dispatch),
    dispatch: dispatch,
  }))(withRouter(container));
};

export default {
  customConnect,
};
