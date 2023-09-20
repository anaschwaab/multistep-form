import { FormDados } from "./FormDados";


export interface StepProps {
    next: (data: FormDados, final?: boolean) => void,
    data: FormDados,
    prev?: (data: FormDados) => void,
}