
export enum ViewStyle {
  list = 'list',
  group = 'group',
}

export enum ListFieldStyle {
  phone = 'phone',
  icon = 'icon',
  checkbox = 'checkbox',
  tag = 'tag',
  text = 'text',
  actions = 'actions',
  createdAt = 'createdAt',
}

export enum CheckAllActionType {
  all = 'all',
  none = 'none',
  archived = 'archived',
  not_archived = 'not_archived'
}


export const LIST_COLUMNS = [{
  label: 'from',
  fieldType: ListFieldStyle.phone,
  showMobile: true
},
  {
    label: 'to',
    fieldType: ListFieldStyle.phone,
    showMobile: false
  },
  {
    label: 'direction',
    fieldType: ListFieldStyle.text,
    showMobile: false
  }
  ,
  {
    label: 'duration',
    fieldType: ListFieldStyle.text,
    showMobile: true
  },

  {
    label: 'is_archived',
    fieldType: ListFieldStyle.text,
    showMobile: false
  },

  {
    label: 'created_at',
    fieldType: ListFieldStyle.createdAt,
    showMobile: false
  },

  {
    label: 'notes',
    fieldType: ListFieldStyle.icon,
    showMobile: false
  },
  {
    label: 'actions',
    fieldType: ListFieldStyle.text,
    showMobile: true
  }]
