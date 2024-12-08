import { useRouter } from 'next/router';

const SearchBar = () => {
  const router = useRouter();

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      const searchQuery = e.target.value.trim();
      if (searchQuery) {
        router.push(`/search?keyword=${searchQuery}`);
      }
    }
  };

  return (
    <div className="flex justify-center mb-12 w-full"
    style={{ marginTop: "-20px" }}
    >
      <div className="relative w-2/3">
        <input
          type="text"
          placeholder="Search for a book..."
          className="w-full p-4 pl-12 border rounded-lg text-lg"
          onKeyDown={handleSearch}
        />
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
