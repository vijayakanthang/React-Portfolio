import { useEffect, useState } from "react";

function summarizeLanguages(repositories) {
  const languageUsage = repositories.reduce((accumulator, repository) => {
    if (!repository.language) {
      return accumulator;
    }

    accumulator[repository.language] = (accumulator[repository.language] || 0) + 1;
    return accumulator;
  }, {});

  return Object.entries(languageUsage)
    .sort((left, right) => right[1] - left[1])
    .slice(0, 3);
}

export default function GithubWidget({ username }) {
  const [stats, setStats] = useState({
    isLoading: true,
    hasError: false,
    repos: 0,
    stars: 0,
    topLanguages: [],
  });

  useEffect(() => {
    let cancelled = false;

    async function loadStats() {
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
        );

        if (!response.ok) {
          throw new Error("Failed to load repositories");
        }

        const repositories = await response.json();
        const stars = repositories.reduce(
          (total, repository) => total + repository.stargazers_count,
          0,
        );

        if (!cancelled) {
          setStats({
            isLoading: false,
            hasError: false,
            repos: repositories.length,
            stars,
            topLanguages: summarizeLanguages(repositories),
          });
        }
      } catch (error) {
        if (!cancelled) {
          setStats((previous) => ({
            ...previous,
            isLoading: false,
            hasError: true,
          }));
        }
      }
    }

    loadStats();

    return () => {
      cancelled = true;
    };
  }, [username]);

  return (
    <div className="github-widget">
      <div className="github-widget__header">
        <p className="github-widget__eyebrow">Always building something</p>
        <h3>Live GitHub activity</h3>
      </div>

      <div className="github-graph-frame">
        <img
          src={`https://ghchart.rshah.org/4ade80/${username}`}
          alt={`${username} contribution graph`}
          loading="lazy"
        />
      </div>

      <div className="github-stats-grid">
        <div className="github-stat-card">
          <span className="github-stat-card__value">
            {stats.isLoading ? "--" : stats.repos}
          </span>
          <span className="github-stat-card__label">Public repos</span>
        </div>
        <div className="github-stat-card">
          <span className="github-stat-card__value">
            {stats.isLoading ? "--" : stats.stars}
          </span>
          <span className="github-stat-card__label">Total stars</span>
        </div>
      </div>

      <div className="github-languages">
        <p className="github-languages__label">Most used languages</p>
        {stats.hasError ? (
          <p className="github-languages__fallback">
            GitHub stats are temporarily unavailable, but the contribution graph stays live.
          </p>
        ) : (
          <div className="github-language-list">
            {(stats.topLanguages.length ? stats.topLanguages : [["Loading", 0]]).map(
              ([language, count]) => (
                <span key={language} className="github-language-pill">
                  {language}
                  {count ? ` · ${count}` : ""}
                </span>
              ),
            )}
          </div>
        )}
      </div>
    </div>
  );
}
