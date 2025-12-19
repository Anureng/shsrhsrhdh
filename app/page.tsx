'use client';

import { useState, useCallback } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import type { ContentItem, Author, Category, UserPreferences, NavigationState, DashboardMetrics, FilterOptions, SortOption } from '@/lib/types';

const MOCK_CONTENT_ITEMS: ContentItem[] = [
  {
    id: '1',
    title: 'Getting Started with Next.js 14',
    slug: 'getting-started-nextjs-14',
    description: 'Learn the fundamentals of Next.js 14 and build your first application with the new App Router.',
    content: 'Comprehensive guide to Next.js 14 features including App Router, Server Components, and more...',
    author: 'Alice Johnson',
    category: 'Tutorial',
    tags: ['next.js', 'react', 'web-development'],
    status: 'published',
    featured: true,
    views: 15420,
    likes: 342,
    comments: 28,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-18',
    publishedAt: '2024-01-15',
    coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop',
    readTime: 8,
  },
  {
    id: '2',
    title: 'TypeScript Best Practices for Large Teams',
    slug: 'typescript-best-practices',
    description: 'Explore advanced TypeScript patterns and practices for maintaining type safety in large codebases.',
    content: 'In-depth guide on TypeScript best practices, type inference, and advanced patterns...',
    author: 'Bob Smith',
    category: 'Guide',
    tags: ['typescript', 'code-quality', 'best-practices'],
    status: 'published',
    featured: false,
    views: 8932,
    likes: 256,
    comments: 15,
    createdAt: '2024-01-12',
    updatedAt: '2024-01-14',
    publishedAt: '2024-01-12',
    coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop',
    readTime: 12,
  },
  {
    id: '3',
    title: 'React Hooks Deep Dive',
    slug: 'react-hooks-deep-dive',
    description: 'Master React Hooks: useState, useEffect, useContext, and custom hooks with practical examples.',
    content: 'Complete guide to React Hooks with real-world examples and performance optimization tips...',
    author: 'Carol Davis',
    category: 'Tutorial',
    tags: ['react', 'hooks', 'javascript'],
    status: 'draft',
    featured: false,
    views: 5320,
    likes: 189,
    comments: 12,
    createdAt: '2024-01-10',
    updatedAt: '2024-01-17',
    publishedAt: null,
    coverImage: 'https://images.unsplash.com/photo-1633356713697-4be7b37582d4?w=800&h=400&fit=crop',
    readTime: 10,
  },
  {
    id: '4',
    title: 'CSS Grid vs Flexbox: A Comparison',
    slug: 'css-grid-vs-flexbox',
    description: 'Understanding when to use CSS Grid and when to use Flexbox for responsive layouts.',
    content: 'Detailed comparison of CSS Grid and Flexbox with practical layout examples...',
    author: 'David Wilson',
    category: 'Article',
    tags: ['css', 'layout', 'responsive-design'],
    status: 'published',
    featured: true,
    views: 12340,
    likes: 287,
    comments: 34,
    createdAt: '2024-01-08',
    updatedAt: '2024-01-09',
    publishedAt: '2024-01-08',
    coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop',
    readTime: 6,
  },
  {
    id: '5',
    title: 'Web Performance Optimization Guide',
    slug: 'web-performance-guide',
    description: 'Comprehensive strategies for optimizing web performance including lazy loading and code splitting.',
    content: 'Learn essential web performance optimization techniques and tools...',
    author: 'Eva Martinez',
    category: 'Guide',
    tags: ['performance', 'optimization', 'web-development'],
    status: 'published',
    featured: false,
    views: 9876,
    likes: 312,
    comments: 42,
    createdAt: '2024-01-05',
    updatedAt: '2024-01-11',
    publishedAt: '2024-01-05',
    coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop',
    readTime: 15,
  },
  {
    id: '6',
    title: 'Building Accessible Web Applications',
    slug: 'accessible-web-apps',
    description: 'Best practices for creating inclusive, accessible web applications that work for everyone.',
    content: 'Comprehensive guide to web accessibility standards (WCAG) and implementation strategies...',
    author: 'Frank Johnson',
    category: 'Tutorial',
    tags: ['accessibility', 'wcag', 'inclusive-design'],
    status: 'archived',
    featured: false,
    views: 4567,
    likes: 145,
    comments: 8,
    createdAt: '2023-12-20',
    updatedAt: '2024-01-01',
    publishedAt: '2023-12-20',
    coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop',
    readTime: 11,
  },
];

