import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Spinner } from '../../components/ui/Spinner'
import type { SelectOption } from '../../components/ui/Select'
import { policyApi } from '../policies/policyApi'
import { ClaimFormFields, type ClaimFormErrors } from './ClaimFormFields'
import { claimApi } from './claimApi'
import { CLAIM_STATUSES } from './claimStatuses'
import type { ClaimInput } from './types'

const emptyClaim: ClaimInput = {
  claimNumber: '',
  policyId: 0,
  description: '',
  amount: 0,
  // A new claim starts at the head of the lifecycle, not at whichever value happens to be first
  // in some other entity's list.
  status: CLAIM_STATUSES[0],
}

function validate(values: ClaimInput): ClaimFormErrors {
  const errors: ClaimFormErrors = {}
  if (!values.claimNumber.trim()) errors.claimNumber = 'Claim number is required'
  if (!values.policyId) errors.policyId = 'A policy must be selected'
  if (!values.description.trim()) errors.description = 'Description is required'
  if (!values.status.trim()) errors.status = 'Status is required'
  if (values.amount < 0) errors.amount = 'Amount must be zero or greater'
  return errors
}

export function ClaimFormPage() {
  const { id } = useParams<{ id: string }>()
  const isEditing = Boolean(id)
  const navigate = useNavigate()

  const [values, setValues] = useState<ClaimInput>(emptyClaim)
  const [errors, setErrors] = useState<ClaimFormErrors>({})
  const [policyOptions, setPolicyOptions] = useState<SelectOption[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    async function load() {
      const [policiesResult, claim] = await Promise.all([
        policyApi.list({ page: 1, pageSize: 100 }),
        id ? claimApi.get(Number(id)) : Promise.resolve(undefined),
      ])

      setPolicyOptions(
        policiesResult.data.map((policy) => ({
          value: String(policy.id),
          label: `${policy.policyNumber} — ${policy.holderName}`,
        })),
      )

      if (claim) {
        const { id: _id, ...rest } = claim
        setValues(rest)
      }

      setIsLoading(false)
    }

    load()
  }, [id])

  function handleChange<K extends keyof ClaimInput>(field: K, value: ClaimInput[K]) {
    setValues((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const validationErrors = validate(values)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setIsSubmitting(true)
    try {
      if (isEditing && id) {
        await claimApi.update(Number(id), values)
        navigate(`/claims/${id}`)
      } else {
        const created = await claimApi.create(values)
        navigate(`/claims/${created.id}`)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return <Spinner label="Loading claim…" />
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-semibold text-surface-900">
        {isEditing ? 'Edit claim' : 'New claim'}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 rounded-lg bg-white p-5 shadow-sm"
      >
        <ClaimFormFields
          values={values}
          errors={errors}
          onChange={handleChange}
          policyOptions={policyOptions}
        />

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-md border border-surface-300 px-3 py-2 text-sm font-medium text-surface-700 hover:bg-surface-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-md bg-primary-600 px-3 py-2 text-sm font-medium text-white hover:bg-primary-700 disabled:opacity-50"
          >
            {isSubmitting ? 'Saving…' : 'Save claim'}
          </button>
        </div>
      </form>
    </div>
  )
}
