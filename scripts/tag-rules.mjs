function fold(value) {
  return value.normalize('NFD').replace(/\p{M}/gu, '').replace(/[đĐ]/g, 'd').toLowerCase();
}

function groupTag(topic, section, title) {
  const text = fold(title);
  if (section.startsWith('OOP')) {
    if (/string|immutable/.test(text)) return 'String';
    return 'OOP';
  }
  if (section.startsWith('Collections')) {
    if (/hashmap|hashset|hashtable/.test(text)) return 'HashMap';
    return 'List';
  }
  if (section.startsWith('Java 8')) {
    if (/completablefuture|parallel/.test(text)) return 'Async';
    return 'Stream';
  }
  if (section.startsWith('Multithreading')) {
    if (/deadlock|reentrant|atomic|countdown|cyclic/.test(text)) return 'Lock';
    if (/memory model|threadlocal/.test(text)) return 'JMM';
    return 'Thread';
  }
  if (topic === 'JVM') {
    if (/gc|garbage|g1|generation/.test(text)) return 'GC';
    if (/classloader|delegation|memory leak|outofmemory|stackoverflow|debug/.test(text)) return 'Memory';
    return 'JVM';
  }
  if (section.startsWith('Spring Core')) {
    if (/circular|lifecycle|postconstruct|predestroy|scope/.test(text)) return 'Bean lifecycle';
    return 'DI & IoC';
  }
  if (section.startsWith('Spring Boot')) {
    if (/actuator|devtools|profile|properties|yml/.test(text)) return 'Cấu hình';
    return 'Auto config';
  }
  if (section.includes('MVC')) {
    if (/valid|exception|cors|filter|upload/.test(text)) return 'Validation';
    return 'REST';
  }
  if (topic === 'JPA & Hibernate') {
    if (/lazy|eager|n\+1|fetch/.test(text)) return 'Fetch';
    if (/transaction|propagation|isolation|rollback/.test(text)) return 'Transaction';
    if (/lock|version|optimistic|pessimistic/.test(text)) return 'Lock';
    if (/one-to|many|cascade|orphan/.test(text)) return 'Quan hệ';
    if (/jpql|native|pagination|sort|cache|dirty/.test(text)) return 'Query';
    return 'Entity';
  }
  if (section.startsWith('Database cơ bản')) {
    if (/injection|procedure|view/.test(text)) return 'SQL Injection';
    return 'Schema';
  }
  if (section === 'Index') return 'Index';
  if (section.includes('SELECT')) return 'SELECT';
  if (section === 'JOIN') return 'JOIN';
  if (section.startsWith('Transaction')) return 'Transaction';
  if (section.startsWith('Tối ưu')) return 'Tối ưu SQL';
  if (topic === 'Security') {
    if (/jwt|revoke|refresh|token het/.test(text)) return 'JWT';
    if (/oauth|openid/.test(text)) return 'OAuth';
    if (/csrf|cors/.test(text)) return 'CSRF';
    if (/password|bcrypt/.test(text)) return 'Password';
    if (/role|phan quyen|rbac/.test(text)) return 'Phân quyền';
    return 'Authentication';
  }
  if (section === 'Kiến trúc') {
    if (/monolith|microservice|gateway|discovery/.test(text)) return 'Microservices';
    if (/load|proxy|scaling|stateless|rate/.test(text)) return 'Scaling';
    if (/circuit|retry|saga/.test(text)) return 'Resilience';
    return 'Consistency';
  }
  if (section.includes('thực tế')) return 'Thiết kế';
  if (section === 'Redis') {
    if (/penetration|invalidation|aside|write through|write behind|cache/.test(text)) return 'Cache';
    return 'Redis';
  }
  if (section.startsWith('Kafka')) {
    if (/exactly|at-most|at-least|retry|dead letter|nhieu lan/.test(text)) return 'Delivery';
    if (/offset|consumer group|thu tu|partition|topic/.test(text)) return 'Partition';
    return 'Message queue';
  }
  if (topic === 'DevOps') {
    if (/kubernetes|\bpod\b/.test(text)) return 'Kubernetes';
    if (/docker/.test(text)) return 'Docker';
    if (/linux|\bport\b|\blog\b|cpu|ram/.test(text)) return 'Linux';
    if (/git|cherry|merge|rebase/.test(text)) return 'Git';
    return 'CI/CD';
  }
  if (topic === 'Tình huống') {
    if (/5 giay|200ms|memory leak|local khong/.test(text)) return 'Debug';
    if (/trong kho|thanh toan|tru tien/.test(text)) return 'Thanh toán';
    if (/timeout|kafka|redis/.test(text)) return 'Phụ thuộc';
    if (/100\.000|request tang|log va trace/.test(text)) return 'Tải lớn';
    return 'Nhất quán';
  }
  if (topic === 'Coding') {
    if (/string|palindrome|anagram/.test(text)) return 'String';
    if (/thread|singleton|producer|hashmap|rate|lru/.test(text)) return 'Concurrency';
    return 'Array';
  }
  return section;
}

const extras = [
  [/hashmap|hashtable|hashset/, 'HashMap'],
  [/stream/, 'Stream'],
  [/lambda/, 'Lambda'],
  [/optional/, 'Optional'],
  [/equals|hashcode/, 'Equals'],
  [/exception/, 'Exception'],
  [/iterator|fail-fast|treemap|linkedhash/, 'Iterator'],
  [/jwt/, 'JWT'],
  [/oauth/, 'OAuth'],
  [/csrf/, 'CSRF'],
  [/index/, 'Index'],
  [/composite|covering/, 'Composite index'],
  [/b-tree|clustered|hash index/, 'B-Tree'],
  [/explain|cardinality|selectivity/, 'EXPLAIN'],
  [/join/, 'JOIN'],
  [/self join/, 'Self join'],
  [/n\+1/, 'N+1'],
  [/transaction/, 'Transaction'],
  [/isolation|dirty read|phantom/, 'Isolation'],
  [/acid/, 'ACID'],
  [/lost update/, 'Lost update'],
  [/null = null|null nghia/, 'NULL'],
  [/chuan hoa|denormal/, 'Chuẩn hóa'],
  [/window function|rank|row_number/, 'Window'],
  [/keyset|offset|phan trang/, 'Pagination'],
  [/group by|having/, 'GROUP BY'],
  [/deadlock/, 'Deadlock'],
  [/docker/, 'Docker'],
  [/kubernetes|\bpod\b/, 'Kubernetes'],
  [/blue-green|rolling/, 'Deploy'],
  [/kafka/, 'Kafka'],
  [/redis/, 'Redis'],
  [/saga/, 'Saga'],
  [/cqrs/, 'CQRS'],
  [/bean/, 'Bean'],
  [/garbage|g1gc|\bgc\b/, 'GC'],
  [/classloader/, 'ClassLoader'],
  [/memory leak/, 'Memory leak'],
  [/chat/, 'Chat'],
  [/url shortener|url/, 'URL shortener'],
  [/e-commerce|don hang/, 'E-commerce'],
  [/rate limit/, 'Rate limit'],
];

export function tagsForQuestion(topic, section, title) {
  const text = fold(`${title} ${section}`);
  const tags = [groupTag(topic, section, title)];
  for (const [pattern, tag] of extras) {
    if (pattern.test(text)) tags.push(tag);
  }
  return [...new Set(tags)].slice(0, 4);
}
