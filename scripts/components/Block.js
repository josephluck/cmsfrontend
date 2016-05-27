import React from 'react';

function Block({
	loading,
	children
}) {
	if (loading) {
		return (
			<div>{"Loading"}</div>
		)
	} else {
		return children;
	}
}

export default Block;