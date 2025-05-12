import React from "react";
export const useFilterRepos = (repos:any[], language:string | null, sort:string) => {


  const filteredRepos = React.useMemo(() => {
    let result = [...repos];

    if (language) {
      result = language === "All" ? result : result.filter((repo) => repo.primaryLanguage?.name === language);
    }

    result.sort((a, b) => {
      if (sort === "stars") return b.stargazerCount - a.stargazerCount;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

    return result;
  }, [repos, language, sort]);

  return filteredRepos

}