const MOCK_AUTHORS: Author[] = [
  {
    id: 'author-1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
    bio: 'Full-stack developer and technical writer',
    articlesCount: 24,
    createdAt: '2023-01-01',
  },
  {
    id: 'author-2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
    bio: 'TypeScript expert and software architect',
    articlesCount: 18,
    createdAt: '2023-02-15',
  },
  {
    id: 'author-3',
    name: 'Carol Davis',
    email: 'carol@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carol',
    bio: 'React specialist and performance engineer',
    articlesCount: 15,
    createdAt: '2023-03-10',
  },
];

const MOCK_CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    name: 'Tutorial',
    slug: 'tutorial',
    description: 'Step-by-step learning guides',
    icon: '📚',
    itemsCount: 12,
    color: 'blue',
  },
  {
    id: 'cat-2',
    name: 'Guide',
    slug: 'guide',
    description: 'In-depth reference materials',
    icon: '📖',
    itemsCount: 8,
    color: 'purple',
  },
  {
    id: 'cat-3',
    name: 'Article',
    slug: 'article',
    description: 'News and insights',
    icon: '📰',
    itemsCount: 15,
    color: 'green',
  },
];

const DEFAULT_PREFERENCES: UserPreferences = {
  theme: 'system',
  layout: 'grid',
  density: 'normal',
  itemsPerPage: 12,
  showSidebar: true,
  autoSave: true,
  notifications: true,
  defaultSort: { field: 'createdAt', direction: 'desc' },
  defaultFilters: {
    categories: [],
    tags: [],
    statuses: ['published'],
    authors: [],
    dateRange: { from: '', to: '' },
    isFeatured: null,
  },
  savedFilters: [],
};

