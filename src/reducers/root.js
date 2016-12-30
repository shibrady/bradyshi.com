import {combineReducers} from 'redux';
import projects from './projects';
import blog from './blog';

const root = combineReducers({projects, blog});

export default root;
