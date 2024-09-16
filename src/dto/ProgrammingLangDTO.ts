import ProgrammingLang from '../models/ProgrammingLang';

export type ProgrammingLangListResponseDTO = ProgrammingLang[];

export interface ProgrammingLangCreateRequestDTO {
  name: string;
}
