import {connect} from 'react-redux';
import MainNav from '../components/MainNav';

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

const MainNavContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainNav);

export default MainNavContainer;
