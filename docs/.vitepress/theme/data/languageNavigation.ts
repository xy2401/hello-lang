// Hello Lang - 产品导航数据
// 用于生成「典型产品」+「更多下拉」的导航结构

export interface LanguageItem {
  id: string;
  name: string;
  link?: string;
  priority: number; // 1-5 为典型产品，6+ 为更多下拉
  category?: 'command' | 'declarative'; // command: 命令式，declarative: 声明式
}

// 12 门语言的优先级排序
export const allLanguages: readonly LanguageItem[] = [
  // 前 5 个典型产品（主导航平铺）
  { id: 'java', name: 'Java', priority: 1, category: 'command' },
  { id: 'typescript', name: 'TypeScript', link: '/products/javascript/typescript', priority: 2, category: 'command' },
  { id: 'python', name: 'Python', priority: 3, category: 'command' },
  { id: 'rust', name: 'Rust', priority: 4, category: 'command' },
  { id: 'go', name: 'Go', priority: 5, category: 'command' },
  
  // 更多产品（在「更多编程语言」下拉中）
  { id: 'javascript', name: 'JavaScript', priority: 6, category: 'command' },
  { id: 'cpp', name: 'C++', priority: 7, category: 'command' },
  { id: 'php', name: 'PHP', priority: 8, category: 'command' },
  { id: 'csharp', name: 'C#', priority: 9, category: 'command' },
  { id: 'ruby', name: 'Ruby', priority: 10, category: 'command' },
  { id: 'kotlin', name: 'Kotlin', priority: 11, category: 'command' },
  { id: 'html', name: 'HTML', priority: 12, category: 'declarative' },
  { id: 'css', name: 'CSS', priority: 13, category: 'declarative' },
] as const satisfies readonly LanguageItem[];

// 导出前 5 个作为典型产品
export const featuredLanguages = allLanguages.filter(l => l.priority <= 5);

// 导出更多产品用于下拉菜单
export const moreLanguages = allLanguages.filter(l => l.priority > 5);
