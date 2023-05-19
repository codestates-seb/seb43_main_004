export type radio = {
  id: string
  name: string
  value: string
  label?: string
  iconSrc?: string
}

export interface radioProps {
  legend?: string
  radioArray: radio[]
  checkedValue: string
  error?: string
  onChange(e: React.ChangeEvent<HTMLInputElement>): void
}

export const genderList: radio[] = [
  { id: 'male', name: 'gender', value: 'male', label: '남자' },
  { id: 'female', name: 'gender', value: 'female', label: '여자' },
]

export const activityScore: radio[] = [
  { id: '1', name: 'activity', value: 'NONE_ACTIVE', label: '매우 낮음' },
  { id: '2', name: 'activity', value: 'LIGHTLY_ACTIVE', label: '낮음' },
  { id: '3', name: 'activity', value: 'MODERATELY_ACTIVE', label: '보통' },
  { id: '4', name: 'activity', value: 'VERY_ACTIVE', label: '높음' },
  { id: '5', name: 'activity', value: 'EXTREMELY_ACTIVE', label: '매우 높음' },
]

export const icons: radio[] = [
  {
    id: 'ic-1',
    name: 'icon',
    value: 'ingredients',
    iconSrc: '/icons/ingredients.svg',
  },
  { id: 'ic-2', name: 'icon', value: 'meat', iconSrc: '/icons/meat.svg' },
  { id: 'ic-3', name: 'icon', value: 'melon', iconSrc: '/icons/melon.svg' },
  {
    id: 'ic-4',
    name: 'icon',
    value: 'porridge',
    iconSrc: '/icons/porridge.svg',
  },
  { id: 'ic-5', name: 'icon', value: 'taco', iconSrc: '/icons/taco.svg' },
]
