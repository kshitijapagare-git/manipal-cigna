import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Spinner } from '../../components/ui/Spinner'
import { STATUS_OPTIONS } from '../../lib/constants'
import { PolicyFormFields, type PolicyFormErrors } from './PolicyFormFields'
import { policyApi } from './policyApi'
import type { PolicyInput } from './types'

const emptyPolicy: PolicyInput = {
  policyNumber: '',
  holderName: '',
  type: '',
  premium: 0,
  status: STATUS_OPTIONS[0],
}

function validate(values: PolicyInput): PolicyFormErrors {
  const errors: PolicyFormErrors = {}
  if (!values.policyNumber.trim()) errors.policyNumber = 'Policy number is required'
  if (!values.holderName.trim()) errors.holderName = 'Holder name is required'
  if (!values.type.trim()) errors.type = 'Type is required'
  if (!values.status.trim()) errors.status = 'Status is required'
  if (values.premium < 0) errors.premium = 'Premium must be zero or greater'
  return errors
}

export function PolicyFormPage() {
  const { id } = useParams<{ id: string }>()
  const isEditing = Boolean(id)
  const navigate = useNavigate()

  const [values, setValues] = useState<PolicyInput>(emptyPolicy)
  const [errors, setErrors] = useState<PolicyFormErrors>({})
  const [isLoading, setIsLoading] = useState(isEditing)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!id) return
    policyApi.get(Number(id)).then((policy) => {
      if (policy) {
        const { id: _id, ...rest } = policy
        setValues(rest)
      }
      setIsLoading(false)
    })
  }, [id])

  function handleChange<K extends keyof PolicyInput>(field: K, value: PolicyInput[K]) {
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
        await policyApi.update(Number(id), values)
        navigate(`/policies/${id}`)
      } else {
        const created = await policyApi.create(values)
        navigate(`/policies/${created.id}`)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return <Spinner label="Loading policy…" />
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-semibold text-surface-900">
        {isEditing ? 'Edit policy' : 'New policy'}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 rounded-lg bg-white p-5 shadow-sm"
      >
        <PolicyFormFields values={values} errors={errors} onChange={handleChange} />

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
            {isSubmitting ? 'Saving…' : 'Save policy'}
          </button>
        </div>
      </form>
    </div>
  )
}
