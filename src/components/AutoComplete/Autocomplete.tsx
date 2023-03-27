import { useState } from "react";
import { headingSizes } from "../../utils/Utils.fontSize";
import "./AutoComplete.scss";
import {PrimaryBG , PrimaryBorder , PrimaryText} from "../../utils/utils.primaryColor";
const AutoComplete = (data: any) => {

	//  data.data.map((_: { aliasName: any }) => {
	// 	return _.aliasName;
	// });
	const [suggestions, setSuggestions] = useState([]);
	const [suggestionIndex, setSuggestionIndex] = useState(0);
	const [suggestionsActive, setSuggestionsActive] = useState(false);
	const [value, setValue] = useState("");

	const handleChange = (e: { target: { value: string } }) => {
		const query = String(e.target.value).toLowerCase();
		setValue(e.target.value);
		if (query.length > 0) {
			const filterSuggestions = data.filter((suggestion: string) => String(suggestion).toLowerCase().indexOf(query) > -1);
			setSuggestions(filterSuggestions);
			setSuggestionsActive(true);
		} else {
			setSuggestionsActive(false);
		}
	};
	const handleClick = (event: any) => {
		setSuggestions([]);
		setValue(event.target.innerText);
		setSuggestionsActive(false);
	};
	const handleKeyDown = (e: { keyCode: number }) => {
		// UP ARROW
		if (e.keyCode === 38) {
			if (suggestionIndex === 0) {
				return;
			}
			setSuggestionIndex(suggestionIndex - 1);
		}
		// DOWN ARROW
		else if (e.keyCode === 40) {
			if (suggestionIndex - 1 === suggestions.length) {
				return;
			}
			setSuggestionIndex(suggestionIndex + 1);
		}
		// ENTER
		else if (e.keyCode === 13) {
			setValue(suggestions[suggestionIndex]);
			setSuggestionIndex(0);
			setSuggestionsActive(false);
		}
	};

	const Suggestions = () => {
		return (
			<ul className={`suggestions bg-sky-50 flex flex-col w-full border-x-[.25rem] ${PrimaryBorder[900]}`}>
				{suggestions.map((suggestion, index) => (
					<div onClick={handleClick} className={`searchOptions w-full flex flex-wrap border-b-[.25rem] ${PrimaryBorder[900]} items-center justify-start`}>
						<li
							className={index === suggestionIndex ? `active ${headingSizes.h4}` : `${headingSizes.h4} ${PrimaryText[900]} flex items-center`}
							key={index}>
							{suggestion}
						</li>
					</div>
				))}
			</ul>
		);
	};

	return (
		<div className={`div w-full h-fit`}>
		<div className={`${PrimaryBG[100]} p-[0.6rem] rounded-lg border-[0.3rem] ${PrimaryBorder[900]}`}>
			<div className="flex items-center flex-row-reverse justify-between bg-transparent gap-[1rem] text-[2rem]">
				<input
					className={`bg-transparent outline-none w-full`}
					type="search"
					placeholder="Search" id=""
					value={value}
					onChange={handleChange}
					onKeyDown={handleKeyDown}
				/>
				<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" xmlBase="http://svgjs.com/svgjs" x="0" y="0" viewBox="0 0 56.966 56.966"  className="w-[2rem]"><g><path d="M55.146 51.887 41.588 37.786A22.926 22.926 0 0 0 46.984 23c0-12.682-10.318-23-23-23s-23 10.318-23 23 10.318 23 23 23c4.761 0 9.298-1.436 13.177-4.162l13.661 14.208c.571.593 1.339.92 2.162.92.779 0 1.518-.297 2.079-.837a3.004 3.004 0 0 0 .083-4.242zM23.984 6c9.374 0 17 7.626 17 17s-7.626 17-17 17-17-7.626-17-17 7.626-17 17-17z" fill="#0c4a6e" data-original="#000000" className=""></path></g></svg>
			</div>
		</div>
			<div className="searchResults w-full overflow-y-scroll">{suggestionsActive && <Suggestions />}</div>
		</div>
	);
};

export default AutoComplete;