const initialState = {
	login: false
}

export const loginReducer = (state=initialState, action) => {
	switch (action.type){
		case 'isLoggedIn':
			return {
				login: true
			}
		case 'isNotLoggedIn':
			return {
				login: false
			}

		default: return initialState
	}
}