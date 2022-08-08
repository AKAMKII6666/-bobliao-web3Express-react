import React, { useEffect } from "react";
import { useState } from "react";
import Web3Express from "../../lib/index";

const ExcOne = () => {
	const [isMounted, setIsmounted] = useState(false);

	const { ConnectSelect } = Web3Express;

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
