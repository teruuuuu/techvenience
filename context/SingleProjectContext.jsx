import { useState, createContext } from 'react';

const SingleProjectContext = createContext();

export const SingleProjectProvider = ({ page, blocks, children }) => {
	const [pageData, setPageData] = useState(page);
	const [blocksData, setBlocksData] = useState(blocks);

	return (
		<SingleProjectContext.Provider
			value={{ pageData, setPageData, blocksData, setBlocksData }}
		>
			{children}
		</SingleProjectContext.Provider>
	);
};

export default SingleProjectContext;
