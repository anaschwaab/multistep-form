import { ExperienceAttributes } from "./ExperienceAttributes";
import { StudiesAttributes } from "./StudiesAttributes";

export interface FormDados {
  name: string;
  email: string;
  birthdate: string;
  phone: string;
  role: string;
  bio: string;
  links: string[],
  city_id: string,
  experiences_attributes: ExperienceAttributes[],
  studies_attributes: StudiesAttributes[],
  ability_ids: string[],
  softskill_ids: string[],
  tech_ids: string[]
}
