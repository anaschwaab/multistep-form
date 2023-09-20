import { useState } from "react"
import { StepOne } from "../StepOne";
import { StepTwo } from "../StepTwo";
import { StepThree } from "../StepThree";
import { api } from "../../service/api";
import { FormDados } from "../../types/FormDados";
import { AxiosRequestConfig } from "axios";


export const MultiStepForm = () => {
  const [data, setData] = useState<FormDados>({
    name: '',
    email: '',
    birthdate: '',
    phone: '',
    role: '',
    bio: '',
    links: [''],
    city_id: '',
    experiences_attributes: [],
    studies_attributes: [],
    ability_ids: [],
    softskill_ids: [],
    tech_ids: []
  });

  const [currentStep, setCurrentStep] = useState(0);

  async function handleGetPdf(values: AxiosRequestConfig<FormDados>, id: string) {
    try {

        const response = await api.get(`/profiles/${id}/download`, {...values})

        const url = window.URL.createObjectURL(new Blob([ response.data ]))

        const link = document.createElement('a');

        link.href = url
        link.setAttribute('download', 'perfil.pdf')

        document.body.appendChild(link)

        link.click()
    } catch (error) {
        console.log('Um erro aconteceu: ', error);
    } 
}

  const requestAPI = async (formData: FormDados) => {
    const response = await api.post('/profiles', { profile: {...formData} });

    handleGetPdf(response.data, response.data.id)
  }

  const handleNextStep = (newData: FormDados, final = false) => {
    setData(prev => ({...prev, ...newData}));

    if (final) {
      requestAPI(newData);
      return 
    }

    setCurrentStep(prev => prev + 1)
  }

  const handlePrevStep = (newData: FormDados) => {
    setData(prev => ({...prev, ...newData}));
    setCurrentStep(prev => prev - 1)
  }

  
  const steps = [
  <StepOne next={handleNextStep} data={data}/>, 
  <StepTwo next={handleNextStep} prev={handlePrevStep} data={data}/>,
  <StepThree next={handleNextStep} prev={handlePrevStep} data={data}/>
];
  return (
    <div>
      {steps[currentStep]}
    </div>
  )
}