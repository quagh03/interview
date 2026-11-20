export const topics = [
  'Java Core',
  'Design Pattern',
  'JVM',
  'Spring',
  'JPA & Hibernate',
  'Database',
  'Security',
  'System Design',
  'Redis & Kafka',
  'DevOps',
  'Tình huống',
  'Coding',
] as const;

export const levels = ['intern', 'junior', 'mid', 'senior'] as const;

export const levelLabel: Record<(typeof levels)[number], string> = {
  intern: 'Intern',
  junior: 'Junior',
  mid: 'Mid',
  senior: 'Senior',
};

export type Topic = (typeof topics)[number];
export type Level = (typeof levels)[number];

export const topicDir: Record<Topic, string> = {
  'Java Core': 'java-core',
  'Design Pattern': 'design-pattern',
  JVM: 'jvm',
  Spring: 'spring',
  'JPA & Hibernate': 'jpa',
  Database: 'database',
  Security: 'security',
  'System Design': 'system-design',
  'Redis & Kafka': 'redis-kafka',
  DevOps: 'devops',
  'Tình huống': 'tinh-huong',
  Coding: 'coding',
};
