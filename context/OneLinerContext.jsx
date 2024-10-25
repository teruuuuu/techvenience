import { useState, createContext } from 'react';

// Create oneLiner context
export const OneLinerContext = createContext();

// Create the oneLiner context provider
export const OneLinerProvider = ({list, tags, children}) => {
	const [oneLiner, setOneLiner] = useState(list);
	const [tagList, setTagList] = useState(tags);

	return (
		<OneLinerContext.Provider
			value={{
				oneLiner,
				setOneLiner,
				tagList,
				setTagList
			}}
		>
			{children}
		</OneLinerContext.Provider>
	);
};
