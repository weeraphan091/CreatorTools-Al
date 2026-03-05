import { blogPosts } from "@/lib/blog";
import { templatePages } from "@/lib/templates";
import { tools } from "@/lib/tools";
import { getAllUseCasePages } from "@/lib/useCases";

export type IntentLink = {
  href: string;
  label: string;
  type: "tool" | "blog" | "template" | "use-case";
  score: number;
};

type Candidate = {
  href: string;
  label: string;
  type: IntentLink["type"];
  tokens: string[];
};

function normalizeTokens(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((token) => token.length >= 3);
}

function scoreTokens(queryTokens: string[], candidateTokens: string[]) {
  const candidateSet = new Set(candidateTokens);
  return queryTokens.reduce((score, token) => (candidateSet.has(token) ? score + 1 : score), 0);
}

function getCandidates(): Candidate[] {
  const toolCandidates: Candidate[] = tools.map((tool) => ({
    href: `/tools/${tool.slug}`,
    label: tool.title,
    type: "tool",
    tokens: normalizeTokens(`${tool.title} ${tool.description} ${tool.keywords.join(" ")}`),
  }));

  const blogCandidates: Candidate[] = blogPosts.map((post) => ({
    href: `/blog/${post.slug}`,
    label: post.title,
    type: "blog",
    tokens: normalizeTokens(`${post.title} ${post.description} ${post.content.join(" ")}`),
  }));

  const templateCandidates: Candidate[] = templatePages.map((template) => ({
    href: `/templates/${template.slug}`,
    label: template.title,
    type: "template",
    tokens: normalizeTokens(`${template.title} ${template.description} ${template.keyword}`),
  }));

  const useCaseCandidates: Candidate[] = getAllUseCasePages().map((useCase) => ({
    href: `/use-cases/${useCase.slug}`,
    label: useCase.title,
    type: "use-case",
    tokens: normalizeTokens(`${useCase.title} ${useCase.description} ${useCase.searchTerm}`),
  }));

  return [...toolCandidates, ...blogCandidates, ...templateCandidates, ...useCaseCandidates];
}

export function getIntentMatchedLinks(params: {
  query: string;
  excludeHrefs?: string[];
  limit?: number;
}) {
  const { query, excludeHrefs = [], limit = 8 } = params;
  const queryTokens = normalizeTokens(query);
  const excludeSet = new Set(excludeHrefs);
  const candidates = getCandidates();

  const matched = candidates
    .filter((candidate) => !excludeSet.has(candidate.href))
    .map((candidate) => ({
      href: candidate.href,
      label: candidate.label,
      type: candidate.type,
      score: scoreTokens(queryTokens, candidate.tokens),
    }))
    .filter((candidate) => candidate.score > 0)
    .sort((a, b) => b.score - a.score || a.label.localeCompare(b.label));

  return matched.slice(0, limit) satisfies IntentLink[];
}
