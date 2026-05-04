import type { Lesson } from './lessons';
import { getLessonsForModule as getLessonsIT } from './lessons';
import { getLessonsForModule as getLessonsEN } from './lessons_en';

export type { Lesson };

export function getLessonsForModule(moduleId: string, lang: 'it' | 'en' = 'it'): Lesson[] {
  return lang === 'en' ? getLessonsEN(moduleId) : getLessonsIT(moduleId);
}
