import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { AdminPortalData } from '../../../classes/admin_portal_data'
import { ApplicationData } from '../../../classes/application_data'
import { useAuth } from '../../../context/AuthUserContext'
import { step7 } from '../../../pages/api/updateReviewMarks'
import TextInput from '../../ApplicationSteps/TextInput'
import Field from '../../ReviewApplicationSteps/Field'
import ProceedButtons from './ProceedButtons'

type Props = {
  applId: string
  applicationData: ApplicationData
  adminPortalData: AdminPortalData
  formStatus: number
  status: number
  setStatus: Dispatch<SetStateAction<Number>>
}

const ReviewerStep7 = ({
  applId,
  applicationData,
  adminPortalData,
  formStatus,
  status,
  setStatus,
}: Props) => {
  const { authUser } = useAuth()
  const [remark, setRemark] = useState<string>('')
  const [totalMarks, setTotalMarks] = useState<number>(0)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    if (
      adminPortalData.review_marks &&
      adminPortalData.review_marks[authUser.id]
    ) {
      if (adminPortalData.review_marks[authUser.id].remark)
        setRemark(adminPortalData.review_marks[authUser.id].remark)

      if (adminPortalData.review_marks[authUser.id].totalMarks)
        setTotalMarks(adminPortalData.review_marks[authUser.id].totalMarks)
      else
        setTotalMarks(
          adminPortalData.review_marks[authUser.id].totalAcademicMarks +
            adminPortalData.review_marks[authUser.id].curricularMarks +
            adminPortalData.review_marks[authUser.id].extracurricularMarks +
            adminPortalData.review_marks[authUser.id].totalSOPMarks,
        )
    }
  }, [])

  return (
    <div className="w-full">
      <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10">
        <h1 className="text-3xl text-red-850 text-center font-bold pb-5 mb-10">
          Review Marks
        </h1>
        <Field
          name="Educational Qualification"
          value={adminPortalData.review_marks[authUser.id].totalAcademicMarks}
        />
        <Field
          name="Academic / Curricular Activities"
          value={adminPortalData.review_marks[authUser.id].curricularMarks}
        />
        <Field
          name="Extracurricular Activities"
          value={adminPortalData.review_marks[authUser.id].extracurricularMarks}
        />
        <Field
          name="Essay-Type Questions"
          value={adminPortalData.review_marks[authUser.id].totalSOPMarks}
        />
        <Field name="Total Marks" value={totalMarks} />
        <div className="md:w-1/2">
          <TextInput
            name="Remark"
            value={remark}
            type="text"
            onChange={(e) => setRemark(e.target.value)}
            required={false}
          />
        </div>
      </div>

      <ProceedButtons
        formStatus={formStatus}
        status={status}
        setStatus={setStatus}
        validation={() => true}
        updateReviewMarks={(newStatus: number) =>
          step7(applId, authUser.id, remark, totalMarks, newStatus)
        }
        error={error}
        setError={setError}
      />
    </div>
  )
}

export default ReviewerStep7
