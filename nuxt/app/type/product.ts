export interface TProduct {
  id: string
  slug: string
  title: string
  image: string
  description: string
  price: string
  sale: string
}

export interface TFilterItem {
  id: number
  title: string
  slug: string
}

export interface TProducts {
  id: string
  title: string
  slug: string
  description: string
  image: string
  price: string
  sale: string
}

interface FilterItem {
  title: string
  slug: string
}

export interface TFilterState {
  manufacturer: FilterItem[]
  culture: FilterItem[]
  harmful: FilterItem[]
}
