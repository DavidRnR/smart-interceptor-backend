import OS from '../models/OS';

export type OsListResponseDTO = OS[];

export interface OsCreateRequestDTO {
  name: string;
}
