import SearchForm from "./component/SearchForm";
import React from "react";
import RepositoryList from "./component/RepositolyList";
import RepositoryFilterUI from "./component/RepositoryFilterUI";
// import { Input } from "./components/ui/input";

function App() {
  const [username, setUsername] = React.useState("");

  const [language, setLanguage] = React.useState<string | null>(null);
  const [sort, setSort] = React.useState<"stars" | "updated">("updated");

  return (
    <div>
      <div className="">
        <h1 className="text-3xl font-bold mb-6 text-center">
          GitHub Repository Explorer
        </h1>
        <div className="flex flex-col md:flex-row items-center justify-between py-2 px-4">
          <SearchForm onSearch={setUsername} />
          <RepositoryFilterUI setLanguage={setLanguage} setSort={setSort} />
        </div>

        {username && (
          <RepositoryList language={language} sort={sort} username={username} />
        )}
      </div>
    </div>
  );
}

export default App;
