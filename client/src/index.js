import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import './index.css';
import App from './App';
import Register from './Register';
import Login from './Login'
import Table from './Table'
import * as serviceWorker from './serviceWorker';
import {createStore} from 'redux';
import {isLoggedIn, isNotLoggedIn} from './actions/login';
import {loginReducer} from './reducers/loginReducer';
import {Provider} from 'react-redux';

//STORE
let store = createStore(loginReducer);

if(localStorage.getItem('token')){
	store.dispatch(isLoggedIn());
}else{
	store.dispatch(isNotLoggedIn());
}

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
				<Switch>
					< Route exact path='/' component={App} />
					< Route exact path='/login' component={Login} />
					< Route exact path='/register' component={Register} />
					< Route exact path='/table' component={Table} />
				</Switch>
		</BrowserRouter>
	</Provider>
	, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
