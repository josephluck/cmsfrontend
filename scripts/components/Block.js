import React from 'react';

function Block({
	loading,
	children
}) {
	if (loading) {
		return (
			<div>{"Loading"}</div>
		)
	} else if (children) {
		return children;
	} else {
		return null;
	}
}

export default Block;