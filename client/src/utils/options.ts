interface radio {
  id: string
  name: string
  value: string
}

export const genderList: radio[] = [
  { id: 'male', name: 'gender', value: 'male' },
  { id: 'female', name: 'gender', value: 'female' },
]

export const activityScore: radio[] = [
  { id: '1', name: 'activity', value: '적음' },
  { id: '2', name: 'activity', value: '보통' },
  { id: '3', name: 'activity', value: '많음' },
]

// 아이콘을 어떻게 넘길지 고민
export const icons: radio[] = [
  { id: 'ic-1', name: 'icon', value: '아이콘1' },
  { id: 'ic-2', name: 'icon', value: '아이콘2' },
  { id: 'ic-3', name: 'icon', value: '아이콘3' },
  { id: 'ic-4', name: 'icon', value: '아이콘4' },
  { id: 'ic-5', name: 'icon', value: '아이콘5' },
]
