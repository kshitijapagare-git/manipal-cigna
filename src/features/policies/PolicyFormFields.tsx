import { FormField } from '../../components/ui/FormField'
import { Input } from '../../components/ui/Input'
import { Select } from '../../components/ui/Select'
import { STATUS_OPTIONS, type PolicyStatus } from '../../lib/constants'
import type { PolicyInput } from './types'

export type PolicyFormErrors = Partial<Record<keyof PolicyInput, string>>

export interface PolicyFormFieldsProps {
  values: PolicyInput
  errors?: PolicyFormErrors
  onChange: <K extends keyof PolicyInput>(field: K, value: PolicyInput[K]) => void
}

const statusSelectOptions = STATUS_OPTIONS.map((status) => ({ value: status, label: status }))

export function PolicyFormFields({ values, errors, onChange }: PolicyFormFieldsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <FormField label="Policy number" htmlFor="policyNumber" error={errors?.policyNumber} required>
        <Input
          id="policyNumber"
          value={values.policyNumber}
          onChange={(event) => onChange('policyNumber', event.target.value)}
        />
      </FormField>

      <FormField label="Holder name" htmlFor="holderName" error={errors?.holderName} required>
        <Input
          id="holderName"
          value={values.holderName}
          onChange={(event) => onChange('holderName', event.target.value)}
        />
      </FormField>

      <FormField label="Type" htmlFor="type" error={errors?.type} required>
        <Input
          id="type"
          value={values.type}
          onChange={(event) => onChange('type', event.target.value)}
        />
      </FormField>

      <FormField label="Premium" htmlFor="premium" error={errors?.premium} required>
        <Input
          id="premium"
          type="number"
          min="0"
          step="0.01"
          value={values.premium}
          onChange={(event) => onChange('premium', Number(event.target.value))}
        />
      </FormField>

      <FormField label="Status" htmlFor="status" error={errors?.status} required>
        <Select
          id="status"
          options={statusSelectOptions}
          value={values.status}
          // The select's own options are generated from STATUS_OPTIONS, so its value is always
          // one of them — the cast is the DOM boundary, not a widening of the model.
          onChange={(event) => onChange('status', event.target.value as PolicyStatus)}
        />
      </FormField>
    </div>
  )
}
