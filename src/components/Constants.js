import React from 'react';

const LISTING_STATUS = {
	AVAILABLE: 0,
	RESERVED: 1,
	IN_USE: 2,
	HIDDEN: 3,
}

const UserContext = React.createContext({
  userInfo: null,
});

export { LISTING_STATUS, UserContext };
