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
      <input
        type="text"
        placeholder="Search for a book..."
        className="w-2/3 p-4 border rounded-lg text-lg"
        onKeyDown={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
