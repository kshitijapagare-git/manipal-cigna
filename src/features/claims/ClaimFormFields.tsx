import { FormField } from '../../components/ui/FormField'
import { Input } from '../../components/ui/Input'
import { Select, type SelectOption } from '../../components/ui/Select'
import { STATUS_OPTIONS } from '../../lib/constants'
import type { ClaimInput } from './types'

export type ClaimFormErrors = Partial<Record<keyof ClaimInput, string>>

export interface ClaimFormFieldsProps {
  values: ClaimInput
  errors?: ClaimFormErrors
  onChange: <K extends keyof ClaimInput>(field: K, value: ClaimInput[K]) => void
  /** Policies available to link this claim to (the FK dropdown). */
  policyOptions: SelectOption[]
}

const statusSelectOptions = STATUS_OPTIONS.map((status) => ({ value: status, label: status }))

export function ClaimFormFields({ values, errors, onChange, policyOptions }: ClaimFormFieldsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <FormField label="Claim number" htmlFor="claimNumber" error={errors?.claimNumber} required>
        <Input
          id="claimNumber"
          value={values.claimNumber}
          onChange={(event) => onChange('claimNumber', event.target.value)}
        />
      </FormField>

      <FormField label="Policy" htmlFor="policyId" error={errors?.policyId} required>
        <Select
          id="policyId"
          options={policyOptions}
          placeholder="Select a policy"
          value={values.policyId ? String(values.policyId) : ''}
          onChange={(event) => onChange('policyId', Number(event.target.value))}
        />
      </FormField>

      <FormField
        label="Description"
        htmlFor="description"
        error={errors?.description}
        required
        className="sm:col-span-2"
      >
        <Input
          id="description"
          value={values.description}
          onChange={(event) => onChange('description', event.target.value)}
        />
      </FormField>

      <FormField label="Amount" htmlFor="amount" error={errors?.amount} required>
        <Input
          id="amount"
          type="number"
          min="0"
          step="0.01"
          value={values.amount}
          onChange={(event) => onChange('amount', Number(event.target.value))}
        />
      </FormField>

      <FormField label="Status" htmlFor="status" error={errors?.status} required>
        <Select
          id="status"
          options={statusSelectOptions}
          value={values.status}
          onChange={(event) => onChange('status', event.target.value)}
        />
      </FormField>
    </div>
  )
}
