import Feed from '@components/Feed';

const Home = () => (
	<section className='flex-col w-full flex_center'>
		<h1 className='text-center head_text'>
			Discover & Share
			<br />
			<span className='text-center orange_gradient'>
				{'<'}code snippets{'/>'}
			</span>
		</h1>
		<p className='text-center desc'>
			SnippetLand is a tool to discover, create and share creative code snippets
		</p>

		<Feed />
	</section>
);

export default Home;
