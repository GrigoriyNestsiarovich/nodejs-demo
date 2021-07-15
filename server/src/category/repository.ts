import { Category } from './category';

const categories: Category[] = [
  {
    id: 1,
    name: 'Nature',
  },
  {
    id: 2,
    name: 'Musical instruments',
  },
  {
    id: 3,
    name: 'Travel',
  },
  {
    id: 4,
    name: 'Medicine',
  },
  {
    id: 5,
    name: 'Factory',
  },
  {
    id: 6,
    name: 'Social networks',
  },
  {
    id: 7,
    name: 'Education',
  },
  {
    id: 8,
    name: 'Relaxation',
  },
];

export function getCategories(): Promise<Category[]> {
  return Promise.resolve<Category[]>(categories);
}

export function getCategoryById(categoryId: number): Promise<Category | undefined> {
  return Promise.resolve(categories.find((cat) => cat.id === categoryId));
}

export function createCategory(category: Category): Promise<Category> {
  const isExist = typeof categories
    .find((cat) => cat.name.toLowerCase() === category.name.toLowerCase()) !== 'undefined';
  if (isExist) {
    return Promise.reject(new Error(`Category with name ${category.name} is already exists`));
  }

  const id = categories.length + 1;
  const model = { ...category, id };
  categories.push(model);

  return Promise.resolve(model);
}

export function deleteCategory(id: number): Promise<void> {
  const index = categories.findIndex((cat) => cat.id === id);
  if (index < 0) {
    Promise.reject(new Error('Category not found'));
  }
  categories.splice(index, 1);
  return Promise.resolve();
}

export function updateCategory(category: Category): Promise<Category> {
  const categoryIndex = categories.findIndex((category) => category.name.toLowerCase() === category.name.toLowerCase());
  if (categoryIndex < 0) {
    return Promise.reject(new Error('Category not found'));
  }
  const existsItem = categories.splice(categoryIndex, 1)[0];
  const newCategory: Category = {
    ...existsItem,
    ...category,
  };
  categories.push(newCategory);
  return Promise.resolve(newCategory);
}
