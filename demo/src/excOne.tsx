import React, { useEffect } from "react";
import { useState } from "react";
import web3express from "../../lib/index";
const { ConnectSelect } = web3express;

const ExcOne = () => {
	const [isMounted, setIsmounted] = useState(false);

	useEffect(
		function () {
			if (!isMounted) {
				setIsmounted(true);
			}

			return function () {
				if (isMounted) {
					setIsmounted(false);
				}
			};
		},
		[isMounted]
	);

	return (
		<div>
			<ConnectSelect mode="dropdown">
				<button>激活钱包</button>
			</ConnectSelect>
		</div>
	);
};
export default ExcOne;
