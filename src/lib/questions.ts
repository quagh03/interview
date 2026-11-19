import { getCollection, type CollectionEntry } from 'astro:content';
import { topics, type Topic } from './taxonomy';

export type Question = CollectionEntry<'questions'>;

export async function loadQuestions(): Promise<Question[]> {
  const all = await getCollection('questions');
  return all.sort((a, b) => a.data.order - b.data.order || a.id.localeCompare(b.id));
}

export function groupByTopic(questions: Question[]): { topic: Topic; items: Question[] }[] {
  return topics
    .map((topic) => ({
      topic,
      items: questions.filter((question) => question.data.topic === topic),
    }))
    .filter((group) => group.items.length > 0);
}

export function groupByPrimaryTag(items: Question[]): { tag: string; items: Question[] }[] {
  const order: string[] = [];
  const groups = new Map<string, Question[]>();
  for (const item of items) {
    const tag = item.data.tags[0] || item.data.section;
    const bucket = groups.get(tag);
    if (bucket) bucket.push(item);
    else {
      groups.set(tag, [item]);
      order.push(tag);
    }
  }
  return order.map((tag) => ({ tag, items: groups.get(tag) ?? [] }));
}

export function fold(value: string): string {
  return value.normalize('NFD').replace(/\p{M}/gu, '').replace(/[đĐ]/g, 'd').toLowerCase();
}

export function searchBlob(question: Question): string {
  const body = typeof question.body === 'string' ? question.body : '';
  const excerpt = body
    .replace(/```/g, ' ')
    .replace(/[#>*_[\]]/g, ' ')
    .replace(/\s+/g, ' ')
    .slice(0, 700);
  const raw = [question.data.title, question.data.section, question.data.topic, ...question.data.tags, excerpt]
    .join(' ')
    .toLowerCase();
  const folded = fold(raw);
  return raw === folded ? raw : `${raw}\n${folded}`;
}
