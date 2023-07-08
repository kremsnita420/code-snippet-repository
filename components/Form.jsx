import Link from 'next/link';

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
	const codeLangs = ['javascript', 'php'];
	return (
		<section className='flex-col w-full max-w-full flex_start'>
			<h1 className='text-left head_text'>
				<span className='blue_gradient'>{type} Snippet of Code</span>
			</h1>
			<p className='max-w-md text-left desc'>
				{type} and share amazing code snippets with the world.
			</p>

			<form
				onSubmit={handleSubmit}
				className='flex flex-col w-full max-w-4xl mt-10 gap-7 glassmorphism'>
				<label>
					<span className='text-base font-semibold text-gray-700 font-satoshi'>
						Title
					</span>
					<input
						value={post.title}
						onChange={(e) => setPost({ ...post, title: e.target.value })}
						type='text'
						placeholder='Write your title here'
						required
						className='form_input'
					/>
				</label>
				<label>
					<span className='text-base font-semibold text-gray-700 font-satoshi'>
						Snippet description
					</span>

					<textarea
						value={post.description}
						onChange={(e) => setPost({ ...post, description: e.target.value })}
						placeholder='Write your description here'
						required
						className='form_textarea'
					/>
				</label>
				<label>
					<span className='text-base font-semibold text-gray-700 font-satoshi'>
						Your Code Snippet
					</span>

					<textarea
						value={post.snippet}
						onChange={(e) => setPost({ ...post, snippet: e.target.value })}
						placeholder='Write your code here'
						required
						className='form_textarea'
					/>
				</label>

				<label>
					<span className='text-base font-semibold text-gray-700 font-satoshi'>
						Coding language{' '}
						<span className='font-normal'>(javascript, php, python, ...)</span>
					</span>
					{/* <input
						value={post.tag}
						onChange={(e) => setPost({ ...post, tag: e.target.value })}
						type='text'
						placeholder='Select language'
						required
						className='form_input'
					/> */}
				</label>
				<select
					className='bg-white form_input'
					value={post.tag}
					onChange={(e) => setPost({ ...post, tag: e.target.value })}>
					{/* Create array of options and map them */}
					{codeLangs.map((lang, i) => (
						<option key={`lang-${i}`}>{lang}</option>
					))}
				</select>

				<div className='gap-4 mx-3 mb-5 flex_end'>
					<Link href='/' className='text-sm text-gray-500'>
						Cancel
					</Link>

					<button
						type='submit'
						disabled={submitting}
						className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'>
						{submitting ? `${type}ing...` : type}
					</button>
				</div>
			</form>
		</section>
	);
};

export default Form;
