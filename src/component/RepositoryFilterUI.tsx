import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { languageOptions } from "@/lib/constants";

type Props = {
  setLanguage: (value: string | null) => void;
  setSort: (value: "stars" | "updated") => void;
};

export default function RepositoryFilterUI(props: Props) {
  const { setLanguage, setSort } = props;
  // const { data, loading, error } = useQuery(GET_USER_REPOS, {
  //   variables: { username, first: 50 },
  //   skip: !username,
  // });

  // const repos = data?.user?.repositories?.nodes ?? [];

  // const languages = useMemo(() => {
  //   const langs = new Set<string>();
  //   repos.forEach(
  //     (repo: { primaryLanguage: { name: string } }) =>
  //       repo.primaryLanguage?.name && langs.add(repo.primaryLanguage.name)
  //   );
  //   return Array.from(langs);
  // }, [repos]);

  // console.log(languages, "Here is the language");

  // const filteredData = useFilterRepos(repos, language, sort);

  // console.log(filteredData, "here is filtered Data");

  //   const filteredRepos = useMemo(() => {
  //     let result = [...repos];

  //     if (language) {
  //       result = result.filter((repo) => repo.primaryLanguage?.name === language);
  //     }

  //     result.sort((a, b) => {
  //       if (sort === "stars") return b.stargazerCount - a.stargazerCount;
  //       return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  //     });

  //     return result;
  //   }, [repos, language, sort]);

  // if (loading)
  //   return <p className="text-muted-foreground">Loading repositories...</p>;
  // if (error) return <p className="text-destructive">Error: {error.message}</p>;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 items-center">
        {/* Language Filter */}
        <Select onValueChange={setLanguage}>
          <SelectTrigger className="w-52">
            <SelectValue placeholder="Filter by language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            {languageOptions.map((lang) => (
              <SelectItem key={lang} value={lang}>
                {lang}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Sort Option */}
        <Select
          onValueChange={(value: "stars" | "updated") => setSort(value)}
          defaultValue="updated">
          <SelectTrigger className="w-52">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="stars">⭐ Stars (High → Low)</SelectItem>
            <SelectItem value="updated">🕒 Last Updated</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Repo List
      <div className="grid gap-4 md:grid-cols-2">
        {filteredRepos.map((repo) => (
          <RepositoryCard key={repo.name} repo={repo} />
        ))}
      </div> */}
    </div>
  );
}