export default function Page() {
  const [navigation, setNavigation] = useState<NavigationState>({
    currentPage: 'dashboard',
    selectedItemId: null,
    previousPage: null,
  });

  const [preferences, setPreferences] = useState<UserPreferences>(DEFAULT_PREFERENCES);
  const [contentItems, setContentItems] = useState<ContentItem[]>(MOCK_CONTENT_ITEMS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>(DEFAULT_PREFERENCES.defaultFilters);
  const [sort, setSort] = useState<SortOption>(DEFAULT_PREFERENCES.defaultSort);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  useEffect(() => {
    const saved = localStorage.getItem('userPreferences');
    if (saved) {
      try {
        setPreferences(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load preferences:', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
  }, [preferences]);

  const handleUpdatePreferences = (newPrefs: Partial<UserPreferences>) => {
    setPreferences((prev) => ({ ...prev, ...newPrefs }));
  };

  const handleNavigateTo = (page: NavigationState['currentPage'], itemId?: string) => {
    setNavigation((prev) => ({
      previousPage: prev.currentPage,
      currentPage: page,
      selectedItemId: itemId || null,
    }));
  };

  const handleBack = () => {
    if (navigation.previousPage) {
      setNavigation((prev) => ({
        currentPage: prev.previousPage || 'dashboard',
        selectedItemId: null,
        previousPage: null,
      }));
    }
  };

  const metrics: DashboardMetrics = {
    totalItems: contentItems.length,
    publishedItems: contentItems.filter((i) => i.status === 'published').length,
    draftItems: contentItems.filter((i) => i.status === 'draft').length,
    archivedItems: contentItems.filter((i) => i.status === 'archived').length,
    totalViews: contentItems.reduce((sum, i) => sum + i.views, 0),
    totalLikes: contentItems.reduce((sum, i) => sum + i.likes, 0),
    totalComments: contentItems.reduce((sum, i) => sum + i.comments, 0),
    viewsThisMonth: contentItems
      .filter((i) => new Date(i.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
      .reduce((sum, i) => sum + i.views, 0),
    itemsThisMonth: contentItems.filter((i) => new Date(i.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
      .length,
    averageReadTime: Math.round(contentItems.reduce((sum, i) => sum + i.readTime, 0) / contentItems.length),
    mostViewedItem: contentItems.reduce((max, item) => (item.views > (max?.views || 0) ? item : max), null),
    topAuthor: MOCK_AUTHORS[0],
    topCategory: MOCK_CATEGORIES[0],
    viewsTrend: [
      { date: '2024-01-01', value: 1200 },
      { date: '2024-01-05', value: 1900 },
      { date: '2024-01-10', value: 1600 },
      { date: '2024-01-15', value: 2100 },
    ],
    publishTrend: [
      { date: '2024-01-01', value: 2 },
      { date: '2024-01-05', value: 1 },
      { date: '2024-01-10', value: 3 },
      { date: '2024-01-15', value: 1 },
    ],
  };

  const filteredItems = contentItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    const aValue = a[sort.field];
    const bValue = b[sort.field];

    if (typeof aValue === 'string') {
      return sort.direction === 'asc' ? aValue.localeCompare(String(bValue)) : String(bValue).localeCompare(aValue);
    }

    if (typeof aValue === 'number') {
      return sort.direction === 'asc' ? (aValue as number) - (bValue as number) : (bValue as number) - (aValue as number);
    }

    return 0;
  });

  const selectedItem = contentItems.find((item) => item.id === navigation.selectedItemId);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <header className="sticky top-0 z-40 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">ContentHub</h1>
              <nav className="hidden sm:flex items-center gap-1">
                <button
                  onClick={() => handleNavigateTo('dashboard')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    navigation.currentPage === 'dashboard'
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => handleNavigateTo('list')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    navigation.currentPage === 'list'
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Content
                </button>
                <button
                  onClick={() => handleNavigateTo('settings')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    navigation.currentPage === 'settings'
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Settings
                </button>
              </nav>
            </div>

            {navigation.currentPage !== 'dashboard' && (
              <Button variant="outline" size="sm" onClick={handleBack}>
                ← Back
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {navigation.currentPage === 'dashboard' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Dashboard</h2>
              <p className="text-slate-600 dark:text-slate-400">Welcome to your content management system</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">{metrics.totalItems}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">Published</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{metrics.publishedItems}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Views</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">{metrics.totalViews.toLocaleString()}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Likes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{metrics.totalLikes}</div>
                </CardContent>
              </Card>
            </div>

            <Button onClick={() => handleNavigateTo('list')} className="w-full md:w-auto">
              View All Content
            </Button>
          </div>
        )}

        {navigation.currentPage === 'list' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Content Management</h2>
              <p className="text-slate-600 dark:text-slate-400">Browse and manage all your content</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                placeholder="Search content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {MOCK_CATEGORIES.map((cat) => (
                    <SelectItem key={cat.id} value={cat.name}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedItems.map((item) => (
                <Card
                  key={item.id}
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => handleNavigateTo('detail', item.id)}
                >
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <Badge variant="outline">{item.status}</Badge>
                    </div>
                    <CardDescription className="line-clamp-2">{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex gap-2">
                      <Badge variant="secondary">{item.category}</Badge>
                      <Badge variant="secondary">{item.readTime} min read</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
                      <span>{item.author}</span>
                      <span>{item.views} views</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {sortedItems.length === 0 && (
              <div className="text-center py-12">
                <p className="text-slate-600 dark:text-slate-400">No content found</p>
              </div>
            )}
          </div>
        )}

        {navigation.currentPage === 'detail' && selectedItem && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{selectedItem.title}</h2>
              <Badge>{selectedItem.status}</Badge>
            </div>

            <Card>
              <img
                src={selectedItem.coverImage}
                alt={selectedItem.title}
                className="w-full h-96 object-cover rounded-t-lg"
              />
              <CardHeader>
                <CardDescription className="text-base">{selectedItem.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4 text-sm">
                  <span className="text-slate-600 dark:text-slate-400">By {selectedItem.author}</span>
                  <span className="text-slate-600 dark:text-slate-400">{selectedItem.readTime} min read</span>
                  <span className="text-slate-600 dark:text-slate-400">{selectedItem.views} views</span>
                </div>
                <div className="flex gap-2">
                  {selectedItem.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                  <p className="text-slate-700 dark:text-slate-300">{selectedItem.content}</p>
                </div>
              </CardContent>
              <CardFooter className="flex gap-4">
                <Button variant="outline" onClick={() => handleNavigateTo('list')}>
                  Back to List
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}

        {navigation.currentPage === 'settings' && (
          <div className="space-y-6 max-w-2xl">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Settings</h2>
              <p className="text-slate-600 dark:text-slate-400">Manage your preferences</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Display Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-900 dark:text-white mb-2 block">Theme</label>
                  <Select
                    value={preferences.theme}
                    onValueChange={(value) => handleUpdatePreferences({ theme: value as any })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-900 dark:text-white mb-2 block">Layout</label>
                  <Select
                    value={preferences.layout}
                    onValueChange={(value) => handleUpdatePreferences({ layout: value as any })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="grid">Grid</SelectItem>
                      <SelectItem value="list">List</SelectItem>
                      <SelectItem value="compact">Compact</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-900 dark:text-white mb-2 block">Items Per Page</label>
                  <Input
                    type="number"
                    value={preferences.itemsPerPage}
                    onChange={(e) => handleUpdatePreferences({ itemsPerPage: parseInt(e.target.value) })}
                  />
                </div>
              </CardContent>
            </Card>

            <Button onClick={() => handleNavigateTo('dashboard')} variant="outline" className="w-full">
              Back to Dashboard
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}

import { useEffect } from 'react';