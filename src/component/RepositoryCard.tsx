import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { Star, GitFork, Code2, Clock } from "lucide-react";

export default function RepositoryCard({ repo }: { repo: any }) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 flex flex-col justify-between">
      <CardHeader className="pb-2">
        <CardTitle>
          <a
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline break-all">
            {repo.name}
          </a>
        </CardTitle>
        {repo.description && (
          <p className="text-sm text-muted-foreground mt-1">
            {repo.description}
          </p>
        )}
      </CardHeader>
      <CardContent className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1">
          <Star className="w-4 h-4" />
          {repo.stargazerCount}
        </span>
        <span className="flex items-center gap-1">
          <GitFork className="w-4 h-4" />
          {repo.forkCount}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          Updated {formatDistanceToNow(new Date(repo.updatedAt))} ago
        </span>
        {repo.primaryLanguage?.name && (
          <span className="flex items-center gap-1">
            <Code2 className="w-4 h-4" />
            {repo.primaryLanguage.name}
          </span>
        )}
      </CardContent>
    </Card>
  );
}
