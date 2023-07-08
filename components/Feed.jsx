'use client';

import { useState, useEffect } from 'react';

import CodeSnippetCard from './CodeSnippetCard';

const CodeSnippetCardList = ({ data, handleTagClick }) => {
	return (
		<div className='mt-16 snippets_layout'>
			{data.map((post) => (
				<CodeSnippetCard
					key={post._id}
					post={post}
					handleTagClick={handleTagClick}
				/>
			))}
		</div>
	);
};

const Feed = () => {
	const [allPosts, setAllPosts] = useState([]);

	// Search states
	const [searchText, setSearchText] = useState('');
	const [searchTimeout, setSearchTimeout] = useState(null);
	const [searchedResults, setSearchedResults] = useState([]);

	const fetchCards = async () => {
		const response = await fetch('/api/snippet');
		const data = await response.json();

		setAllPosts(data);
	};

	useEffect(() => {
		fetchCards();
	}, []);

	const filterSnippets = (searchtext) => {
		const regex = new RegExp(searchtext, 'i'); // 'i' flag for case-insensitive search
		return allPosts.filter(
			(item) =>
				regex.test(item.creator.username) ||
				regex.test(item.tag) ||
				regex.test(item.snippet)
		);
	};

	const handleSearchChange = (e) => {
		clearTimeout(searchTimeout);
		setSearchText(e.target.value);

		// debounce method
		setSearchTimeout(
			setTimeout(() => {
				const searchResult = filterSnippets(e.target.value);
				setSearchedResults(searchResult);
			}, 500)
		);
	};

	const handleTagClick = (tagName) => {
		setSearchText(tagName);

		const searchResult = filterSnippets(tagName);
		setSearchedResults(searchResult);
	};

	return (
		<section className='feed'>
			<form className='relative w-full max-w-2xl flex_center'>
				<input
					type='text'
					placeholder='Search by coding language or a username'
					value={searchText}
					onChange={handleSearchChange}
					required
					className='search_input peer'
				/>
			</form>

			{/* All Snippets */}
			{searchText ? (
				<CodeSnippetCardList
					data={searchedResults}
					handleTagClick={handleTagClick}
				/>
			) : (
				<CodeSnippetCardList data={allPosts} handleTagClick={handleTagClick} />
			)}
		</section>
	);
};

export default Feed;
