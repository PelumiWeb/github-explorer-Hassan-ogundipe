import React from "react";
import { useQuery } from "@apollo/client";
import RepositoryCard from "./RepositoryCard";
import { GET_USER_REPOS } from "../graphql/queries";
import { useFilterRepos } from "@/hooks/useFilterRepos";

export default function RepositoryList({
  username,
  language,
  sort,
}: {
  username: string;
  language: string | null;
  sort: string;
}) {
  const { data, loading, error, fetchMore } = useQuery(GET_USER_REPOS, {
    variables: { username, first: 10 },
    notifyOnNetworkStatusChange: true,
  });

  const repos = data?.user?.repositories?.nodes || [];

  const pageInfo = data?.user?.repositories?.pageInfo;

  const filteredData = useFilterRepos(repos, language, sort);

  const observer = React.useRef<IntersectionObserver | null>(null);
  const sentinelRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && pageInfo?.hasNextPage) {
          fetchMore({
            variables: {
              after: data.user.repositories.pageInfo.endCursor,
            },
            updateQuery: (prevResult, { fetchMoreResult }) => {
              if (!fetchMoreResult) return prevResult;

              return {
                user: {
                  ...prevResult.user,
                  repositories: {
                    ...fetchMoreResult.user.repositories,
                    nodes: [
                      ...prevResult.user.repositories.nodes,
                      ...fetchMoreResult.user.repositories.nodes,
                    ],
                    pageInfo: fetchMoreResult.user.repositories.pageInfo,
                  },
                },
              };
            },
          });
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, pageInfo, fetchMore, username]
  );

  if (!data && loading)
    return (
      <div className="w-full h-[200px] flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  if (!filteredData.length)
    return (
      <div className="flex justify-center items-center h-[500px]">
        <p>No repositories found.</p>
      </div>
    );

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 px-4">
        {filteredData.map((repo: any) => (
          <RepositoryCard key={repo.name} repo={repo} />
        ))}
        {pageInfo?.hasNextPage && <div ref={sentinelRef} className="h-10" />}
      </div>
      {data && loading && (
        <div className="w-full flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      )}
    </>
  );
}
