import { AdminPortalData } from '../../../classes/admin_portal_data'
import { ApplicationData } from '../../../classes/application_data'
import { Dispatch, SetStateAction, useState } from 'react'
import ProceedButtons from './ProceedButtons'
import Step8 from '../../ReviewApplicationSteps/Step8'
import Step9 from '../../ReviewApplicationSteps/Step9'

type Props = {
  applicationData: ApplicationData
  adminPortalData: AdminPortalData
  status: number
  setStatus: Dispatch<SetStateAction<Number>>
}

const ReviewerStep6 = ({
  applicationData,
  adminPortalData,
  status,
  setStatus,
}: Props) => {
  const [error, setError] = useState<string>('')

  return (
    <div className="w-full">
      <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10">
        <h1 className="text-3xl text-red-850 text-center font-bold pb-5">
          Other Information
        </h1>
        <p className="text-xs sm:text-sm md:text-base font-bold pl-2 pt-2">
          Step 6 - Instruction 1
        </p>
      </div>

      <Step9 otherInfo={applicationData.other_information} />

      <ProceedButtons
        formStatus={applicationData.form_status}
        status={status}
        setStatus={setStatus}
        error={error}
        setError={setError}
      />
    </div>
  )
}

export default ReviewerStep6