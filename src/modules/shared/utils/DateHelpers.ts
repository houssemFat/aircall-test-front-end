import { enUS, fr } from 'date-fns/locale'
import { format, getMonth, getWeek, getYear } from "date-fns";

export enum GroupDateValues {
  day = 'day',
  week = 'week',
  month = 'month'
}

export interface GroupByOptions {
  groupBy: GroupDateValues,
  locale: string
}

/**
 * Create the key of the group
 * if day, than the 'dd-mm-yyyy'
 * if week, then 'week_number + year'
 * if month, then 'month + year'
 * @param date
 * @param groupKey
 */
function buildGroupByDateKey(date: Date, groupKey: GroupDateValues): string {
  switch (groupKey) {
    case GroupDateValues.day:
      // only get date
      return format(date, 'yyyy-MM-dd');
    case GroupDateValues.week:
      // TODO, only use single instance of date
      return `${getWeek(date)}-${getYear(date)}`
    case GroupDateValues.month:
      // TODO, only use single instance of date
      return `${getMonth(date)}-${getYear(date)}`
  }
}

/**
 * Build the label to display for the group (title like)
 * @param date
 * @param groupKey
 * @param locale
 */
function buildGroupByDateLabel(date: Date, groupKey: GroupDateValues, locale: string): string {
  switch (groupKey) {
    case GroupDateValues.day:
      // only get date
      return format(date, 'iiii yyyy-MM-dd', {locale: dateFnsLocalesByAppLocale[locale]})

    case GroupDateValues.week:
      // TODO, only use single instance of date
      return `${format(date, 'MMMM yyyy', {locale: dateFnsLocalesByAppLocale[locale]})} - ${getWeek(date)}`
    case GroupDateValues.month:
      // TODO, only use single instance of date
      return format(date, 'MMMM yyyy', {locale: dateFnsLocalesByAppLocale[locale]})

  }
}

/**
 * Groups a list of elements with date inside by one of given property (day, week, month)
 * @param {Array<{}>} data
 * @param {string} propName Used to retrieve the value of date from an item of the collection
 * @param {GroupByOptions} groupByOptions
 */
export const groupByDate = (data: Array<any>, propName: string,
                            groupByOptions = {
                              groupBy: GroupDateValues.day,
                              locale: 'fr'
                            }):
    Array<{
      key: string,
      label: string,
      elements: Array<any>
    }> => {
  const {groupBy, locale} = groupByOptions;

  // Loop over all the elements in data
  // 1 - Extract the key to identify the group
  // 2 - If the key does not exist in the object ==>
  //    2 - 1 : Create label
  //    2 - 2 : Create the key object with the label and empty elements
  // 3' - Push element in the elements array
  const groups: { [key: string]: { label: string, elements: Array<any> } } = data.reduce((groups, item) => {
    const date = new Date(item[propName]);
    let key = buildGroupByDateKey(date, groupBy);
    let label = buildGroupByDateLabel(date, groupBy, locale);
    // Check if the key exists
    if (!groups[key]) {
      groups[key] = {
        label: label,
        elements: []
      };
    }
    // push
    groups[key].elements.push(item);
    return groups;
  }, {});

  // return of grouped elements as array
  return Object.keys(groups).map((key) => {
    return {
      key,
      label: groups[key].label,
      elements: groups[key].elements
    };
  });
}

/**
 * Transform duration in milleseconds to readable human duration
 * @param duration duration in ms
 * @param locales, TODO, add i18n options
 */
export const HumanizeMilleSeconds = (duration: number, locales?: { [key: string]: string; }) => {
  let h = Math.floor(duration / 1000 / 3600);
  let m = Math.floor(duration % 3600 / 60);
  let s = Math.floor(duration % 3600 % 60);
  //
  let hDisplay = h > 0 ? h + "h " : "";
  let mDisplay = m > 0 ? m + "m " : "";
  let sDisplay = s > 0 ? s + "s" : "";
  return hDisplay + mDisplay + sDisplay;
}
// store datefns locales by the applictions locales
export const dateFnsLocalesByAppLocale: { [key: string]: any; } = {
  'fr': fr,
  'en': enUS
}
